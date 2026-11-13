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
import { content } from './content.js';
import { layout, restyled, startMotion, splitWords, headArt } from './designs.js';
import { createLightbox } from './lightbox.js';
import { small } from './work/small.js';
import { variants } from './work/variants.js';

// The light copy of a picture (longest side 1400px) where one exists: walls and thumbnails never show more
const light = (src) => (small.has(src) ? `${src}.sm.jpg` : src);

// Project videos play only while near the screen, and pause (stop decoding) once scrolled away
let videoWatcher = null;
const videoWatch = () => (videoWatcher ??= new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
  if (isIntersecting) { v.preload = 'auto'; v.play?.().catch(() => {}); }
  else if (!v.paused) v.pause();
}), { rootMargin: '300px 0px' }));

const MOTION = {
  grow: 1100, // ms: a tile or thumbnail growing into a page
  shrink: 900, // ms: and back again
  ease: 'cubic-bezier(0.76, 0, 0.24, 1)', // slow start, long glide, soft landing
  reveal: 0.45, // share of the growth after which the page's text starts to rise in
  fade: 520, // ms: page changes that have no image to carry across
  switch: 1050, // ms: one category page wiping across another
  wallDelay: 450, // ms: the cover holds its single image this long before the moving wall fades in
  wallPace: 11, // seconds per unit of image width (relative to row height): higher is slower
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

export const countLabel = (n) => (n ? `${n} ${n === 1 ? 'project' : 'projects'}` : 'Coming soon'); // a category with no projects yet

/* ── Addresses ─────────────────────────────────────────── */
const hrefOf = (category, project) =>
  project ? `work/${category.slug}/${project.slug}` : category ? `work/${category.slug}` : './';
const pathOf = (href) => new URL(href, document.baseURI).pathname;
const BASE = pathOf('./');

function resolve(pathname) {
  const route = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : '';
  const page = route.replace(/\/+$/, '');
  if (page === 'experience' || page === 'contact') return { depth: 1, info: page };
  const [, a, b] = route.replace(/\/+$/, '').match(/^work\/([^/]+)(?:\/([^/]+))?$/) || [];
  const category = categories.find((c) => c.slug === a);
  if (!category) return { depth: 0 };
  const project = category.projects.find((p) => p.slug === b);
  return project ? { depth: 2, category, project } : { depth: 1, category };
}

/* ── Markup ────────────────────────────────────────────── */
// WebP sizes of a picture for srcset, so each screen downloads only what it shows (see js/work/variants.js)
const srcsetOf = (src) => {
  const key = src.replace(/\.sm\.jpg$/, '');
  const v = variants[key];
  if (!v) return null;
  const [w, full, ...sizes] = v;
  return [...sizes.map((s) => `${key}.${s}w.webp ${s}w`), full ? `${key}.${full}w.webp ${full}w` : `${key} ${w}w`].join(', ');
};
// A video's still: its 1280px WebP copy where there is one (posters load straight away, even for videos further down)
const posterOf = (src) => {
  const v = src && variants[src];
  if (!v) return src;
  return v.includes(1280) && v.indexOf(1280) > 1 ? `${src}.1280w.webp` : v[1] ? `${src}.${v[1]}w.webp` : src;
};
// The size a just-made <img> will settle on (before the browser has picked one, currentSrc is still empty):
// the smallest candidate at least as wide as the screen in device pixels, as sizes="100vw" asks
const srcFor = (img) => {
  const set = img.getAttribute('srcset');
  if (!set) return img.src;
  const need = innerWidth * (devicePixelRatio || 1);
  const list = set.split(',').map((s) => s.trim().split(' ')).map(([u, w]) => [u, parseInt(w, 10)]);
  return (list.find(([, w]) => w >= need) || list[list.length - 1])[0];
};
const picture = (image, attrs = {}) => {
  const srcset = srcsetOf(image.src);
  // the original stays as src, for any browser that can't use srcset
  const img = el('img', { src: image.src, alt: image.alt ?? '', decoding: 'async', ...(srcset && { srcset, sizes: '100vw' }), ...attrs });
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

// A project's close (×), top right at the edge of the work: goes back to its category, like the back link
const closeLink = (href, label) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<path d="M3.5 3.5l9 9m0-9l-9 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
  return el('a', { class: 'page__close', href, 'data-route': true, 'data-back': true, 'aria-label': `Close, back to ${label}` }, [svg]);
};

// The link at the foot of a page: label, name and an optional line of detail, with an optional thumbnail
const nextLink = (href, label, title, image, meta) =>
  el('a', { class: 'page__next', href, 'data-route': true }, [
    el('span', { class: 'page__next-text' }, [
      el('span', { class: 'page__next-label', text: label }),
      el('span', { class: 'page__next-title', text: title }),
      meta && el('span', { class: 'page__next-meta', text: meta }),
    ]),
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
      // A "Credits" block stacks its line directly under the heading
      return el('div', { class: `mod mod--text${/^credits$/i.test(m.heading || '') ? ' mod--credits' : ''}`, 'data-reveal': true }, [
        m.heading && el('h2', { text: m.heading }),
        m.body && el('p', { text: m.body }),
      ]);
    case 'video': {
      const reduced = reducedQuery.matches;
      // No autoplay attribute: it would make the browser fetch every video on the page at once.
      // The watcher below loads and plays each one only while it is near the screen.
      // `controls: true` lets viewers unmute a piece that has a soundtrack; a portrait video (w < h) is
      // held to the screen's height and centred instead of filling the width
      const video = el('video', { src: m.src, poster: posterOf(m.poster), playsinline: true, loop: true, preload: reduced ? 'metadata' : 'none', controls: reduced || !!m.controls,
        style: m.w && m.h ? `aspect-ratio:${m.w} / ${m.h}` : null });
      // Plays silently on a loop like a moving image (set as a property so browsers allow it to play)
      video.muted = true;
      if (!reduced) videoWatch().observe(video);
      return el('figure', { class: `mod mod--video${m.w && m.h && m.w < m.h ? ' is-portrait' : ''}`, 'data-reveal': true }, [video]);
    }
    case 'embed':
      return el('div', { class: 'mod mod--embed', 'data-reveal': true, style: `--ratio:${m.ratio || '16 / 9'}` }, [
        el('iframe', { src: m.src, title: m.title || 'Embedded video', loading: 'lazy', allow: 'autoplay; fullscreen; picture-in-picture', allowfullscreen: true }),
      ]);
    // ── Brand-coloured presentation blocks (a project's `theme` sets their colours)
    case 'chapter':
      return el('section', { class: 'mod mod--th mod--chapter', 'data-reveal': true, style: accentOf(m) }, [
        el('div', { class: 'th__aside' }, [thLabel(m)]),
        el('div', { class: 'th__main' }, [
          el('h2', { class: 'th__heading', text: m.heading }),
          el('div', { class: 'th__body' }, [].concat(m.body || []).map((t) => el('p', { text: t }))),
        ]),
      ]);
    case 'section':
      return el('section', { class: 'mod mod--th mod--section', 'data-reveal': true, style: accentOf(m) }, [
        thLabel(m),
        el('p', { class: 'th__line', text: m.line }),
      ]);
    case 'split':
      return el('section', { class: `mod mod--th mod--split${m.reverse ? ' is-reverse' : ''}`, 'data-reveal': true, style: accentOf(m) }, [
        el('figure', { class: m.fit === 'contain' ? 'th__media th__media--contain' : 'th__media' }, [picture(m.image, { loading: 'lazy' })]),
        el('div', { class: 'th__text' }, [
          thLabel(m),
          el('h2', { class: 'th__heading th__heading--sm', text: m.heading }),
          el('p', { class: 'th__copy', text: m.body }),
        ]),
      ]);
    case 'cards':
      return el('section', { class: 'mod mod--th mod--cards', 'data-reveal': true, style: `${accentOf(m) || ''}--cols:${m.cols || m.items.length}` }, [
        el('header', { class: 'th__head' }, [
          thLabel(m),
          el('h2', { class: 'th__heading th__heading--sm', text: m.heading }),
          m.body && el('p', { class: 'th__copy', text: m.body }),
        ]),
        el('ul', { class: 'th__cards' }, m.items.map((c) =>
          el('li', { class: 'th__card' }, [
            el('figure', { class: 'th__card-media' }, [
              picture(c, { loading: 'lazy' }),
              c.icon && picture({ src: c.icon, alt: '' }, { class: 'th__card-icon', loading: 'lazy' }),
            ]),
            el('h3', { class: 'th__card-title', text: c.title }),
            el('p', { class: 'th__card-copy', text: c.body }),
          ]))),
      ]);
    case 'palette':
      return el('section', { class: 'mod mod--th mod--palette', 'data-reveal': true, style: accentOf(m) }, [
        el('header', { class: 'th__head' }, [
          thLabel(m),
          el('h2', { class: 'th__heading th__heading--sm', text: m.heading }),
          m.body && el('p', { class: 'th__copy', text: m.body }),
        ]),
        el('ul', { class: 'th__swatches' }, m.colours.map((c) =>
          el('li', { class: 'th__swatch', style: `background:${c.hex};color:${inkOn(c.hex)}` }, [
            el('span', { class: 'th__swatch-name', text: c.name }),
            el('span', { class: 'th__swatch-code', text: [c.hex.toUpperCase(), c.note].filter(Boolean).join(' · ') }),
          ]))),
      ]);
    case 'duo':
      return el('div', { class: 'mod mod--duo', 'data-reveal': true },
        m.images.map((i) => el('figure', { style: i.w ? `flex:${(i.w / i.h).toFixed(3)} 1 0` : null }, [picture(i, { loading: 'lazy' })])));
    // ── IndSoft-style blocks: statement, anatomy, gradient, bento, closing ──
    case 'statement':
      return el('section', { class: 'mod mod--statement', 'data-reveal': true }, [
        el('p', { class: 'st__kicker', text: m.kicker }),
        el('h2', { class: 'st__title' }, emphasised(m.heading)),
        el('div', { class: 'st__pair' }, m.pair.map((x) =>
          el('div', { class: 'st__half' }, [el('p', { class: 'st__tag', text: x.tag }), el('p', { class: 'st__text', text: x.text })]))),
      ]);
    case 'anatomy':
      return el('section', { class: 'mod mod--anatomy' }, [
        el('div', { class: 'an__pin' }, [
          el('p', { class: 'st__kicker', text: m.kicker }),
          picture(m.mark, { class: 'an__mark', loading: 'lazy' }),
          el('h2', { class: 'an__title' }, emphasised(m.heading)),
        ]),
        el('ol', { class: 'an__steps' }, m.steps.map((x, i) =>
          el('li', { class: 'an__step', 'data-reveal': true }, [
            el('p', { class: 'an__meta' }, [
              el('span', { text: `${String(i + 1).padStart(2, '0')} / ${String(m.steps.length).padStart(2, '0')}` }),
              el('span', { text: x.tag }),
            ]),
            picture(x, { class: 'an__photo', loading: 'lazy' }),
            el('div', { class: 'an__body' }, [
              picture({ src: x.part, alt: '' }, { class: 'an__part', loading: 'lazy' }),
              el('div', {}, [el('h3', { class: 'an__name', text: x.title }), el('p', { class: 'an__text', text: x.body })]),
            ]),
          ]))),
      ]);
    case 'gradient':
      return el('section', { class: 'mod mod--gradient', 'data-reveal': true }, [
        el('div', { class: 'gr__copy' }, [
          el('p', { class: 'st__kicker', text: m.kicker }),
          el('h2', { class: 'gr__title', text: m.heading }),
          el('p', { class: 'gr__text', text: m.body }),
        ]),
        el('ul', { class: 'gr__stops' }, m.colours.map((c) =>
          el('li', {}, [el('span', { class: 'gr__dot', style: `background:${c.hex}` }), el('span', { text: c.name }), el('span', { class: 'gr__hex', text: c.hex.toUpperCase() })]))),
      ]);
    case 'bento':
      return el('section', { class: 'mod mod--bento', 'data-reveal': true }, [
        m.kicker && el('header', { class: 'bn__head' }, [
          el('p', { class: 'st__kicker', text: m.kicker }),
          m.line && el('p', { class: 'bn__line', text: m.line }),
        ]),
        el('div', { class: 'bn__grid' }, m.items.map((x) =>
          el('figure', { class: `bn__item${x.span ? ` is-${x.span}` : ''}` }, [
            picture(x, { loading: 'lazy' }),
            x.caption && el('figcaption', { text: x.caption }),
          ]))),
      ]);
    case 'closing':
      return el('section', { class: 'mod mod--closing', 'data-reveal': true }, [
        m.mark && picture(m.mark, { class: 'cl__mark', loading: 'lazy' }),
        el('h2', { class: 'cl__title' }, emphasised(m.heading)),
        m.kicker && el('p', { class: 'st__kicker', text: m.kicker }),
      ]);
    default:
      return null;
  }
}

// "Say *yes* to clients" — the words between asterisks carry the brand gradient
const emphasised = (text) => text.split('*').map((part, i) => (i % 2 ? el('span', { class: 'is-grad', text: part }) : part));

// "02  The idea" — a block's number and label, in its accent colour
const thLabel = (m) => el('p', { class: 'th__label' }, [
  m.n && el('span', { class: 'th__num', text: m.n }),
  m.label && el('span', { text: m.label }),
]);
const accentOf = (m) => (m.accent ? `--th-accent:${m.accent};` : null);
// Dark or light text, whichever reads on a swatch
const inkOn = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.6 ? '#111' : '#fff';
};

