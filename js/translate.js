/* Poster translations.
   A poster entry can carry `tr`: a list of [x, y, w, h, text]: a box over a piece of foreign
   text (in % of the poster) and its English meaning. A "Translate" button switches the feature
   on for the whole site; then each box shows a dotted outline, and hovering it (or tapping it on
   a phone) shows the meaning in a tooltip. The same button, now "Translation on ✕", switches it off.
   Turn it on for a project with `translate: '<language>'` in its entry. */

const root = document.documentElement;
const buttons = new Set();
let tip = null;
let shown = null;

export const isOn = () => root.classList.contains('tr-on');

const icon = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('aria-hidden', 'true');
  // two speech marks: A and 文, the usual sign for translation
  svg.innerHTML = '<path d="M2.5 4.5h7M6 2.5v2M8 4.5c-.6 3-2.4 5.3-5 6.6M4.6 7.2c.9 1.7 2.3 3 4 3.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10.5 17.5l3.2-8 3.3 8M11.6 14.8h4.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
  return svg;
};

const sync = (b) => {
  const on = isOn();
  b.setAttribute('aria-pressed', String(on));
  b.classList.toggle('is-on', on);
  b.querySelector('.tr-btn__label').textContent = on ? 'Translation on' : `Translate ${b.dataset.lang}`;
  b.querySelector('.tr-btn__tip').textContent = on
    ? 'Switch the English translations off.'
    : `See what these posters say: switch on, then hover over (or tap) any outlined ${b.dataset.lang} text to read it in English.`;
  b.setAttribute('aria-label', on ? 'Switch translation off' : `Translate the ${b.dataset.lang} text into English`);
};

export function setOn(on) {
  root.classList.toggle('tr-on', on);
  buttons.forEach((b) => (b.isConnected ? sync(b) : buttons.delete(b)));
  if (!on) hide();
}

// The switch: "Translate Malayalam" when off; "Translation on ✕" when on
export function toggleButton(lang = 'Malayalam', cls = '') {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = `tr-btn ${cls}`.trim();
  b.dataset.lang = lang;
  const label = document.createElement('span');
  label.className = 'tr-btn__label';
  const x = document.createElement('span');
  x.className = 'tr-btn__x';
  x.setAttribute('aria-hidden', 'true');
  x.textContent = '×';
  // a short explanation that appears on hover, before anyone clicks
  const tip = document.createElement('span');
  tip.className = 'tr-btn__tip';
  tip.setAttribute('aria-hidden', 'true');
  b.append(icon(), label, x, tip);
  b.addEventListener('click', (e) => { e.stopPropagation(); setOn(!isOn()); });
  buttons.add(b);
  sync(b);
  // the rings that point the switch out play once it is really on screen (not behind the loader or below the fold)
  if (!cls.includes('lb__tr') && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || document.getElementById('loader')) return;
      io.disconnect();
      b.classList.add('is-pinging');
    }, { threshold: 1 });
    io.observe(b);
    // the loader may still cover the page when it first shows: look again once the loader has gone
    const again = setInterval(() => { if (!b.isConnected || b.classList.contains('is-pinging')) return clearInterval(again); if (!document.getElementById('loader')) { clearInterval(again); io.unobserve(b); io.observe(b); } }, 500);
  }
  return b;
}

// The boxes over one poster's foreign text
export function spots(list = []) {
  const layer = document.createElement('div');
  layer.className = 'tr-layer';
  for (const [x, y, w, h, text] of list) {
    const s = document.createElement('button');
    s.type = 'button';
    s.className = 'tr-spot';
    s.style.cssText = `left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
    s.dataset.tip = text;
    s.setAttribute('aria-label', `Translation: ${text}`);
    layer.append(s);
  }
  return layer;
}

function show(spot) {
  if (!isOn()) return;
  tip ??= Object.assign(document.body.appendChild(document.createElement('div')), { className: 'tr-tip', role: 'tooltip' });
  shown = spot;
  tip.textContent = spot.dataset.tip;
  tip.classList.add('is-on');
  const r = spot.getBoundingClientRect();
  const t = tip.getBoundingClientRect();
  const gap = 10;
  let top = r.top - t.height - gap;
  const below = top < 8;
  if (below) top = r.bottom + gap;
  const left = Math.min(window.innerWidth - t.width - 8, Math.max(8, r.left + r.width / 2 - t.width / 2));
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
  tip.classList.toggle('is-below', below);
}

function hide() {
  shown = null;
  tip?.classList.remove('is-on');
}

// One set of listeners for every poster on the site
document.addEventListener('pointerover', (e) => {
  const s = e.target.closest?.('.tr-spot');
  if (s && e.pointerType !== 'touch') show(s);
});
document.addEventListener('pointerout', (e) => {
  const s = e.target.closest?.('.tr-spot');
  if (s && !s.contains(e.relatedTarget)) hide();
});
// a tap (or click) on a box shows its meaning and does not open the poster
document.addEventListener('click', (e) => {
  const s = e.target.closest?.('.tr-spot');
  if (!s) { if (shown) hide(); return; }
  e.preventDefault();
  e.stopPropagation();
  show(s); // a tap elsewhere hides it again
}, true);
document.addEventListener('focusin', (e) => { const s = e.target.closest?.('.tr-spot'); if (s) show(s); });
document.addEventListener('focusout', (e) => { if (e.target.closest?.('.tr-spot')) hide(); });
window.addEventListener('scroll', hide, { capture: true, passive: true });
window.addEventListener('resize', hide);
