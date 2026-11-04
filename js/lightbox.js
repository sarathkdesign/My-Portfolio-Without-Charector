/* Poster viewer: click a poster (any image marked data-lightbox) and it opens on its own,
   as large as the screen allows. Arrows / ← → step through the other posters on the page;
   ×, Esc or a click on the dark surround closes it. */

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
};
const icon = (d) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  return svg;
};

export function createLightbox() {
  const img = el('img', { class: 'lb__img', alt: '' });
  const caption = el('p', { class: 'lb__caption' });
  const count = el('span', { class: 'lb__count' });
  const close = el('button', { class: 'lb__btn lb__close', type: 'button', 'aria-label': 'Close poster' }, [icon('M3.5 3.5l9 9m0-9l-9 9')]);
  const prev = el('button', { class: 'lb__btn lb__prev', type: 'button', 'aria-label': 'Previous poster' }, [icon('M10 3L5 8l5 5')]);
  const next = el('button', { class: 'lb__btn lb__next', type: 'button', 'aria-label': 'Next poster' }, [icon('M6 3l5 5-5 5')]);
  const box = el('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Poster', hidden: '' }, [
    el('figure', { class: 'lb__stage' }, [img, el('figcaption', {}, [count, caption])]), prev, next, close,
  ]);
  document.body.append(box);

  let list = [], at = 0, opener = null;
  const isOpen = () => !box.hidden;
  const render = (dir = 0) => {
    const item = list[at];
    img.classList.remove('is-in');
    img.style.setProperty('--from', `${dir * 40}px`);
    img.src = item.dataset.full || item.currentSrc || item.src;
    img.alt = item.alt || '';
    caption.textContent = item.dataset.title || item.alt || '';
    count.textContent = list.length > 1 ? `${at + 1} / ${list.length}` : '';
    prev.hidden = next.hidden = list.length < 2;
    const show = () => requestAnimationFrame(() => img.classList.add('is-in'));
    img.complete ? show() : img.addEventListener('load', show, { once: true });
  };
  const open = (target) => {
    const page = target.closest('.page') || document;
    list = [...page.querySelectorAll('img[data-lightbox]')];
    at = Math.max(0, list.indexOf(target));
    opener = target;
    box.hidden = false;
    document.documentElement.classList.add('has-lightbox');
    requestAnimationFrame(() => box.classList.add('is-open'));
    render();
    close.focus({ preventScroll: true });
  };
  const shut = () => {
    if (!isOpen()) return;
    box.classList.remove('is-open');
    document.documentElement.classList.remove('has-lightbox');
    setTimeout(() => { box.hidden = true; img.removeAttribute('src'); }, 350);
    opener?.closest('figure, a, [tabindex]')?.focus?.({ preventScroll: true });
  };
  const step = (d) => { if (list.length > 1) { at = (at + d + list.length) % list.length; render(d); } };

  document.addEventListener('click', (e) => {
    const target = e.target.closest('img[data-lightbox]');
    if (target && !isOpen()) { e.preventDefault(); open(target); }
  });
  // Posters can be opened from the keyboard too
  document.addEventListener('keydown', (e) => {
    if (!isOpen() && (e.key === 'Enter' || e.key === ' ')) {
      const target = document.activeElement?.querySelector?.('img[data-lightbox]');
      if (target) { e.preventDefault(); open(target); }
    }
  });
  close.addEventListener('click', shut);
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  box.addEventListener('click', (e) => { if (e.target === box || e.target.classList.contains('lb__stage')) shut(); });
  // While open, the viewer owns the keyboard (so Esc closes it instead of leaving the page)
  window.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') shut();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);

  return { close: shut, isOpen };
}