/* ── Category cover: a wall of the category's work in two rows that glide continuously
   in opposite directions, like the tile band on the homepage ───────────────────── */
// A category's `wall` images (or else each project's thumbnail), always including the
// category's own tile image, so the tile can fly straight into its place in the wall
function wallImages(category) {
  const list = category.wall?.length ? [...category.wall] : category.projects.map((p) => p.thumb || p.cover);
  if (!category.wallNoCover && !list.some((img) => img.src === category.cover.src)) list.unshift(category.cover);
  return list;
}

// The wall's two rows, arranged so no two pictures of the same brand sit side by side —
// including where a row loops back to its start. A picture's brand is its `brand` tag, else its
// project folder (assets/work/<category>/<project>/…); a loose file counts as its own brand.
const brandOf = (img) => {
  if (img.brand) return img.brand;
  const parts = img.src.split('/');
  return parts.length > 4 ? parts[3] : img.src;
};
const touching = (row) => (row.length < 2 ? 0 : row.reduce((n, x, i) => n + (brandOf(x) === brandOf(row[(i + 1) % row.length]) ? 1 : 0), 0));
function spreadRow(list) {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const attempt = () => {
    const groups = new Map();
    for (const img of [...list].sort(() => rnd() - 0.5)) (groups.get(brandOf(img)) || groups.set(brandOf(img), []).get(brandOf(img))).push(img);
    const out = [];
    let prev = null;
    while (groups.size) {
      const brands = [...groups.keys()].sort((a, b) => groups.get(b).length - groups.get(a).length || rnd() - 0.5);
      const pick = brands.find((b) => b !== prev) ?? brands[0];
      out.push(groups.get(pick).pop());
      if (!groups.get(pick).length) groups.delete(pick);
      prev = pick;
    }
    return out;
  };
  let best = list, score = touching(list);
  for (let t = 0; t < 400 && score; t++) {
    const a = attempt(), c = touching(a);
    if (c < score) { best = a; score = c; }
  }
  return best;
}
function wallRows(images) {
  // deal the brands out evenly between the rows, then order each row
  const groups = new Map();
  images.forEach((img) => (groups.get(brandOf(img)) || groups.set(brandOf(img), []).get(brandOf(img))).push(img));
  // each brand alternates between the two rows (largest brands first), starting with the shorter row
  const rows = [[], []];
  [...groups.values()].sort((a, b) => b.length - a.length).forEach((g) => {
    let r = rows[0].length <= rows[1].length ? 0 : 1;
    g.forEach((img) => { rows[r].push(img); r = 1 - r; });
  });
  return rows.map(spreadRow);
}

