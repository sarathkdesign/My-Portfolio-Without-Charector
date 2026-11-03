import { content } from './content.js';
import { createSurface } from './surface.js';
import { categories } from './work/index.js';
import { createPages, countLabel } from './pages.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
let reduced = reducedQuery.matches;
// Registered first so every other listener sees the new value
reducedQuery.addEventListener('change', (e) => (reduced = e.matches));

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') node.textContent = v;
    else if (k === 'style') node.style.cssText = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
};

/* ── Content binding ───────────────────────────────────── */
function bindContent() {
  document.title = `${content.name} — ${content.role}`;
  $('meta[name="description"]').content = `Portfolio of ${content.name}, ${content.role}.`;

  $$('[data-content]').forEach((node) => {
    const value = content[node.dataset.content];
    if (typeof value === 'string') node.textContent = value;
  });
  $$('[data-scramble-source]').forEach((node) => {
    node.textContent = content[node.dataset.scrambleSource];
  });
  $$('[data-year]').forEach((node) => (node.textContent = new Date().getFullYear()));
  $$('[data-email-link]').forEach((a) => (a.href = `mailto:${content.email}`));

  $$('[data-socials]').forEach((list) => {
    list.replaceChildren(
      ...content.socials.map((s) =>
        el('li', {}, [el('a', { href: s.url, target: '_blank', rel: 'noopener', text: s.label })])
      )
    );
  });
}

/* ── Tile markup ───────────────────────────────────────── */
// One tile per category; each opens that category's page (see js/pages.js)
function buildTiles() {
  $('[data-strip-set]').replaceChildren(
    ...categories.map((c) =>
      el('li', { class: 'strip__item' }, [
        el('a', { class: 'card', href: `work/${c.slug}`, 'data-route': '', 'data-category': c.slug, draggable: 'false' }, [
          el('span', { class: 'card__media' }, [
            el('img', { src: c.cover.src, alt: c.cover.alt, draggable: 'false', decoding: 'async' }),
            el('span', { class: 'card__cue', 'aria-hidden': 'true', text: 'Explore' }),
          ]),
          el('span', { class: 'card__label' }, [
            el('span', { class: 'card__title' }, [
              el('span', { class: 'sr-only', text: c.name }),
              el('span', { 'aria-hidden': 'true', 'data-scramble': '', text: c.name }),
            ]),
            el('span', { class: 'card__meta', text: countLabel(c.projects.length) }),
          ]),
        ]),
      ])
    )
  );
}

