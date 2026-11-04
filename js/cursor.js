/* The site's cursor: a dot that follows the pointer exactly and a ring that trails it with
   an eased glide. Over anything clickable a faint white glow fills the ring; a click gives it
   a small pulse.
   Mouse and trackpad only — touch devices keep their own behaviour. */

const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

// Anything you can click or open
const HOVER = 'a, button, [role="button"], label, summary, input, textarea, select, [tabindex]:not([tabindex="-1"]), img[data-lightbox], .card, .thumb';

export function createCursor() {
  if (!fine.matches) return;
  const root = document.documentElement;
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  const glow = document.createElement('div'); // a soft light inside the ring, drawn normally (not inverted)
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(glow, ring, dot);
  root.classList.add('has-cursor');

  let x = -100, y = -100, rx = -100, ry = -100, frame = 0, shown = false;
  const tick = () => {
    const ease = reduced.matches ? 1 : 0.18;
    rx += (x - rx) * ease;
    ry += (y - ry) * ease;
    ring.style.transform = glow.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
    frame = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(tick) : 0;
  };
  const state = (target) => {
    const over = !!target.closest?.(HOVER);
    ring.classList.toggle('is-hover', over);
    glow.classList.toggle('is-hover', over);
  };

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (!shown) { shown = true; rx = x; ry = y; root.classList.add('cursor-on'); }
    state(e.target);
    if (!frame) frame = requestAnimationFrame(tick);
  }, { passive: true });
  window.addEventListener('pointerdown', () => ring.classList.add('is-down'));
  window.addEventListener('pointerup', () => ring.classList.remove('is-down'));
  document.addEventListener('pointerleave', () => { shown = false; root.classList.remove('cursor-on'); });
  document.documentElement.addEventListener('mouseleave', () => { shown = false; root.classList.remove('cursor-on'); });
  // Pages change under a still pointer (a click opens a page): refresh what the ring shows
  document.addEventListener('click', () => setTimeout(() => {
    const under = document.elementFromPoint(x, y);
    if (under) state(under);
  }, 700));
}