function heroFilm({ src, poster }) {
  const v = el('video', { class: 'cat__film', src, poster, autoplay: '', loop: '', muted: '', playsinline: '', preload: 'auto', 'aria-hidden': 'true' });
  v.muted = true; v.playsInline = true;
  v.play?.().catch(() => {});
  return v;
}

// Runs itself: it fades in once its page is open and settled, glides while the cover is
// in view, and holds still while the page is covered, scrolled away or changing
function mountWall(page, hero, category) {
  if (category.hideWall) return null;
  const images = wallImages(category);
  if (images.length < 2) return null;
  const rows = wallRows(images);
  const wall = el('div', { class: 'cat__wall', 'aria-hidden': 'true' }, rows.map((row, r) => {
    const ratio = (img) => (img.w && img.h ? img.w / img.h : 4 / 3);
    const span = row.reduce((sum, img) => sum + ratio(img), 0); // the set's width, in row heights
    const set = () => row.map((img) =>
      el('img', { src: light(img.src), alt: '', decoding: 'async', 'data-src': img.src, style: `aspect-ratio:${ratio(img)}` }));
    // Three copies: the row moves by one copy and starts again, with no seam
    return el('div', { class: 'cat__wall-row' }, [
      el('div', { class: 'cat__wall-track', style: `--dur:${(span * MOTION.wallPace * (r ? 1.15 : 1)).toFixed(1)}s` },
        [...set(), ...set(), ...set()]),
    ]);
  }));
  hero.append(wall);
  let inView = true, settledSince = 0, timer = 0;
  const settled = () => !page.hidden && !page.inert && !document.hidden && inView &&
    !['is-before', 'is-after', 'is-morphing', 'is-entering'].some((c) => page.classList.contains(c));
  const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { root: page });
  io.observe(hero);
  const tick = () => {
    const ok = settled();
    if (!ok) settledSince = 0;
    else if (!settledSince) settledSince = performance.now();
    else if (performance.now() - settledSince > MOTION.wallDelay) hero.classList.add('is-live');
    hero.classList.toggle('is-playing', ok && hero.classList.contains('is-live'));
    timer = setTimeout(tick, 150);
  };
  tick();

  const instances = (src) => $$('img', wall).filter((img) => img.dataset.src === src);
  return {
    destroy: () => { clearTimeout(timer); io.disconnect(); },
    // Line the wall up so this image sits centred in its row, show the wall, and return the image
    // (the tile on the homepage flies into it)
    land(src) {
      const all = instances(src);
      if (!all.length) return null;
      const track = all[0].parentElement;
      const reverse = !!track.closest('.cat__wall-row + .cat__wall-row');
      const loop = all[1].offsetLeft - all[0].offsetLeft; // one copy of the row
      const dur = parseFloat(track.style.getPropertyValue('--dur'));
      const shift = (((all[0].offsetLeft + all[0].offsetWidth / 2 - hero.clientWidth / 2) % loop) + loop) % loop;
      const progress = reverse ? 1 - shift / loop : shift / loop;
      track.style.animationDelay = `-${(progress * dur).toFixed(3)}s`;
      hero.classList.add('is-live');
      return all.reduce((best, img) => {
        const r = img.getBoundingClientRect(), mid = Math.abs(r.left + r.width / 2 - innerWidth / 2);
        return !best || mid < best.mid ? { img, mid } : best;
      }, null).img;
    },
    // Where that image is now, if it is on screen (for the trip back to the tile)
    find(src) {
      const box = hero.getBoundingClientRect();
      if (!hero.classList.contains('is-live') || box.bottom <= 0) return null;
      return instances(src).find((img) => {
        const r = img.getBoundingClientRect();
        return r.right > box.left && r.left < box.right && r.width > 0;
      }) || null;
    },
  };
}