/* ── Text scramble ─────────────────────────────────────── */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(node, duration = 560) {
  cancelAnimationFrame(node._scramble);
  const text = node.dataset.text ?? (node.dataset.text = node.textContent);
  if (reduced) return void (node.textContent = text);
  const start = performance.now();
  const frame = (now) => {
    // The first frame's timestamp can predate `start` (it marks the frame's beginning,
    // not the event); a negative p would build a string longer than the text and rewrap the layout
    const p = Math.max(0, Math.min(1, (now - start) / duration));
    const settled = Math.floor(p * text.length);
    let out = text.slice(0, settled);
    for (let i = settled; i < text.length; i++) {
      out += /\s/.test(text[i]) ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    node.textContent = out;
    if (p < 1) node._scramble = requestAnimationFrame(frame);
  };
  node._scramble = requestAnimationFrame(frame);
}

/* ── Wordmark: split into characters and fit to its column ─ */
function setupWordmark() {
  const host = $('[data-wordmark]');
  const text = $('[data-wordmark-text]');
  const words = content.name.trim().split(/\s+/);
  let i = 0;
  const char = (ch) => el('span', { class: 'wordmark__char', style: `--i:${i++}` }, [el('span', { text: ch })]);
  text.replaceChildren(
    ...words.flatMap((word, w) => [
      ...(w ? [el('span', { class: 'wordmark__space', text: ' ' })] : []),
      el('span', { class: 'wordmark__word' }, [...word].map(char)),
    ])
  );

  // Fit the name to its column: one line, or one word per line when that is bigger
  const LINE = 0.8; // line-height
  const PAD = 0.05; // padding-top, in em
  const intro = host.parentElement;
  const fit = () => {
    const available = host.clientWidth;
    // Keep the whole opening within one screen: the name takes whatever height is left
    const stackedCopy = window.innerWidth <= 1024; // copy sits under the name
    const cs = getComputedStyle(intro);
    const copy = $('.hero__copy');
    let room = window.innerHeight - $('[data-strip]').offsetHeight - $('.bar').offsetHeight
      - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - parseFloat(cs.marginTop);
    if (stackedCopy) room -= copy.offsetHeight + parseFloat(cs.rowGap);
    const maxHeight = Math.max(window.innerHeight * 0.12, Math.min(window.innerHeight * 0.28, room));
    const sizeFor = (lines) => Math.min((100 * available) / text.scrollWidth, maxHeight / (lines * LINE + PAD));
    host.style.fontSize = '100px';
    host.classList.remove('is-stacked');
    const single = sizeFor(1);
    host.classList.add('is-stacked');
    const stacked = sizeFor(words.length);
    const useStack = words.length > 1 && stacked > single * 1.15;
    host.classList.toggle('is-stacked', useStack);
    host.style.fontSize = `${Math.floor(useStack ? stacked : single)}px`;
    alignRole();

    // Single screen by design; only if the content truly cannot fit, let the page scroll
    const root = document.documentElement;
    root.classList.remove('is-overflowing');
    // Layout position, not painted position, so the footer's slide-in doesn't count
    const bar = $('.bar');
    root.classList.toggle('is-overflowing', bar.offsetTop + bar.offsetHeight > window.innerHeight + 1);
  };
  window.addEventListener('resize', fit);
  fit();
  new ResizeObserver(fit).observe(host.parentElement);
  document.fonts?.ready.then(fit);
}

/* ── Role line on the name's cap height ─────────────────── */
// Desktop only: shifts the role line so the top of its capitals sits level with the
// top of the name's capitals. Uses the fonts' own metrics, so it holds at any size.
const metrics = document.createElement('canvas').getContext('2d');
function capTop(box, fontSource) {
  const cs = getComputedStyle(fontSource);
  metrics.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const m = metrics.measureText('H');
  const ascent = m.fontBoundingBoxAscent, descent = m.fontBoundingBoxDescent;
  // Layout position (ignores the opening slide-in transforms)
  let top = 0;
  for (let n = box; n; n = n.offsetParent) top += n.offsetTop;
  const baseline = top + (parseFloat(cs.lineHeight) - ascent - descent) / 2 + ascent;
  return baseline - m.actualBoundingBoxAscent;
}
function alignRole() {
  const copy = $('.hero__copy');
  if (window.innerWidth <= 1024) return copy.style.removeProperty('--role-shift');
  const eyebrow = $('.eyebrow');
  const current = parseFloat(copy.style.getPropertyValue('--role-shift')) || 0;
  const shift = current + capTop($('[data-wordmark-text]'), $('.wordmark')) - capTop(eyebrow, eyebrow);
  copy.style.setProperty('--role-shift', `${Math.max(0, shift).toFixed(1)}px`);
}

/* ── Sound ─────────────────────────────────────────────── */
// Modelled on the reference site's palette: four soft hover blips picked at random (never
// the same one twice running), a low click, a swelling menu-open, a crackle for scrambled
// text, and six rising steps while the visitor scrolls or drags the tiles.
// Everything is synthesised here, and nothing plays until the visitor turns sound on.
const sound = (() => {
  const MASTER = 0.6;
  const HOVER_PITCHES = [330, 660, 845, 1050];
  const STEP_PITCHES = [65, 86, 108, 140, 194, 248];
  let on = false, ctx = null, master = null, noise = null, ambient = null, idle = 0, lastHover = -1;
  const btn = $('[data-sound]');
  const label = $('[data-sound-label]');

  const ready = () => on && ctx && ctx.state === 'running';
  // Let the audio device sleep after 30 s of silence; any interaction wakes it again
  const rest = () => {
    clearTimeout(idle);
    idle = setTimeout(() => ctx?.state === 'running' && ctx.suspend(), 30000);
  };
  const wake = () => { if (on && ctx && ctx.state === 'suspended' && !document.hidden) ctx.resume(); };
  ['pointerdown', 'pointermove', 'keydown'].forEach((type) => window.addEventListener(type, wake, { capture: true, passive: true }));
  document.addEventListener('visibilitychange', () => (document.hidden ? ctx?.suspend() : wake()));

  const envelope = (t, peak, attack, decay) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    g.connect(master);
    return g;
  };
  const tone = (t, { freq, to, type = 'sine', peak, attack, decay }) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + attack + decay);
    osc.connect(envelope(t, peak, attack, decay));
    osc.start(t);
    osc.stop(t + attack + decay + 0.02);
  };
  const hiss = (t, { filter = 'bandpass', freq, to, q = 1, peak, attack, decay }) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.Q.value = q;
    f.frequency.setValueAtTime(freq, t);
    if (to) f.frequency.exponentialRampToValueAtTime(to, t + attack);
    src.connect(f).connect(envelope(t, peak, attack, decay));
    src.start(t, Math.random() * 0.5);
    src.stop(t + attack + decay + 0.02);
  };

  const voices = {
    // A short, soft pitched blip
    hover: (t, i) => {
      const f = HOVER_PITCHES[i];
      tone(t, { freq: f, peak: 0.07, attack: 0.006, decay: 0.04 });
      tone(t, { freq: f * 1.53, peak: 0.018, attack: 0.004, decay: 0.025 });
      hiss(t, { freq: f * 3, q: 4, peak: 0.008, attack: 0.002, decay: 0.012 });
    },
    // Low thump with a bright tick on top
    click: (t) => {
      tone(t, { freq: 72, to: 48, peak: 0.24, attack: 0.003, decay: 0.14 });
      tone(t, { freq: 754, type: 'triangle', peak: 0.06, attack: 0.002, decay: 0.035 });
      hiss(t, { freq: 1800, q: 0.8, peak: 0.05, attack: 0.001, decay: 0.02 });
    },
    // A swell that builds for ~0.4 s, then lands
    menuOpen: (t) => {
      hiss(t, { filter: 'lowpass', freq: 220, to: 1100, q: 0.7, peak: 0.09, attack: 0.38, decay: 0.08 });
      tone(t, { freq: 112, to: 124, peak: 0.16, attack: 0.38, decay: 0.09 });
      tone(t, { freq: 236, peak: 0.04, attack: 0.38, decay: 0.06 });
    },
    // A crackle of tiny high grains, like letters flicking over
    scramble: (t) => {
      for (let g = 0; g < 7; g++) {
        hiss(t + g * 0.012, { filter: 'highpass', freq: 2400 + Math.random() * 1600, q: 0.7, peak: 0.18 * (1 - g / 8), attack: 0.002, decay: 0.008 });
      }
    },
    // Soft plucks that climb and brighten with each step
    step: (t, n) => {
      const f = STEP_PITCHES[n], bright = n / (STEP_PITCHES.length - 1);
      tone(t, { freq: f, peak: 0.09, attack: 0.015, decay: 0.09 });
      tone(t, { freq: f * 2, type: 'triangle', peak: 0.03 + 0.02 * bright, attack: 0.012, decay: 0.07 });
      tone(t, { freq: f * 3.5, peak: 0.01 + 0.025 * bright, attack: 0.01, decay: 0.05 });
      hiss(t, { freq: 1000 + 1500 * bright, q: 2, peak: 0.01 + 0.02 * bright, attack: 0.002, decay: 0.015 });
    },
  };

  const play = (name, arg) => {
    if (!ready()) return;
    voices[name](ctx.currentTime + 0.005, arg);
    rest();
  };
  const hover = () => {
    if (!hoverQuery.matches) return;
    let i;
    do i = (Math.random() * HOVER_PITCHES.length) | 0; while (i === lastHover);
    lastHover = i;
    play('hover', i);
  };
  const step = (n) => play('step', Math.min(n, STEP_PITCHES.length - 1));

  const set = (next) => {
    on = next;
    btn.setAttribute('aria-pressed', String(on));
    label.textContent = on ? 'On' : 'Off';
    if (on) {
      // Created only after the visitor asks for sound
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!ctx) {
        ctx = new Ctx({ latencyHint: 'interactive' });
        master = ctx.createGain();
        master.connect(ctx.destination);
        noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        const data = noise.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      }
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(MASTER, ctx.currentTime);
      ctx.resume().then(() => play('click'));
      if (content.sound.ambientSrc) {
        ambient ??= Object.assign(new Audio(content.sound.ambientSrc), { loop: true, volume: 0.35 });
        ambient.play().catch(() => {});
      }
    } else {
      ambient?.pause();
      if (!ctx) return;
      // Quick fade rather than a hard cut, then let the device sleep
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 0.015);
      clearTimeout(idle);
      setTimeout(() => ctx.suspend(), 55);
    }
  };
  btn.addEventListener('click', () => set(!on));

  // Hover blips for the controls: menu button, sound / motion toggles, footer and menu links
  document.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.target.closest('.menu-btn, .toggle, .socials a, .menu__list a');
    if (el && !el.contains(e.relatedTarget)) hover();
  });

  return { play, hover, step };
})();

