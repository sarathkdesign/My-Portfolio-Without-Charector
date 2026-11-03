/*
  Category and project pages
  ──────────────────────────
  /                            the homepage (the tile band)
  /work/<category>             a category: its banner, then a grid of its projects
  /work/<category>/<project>   a project, laid out like a Behance case study

  Opening a page grows the tile or thumbnail you clicked into that page's lead image;
  going back shrinks it into place again. Everything is drawn from js/work/.
  The timings are gathered in MOTION so they can be tuned in one place.
*/

import { categories } from './work/index.js';

const MOTION = {
  grow: 1100, // ms: a tile or thumbnail growing into a page
  shrink: 900, // ms: and back again
  ease: 'cubic-bezier(0.76, 0, 0.24, 1)', // slow start, long glide, soft landing
  reveal: 0.45, // share of the growth after which the page's text starts to rise in
  fade: 520, // ms: page changes that have no image to carry across
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v === true ? '' : v);
  }
  node.append(...children.filter(Boolean));
  return node;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export const countLabel = (n) => `${n} ${n === 1 ? 'project' : 'projects'}`;

/* ── Addresses ─────────────────────────────────────────── */
const hrefOf = (category, project) =>
  project ? `work/${category.slug}/${project.slug}` : category ? `work/${category.slug}` : './';
const pathOf = (href) => new URL(href, document.baseURI).pathname;
const BASE = pathOf('./');

function resolve(pathname) {
  const route = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : '';
  const [, a, b] = route.replace(/\/+$/, '').match(/^work\/([^/]+)(?:\/([^/]+))?$/) || [];
  const category = categories.find((c) => c.slug === a);
  if (!category) return { depth: 0 };
  const project = category.projects.find((p) => p.slug === b);
  return project ? { depth: 2, category, project } : { depth: 1, category };
}

/* ── Markup ────────────────────────────────────────────── */
const picture = (image, attrs = {}) => {
  const img = el('img', { src: image.src, alt: image.alt ?? '', decoding: 'async', ...attrs });
  // Holds a little room until the image arrives, so lazy images below don't all load at once
  if (!img.complete) img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
  else img.classList.add('is-loaded');
  return img;
};

const arrow = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<path d="M14 8H3m4.5-4.5L3 8l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6"/>';
  return svg;
};
const backLink = (href, label) =>
  el('a', { class: 'page__back', href, 'data-route': true, 'data-back': true }, [arrow(), el('span', { text: label })]);

const nextLink = (href, label, title, image) =>
  el('a', { class: 'page__next', href, 'data-route': true }, [
    el('span', { class: 'page__next-label', text: label }),
    el('span', { class: 'page__next-title', text: title }),
    image && el('span', { class: 'page__next-media' }, [picture(image, { loading: 'lazy' })]),
  ]);

function module(m) {
  switch (m.type) {
    case 'image':
      return el('figure', { class: 'mod mod--image', 'data-reveal': true }, [picture(m, { loading: 'lazy' })]);
    case 'row':
      return el('div', { class: 'mod mod--row', 'data-reveal': true, style: `--n:${m.images.length}` },
        m.images.map((i) => picture(i, { loading: 'lazy' })));
    case 'text':
      return el('div', { class: 'mod mod--text', 'data-reveal': true }, [
        m.heading && el('h2', { text: m.heading }),
        m.body && el('p', { text: m.body }),
      ]);
    case 'video': {
      const reduced = reducedQuery.matches;
      const video = el('video', { src: m.src, poster: m.poster, playsinline: true, loop: true, preload: 'metadata', controls: reduced });
      // Plays silently on a loop like a moving image (set as properties so browsers allow autoplay)
      video.muted = true;
      video.autoplay = !reduced;
      return el('figure', { class: 'mod mod--video', 'data-reveal': true }, [video]);
    }
    case 'embed':
      return el('div', { class: 'mod mod--embed', 'data-reveal': true, style: `--ratio:${m.ratio || '16 / 9'}` }, [
        el('iframe', { src: m.src, title: m.title || 'Embedded video', loading: 'lazy', allow: 'autoplay; fullscreen; picture-in-picture', allowfullscreen: true }),
      ]);
    default:
      return null;
  }
}