function renderCategory(page, category) {
  const next = categories[(categories.indexOf(category) + 1) % categories.length];
  page.dataset.slug = category.slug;
  page.setAttribute('aria-labelledby', 'page-category-title');
  page.replaceChildren(
    backLink('./', 'Index'),
    el('div', { class: 'cat__hero', style: category.heroTall ? '--hero-h:92svh;--hero-h-sm:64svh' : null }, [picture(category.cover, { 'data-hero': true, fetchpriority: 'high' }),
      // a category can play its own looping film at the top, over the tile picture the page transition uses
      ...(category.heroVideo ? [heroFilm(category.heroVideo)] : [])]),
    el('header', { class: 'cat__head' }, [
      el('h1', { class: 'cat__title', id: 'page-category-title', tabindex: '-1', 'data-reveal': true, text: category.name }),
      el('p', { class: 'cat__count', 'data-reveal': true, style: '--d:1', text: countLabel(category.projects.length) }),
      category.intro && el('p', { class: 'cat__intro', 'data-reveal': true, style: '--d:2', text: category.intro }),
    ]),
    el('ul', { class: 'cat__grid' }, category.projects.map((p, i) =>
      el('li', { 'data-reveal': true, style: `--d:${i % 3}` }, [
        el('a', { class: 'thumb', href: hrefOf(category, p), 'data-route': true, 'data-project': p.slug }, [
          el('span', { class: 'thumb__media' }, [picture({ ...(p.thumb || p.cover), src: light((p.thumb || p.cover).src) }, { loading: i < 6 ? 'eager' : 'lazy' })]),
          el('span', { class: 'thumb__title', text: p.title }),
          el('span', { class: 'thumb__meta', text: [p.subtitle, p.year].filter(Boolean).join(' — ') }),
        ]),
      ])
    )),
    nextLink(hrefOf(next), 'Next category', next.name)
  );
  page.scrollTop = 0;
  page._wall?.destroy();
  page._wall = mountWall(page, $('.cat__hero', page), category);
}

/* Experience, built to be read at a glance: each role with when, where and what the
   work involved. The competencies drift in two rows, echoing the tile band on the
   homepage. (Earlier layout: /experience?layout=classic) */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
// "Mar 2021 — Present" → [start, end] in months; a bare year counts from January
function spanOf(years) {
  const now = new Date();
  const parse = (txt, isEnd) => {
    if (/present|now/i.test(txt)) return now.getFullYear() * 12 + now.getMonth();
    const y = +(txt.match(/\d{4}/) || [0])[0];
    const m = MONTHS.indexOf((txt.match(/[a-z]{3}/i) || [''])[0].toLowerCase());
    return y * 12 + (m >= 0 ? m : isEnd ? 0 : 0);
  };
  const [a, b = a] = years.split(/[—–-]/).map((t) => t.trim());
  return [parse(a, false), parse(b, true)];
}
const durationOf = (months) => {
  const y = Math.floor(months / 12), m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
};

// The curtain page shows Experience or Contact
const INFO_TITLES = { experience: 'Experience', contact: 'Contact' };
function renderInfo(page, kind) {
  page.dataset.page = kind;
  return kind === 'contact' ? renderContact(page) : renderExperience(page);
}

/* Contact: a bold green page with each way to reach Sarath as a large row */
function renderContact(page) {
  page.classList.remove('is-dark');
  page.classList.add('is-accent');
  page.setAttribute('aria-labelledby', 'page-contact-title');
  const handle = (url) => {
    const u = new URL(url), parts = u.pathname.split('/').filter(Boolean);
    return u.hostname.includes('instagram') ? `@${parts.at(-1)}` : `${u.hostname.replace('www.', '')}/${parts.join('/')}`;
  };
  const row = (label, href, value, action, external) =>
    el('li', { class: 'ct__row', 'data-reveal': true }, [
      el('span', { class: 'ct__label', text: label }),
      el('a', { class: 'ct__value', href, ...(external ? { target: '_blank', rel: 'noopener' } : {}) }, [value, el('span', { class: 'ct__arrow', 'aria-hidden': 'true', text: external ? '↗' : '→' })]),
      action,
    ]);
  page.replaceChildren(
    backLink('./', 'Index'),
    el('header', { class: 'ct__head' }, [
      el('p', { class: 'ct__kicker', 'data-reveal': true, text: 'Contact' }),
      el('h1', { class: 'ct__title', id: 'page-contact-title', tabindex: '-1', 'data-reveal': true, style: '--d:1', text: 'Contact' }),
    ]),
    el('ul', { class: 'ct__list' }, [
      row('Email', `mailto:${content.email}`, content.email,
        el('button', { class: 'ct__copy', type: 'button', 'data-copy': content.email, text: 'Copy' })),
      content.phone && row('Phone', `tel:${content.phone.replace(/[^\d+]/g, '')}`, content.phone),
      ...content.socials.map((s) => row(s.label, s.url, handle(s.url), null, true)),
    ])
  );
}