/* ── Drifting strip ────────────────────────────────────── */
// Cards drift right → left and shrink as they travel: full height near the right edge,
// stepping down toward the left, so the row reads as a moving staircase.
const stepAt = (t) => Math.max(0.4, Math.min(1, 0.65 + 0.35 * t)); // t = card centre across the screen, 0–1
const STATIC_STEP = 0.8; // reduced motion: one calm height for every card

function setupStrip() {
  const root = $('[data-strip]');
  const track = $('[data-strip-track]');
  const set = $('[data-strip-set]');
  const motionBtn = $('[data-motion]');
  const motionLabel = $('[data-motion-label]');

  const state = {
    x: 0, v: 0, impulse: 0, W: 1, travel: 0, velocity: 0,
    hovering: false, restingSince: 0, lastPointer: null, focusX: null, userPaused: false, visible: true, held: false,
    drag: null, suppressClick: false, raf: 0, last: 0,
    wheel: 0, wheelAt: -1e9,
    step: 0, stepIndex: null, stepAt: 0,
  };
  let clones = [];
  let items = [];

  const baseSpeed = () => Math.max(20, window.innerWidth * 0.043); // px per second, leftward

  const measure = () => {
    clones.forEach((c) => c.remove());
    clones = [];
    state.W = set.scrollWidth;
    // One copy before the real set and enough after it to always fill the screen,
    // so the focusable originals can be brought into view from either side
    const after = Math.max(1, Math.ceil(window.innerWidth / state.W) + 1);
    for (let i = 0; i <= after; i++) {
      const c = set.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.removeAttribute('data-strip-set'); // only the real set answers to this hook
      $$('.card', c).forEach((a) => a.setAttribute('tabindex', '-1'));
      i ? track.append(c) : track.prepend(c);
      clones.push(c);
    }
    items = $$('.strip__item', track).map((node) => ({
      node,
      img: $('img', node),
      left: node.offsetLeft,
      width: node.offsetWidth,
      f: -1,
    }));
  };

  const render = () => {
    track.style.transform = `translate3d(${state.x.toFixed(2)}px,0,0)`;
    const vw = window.innerWidth;
    for (const it of items) {
      const center = it.left + state.x + it.width / 2;
      if (center < -it.width || center > vw + it.width) continue;
      const f = stepAt(center / vw);
      if (Math.abs(f - it.f) > 0.0005) {
        it.f = f;
        it.node.style.setProperty('--f', f.toFixed(4));
      }
      // Gentle in-frame parallax: images slide slightly against the drift
      it.img.style.setProperty('--px', `${(((center - vw / 2) / vw) * -4).toFixed(2)}%`);
    }
  };

  // Keep x in (-2W, -W]: the leading copy fills the left edge while the originals sit just after it
  const wrap = () => {
    while (state.x <= -2 * state.W) state.x += state.W;
    while (state.x > -state.W) state.x -= state.W;
  };

  const tick = (now) => {
    const dt = Math.min(0.05, (now - state.last) / 1000 || 0);
    state.last = now;
    if (!state.drag) {
      if (state.focusX !== null) {
        const step = (state.focusX - state.x) * Math.min(1, dt * 5);
        state.x += step;
        state.travel += step;
        state.v = 0;
      } else {
        // While the wheel is in use the drift eases out; afterwards it eases back in
        const wheeling = now - state.wheelAt < 200;
        const target = state.userPaused || wheeling ? 0
          // Resting the cursor on a tile (not sweeping across) eases the band down so it can be read
          : state.hovering && now - state.restingSince > 200 ? -baseSpeed() * 0.35 : -baseSpeed();
        state.v += (target - state.v) * Math.min(1, dt * (wheeling ? 5 : 1.1));
        // Wheel input is applied gradually so stepped mouse wheels still glide
        const glide = state.wheel * Math.min(1, dt * 10);
        state.wheel -= glide;
        const step = glide + (state.v + state.impulse) * dt;
        state.x += step;
        state.travel += step;
        state.impulse *= Math.pow(0.05, dt);
        if (Math.abs(state.impulse) < 0.5) state.impulse = 0;
        wrap();
      }
    }
    // Real travel speed (drift, wheel, drag) — the surface bends the screen with it
    state.velocity = dt ? state.travel / dt : 0;
    state.travel = 0;
    render();
    // Rising steps each time a new tile passes while the visitor moves the band (not the idle drift)
    const cardWidth = items[0]?.width;
    if (cardWidth) {
      const index = Math.floor(-state.x / cardWidth);
      const steering = state.drag?.moved || now - state.wheelAt < 200 || Math.abs(state.wheel) > 1 || Math.abs(state.impulse) > 40;
      if (index !== state.stepIndex) {
        if (steering && state.stepIndex !== null && now - state.stepAt >= 80) {
          sound.step(state.step++);
          state.stepAt = now;
        }
        state.stepIndex = index;
      }
    }
    state.raf = requestAnimationFrame(tick);
  };

  const start = () => {
    if (state.raf || reduced || state.held || !state.visible || document.hidden) return;
    state.last = performance.now();
    state.raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  };

  // Hover slows the strip so a project can be read
  root.addEventListener('pointerover', (e) => {
    const card = e.target.closest('.card');
    if (!card || e.pointerType !== 'mouse' || card.contains(e.relatedTarget)) return;
    if (!state.hovering) state.restingSince = performance.now();
    state.hovering = true;
    const title = $('[data-scramble]', card);
    if (title) scramble(title, 600);
    scramble($('[data-scramble-source="role"]'), 600);
    sound.hover();
  });
  root.addEventListener('pointerout', (e) => {
    const card = e.target.closest('.card');
    // Moving straight onto the next tile keeps the band steady
    if (card && !card.contains(e.relatedTarget) && !e.relatedTarget?.closest?.('.card')) state.hovering = false;
  });

  // Any real cursor movement (faster than ~250 px/s) restarts the resting timer
  root.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const now = performance.now(), last = state.lastPointer;
    if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) / Math.max(1, now - last.t) > 0.25) state.restingSince = now;
    state.lastPointer = { x: e.clientX, y: e.clientY, t: now };
  });

  // Wheel or trackpad over the tiles moves them sideways and never scrolls the page:
  // down (or swipe left) moves the tiles left, up (or swipe right) moves them right
  root.addEventListener('wheel', (e) => {
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? root.clientWidth : 1;
    const delta = (Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * unit;
    if (reduced) return void (root.scrollLeft += delta);
    if (performance.now() - state.wheelAt > 200) state.step = 0; // a new gesture starts the steps again
    state.wheel -= delta;
    state.wheelAt = performance.now();
    state.impulse = 0;
    state.focusX = null;
  }, { passive: false });

  // Drag with momentum (mouse and touch)
  root.addEventListener('pointerdown', (e) => {
    if (reduced || e.button !== 0) return;
    state.wheel = 0;
    state.step = 0;
    state.drag = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: performance.now(), vel: 0, moved: false };
  });
  root.addEventListener('pointermove', (e) => {
    const d = state.drag;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.lastX;
    const now = performance.now();
    if (!d.moved && Math.abs(e.clientX - d.startX) > 6) {
      d.moved = true;
      root.classList.add('is-dragging');
      try { root.setPointerCapture(e.pointerId); } catch {} // pointer may already be gone
    }
    if (d.moved) {
      state.x += dx;
      state.travel += dx;
      wrap();
      const dtm = Math.max(1, now - d.lastT);
      d.vel = d.vel * 0.6 + (dx / dtm) * 1000 * 0.4;
    }
    d.lastX = e.clientX;
    d.lastT = now;
  });
  const endDrag = (e) => {
    const d = state.drag;
    if (!d || d.id !== e.pointerId) return;
    if (d.moved) {
      state.suppressClick = true;
      state.impulse = Math.max(-2400, Math.min(2400, d.vel)) - state.v;
      root.classList.remove('is-dragging');
    }
    state.drag = null;
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);
  root.addEventListener('click', (e) => {
    if (state.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      state.suppressClick = false;
      return;
    }
    if (!e.target.closest('.card')) return;
    sound.play('click');
    surface?.pulse(e.clientX, e.clientY);
  }, true);

  // Keyboard: glide the focused project to the taller right-hand side and hold it there
  root.addEventListener('focusin', (e) => {
    const card = e.target.closest('.card');
    if (!card || reduced) return;
    const item = card.parentElement;
    wrap();
    const vw = window.innerWidth;
    const right = Math.min(vw * 0.72 + item.offsetWidth / 2, vw - 16);
    const fx = right - item.offsetWidth - item.offsetLeft;
    // Jump by whole sets (visually identical) so the glide to the target stays short
    while (fx - state.x > state.W / 2) state.x += state.W;
    while (state.x - fx > state.W / 2) state.x -= state.W;
    state.focusX = fx;
    const title = $('[data-scramble]', card);
    if (title) scramble(title, 600);
  });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) state.focusX = null;
  });

  // Visible pause control (moving content must be pausable)
  motionBtn.addEventListener('click', () => {
    state.userPaused = !state.userPaused;
    motionBtn.setAttribute('aria-pressed', String(!state.userPaused));
    motionLabel.textContent = state.userPaused ? 'Off' : 'On';
    document.dispatchEvent(new CustomEvent('motionchange'));
    sound.play('click');
  });

  new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting;
    state.visible ? start() : stop();
  }).observe(root);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (reduced) return;
      measure();
      wrap();
      render();
    }, 150);
  });

  const applyMode = () => {
    stop();
    const sep = motionBtn.previousElementSibling;
    if (reduced) {
      clones.forEach((c) => c.remove());
      clones = [];
      items = [];
      state.x = 0;
      track.style.transform = '';
      $$('.strip__item', set).forEach((n) => n.style.setProperty('--f', STATIC_STEP));
      root.classList.add('is-static');
      motionBtn.hidden = sep.hidden = true;
    } else {
      root.classList.remove('is-static');
      motionBtn.hidden = sep.hidden = false;
      measure();
      wrap();
      // Arrive with a glide that settles into the calm drift
      state.impulse = -baseSpeed() * 9;
      render();
      start();
    }
  };

  applyMode();
  reducedQuery.addEventListener('change', applyMode);
  return {
    velocity: () => state.velocity,
    paused: () => state.userPaused,
    // Freeze the band exactly where it is while a page is open, so the way back lands on the same tile
    hold: () => { state.held = true; stop(); state.hovering = false; state.drag = null; },
    release: () => { state.held = false; start(); },
  };
}