function renderCategory(page, category) {
  const next = categories[(categories.indexOf(category) + 1) % categories.length];
  page.dataset.slug = category.slug;
  page.setAttribute('aria-labelledby', 'page-category-title');
  page.replaceChildren(
    backLink('./', 'Index'),
    el('div', { class: 'cat__hero' }, [picture(category.cover, { 'data-hero': true, fetchpriority: 'high' })]),
    el('header', { class: 'cat__head' }, [
      el('h1', { class: 'cat__title', id: 'page-category-title', tabindex: '-1', 'data-reveal': true, text: category.name }),
      el('p', { class: 'cat__count', 'data-reveal': true, style: '--d:1', text: countLabel(category.projects.length) }),
      category.intro && el('p', { class: 'cat__intro', 'data-reveal': true, style: '--d:2', text: category.intro }),
    ]),
    el('ul', { class: 'cat__grid' }, category.projects.map((p, i) =>
      el('li', { 'data-reveal': true, style: `--d:${i % 3}` }, [
        el('a', { class: 'thumb', href: hrefOf(category, p), 'data-route': true, 'data-project': p.slug }, [
          el('span', { class: 'thumb__media' }, [picture(p.cover, { loading: i < 6 ? 'eager' : 'lazy' })]),
          el('span', { class: 'thumb__title', text: p.title }),
          el('span', { class: 'thumb__meta', text: [p.subtitle, p.year].filter(Boolean).join(' — ') }),
        ]),
      ])
    )),
    nextLink(hrefOf(next), 'Next category', next.name)
  );
  page.scrollTop = 0;
}

function renderProject(page, category, project) {
  const list = category.projects;
  const next = list[(list.indexOf(project) + 1) % list.length];
  const meta = [
    ['Client', project.client],
    ['Year', project.year],
    ['Services', project.services?.join(', ')],
  ].filter(([, v]) => v);
  const linkLabel = /behance\.net/.test(project.link || '') ? 'View on Behance' : 'Visit project';
  page.dataset.slug = project.slug;
  page.setAttribute('aria-labelledby', 'page-project-title');
  page.replaceChildren(
    backLink(hrefOf(category), category.name),
    el('header', { class: 'proj__head' }, [
      el('div', { class: 'proj__lead' }, [
        el('p', { class: 'proj__kicker', 'data-reveal': true, text: category.name }),
        el('h1', { class: 'proj__title', id: 'page-project-title', tabindex: '-1', 'data-reveal': true, style: '--d:1', text: project.title }),
        project.subtitle && el('p', { class: 'proj__subtitle', 'data-reveal': true, style: '--d:2', text: project.subtitle }),
      ]),
      el('div', { class: 'proj__side', 'data-reveal': true, style: '--d:3' }, [
        el('dl', { class: 'proj__meta' }, meta.map(([k, v]) => el('div', {}, [el('dt', { text: k }), el('dd', { text: v })]))),
        project.summary && el('p', { class: 'proj__summary', text: project.summary }),
      ]),
    ]),
    el('div', { class: 'proj__cover' }, [picture(project.cover, { 'data-hero': true, fetchpriority: 'high' })]),
    el('div', { class: 'proj__modules', style: project.gap ? `--gap:${project.gap}px` : null },
      (project.modules || []).map(module)),
    el('footer', { class: 'proj__foot' }, [
      project.link && el('a', { class: 'proj__link', href: project.link, target: '_blank', rel: 'noopener', text: `${linkLabel} ↗` }),
      list.length > 1 && nextLink(hrefOf(category, next), 'Next project', next.title, next.cover),
    ])
  );
  page.scrollTop = 0;
}