function renderExperience(page) {
  page.classList.remove('is-accent');
  if (new URLSearchParams(location.search).get('layout') === 'classic') {
    page.classList.remove('is-dark');
    return renderExperienceClassic(page);
  }
  page.classList.add('is-dark');
  page.setAttribute('aria-labelledby', 'page-experience-title');
  const jobs = content.experience;
  const pad = (n) => String(n).padStart(2, '0');
  const spans = jobs.map((j) => spanOf(j.years));
  const skills = content.competencies || [];
  const half = Math.ceil(skills.length / 2);
  const tickerRow = (words, dir) =>
    el('div', { class: 'xp2__ticker', style: `--dir:${dir}`, 'aria-hidden': 'true' }, [
      el('div', { class: 'xp2__track' }, [...words, ...words].map((w, i) =>
        el('span', { class: 'xp2__word' + (i % 2 ? ' is-outline' : '') }, [w, el('i', { class: 'xp2__dot' })]))),
    ]);

  page.replaceChildren(
    backLink('./', 'Index'),
    el('header', { class: 'xp4__head' }, [
      el('h1', { class: 'xp4__title', id: 'page-experience-title', tabindex: '-1', 'data-reveal': true, text: 'Experience' }),
      el('p', { class: 'xp4__lede', 'data-reveal': true, style: '--d:1', text: content.intro }),
    ]),
    el('ol', { class: 'xp4__roles' }, jobs.map((job, i) => {
      const [a, b] = spans[i];
      return el('li', { class: 'xp4__role', id: `xp-role-${i}` }, [
        el('div', { class: 'xp4__info', 'data-reveal': true }, [
          el('span', { class: 'xp4__index', text: pad(i + 1) }),
          el('p', { class: 'xp4__when' }, [el('span', { text: job.years }), el('span', { text: durationOf(b - a) })]),
          el('h2', { class: 'xp4__role-title', text: job.role }),
          el('p', { class: 'xp4__org' }, [el('strong', { text: job.company }), el('span', { text: job.location })]),
        ]),
        el('ol', { class: 'xp4__points' }, (job.points || []).map((t, k) =>
          el('li', { 'data-reveal': true, style: `--d:${Math.min(k, 4)}` }, [el('span', { class: 'xp4__n', text: pad(k + 1) }), el('p', { text: t })]))),
      ]);
    })),

    skills.length && el('section', { class: 'xp2__skills', 'aria-labelledby': 'xp-skills-title' }, [
      el('h2', { class: 'xp2__label', id: 'xp-skills-title', 'data-reveal': true, text: 'Core competencies' }),
      el('ul', { class: 'sr-only' }, skills.map((t) => el('li', { text: t }))),
      tickerRow(skills.slice(0, half), -1),
      tickerRow(skills.slice(half), 1),
    ]),
    nextLink(hrefOf(categories[0]), 'Selected work', 'View work')
  );
}

function renderExperienceClassic(page) {
  page.setAttribute('aria-labelledby', 'page-experience-title');
  page.replaceChildren(
    backLink('./', 'Index'),
    el('header', { class: 'xp__head' }, [
      el('h1', { class: 'xp__title', id: 'page-experience-title', tabindex: '-1', 'data-reveal': true, text: 'Experience' }),
      el('p', { class: 'xp__lede', 'data-reveal': true, style: '--d:1', text: content.intro }),
    ]),
    el('ol', { class: 'xp__list' }, content.experience.map((job, i) =>
      el('li', { class: 'xp__row', 'data-reveal': true }, [
        el('p', { class: 'xp__when' }, [
          el('span', { class: 'xp__index', text: String(i + 1).padStart(2, '0') }),
          el('span', { class: 'xp__years', text: job.years }),
        ]),
        el('div', { class: 'xp__what' }, [
          el('h2', { class: 'xp__role', text: job.role }),
          el('p', { class: 'xp__company', text: [job.company, job.location].filter(Boolean).join(' — ') }),
        ]),
        job.points?.length && el('ul', { class: 'xp__points' }, job.points.map((t) => el('li', { text: t }))),
      ])
    )),
    content.competencies?.length && el('section', { class: 'xp__skills', 'data-reveal': true }, [
      el('h2', { class: 'xp__role', text: 'Core competencies' }),
      el('ul', {}, content.competencies.map((t) => el('li', { text: t }))),
    ]),
    nextLink(hrefOf(categories[0]), 'Selected work', 'View work')
  );
}

// A project can bring its brand's typeface (theme.fontHref, a Google Fonts stylesheet)
const loadFont = (href) => {
  if (!href || document.querySelector(`link[href="${href}"]`)) return;
  document.head.append(el('link', { rel: 'stylesheet', href }));
};

function projectModules(project) {
  const designed = layout(project, { el, picture, module });
  if (designed) return designed;
  const nodes = (project.modules || []).map(module);
  const extra = restyled(project.design);
  if (extra) {
    let k = 0;
    for (const n of nodes) {
      if (!n) continue;
      if (n.classList.contains('mod--image')) for (const [key, v] of Object.entries(extra.image)) n.querySelector('img')?.setAttribute(key, v === true ? '' : v);
      if (n.classList.contains('mod--duo')) n.classList.add(`is-${extra.duo}`);
      if (extra.words) n.querySelectorAll('.th__heading, .th__line').forEach(splitWords);
      if (extra.enter && (n.classList.contains('mod--image') || n.classList.contains('mod--duo'))) n.dataset.enter = extra.enter[k++ % extra.enter.length];
    }
  }
  return nodes;
}