/* ── Cursor chip ───────────────────────────────────────── */
function setupChip() {
  const chip = $('[data-chip]');
  const strip = $('[data-strip]');
  let x = -100, y = -100, tx = -100, ty = -100, raf = 0, active = false;

  const loop = () => {
    const k = reduced ? 1 : 0.22;
    x += (tx - x) * k;
    y += (ty - y) * k;
    chip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = active || Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
  };

  strip.addEventListener('pointermove', (e) => {
    if (!hoverQuery.matches || e.pointerType !== 'mouse') return;
    const card = e.target.closest('.card');
    const overCard = !!card && !strip.classList.contains('is-dragging');
    tx = e.clientX + 14;
    ty = e.clientY + 16;
    if (overCard && !active) { x = tx; y = ty; }
    active = overCard;
    chip.classList.toggle('is-on', overCard);
    if (!raf) raf = requestAnimationFrame(loop);
  });
  strip.addEventListener('pointerleave', () => {
    active = false;
    chip.classList.remove('is-on');
  });
}

/* ── Menu ──────────────────────────────────────────────── */
function setupMenu() {
  const btn = $('[data-menu-btn]');
  const menu = $('[data-menu]');
  const label = $('[data-menu-label]');
  const links = $$('[data-menu-link]', menu);
  // Everything behind the menu is taken out of reach while it is open
  const behind = [$('#main'), $('.mark')];
  let closeTimer;

  const open = () => {
    clearTimeout(closeTimer);
    menu.hidden = false;
    menu.classList.remove('is-closing');
    behind.forEach((n) => (n.inert = true));
    btn.setAttribute('aria-expanded', 'true');
    label.textContent = 'Close menu';
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
    links[0].focus({ preventScroll: true });
    sound.play('menuOpen');
  };
  const close = (returnFocus = true) => {
    menu.classList.remove('is-open');
    menu.classList.add('is-closing');
    behind.forEach((n) => (n.inert = false));
    btn.setAttribute('aria-expanded', 'false');
    label.textContent = 'Open menu';
    closeTimer = setTimeout(() => {
      menu.hidden = true;
      menu.classList.remove('is-closing');
    }, reduced ? 0 : 370);
    if (returnFocus) btn.focus({ preventScroll: true });
  };
  const isOpen = () => btn.getAttribute('aria-expanded') === 'true';

  btn.addEventListener('click', () => (isOpen() ? close() : open()));
  $('[data-menu-close]', menu).addEventListener('click', () => close());
  // Work and About point at things on this screen rather than other pages
  links.forEach((a) => a.addEventListener('click', (e) => {
    const action = a.dataset.menuLink;
    sound.play('click');
    if (action !== 'work' && action !== 'about') return close(false);
    e.preventDefault();
    close(false);
    const go = () => {
      if (action === 'work') return $('[data-strip-set] .card').focus({ preventScroll: true });
      $('#about').focus({ preventScroll: true });
      flashRole();
    };
    // From a category or project page, head back to the homepage first
    pages?.depth() ? pages.home().then(go) : go();
  }));

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    // Keep focus inside the menu and its toggle
    const focusables = [...$$('a', menu), btn];
    const i = focusables.indexOf(document.activeElement);
    const next = e.shiftKey ? (i <= 0 ? focusables.length - 1 : i - 1) : (i + 1) % focusables.length;
    e.preventDefault();
    focusables[next].focus();
  });
}