/* ── Pages ─────────────────────────────────────────────── */
export function createPages({ sound, leaveHome, returnHome }) {
  const root = document.documentElement;
  const home = $('#main');
  const menu = $('[data-menu]');
  const categoryPage = $('[data-page="category"]');
  const projectPage = $('[data-page="project"]');
  const morphLayer = $('[data-morph-layer]');
  const siteName = document.title.split(' — ')[0];
  const homeTitle = document.title;

  let current = { depth: 0 };
  let queue = Promise.resolve();
  let viaKeyboard = false;
  let homeTile = null; // the tile the open category grew from, to shrink back into
  let afterPop = null;

  const reduced = () => reducedQuery.matches;

  /* The homepage behind the pages */
  const setAway = (away, instant = false) => {
    root.classList.toggle('is-away-instant', instant);
    if (away === root.classList.contains('is-away')) return;
    root.classList.toggle('is-away', away);
    home.inert = away;
    if (away) leaveHome();
  };

  /* Reveal text as it scrolls into view */
  const observe = (page) => {
    page._io?.disconnect();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }, { root: page, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]', page).forEach((n) => io.observe(n));
    page._io = io;
  };
  const show = (page, state) => {
    page.classList.remove('is-before', 'is-after', 'is-morphing');
    if (state) page.classList.add(state);
    page.hidden = false;
    page.inert = false;
    observe(page);
  };
  const hide = (page) => {
    page._io?.disconnect();
    page.hidden = true;
    page.classList.remove('is-before', 'is-after', 'is-morphing');
    page.replaceChildren(); // also stops any video
    delete page.dataset.slug;
  };
  const fadeIn = async (page) => {
    show(page, 'is-before');
    await nextFrame();
    page.classList.remove('is-before');
    await wait(MOTION.fade);
  };
  const fadeOut = async (page) => {
    page.classList.add('is-after');
    await wait(MOTION.fade * 0.7);
    hide(page);
  };
  const focusTitle = (page) => $('h1', page)?.focus({ preventScroll: true });

  /* The shared image: a copy of the source picture that travels from one box to the other.
     `clip` hides the bottom of a box (the tiles show only part of their height). */
  async function morph({ src, from, to, fromClip = 0, toClip = 0, fromTransform = 'none', toTransform = 'none', position, duration, onReveal }) {
    const img = el('img', { src, alt: '' });
    img.style.objectPosition = position;
    const box = el('div', { class: 'morph' }, [img]);
    morphLayer.append(box);
    await img.decode().catch(() => {});
    const frame = (r, clip) => ({
      transform: `translate3d(${r.left}px, ${r.top}px, 0)`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      clipPath: `inset(0 0 ${Math.max(0, clip)}px 0)`,
    });
    const timing = { duration, easing: MOTION.ease, fill: 'both' };
    const anim = box.animate([frame(from, fromClip), frame(to, toClip)], timing);
    img.animate([{ transform: fromTransform }, { transform: toTransform }], timing);
    if (onReveal) setTimeout(onReveal, duration * MOTION.reveal);
    await anim.finished.catch(() => {});
    return box;
  }

  // The tile for a category: the one already in view, nearest the middle of the screen
  const inView = (card) => {
    const r = $('.card__media', card).getBoundingClientRect();
    return r.width > 0 && r.right > 0 && r.left < innerWidth;
  };
  const findTile = (slug) => {
    let best = null, bestD = Infinity;
    for (const card of $$(`.card[data-category="${slug}"]`)) {
      if (!inView(card)) continue;
      const r = $('.card__media', card).getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - innerWidth / 2);
      if (d < bestD) { best = card; bestD = d; }
    }
    return best;
  };
  const tileBox = (card) => {
    const media = $('.card__media', card), img = $('img', media);
    const rect = media.getBoundingClientRect();
    const f = parseFloat(getComputedStyle(card.parentElement).getPropertyValue('--f')) || 1;
    return { img, rect, clip: rect.height * (1 - f), transform: getComputedStyle(img).transform };
  };

  /* ── Transitions ──────────────────────────────────────── */
  async function openCategory(category, source) {
    const tile = source?.closest('.card') || findTile(category.slug);
    renderCategory(categoryPage, category);
    show(categoryPage, 'is-before');
    setAway(true);
    sound.play('menuOpen');
    if (tile && !reduced()) {
      homeTile = tile;
      const t = tileBox(tile);
      tile.classList.add('is-source');
      categoryPage.classList.add('is-morphing');
      const box = await morph({
        src: t.img.currentSrc || t.img.src,
        from: t.rect, fromClip: t.clip, fromTransform: t.transform,
        to: $('[data-hero]', categoryPage).getBoundingClientRect(),
        position: '50% 35%', duration: MOTION.grow,
        onReveal: () => categoryPage.classList.remove('is-before'),
      });
      categoryPage.classList.remove('is-morphing');
      box.remove();
    } else {
      categoryPage.classList.remove('is-before');
      await nextFrame();
      await wait(MOTION.fade);
    }
    focusTitle(categoryPage);
  }

  async function closeCategory(category) {
    const tile = homeTile?.isConnected && inView(homeTile) ? homeTile : findTile(category.slug);
    setAway(false);
    if (tile && !reduced()) {
      const t = tileBox(tile);
      tile.classList.add('is-source');
      categoryPage.classList.add('is-after', 'is-morphing');
      const box = await morph({
        src: t.img.currentSrc || t.img.src,
        from: $('[data-hero]', categoryPage).getBoundingClientRect(),
        to: t.rect, toClip: t.clip, toTransform: t.transform,
        position: '50% 35%', duration: MOTION.shrink,
      });
      hide(categoryPage);
      tile.classList.remove('is-source');
      box.remove();
    } else {
      await fadeOut(categoryPage);
    }
    $$('.card.is-source').forEach((c) => c.classList.remove('is-source'));
    homeTile = null;
    returnHome();
    if (viaKeyboard && tile) tile.focus({ preventScroll: true });
  }

  async function openProject(category, project, source) {
    const thumb = source?.closest('.thumb') || $(`.thumb[data-project="${project.slug}"]`, categoryPage);
    renderProject(projectPage, category, project);
    show(projectPage, 'is-before');
    categoryPage.inert = true;
    sound.play('menuOpen');
    if (thumb && !reduced()) {
      const img = $('img', thumb);
      thumb.classList.add('is-source');
      projectPage.classList.add('is-morphing');
      const box = await morph({
        src: img.currentSrc || img.src,
        from: $('.thumb__media', thumb).getBoundingClientRect(), fromTransform: getComputedStyle(img).transform,
        to: $('[data-hero]', projectPage).getBoundingClientRect(),
        position: '50% 50%', duration: MOTION.grow,
        onReveal: () => projectPage.classList.remove('is-before'),
      });
      projectPage.classList.remove('is-morphing');
      box.remove();
    } else {
      projectPage.classList.remove('is-before');
      await nextFrame();
      await wait(MOTION.fade);
    }
    focusTitle(projectPage);
  }

  async function closeProject(project) {
    const thumb = $(`.thumb[data-project="${project.slug}"]`, categoryPage);
    categoryPage.inert = false;
    if (thumb && !reduced()) {
      // Bring the thumbnail into view first; the project page still covers this scroll
      const r = $('.thumb__media', thumb).getBoundingClientRect();
      if (r.top < 0 || r.bottom > innerHeight) categoryPage.scrollTop += r.top - (innerHeight - r.height) / 2;
      const img = $('img', thumb);
      thumb.classList.add('is-source');
      projectPage.classList.add('is-after', 'is-morphing');
      const box = await morph({
        src: img.currentSrc || img.src,
        from: $('[data-hero]', projectPage).getBoundingClientRect(),
        to: $('.thumb__media', thumb).getBoundingClientRect(),
        position: '50% 50%', duration: MOTION.shrink,
      });
      hide(projectPage);
      thumb.classList.remove('is-source');
      box.remove();
    } else {
      await fadeOut(projectPage);
    }
    viaKeyboard && thumb ? thumb.focus({ preventScroll: true }) : focusTitle(categoryPage);
  }

  // Any other change (next project, next category, deep links, skipping levels): a soft fade
  async function swap(next) {
    if (next.depth === 0) {
      setAway(false);
      await Promise.all([projectPage, categoryPage].filter((p) => !p.hidden).map(fadeOut));
      $$('.card.is-source').forEach((c) => c.classList.remove('is-source'));
      homeTile = null;
      returnHome();
      return;
    }
    setAway(true);
    const sameCategory = !categoryPage.hidden && categoryPage.dataset.slug === next.category.slug;
    if (next.depth === 1) {
      const leaving = [!projectPage.hidden && projectPage, !sameCategory && !categoryPage.hidden && categoryPage].filter(Boolean);
      await Promise.all(leaving.map(fadeOut));
      if (!sameCategory) {
        renderCategory(categoryPage, next.category);
        await fadeIn(categoryPage);
      }
      categoryPage.inert = false;
      return focusTitle(categoryPage);
    }
    // A project: its category waits underneath for the way back
    if (!projectPage.hidden) await fadeOut(projectPage);
    if (!sameCategory) {
      renderCategory(categoryPage, next.category);
      show(categoryPage);
    }
    categoryPage.inert = true;
    renderProject(projectPage, next.category, next.project);
    await fadeIn(projectPage);
    focusTitle(projectPage);
  }

  const titleFor = (at) =>
    at.project ? `${at.project.title} — ${at.category.name} — ${siteName}`
      : at.category ? `${at.category.name} — ${siteName}` : homeTitle;

  function transition(next, source) {
    const prev = current;
    current = next;
    document.title = titleFor(next);
    const same = prev.category === next.category;
    if (prev.depth === 0 && next.depth === 1) return openCategory(next.category, source);
    if (prev.depth === 1 && next.depth === 0) return closeCategory(prev.category);
    if (same && prev.depth === 1 && next.depth === 2) return openProject(next.category, next.project, source);
    if (same && prev.depth === 2 && next.depth === 1) return closeProject(prev.project);
    return swap(next);
  }
  const render = (next, source) => (queue = queue.then(() => transition(next, source)).catch((err) => console.error(err)));

  function go(href, source = null) {
    const path = pathOf(href);
    if (path === location.pathname) return queue;
    // Heading back up to the page we just came from is a real step back,
    // so the browser's own Back button stays in step
    if (history.state?.prev === path) {
      return new Promise((resolve) => {
        afterPop = resolve;
        history.back();
      });
    }
    history.pushState({ prev: location.pathname }, '', path);
    return render(resolve(path), source);
  }

  /* ── Wiring ───────────────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-route]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    viaKeyboard = e.detail === 0;
    if (a.closest('.page')) sound.play('click'); // the tiles make their own
    go(a.getAttribute('href'), a);
  });

  window.addEventListener('popstate', () => {
    if (!afterPop) viaKeyboard = false; // the browser's own Back/Forward, not one of our links
    render(resolve(location.pathname)).then(() => {
      afterPop?.();
      afterPop = null;
    });
  });

  // Escape steps up one level, unless the menu is open (it closes first)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !current.depth || !menu.hidden) return;
    viaKeyboard = true;
    $('.page__back', current.depth === 2 ? projectPage : categoryPage)?.click();
  });

  /* ── First visit ──────────────────────────────────────── */
  history.scrollRestoration = 'manual';
  const first = resolve(location.pathname);
  const canonical = pathOf(hrefOf(first.category, first.project));
  if (canonical !== location.pathname) history.replaceState(history.state, '', canonical);
  if (first.depth) {
    // Arriving on a page directly: no growth to show, so it's simply there
    current = first;
    setAway(true, true);
    renderCategory(categoryPage, first.category);
    show(categoryPage);
    if (first.depth === 2) {
      categoryPage.inert = true;
      renderProject(projectPage, first.category, first.project);
      show(projectPage);
    }
    document.title = titleFor(first);
    focusTitle(first.depth === 2 ? projectPage : categoryPage);
  }

  return {
    depth: () => current.depth,
    home: () => go('./'),
  };
}