function renderProject(page, category, project) {
  loadFont(project.theme?.fontHref);
  const t = project.theme || {};
  const vars = { '--th-bg': t.bg, '--th-ink': t.ink, '--th-accent': t.accent, '--th-soft': t.soft,
    '--th-gradient': t.gradient, '--th-mesh': t.mesh, '--th-font': t.font, '--th-line': t.line };
  for (const [k, v] of Object.entries(vars)) v ? page.style.setProperty(k, v) : page.style.removeProperty(k);
  if (project.design) page.dataset.design = project.design;
  else delete page.dataset.design;
  const list = category.projects;
  const next = list[(list.indexOf(project) + 1) % list.length];
  const meta = [
    ['Client', project.client],
    ['Year', project.year],
    ['Services', project.services?.join(', ')],
    ['Location', project.location],
  ].filter(([, v]) => v);
  const linkLabel = /behance\.net/.test(project.link || '') ? 'View on Behance' : 'Visit project';
  page.dataset.slug = project.slug;
  page.setAttribute('aria-labelledby', 'page-project-title');
  page.replaceChildren(
    backLink(hrefOf(category), category.name),
    closeLink(hrefOf(category), category.name),
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
      headArt(project.design, el),
    ]),
    project.hideCover ? '' : el('div', { class: project.whole ? 'proj__cover proj__cover--whole' : 'proj__cover' }, [picture(project.cover, { 'data-hero': true, fetchpriority: 'high' })]),
    el('div', { class: 'proj__modules', style: project.gap ? `--gap:${project.gap}px` : null }, projectModules(project)),
    el('footer', { class: 'proj__foot' }, [
      project.link && el('a', { class: 'proj__link', href: project.link, target: '_blank', rel: 'noopener', text: `${linkLabel} ↗` }),
      list.length > 1 && nextLink(hrefOf(category, next), 'Next project', next.title, next.thumb || next.cover, next.subtitle),
    ])
  );
  page.scrollTop = 0;
  page._motion?.();
  page._motion = startMotion(page, reducedQuery.matches);
}