/* ── Eyebrow scramble ──────────────────────────────────── */
function setupEyebrow() {
  const node = $('[data-scramble-source="role"]');
  const eyebrow = node.closest('.eyebrow');
  setTimeout(() => scramble(node, 1000), 700);
  eyebrow.addEventListener('pointerenter', () => scramble(node, 700));
}

// Draws the eye to the introduction when About is chosen from the menu
function flashRole() {
  const eyebrow = $('.eyebrow');
  scramble($('[data-scramble-source="role"]'), 600);
  sound.play('scramble');
  eyebrow.classList.remove('is-flash');
  void eyebrow.offsetWidth;
  eyebrow.classList.add('is-flash');
}

/* ── WebGL surface ─────────────────────────────────────── */
// Paints the opening through the lens / bend / pulse pass for mouse users.
// Keyboard use, touch, reduced motion and paused motion all show the plain page.
let surface = null;
function setupSurface(strip) {
  const canvas = $('[data-surface]');
  let failed = false, keyboard = false, away = false;
  surface = createSurface({ canvas, tileSpeed: strip.velocity, onFail: () => { failed = true; update(); } });
  if (!surface) return null;
  const update = () => {
    const ok = !failed && !reduced && !keyboard && !away && !strip.paused() && hoverQuery.matches;
    ok ? surface.start() : surface.stop();
  };
  window.addEventListener('keydown', (e) => {
    if (['Tab', 'Enter', ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      keyboard = true;
      update();
    }
  });
  window.addEventListener('pointermove', (e) => {
    if (keyboard && e.pointerType === 'mouse' && Math.abs(e.movementX) + Math.abs(e.movementY) > 2) {
      keyboard = false;
      update();
    }
  });
  document.addEventListener('motionchange', update);
  reducedQuery.addEventListener('change', update);
  hoverQuery.addEventListener('change', update);
  document.fonts?.ready.then(update);
  // Off while a category or project page covers the homepage
  return { setAway: (v) => { away = v; update(); } };
}

/* ── Font check ────────────────────────────────────────── */
// Flags the introduction while PP Neue Montreal is missing so the fallback can be weighted to match
function checkFont() {
  const intro = $('.hero__intro');
  intro.classList.add('uses-fallback-font');
  document.fonts?.load('400 16px "PP Neue Montreal"').then((faces) => {
    intro.classList.toggle('uses-fallback-font', !faces.length);
  }).catch(() => {});
}

/* ── Boot ──────────────────────────────────────────────── */
bindContent();
checkFont();
buildTiles();
setupWordmark();
const strip = setupStrip();
setupChip();
setupMenu();
setupEyebrow();
const surfaceCtl = setupSurface(strip);
const pages = createPages({
  sound,
  leaveHome: () => { strip.hold(); surfaceCtl?.setAway(true); },
  returnHome: () => { strip.release(); surfaceCtl?.setAway(false); },
});

requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));