/* ── Pages ─────────────────────────────────────────────── */
export function createPages({ sound, leaveHome, returnHome }) {
  const lightbox = createLightbox();
  const root = document.documentElement;
  const home = $('#main');
  const menu = $('[data-menu]');
  const categoryPage = $('[data-page="category"]');
  const infoPage = el('section', { class: 'page page--info', 'data-page': 'experience', hidden: true });
  categoryPage.before(infoPage);
  // Contact: copy the email address
  infoPage.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = 'Copied';
    } catch {
      // Older or locked-down browsers: copy through a hidden text field instead
      const field = el('textarea', { readonly: true, style: 'position:fixed;opacity:0' });
      field.value = btn.dataset.copy;
      document.body.append(field);
      field.select();
      btn.textContent = document.execCommand('copy') ? 'Copied' : 'Press Ctrl/Cmd + C';
      field.remove();
    }
    sound.play('click');
    setTimeout(() => (btn.textContent = 'Copy'), 1800);
  });
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
    // Every page opens at its top (a scroll set while it was hidden doesn't stick)
    page.scrollTop = 0;
    fitTitle(page);
    observe(page);
  };
  const hide = (page) => {
    page._io?.disconnect();
    page._wall?.destroy();
    page._wall = null;
    page._motion?.();
    page._motion = null;
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
  // A project name never runs into the details beside it: when it is wider than its
  // column the details drop below, and a name wider than the page is scaled to fit
  const fitTitle = (page) => {
    const head = $('.proj__head', page), title = $('.proj__title', page);
    if (!head || !title || page.hidden) return;
    head.classList.remove('is-stacked');
    title.style.fontSize = '';
    if (title.scrollWidth > title.clientWidth + 1) head.classList.add('is-stacked');
    if (title.scrollWidth > title.clientWidth + 1) {
      title.style.fontSize = `${Math.floor(parseFloat(getComputedStyle(title).fontSize) * title.clientWidth / title.scrollWidth)}px`;
    }
  };
  const refit = () => fitTitle(projectPage);
  window.addEventListener('resize', refit);
  document.fonts?.ready.then(refit);
  const focusTitle = (page) => $('h1', page)?.focus({ preventScroll: true });

  /* Category bar: every category, over the category pages.
     One bar for all of them, so its marker can glide from the old category to the new one. */
  // Short names, in the bar's own order
  const NAV = [
    ['branding', 'Branding'], ['poster-design', 'Posters'], ['package-design', 'Package'],
    ['brochure-design', 'Brochure'], ['motion-design', 'Motion'], ['video', 'Video'], ['iconography', 'Iconography'],
  ].filter(([slug]) => categories.some((c) => c.slug === slug));
  const navOrder = (c) => NAV.findIndex(([slug]) => slug === c.slug);
  const mark = el('span', { class: 'cat-nav__mark', 'aria-hidden': 'true' });
  const nav = el('nav', { class: 'cat-nav', 'aria-label': 'Work categories' }, [
    el('ul', {}, [
      ...NAV.map(([slug, label]) => el('li', {}, [el('a', { href: `work/${slug}`, 'data-route': true, 'data-nav': slug, text: label })])),
    ]),
    mark,
  ]);
  nav.inert = true;
  categoryPage.before(nav);
  /* The dark pill flows to the new tab: its leading edge sets off first and its trailing
     edge catches up, so it stretches across the gap and settles into the new tab's shape. */
  let markAt = null, markAnim = null;
  const MARK_MS = 760;
  const lead = (t) => 1 - Math.pow(1 - t, 4);
  const trail = (t) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2);
  const markFrame = (x, w) => ({ transform: `translate3d(${x}px, 0, 0)`, width: `${w}px` });
  const placeMark = (x, w, glide) => {
    let from = markAt;
    if (markAnim) {
      // Interrupted mid-flow: start again from wherever the pill is right now
      const cs = getComputedStyle(mark);
      from = { x: new DOMMatrixReadOnly(cs.transform).m41, w: parseFloat(cs.width) };
      markAnim.cancel();
      markAnim = null;
    }
    Object.assign(mark.style, markFrame(x, w));
    markAt = { x, w };
    if (!glide || !from || (Math.abs(from.x - x) < 0.5 && Math.abs(from.w - w) < 0.5)) return;
    const L0 = from.x, R0 = from.x + from.w, L1 = x, R1 = x + w;
    const right = L1 > L0;
    const frames = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const L = L0 + (L1 - L0) * (right ? trail(t) : lead(t));
      const R = R0 + (R1 - R0) * (right ? lead(t) : trail(t));
      frames.push({ ...markFrame(L, Math.max(0, R - L)), offset: t });
    }
    markAnim = mark.animate(frames, { duration: MARK_MS, easing: 'linear' });
    markAnim.finished.then(() => (markAnim = null), () => {});
  };
  const setNav = (at, glide = false) => {
    const on = at.depth === 1 && !!at.category;
    nav.classList.toggle('is-on', on);
    nav.inert = !on;
    if (!on) return;
    nav.dataset.cat = at.category.slug; // lets a category give the bar its own text colour
    const link = $(`[data-nav="${at.category.slug}"]`, nav);
    $$('a', nav).forEach((a) => (a === link ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    // The links sit inside the padded list, so measure from the bar itself
    placeMark(link.offsetLeft + link.offsetParent.offsetLeft, link.offsetWidth, glide && !reduced());
    // On narrow screens the bar scrolls; keep the current category in view
    nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: glide ? 'smooth' : 'auto' });
  };
  // Label widths change once the typeface arrives and with the window, so measure again
  document.fonts?.ready.then(() => setNav(current));
  window.addEventListener('resize', () => setNav(current));

  /* The shared image: a copy of the source picture that travels from one box to the other.
     `clip` hides the bottom of a box (the tiles show only part of their height).
     When the two ends show different pictures (a thumbnail and its project's cover),
     `toSrc` fades in over the journey. */
  async function morph({ src, toSrc, from, to, fromClip = 0, toClip = 0, fromTransform = 'none', toTransform = 'none', position, duration, onReveal }) {
    const img = el('img', { src, alt: '' });
    img.style.objectPosition = position;
    const next = toSrc && toSrc !== src ? el('img', { src: toSrc, alt: '' }) : null;
    if (next) Object.assign(next.style, { objectPosition: position, opacity: 0 });
    const frame = (r, clip) => ({
      transform: `translate3d(${r.left}px, ${r.top}px, 0)`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      clipPath: `inset(0 0 ${Math.max(0, clip)}px 0)`,
    });
    const box = el('div', { class: 'morph' }, [img, next]);
    Object.assign(box.style, frame(from, fromClip)); // already in place while the picture decodes
    morphLayer.append(box);
    await Promise.all([img, next].filter(Boolean).map((i) => i.decode().catch(() => {})));
    const timing = { duration, easing: MOTION.ease, fill: 'both' };
    const anim = box.animate([frame(from, fromClip), frame(to, toClip)], timing);
    img.animate([{ transform: fromTransform }, { transform: toTransform }], timing);
    next?.animate([{ opacity: 0, offset: 0 }, { opacity: 0, offset: 0.25 }, { opacity: 1, offset: 0.8 }, { opacity: 1 }], { ...timing, easing: 'linear' });
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

  /* The shutter: a full-screen picture of the category, cut into vertical strips that
     lift away one after another (or fall back into place on the way out). Each strip
     holds the whole picture shifted into line, so together they read as one image. */
  const shutterCount = () => (innerWidth < 700 ? 4 : innerWidth < 1200 ? 6 : 8);
  const shutterName = (category) => el('div', { class: 'shutter__name' }, [
    el('span', { class: 'shutter__count', text: countLabel(category.projects.length) }),
    el('span', { class: 'shutter__title' }, [el('span', { text: category.name })]),
  ]);
  function shutter(src, category) {
    const w = morphLayer.clientWidth, n = shutterCount();
    const strips = Array.from({ length: n }, (_, i) => {
      const face = el('div', { class: 'shutter__face', style: `width:${w}px; left:${(-i * w) / n}px` }, [
        el('img', { src, alt: '' }), // no category name over the picture
      ]);
      return el('div', { class: 'shutter__strip', style: `left:${(i * 100) / n}%; width:calc(${100 / n}% + 1px)` }, [face]);
    });
    const layer = el('div', { class: 'shutter' }, strips);
    morphLayer.append(layer);
    return { layer, strips };
  }
  // Lift the strips away (open) or drop them back over the screen (close)
  async function runShutter({ strips }, opening) {
    const n = strips.length, step = 70, duration = 950;
    const up = 'translate3d(0, -101%, 0)', drift = 'translate3d(0, 55%, 0)';
    const anims = strips.flatMap((strip, i) => {
      const timing = { duration, delay: (opening ? i : n - 1 - i) * step, easing: MOTION.ease, fill: 'both' };
      const there = opening ? [{ transform: 'none' }, { transform: up }] : [{ transform: up }, { transform: 'none' }];
      const inner = opening ? [{ transform: 'none' }, { transform: drift }] : [{ transform: drift }, { transform: 'none' }];
      return [strip.animate(there, timing), strip.firstChild.animate(inner, timing)];
    });
    await Promise.all(anims.map((a) => a.finished.catch(() => {})));
  }
  const fullScreen = () => ({ left: 0, top: 0, width: morphLayer.clientWidth, height: morphLayer.clientHeight });
  const decoded = (root) => Promise.all($$('img', root).map((i) => i.decode().catch(() => {})));

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
      const src = t.img.currentSrc || t.img.src;
      tile.classList.add('is-source');
      // 1. The tile opens out to fill the screen, the category's name rising over it
      const over = el('div', { class: 'shutter__over' }); // left empty: no category name in the transition
      const showName = setTimeout(() => morphLayer.append(over), MOTION.grow * 0.45);
      const box = await morph({
        src, from: t.rect, fromClip: t.clip, fromTransform: t.transform,
        to: fullScreen(), position: '50% 35%', duration: MOTION.grow,
      });
      clearTimeout(showName);
      // 2. The picture is swapped for the same picture cut into strips, with the page set beneath
      const cut = shutter(src, category);
      await decoded(cut.layer);
      box.remove();
      over.remove();
      categoryPage.classList.remove('is-before');
      await wait(260);
      // 3. The strips lift away one by one, uncovering the page
      await runShutter(cut, true);
      cut.layer.remove();
    } else {
      categoryPage.classList.remove('is-before');
      await nextFrame();
      await wait(MOTION.fade);
    }
    focusTitle(categoryPage);
  }

  async function closeCategory(category) {
    const tile = homeTile?.isConnected && inView(homeTile) ? homeTile : findTile(category.slug);
    if (tile && !reduced()) {
      // A curtain wipe: the page is drawn up and away from the bottom edge, its content lifting
      // a little faster than the edge (parallax), uncovering the homepage as it settles up into place
      sound.play('menuOpen');
      setAway(false);
      categoryPage.inert = true;
      const ease = 'cubic-bezier(0.76, 0, 0.24, 1)';
      const iris = categoryPage.animate([
        { clipPath: 'inset(0 0 0 0)', transform: 'none' },
        { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(-12%)' },
      ], { duration: 1050, easing: ease, fill: 'forwards' });
      $$('.hero, .surface', home).forEach((n) => n.animate([
        { transform: 'translateY(16vh)' },
        { transform: 'none' },
      ], { duration: 1050, easing: ease, fill: 'backwards' }));
      await iris.finished.catch(() => {});
      hide(categoryPage);
      iris.cancel();
    } else {
      setAway(false);
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
    // A project without a cover picture (hideCover) simply fades in
    if (thumb && $('[data-hero]', projectPage) && !reduced()) {
      const img = $('img', thumb);
      thumb.classList.add('is-source');
      projectPage.classList.add('is-morphing');
      const box = await morph({
        src: img.currentSrc || img.src,
        toSrc: $('[data-hero]', projectPage).currentSrc || srcFor($('[data-hero]', projectPage)),
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
    lightbox.close();
    if (thumb && $('[data-hero]', projectPage) && !reduced()) {
      // Bring the thumbnail into view first; the project page still covers this scroll
      const r = $('.thumb__media', thumb).getBoundingClientRect();
      if (r.top < 0 || r.bottom > innerHeight) categoryPage.scrollTop += r.top - (innerHeight - r.height) / 2;
      const img = $('img', thumb);
      thumb.classList.add('is-source');
      projectPage.classList.add('is-after', 'is-morphing');
      const hero = $('[data-hero]', projectPage);
      const box = await morph({
        src: hero.currentSrc || hero.src,
        toSrc: img.currentSrc || img.src,
        from: hero.getBoundingClientRect(),
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

  // One category to another: the new page wipes across in the direction of travel,
  // its banner gliding in against the motion while the old page slides away beneath
  async function switchCategory(from, to) {
    if (reduced()) return swap(current);
    const dir = navOrder(to) > navOrder(from) ? 1 : -1;
    const ghost = categoryPage.cloneNode(true);
    ghost.removeAttribute('data-page');
    $$('[id]', ghost).forEach((n) => n.removeAttribute('id'));
    ghost.setAttribute('aria-hidden', 'true');
    ghost.inert = true;
    categoryPage.before(ghost);
    ghost.scrollTop = categoryPage.scrollTop;
    renderCategory(categoryPage, to);
    show(categoryPage, 'is-entering');
    sound.play('menuOpen');
    const timing = { duration: MOTION.switch, easing: MOTION.ease };
    const wipe = categoryPage.animate([
      { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0 0 0)' },
    ], timing);
    $('[data-hero]', categoryPage).animate([
      { transform: `translate3d(${dir * 18}%, 0, 0) scale(1.15)` },
      { transform: 'none' },
    ], timing);
    ghost.animate([
      { transform: 'none', opacity: 1 },
      { transform: `translate3d(${-dir * 30}%, 0, 0)`, opacity: 0.35 },
    ], { ...timing, fill: 'forwards' });
    setTimeout(() => categoryPage.classList.remove('is-entering'), MOTION.switch * MOTION.reveal);
    await wipe.finished.catch(() => {});
    ghost.remove();
    focusTitle(categoryPage);
  }

  // Any other change (next project, deep links, skipping levels): a soft fade
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

  // Experience and Contact: rise over the screen like a curtain, and drop away again
  async function switchInfo(prev, next) {
    const timing = { duration: MOTION.switch, easing: MOTION.ease };
    if (next.info) {
      const open = [projectPage, categoryPage].filter((p) => !p.hidden);
      setAway(true);
      renderInfo(infoPage, next.info);
      show(infoPage, 'is-entering');
      sound.play('menuOpen');
      if (!reduced()) {
        const rise = infoPage.animate([{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], timing);
        // The page's own header (whichever layout is showing) rises a little further
        $('header', infoPage)?.animate([{ transform: 'translate3d(0, 14vh, 0)' }, { transform: 'none' }], timing);
        setTimeout(() => infoPage.classList.remove('is-entering'), MOTION.switch * MOTION.reveal);
        await rise.finished.catch(() => {});
      } else {
        infoPage.classList.remove('is-entering');
        await wait(MOTION.fade);
      }
      open.forEach(hide);
      $$('.card.is-source').forEach((c) => c.classList.remove('is-source'));
      homeTile = null;
      return focusTitle(infoPage);
    }
    if (next.depth === 0) setAway(false);
    if (!reduced()) {
      infoPage.classList.add('is-after');
      await infoPage.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(100% 0 0 0)' }], timing).finished.catch(() => {});
    } else {
      await fadeOut(infoPage);
    }
    hide(infoPage);
    if (next.depth === 0) return returnHome();
    return swap(next);
  }

  const titleFor = (at) =>
    at.info ? `${INFO_TITLES[at.info]} — ${siteName}`
      : at.project ? `${at.project.title} — ${at.category.name} — ${siteName}`
      : at.category ? `${at.category.name} — ${siteName}` : homeTitle;

  function transition(next, source) {
    const prev = current;
    current = next;
    document.title = titleFor(next);
    setNav(next, prev.depth === 1);
    if (prev.info || next.info) return switchInfo(prev, next);
    const same = prev.category === next.category;
    if (prev.depth === 0 && next.depth === 1) return openCategory(next.category, source);
    if (prev.depth === 1 && next.depth === 0) return closeCategory(prev.category);
    if (same && prev.depth === 1 && next.depth === 2) return openProject(next.category, next.project, source);
    if (same && prev.depth === 2 && next.depth === 1) return closeProject(prev.project);
    if (prev.depth === 1 && next.depth === 1) return switchCategory(prev.category, next.category);
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
    $('.page__back', current.info ? infoPage : current.depth === 2 ? projectPage : categoryPage)?.click();
  });

  /* ── First visit ──────────────────────────────────────── */
  history.scrollRestoration = 'manual';
  const first = resolve(location.pathname);
  const canonical = pathOf(first.info || hrefOf(first.category, first.project));
  if (canonical !== location.pathname) history.replaceState(history.state, '', canonical);
  if (first.info) {
    current = first;
    setAway(true, true);
    renderInfo(infoPage, first.info);
    show(infoPage);
    document.title = titleFor(first);
    focusTitle(infoPage);
  } else if (first.depth) {
    // Arriving on a page directly: no growth to show, so it's simply there
    current = first;
    setNav(first);
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
