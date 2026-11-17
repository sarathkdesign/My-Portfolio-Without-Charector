/* ─────────────────────────────────────────────────────────────
   Case-study designs: each branding project can name a `design`, and its
   modules are laid out in that design's own composition, in the colours,
   type and mood of the brand (`theme`). Motion (parallax, scroll zoom,
   a sideways filmstrip, stacking cards) is switched on per element with
   data attributes and driven by the page's own scroll.
   ───────────────────────────────────────────────────────────── */

import { toggleButton, spots } from './translate.js';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const pad = (n) => String(n).padStart(2, '0');
// Sideways poster rows: how much further an up/down wheel moves them, how far the mouse must
// travel before a press becomes a drag, and how far a flung row carries on (ms of its speed)
const WHEEL_BOOST = 2.2;
const HS_RATE = 2.2; // a pinned poster row slides this many px per px of page scroll
const DRAG_START = 6;
const DRAG_THROW = 260;
const DRAG_MAX_SPEED = 4; // px per ms
const tall = (m) => m.w && m.h / m.w > 1.25;

// Splits a project's modules into chapters: an optional text, then the pictures after it.
// The closing "Credits" text becomes its own line.
function chapters(modules) {
  const list = [];
  let credits = null;
  for (const m of modules) {
    if (m.type === 'text' && /^credits$/i.test(m.heading || '')) { credits = m; continue; }
    if (m.type === 'text' || !list.length) list.push({ text: m.type === 'text' ? m : null, media: [] });
    if (m.type !== 'text') list[list.length - 1].media.push(m);
  }
  return { list, credits };
}

export function layout(project, h) {
  const fn = DESIGNS[project.design];
  return fn ? fn(project, h) : null;
}

/* Shared parts */
// Scroll zoom moves the picture inside its frame, never the frame itself
const fig = (h, m, cls = '', { 'data-zoom': zoom, ...attrs } = {}) => {
  if (m.type !== 'image') return h.module(m);
  const img = h.picture(m, { loading: 'lazy', 'data-zoom': zoom, style: m.w ? `aspect-ratio:${m.w} / ${m.h}` : null });
  return h.el('figure', { class: `dz-fig ${cls}`.trim(), ...attrs }, [img]);
};
const credit = (h, c, cls = 'dz-credit') => c && h.el('p', { class: cls, 'data-reveal': true, text: c.body });
const marquee = (h, text, cls = '') =>
  h.el('div', { class: `dz-marquee ${cls}`.trim(), 'aria-hidden': 'true' }, [
    h.el('div', { class: 'dz-marquee__track' }, Array.from({ length: 2 }, () =>
      h.el('span', { text: Array(6).fill(text).join('   ·   ') + '   ·   ' }))),
  ]);
// A run of pictures that scrolls sideways while the page scrolls down
const filmstrip = (h, media, cls = '') =>
  h.el('section', { class: `dz-hs ${cls}`.trim(), 'data-hs': true }, [
    h.el('div', { class: 'dz-hs__pin' }, [
      h.el('div', { class: 'dz-hs__track' }, media.map((m, i) =>
        h.el('figure', { class: 'dz-hs__item' }, [
          m.type === 'image' ? h.picture(m, { loading: 'lazy', style: `aspect-ratio:${m.w} / ${m.h}` }) : h.module(m),
          h.el('figcaption', { text: `${pad(i + 1)} / ${pad(media.length)}` }),
        ]))),
    ]),
  ]);

/* ── The designs ─────────────────────────────────────────── */
const DESIGNS = {
  // Aakara — an earthen editorial: serif, roman numerals and drop caps between the boards.
  // Every board and film is shown whole, at one width, with one even gap, like pages of a deck;
  // each settles into place as it arrives. Nothing is cropped or drawn larger than its frame.
  earthen(p, h) {
    const { list, credits } = chapters(p.modules);
    let n = 0;
    return [
      ...list.flatMap((c) => [
        c.text && h.el('section', { class: 'ea-text', 'data-reveal': true }, [
          h.el('p', { class: 'ea-num', text: ROMAN[n++] }),
          h.el('h2', { class: 'ea-head', text: c.text.heading }),
          h.el('p', { class: 'ea-body', text: c.text.body }),
        ]),
        c.media.length && h.el('div', { class: 'ea-deck' }, c.media.map((m) =>
          m.type === 'image'
            ? h.el('figure', { class: 'ea-fig', 'data-reveal': true }, [h.picture(m, { loading: 'lazy', style: `aspect-ratio:${m.w} / ${m.h}` })])
            : h.el('div', { class: 'ea-fig ea-film', 'data-reveal': true }, [h.module(m)]))),
      ]),
      credit(h, credits, 'ea-credit'),
    ];
  },

  // ZIO — runway: a moving name band, huge uppercase type, runs of pictures pass by sideways
  runway(p, h) {
    const { list, credits } = chapters(p.modules);
    return [
      marquee(h, p.title.toUpperCase(), 'rw-marquee'),
      ...list.flatMap((c, i) => [
        c.text && h.el('section', { class: 'rw-text', 'data-reveal': true }, [
          h.el('h2', { class: 'rw-head', text: c.text.heading }),
          h.el('div', { class: 'rw-side' }, [
            h.el('span', { class: 'rw-idx', text: `${pad(i + 1)} — ${p.title}` }),
            h.el('p', { class: 'rw-body', text: c.text.body }),
          ]),
        ]),
        ...(c.media.filter((m) => m.type === 'image').length >= 3
          ? [filmstrip(h, c.media.filter((m) => m.type === 'image'), 'rw-hs'), ...c.media.filter((m) => m.type !== 'image').map(h.module)]
          : c.media.map((m) => fig(h, m, 'rw-fig', { 'data-reveal': true, 'data-zoom': true }))),
      ]),
      credit(h, credits, 'rw-credit'),
    ];
  },

  // Form & Flow — electric-blue panels; pictures wipe open in rounded frames, landscape pairs side by side
  flow(p, h) {
    const { list, credits } = chapters(p.modules);
    const out = [];
    list.forEach((c, i) => {
      if (c.text) out.push(h.el('section', { class: 'fl-panel', 'data-reveal': true }, [
        h.el('span', { class: 'fl-dot', text: pad(i + 1) }),
        h.el('h2', { class: 'fl-head', text: c.text.heading }),
        h.el('p', { class: 'fl-body', text: c.text.body }),
      ]));
      const media = [...c.media];
      let k = 0;
      while (media.length) {
        const a = media.shift();
        const b = media[0];
        if (k++ % 3 === 2 && b && a.type === 'image' && b.type === 'image' && !tall(a) && !tall(b)) {
          media.shift();
          out.push(h.el('div', { class: 'fl-pair' }, [fig(h, a, 'fl-fig', { 'data-reveal': true }), fig(h, b, 'fl-fig', { 'data-reveal': true })]));
        } else out.push(fig(h, a, 'fl-fig', { 'data-reveal': true }));
      }
    });
    out.push(credit(h, credits, 'fl-credit'));
    return out;
  },

  // Consciousness — calm waves: centred, light type, a drawn wave between chapters, pictures settle in
  waves(p, h) {
    const { list, credits } = chapters(p.modules);
    const wave = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 600 40');
      svg.setAttribute('class', 'wv-wave');
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = '<path d="M0 20 C 50 0, 100 0, 150 20 S 250 40, 300 20 S 400 0, 450 20 S 550 40, 600 20" fill="none" stroke="currentColor" stroke-width="1.5"/>';
      return svg;
    };
    return [
      ...list.flatMap((c) => [
        c.text && h.el('section', { class: 'wv-text', 'data-reveal': true }, [
          wave(),
          h.el('h2', { class: 'wv-head', text: c.text.heading }),
          h.el('p', { class: 'wv-body', text: c.text.body }),
        ]),
        ...c.media.map((m) => fig(h, m, 'wv-fig', { 'data-reveal': true, 'data-zoom': true })),
      ]),
      credit(h, credits, 'wv-credit'),
    ];
  },

  // Eva Design Group — gallery noir: gold hairlines, letter-spaced captions, boards held in gilt frames
  noir(p, h) {
    const { list, credits } = chapters(p.modules);
    let n = 0;
    return [
      ...list.flatMap((c) => [
        c.text && h.el('section', { class: 'nr-text', 'data-reveal': true }, [
          h.el('p', { class: 'nr-label', text: c.text.heading }),
          h.el('p', { class: 'nr-body', text: c.text.body }),
        ]),
        ...c.media.map((m) => h.el('figure', { class: 'nr-frame', 'data-reveal': true }, [
          m.type === 'image' ? h.picture(m, { loading: 'lazy', style: `aspect-ratio:${m.w} / ${m.h}` }) : h.module(m),
          h.el('figcaption', { text: `Plate ${ROMAN[n++] || n} — ${m.alt || p.title}` }),
        ])),
      ]),
      credit(h, credits, 'nr-credit'),
    ];
  },

  // .taras — a studio index: lime marquee, section marks, pictures in a two-column wall with index rails
  studio(p, h) {
    const { list, credits } = chapters(p.modules);
    let n = 0;
    const item = (m) => h.el('figure', { class: 'st-item', 'data-reveal': true }, [
      m.type === 'image' ? h.picture(m, { loading: 'lazy', style: `aspect-ratio:${m.w} / ${m.h}` }) : h.module(m),
      h.el('figcaption', {}, [h.el('b', { text: `${pad(++n)}` }), h.el('span', { text: m.alt || 'Motion' })]),
    ]);
    return [
      marquee(h, p.title.toLowerCase().startsWith('.') ? p.title.toLowerCase() : `.${p.title.toLowerCase()}`, 'st-marquee'),
      ...list.flatMap((c, i) => [
        c.text && h.el('section', { class: 'st-text', 'data-reveal': true }, [
          h.el('p', { class: 'st-mark', text: `§${pad(i + 1)}` }),
          h.el('h2', { class: 'st-head', text: c.text.heading }),
          h.el('p', { class: 'st-body', text: c.text.body }),
        ]),
        h.el('div', { class: `st-wall${c.media.length > 1 ? '' : ' is-single'}` }, c.media.map(item)),
      ]),
      credit(h, credits, 'st-credit'),
    ];
  },

  // 40 Feet — a shipping manifest: each picture logged with its number and line, sliding in like cargo
  manifest(p, h) {
    const { list, credits } = chapters(p.modules);
    let n = 0;
    return [
      ...list.flatMap((c, i) => [
        c.text && h.el('section', { class: 'mf-text', 'data-reveal': true }, [
          h.el('p', { class: 'mf-tag', text: `Manifest ${pad(i + 1)}` }),
          h.el('h2', { class: 'mf-head', text: c.text.heading }),
          h.el('p', { class: 'mf-body', text: c.text.body }),
        ]),
        ...c.media.map((m) => h.el('div', { class: 'mf-row', 'data-reveal': true }, [
          h.el('div', { class: 'mf-rail' }, [h.el('b', { text: pad(++n) }), h.el('span', { text: m.alt || '' })]),
          fig(h, m, 'mf-fig'),
        ])),
      ]),
      credit(h, credits, 'mf-credit'),
    ];
  },

  // Initium World — a split: the chapter's words stay pinned on the left while its pictures scroll on the right
  split(p, h) {
    const { list, credits } = chapters(p.modules);
    return [
      ...list.map((c, i) => h.el('section', { class: `sp-chapter${c.text ? '' : ' is-bare'}` }, [
        c.text && h.el('div', { class: 'sp-pin' }, [
          h.el('p', { class: 'sp-idx', text: `${pad(i + 1)} / ${pad(list.length)}` }),
          h.el('h2', { class: 'sp-head', text: c.text.heading }),
          h.el('p', { class: 'sp-body', text: c.text.body }),
        ]),
        h.el('div', { class: 'sp-media' }, c.media.map((m) => fig(h, m, 'sp-fig', { 'data-reveal': true }))),
      ])),
      credit(h, credits, 'sp-credit'),
    ];
  },

  // Debarro Interiors — architectural: thin rules, offset plates alternating left and right, captions in small caps
  architect(p, h) {
    const { list, credits } = chapters(p.modules);
    let k = 0;
    return [
      ...list.flatMap((c) => [
        c.text && h.el('section', { class: 'ar-text', 'data-reveal': true }, [
          h.el('h2', { class: 'ar-head', text: c.text.heading }),
          h.el('p', { class: 'ar-body', text: c.text.body }),
        ]),
        ...c.media.map((m) => h.el('figure', { class: `ar-plate ${k++ % 2 ? 'is-right' : 'is-left'}`, 'data-reveal': true }, [
          m.type === 'image' ? h.picture(m, { loading: 'lazy', 'data-zoom': true, style: `aspect-ratio:${m.w} / ${m.h}` }) : h.module(m),
          h.el('figcaption', { text: m.alt || '' }),
        ])),
      ]),
      credit(h, credits, 'ar-credit'),
    ];
  },

  // Sidhi — herbal: deep olive, a serif voice, soft rounded boards floating at gentle, opposite speeds
  herbal(p, h) {
    const { list, credits } = chapters(p.modules);
    let k = 0;
    return [
      ...list.flatMap((c) => [
        c.text && h.el('section', { class: 'hb-text', 'data-reveal': true }, [
          h.el('span', { class: 'hb-leaf', 'aria-hidden': 'true' }),
          h.el('h2', { class: 'hb-head', text: c.text.heading }),
          h.el('p', { class: 'hb-body', text: c.text.body }),
        ]),
        ...c.media.map((m) => h.el('div', { class: 'hb-float', 'data-parallax': k++ % 2 ? '-0.05' : '0.05' }, [fig(h, m, 'hb-fig', { 'data-reveal': true })])),
      ]),
      credit(h, credits, 'hb-credit'),
    ];
  },
};

// BET (Bestway Environmental Technologies) — freight: the mark is two views of a shipping container,
// so the page is built like a container yard. The two halves dock into the mark as you scroll,
// chapters are stencilled like container doors, colours are painted container panels, the mark
// switches between its liveries like doors swung open, and the applications stack as cargo,
// each tagged with a container code.
DESIGNS.freight = (p, h) => {
  // BET is told as a case study: the brief, the problem, how the idea was found, the mark, its system,
  // the brand at work, and a closing thank-you. Every chapter has a number and a one-line title; pictures
  // wipe up into place, a few drift at their own speed, and the two container views dock twice.
  const im = (name, alt, attrs = {}) => h.picture({ src: `assets/work/branding/bet/${name}.jpg`, alt }, { loading: 'lazy', draggable: 'false', ...attrs });
  // a heading whose words rise one after another out of a mask
  const words = (text, cls, tag = 'h2') => h.el(tag, { class: `bt-words ${cls}`, 'data-reveal': true, 'aria-label': text },
    text.split(' ').map((w, i) => h.el('span', { class: 'bt-w', 'aria-hidden': 'true', style: `--i:${i}` }, [h.el('span', { text: w })])));
  const label = (n, text) => h.el('p', { class: 'bt-label', 'data-reveal': true }, [h.el('b', { text: n }), h.el('span', { text })]);
  // a picture that wipes up into its frame; `drift` moves it a little against the scroll
  const shot = (name, alt, cls = '', drift) => h.el('figure', { class: `bt-shot ${cls}`.trim(), 'data-reveal': true }, [
    h.el('div', { class: 'bt-shot__in', ...(drift ? { 'data-parallax': drift } : {}) }, [im(name, alt)]),
  ]);
  const svg = (cls, w, path) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', `0 0 ${w} 100`);
    s.setAttribute('class', cls);
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = path;
    return s;
  };
  // the two container views, traced from the mark in the brand guidelines (bars 15.6 units thick)
  const sideView = () => svg('bt-half is-side', 100, '<path d="M0 0h100v100H0zM15.6 15.6v26.6h68.8V15.6zM15.6 57.8v26.6h68.8V57.8z" fill-rule="evenodd"/>');
  const frontView = () => svg('bt-half is-front', 104.6, '<path d="M0 0h104.6v15.6H0zM43.6 15.6h15.4v68.8H43.6zM0 29.6h15.6v54.8H0zM89 29.6h15.6v54.8H89zM0 84.4h104.6V100H0z"/>');
  const swatch = (name, hex, rgb, cmyk, pms, cls, i) => h.el('div', { class: `bt-swatch ${cls}`, 'data-reveal': true, style: `--d:${i}` }, [
    h.el('b', { text: name }),
    h.el('dl', {}, [['HEX', hex], ['RGB', rgb], ['CMYK', cmyk], pms && ['PANTONE', pms]].filter(Boolean).flatMap(([k, v]) => [h.el('dt', { text: k }), h.el('dd', { text: v })])),
  ]);
  const group = (n, title, note, cls, items) => h.el('section', { class: `bt-group ${cls}` }, [
    h.el('header', { class: 'bt-group__head', 'data-reveal': true }, [h.el('span', { text: n }), h.el('h3', { text: title }), h.el('p', { text: note })]),
    h.el('div', { class: 'bt-group__grid' }, items.map(([name, alt, c, drift]) => shot(name, alt, c, drift))),
  ]);
  const fact = (k, v) => [h.el('dt', { text: k }), h.el('dd', { text: v })];

  return [
    // ── Hero: the ship, full-bleed, easing out of a slow zoom; one line over its lower edge
    h.el('section', { class: 'bt-hero' }, [
      h.el('figure', { class: 'bt-hero__img' }, [im('hero', 'A container ship at sea carrying the BET mark', { 'data-zoom': true, loading: 'eager' })]),
      h.el('div', { class: 'bt-hero__text' }, [
        h.el('p', { class: 'bt-hero__kicker', 'data-reveal': true, text: 'Case study · Brand identity · 2024' }),
        words('An identity as dependable as the cargo it moves.', 'bt-hero__line', 'p'),
      ]),
    ]),

    // ── 01 Overview
    h.el('section', { class: 'bt-intro' }, [
      label('01', 'Overview'),
      h.el('div', { class: 'bt-intro__grid' }, [
        h.el('p', { class: 'bt-intro__lede', 'data-reveal': true, text: 'Bestway Environmental Technologies sources premium products for mining and construction and ships them around the world. Its business runs on integrity, transparency and accountability, but its name was three letters that said none of it.' }),
        h.el('dl', { class: 'bt-facts', 'data-reveal': true, style: '--d:2' }, [
          ...fact('Client', 'Bestway Environmental Technologies'),
          ...fact('Sector', 'Global sourcing and logistics'),
          ...fact('Scope', 'Strategy, logo, identity system, guidelines, applications'),
          ...fact('Year', '2024'),
        ]),
      ]),
    ]),

    // ── 02 The challenge
    h.el('section', { class: 'bt-challenge' }, [
      label('02', 'The challenge'),
      words('Make three letters stand for trust, worldwide.', 'bt-title'),
      h.el('div', { class: 'bt-cards' }, [
        ['A name without a picture', 'BET is an acronym. On its own it carries no image, and in this trade it sits beside hundreds of similar initials.'],
        ['Trust before the first order', 'Buyers commit large sums to goods they will not see until they arrive. The brand has to feel reliable at first glance.'],
        ['One mark, every surface', 'It must hold up on a 40-foot container, a business card and a 16-pixel app icon, in two colours or one.'],
      ].map(([t, b], i) => h.el('article', { class: 'bt-card', 'data-reveal': true, style: `--d:${i}` }, [
        h.el('span', { class: 'bt-card__n', text: `0${i + 1}` }), h.el('h3', { text: t }), h.el('p', { text: b }),
      ]))),
    ]),

    // ── 03 The process: four steps along a route line that draws itself as you scroll
    h.el('section', { class: 'bt-process', 'data-dock': true }, [
      label('03', 'How I found it'),
      words('From the brief to the shape that was already there.', 'bt-title'),
      h.el('div', { class: 'bt-route', 'aria-hidden': 'true' }, [h.el('i')]),
      h.el('ol', { class: 'bt-steps' }, [
        ['Listen', 'The brief and the company’s values: integrity, transparency, accountability. The brand had to feel solid, open and global.'],
        ['Observe', 'Ports, cranes, ships and containers. Of everything in the trade, the container is the one object every shipment shares.'],
        ['Sketch', 'I drew the container from every side. Two views, the side and the doors, began to read as letters.'],
        ['Build', 'The views were set on one grid, with bars 15.6 units thick, and tested from a container wall down to an app icon.'],
      ].map(([t, b], i) => h.el('li', { class: 'bt-step', 'data-reveal': true, style: `--d:${i}` }, [
        h.el('span', { class: 'bt-step__dot' }), h.el('span', { class: 'bt-step__n', text: `Step 0${i + 1}` }), h.el('h3', { text: t }), h.el('p', { text: b }),
      ]))),
    ]),

    // ── 04 The insight: the two views slide together into the mark (on BET blue)
    h.el('section', { class: 'bt-insight' }, [
      h.el('div', { class: 'bt-insight__in' }, [
        label('04', 'The insight'),
        words('Two views of one container.', 'bt-title'),
        h.el('div', { class: 'bt-dock', 'data-dock': true }, [
          h.el('div', { class: 'bt-dock__part is-side' }, [sideView(), h.el('p', {}, [h.el('b', { text: 'Side view' }), h.el('span', { text: 'Two containers stacked: capacity and stability.' })])]),
          h.el('div', { class: 'bt-dock__part is-front' }, [frontView(), h.el('p', {}, [h.el('b', { text: 'Front view' }), h.el('span', { text: 'The doors: openness, and cargo kept safe.' })])]),
        ]),
        // the concept, pinned and told in three steps as you scroll (desktop); a still version on phones
        h.el('section', { class: 'bt-spell', 'data-progress': '3', 'aria-label': 'How the two container views spell BET' }, [
          h.el('div', { class: 'bt-spell__stage' }, [
            h.el('div', { class: 'bt-spell__photos' }, [
              h.el('figure', { class: 'bt-spell__photo is-a' }, [im('concept-side', 'Container side view: two stacked containers form the first half of the mark')]),
              h.el('figure', { class: 'bt-spell__photo is-b' }, [im('concept-front', 'Container front view: the doors form the second half of the mark')]),
            ]),
            h.el('div', { class: 'bt-spell__board' }, [
              h.el('div', { class: 'bt-spell__glyphs', 'aria-hidden': 'true' }, [
                h.el('div', { class: 'bt-spell__glyph is-side' }, [sideView(), h.el('span', { class: 'bt-spell__letter', text: 'B' })]),
                h.el('div', { class: 'bt-spell__glyph is-front' }, [
                  frontView(),
                  svg('bt-spell__t', 104.6, '<path d="M0 0h104.6v15.6H0zM43.6 15.6h15.4v68.8H43.6z"/>'),
                  h.el('span', { class: 'bt-spell__letter' }, [h.el('i', { text: 'E' }), h.el('i', { class: 'is-t', text: 'T' })]),
                ]),
              ]),
              h.el('div', { class: 'bt-spell__copy' }, [
                ['01', 'Side view', 'Two containers stacked, seen from the side. Their outline is a B, for capacity and stability.'],
                ['02', 'Front view', 'Seen head-on, the container’s doors form an E. Its top edge and centre bar stand as a T.'],
                ['03', 'One mark', 'Side by side, the two views spell BET: the company’s initials, and the thing it moves.'],
              ].map(([n, t, b], i) => h.el('div', { class: 'bt-spell__say', 'data-i': i }, [h.el('span', { text: n }), h.el('b', { text: t }), h.el('p', { text: b })]))),
              h.el('p', { class: 'bt-spell__name' }, [
                h.el('span', {}, [h.el('b', { text: 'B' }), 'estway ']),
                h.el('span', {}, [h.el('b', { text: 'E' }), 'nvironmental ']),
                h.el('span', {}, [h.el('b', { text: 'T' }), 'echnologies']),
              ]),
            ]),
            h.el('ol', { class: 'bt-spell__ticks', 'aria-hidden': 'true' }, [0, 1, 2].map((i) => h.el('li', { 'data-i': i }))),
          ]),
        ]),
        h.el('div', { class: 'bt-proof' }, [
          shot('concept-side', 'Container side view: two stacked containers form the first half of the mark', 'is-a'),
          shot('concept-front', 'Container front view: the doors form the second half of the mark', 'is-b'),
          h.el('div', { class: 'bt-proof__text' }, [
            h.el('p', { class: 'bt-proof__big', 'data-reveal': true }, ['B', 'E', 'T'].map((c, i) => h.el('span', { text: c, style: `--i:${i}` }))),
            h.el('p', { 'data-reveal': true, style: '--d:2', text: 'Read again, the two views spell the name. The side view is a B, the front view an E, and its centre bar stands as a T. One mark carries both the company’s initials and the thing it moves.' }),
          ]),
        ]),
      ]),
    ]),

    // ── 05 The mark and its versions
    h.el('section', { class: 'bt-mark' }, [
      label('05', 'The solution'),
      words('A mark you can ship anywhere.', 'bt-title'),
      h.el('p', { class: 'bt-body', 'data-reveal': true, text: 'Squared like a container and built only from straight bars, the mark stays sharp at any size. It works in BET orange, BET blue, on the brand gradient, and in plain black and white.' }),
      h.el('div', { class: 'bt-versions' }, [
        shot('mark-white', 'The BET mark in orange and blue on white', 'is-lead'),
        shot('mark-blue', 'The BET mark in white on BET blue', '', '0.04'),
        shot('mark-red', 'The BET mark in white on BET orange', '', '-0.04'),
        shot('mark-gradient', 'The BET mark on the orange-to-blue brand gradient', 'is-wide'),
        shot('mark-mono', 'The BET mark in black and white', 'is-wide is-mono'),
      ]),
    ]),

    // ── 06 Colour and type
    h.el('section', { class: 'bt-system' }, [
      label('06', 'Colour and type'),
      words('Orange for momentum, blue for trust.', 'bt-title'),
      h.el('div', { class: 'bt-swatches' }, [
        swatch('BET Orange', '#EF4136', '239 65 54', '0 90 85 0', '179 C', 'is-red', 0),
        swatch('BET Blue', '#0C2DAE', '12 45 174', '99 89 0 0', '2736 C', 'is-blue', 1),
        swatch('Black', '#000000', '0 0 0', '100 100 100 100', '', 'is-black', 2),
        swatch('White', '#FFFFFF', '255 255 255', '0 0 0 0', '', 'is-white', 3),
      ]),
      h.el('div', { class: 'bt-type', 'data-reveal': true }, [
        h.el('p', { class: 'bt-type__aa', text: 'Aa' }),
        h.el('div', { class: 'bt-type__info' }, [
          h.el('b', { text: 'Archivo' }),
          h.el('p', { text: 'A plain, modern grotesque from Thin to Black: confident in headlines, calm in body text, and close in spirit to the mark’s straight bars.' }),
          h.el('p', { class: 'bt-type__set', text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789' }),
        ]),
      ]),
    ]),

    // ── the port: a full-bleed pause, drifting slower than the page
    h.el('figure', { class: 'bt-port', 'data-reveal': true }, [
      h.el('div', { class: 'bt-port__in', 'data-parallax': '0.12' }, [im('port', 'The BET secondary lockup with its Chinese name over a container port at dusk')]),
      h.el('figcaption', { text: 'A secondary lockup carries the company’s Chinese name.' }),
    ]),

    // ── 07 Applications: out in the world (a pinned run that slides sideways), then in hand, on screen, and worn
    h.el('section', { class: 'bt-apps' }, [
      label('07', 'In the world'),
      words('Loaded onto everything it touches.', 'bt-title'),
    ]),
    h.el('section', { class: 'dz-hs bt-run', 'data-hs': true }, [
      h.el('div', { class: 'dz-hs__pin' }, [
        h.el('div', { class: 'dz-hs__track' }, [
          ['container-2', 'A BET shipping container lifted by a crane', 'Shipping container'],
          ['billboard', 'A BET digital billboard above a crowd', 'Digital billboard'],
          ['hoarding', 'BET roadside hoarding: Expanding Horizons, Connecting Opportunities', 'Hoarding'],
          ['street-ad', 'BET poster in a bus shelter at night', 'Bus shelter'],
          ['event-2', 'BET event backdrop on a stage', 'Event backdrop'],
          ['signage-2', 'BET monument sign in red and blue outside an office building', 'Monument sign'],
        ].map(([n, alt, cap], i) => h.el('figure', { class: 'dz-hs__item bt-run__item' }, [
          im(n, alt), h.el('figcaption', {}, [h.el('b', { text: String(i + 1).padStart(2, '0') }), h.el('span', { text: cap })]),
        ]))),
      ]),
    ]),
    group('A', 'In hand', 'Stationery that travels with every shipment.', 'is-hand', [
      ['business-card', 'BET business cards on black', 'is-wide'],
      ['folder', 'BET presentation folder', '', '0.05'],
      ['id-card-2', 'BET ID card on a lanyard', '', '-0.05'],
      ['loyalty-card-2', 'BET Luminary loyalty cards', 'is-wide'],
    ]),
    group('B', 'On screen', 'A website, an app icon and social posts in the same voice.', 'is-screen', [
      ['laptop', 'BET website on a laptop: Expand your global footprint', 'is-wide'],
      ['phone', 'BET website on a phone held in a city street', '', '0.05'],
      ['app-icon', 'BET app icons on a phone', '', '-0.05'],
      ['instagram', 'Three BET Instagram carousel posts', 'is-wide'],
    ]),
    group('C', 'Worn and used', 'Merchandise for the team, down to the packing tape.', 'is-worn', [
      ['jacket', 'BET blue and orange jacket', 'is-wide'],
      ['t-shirt', 'A model in a black BET T-shirt', '', '0.05'],
      ['cap', 'BET blue cap', '', '-0.05'],
      ['tape', 'Rolls of BET packing tape'],
      ['mug', 'Two BET mugs, white and blue'],
    ]),

    // ── 08 Outcome
    h.el('section', { class: 'bt-outcome' }, [
      label('08', 'The outcome'),
      h.el('ul', { class: 'bt-results' }, [
        ['One idea', 'Every piece of the identity comes back to the container: the mark, its straight bars and its two colours.'],
        ['Every scale', 'The mark reads on a container across a port yard and as a 16-pixel icon on a phone.'],
        ['Easy to apply', 'Brand guidelines set out the mark, colours and type, so the team and its partners can apply the brand the same way everywhere.'],
      ].map(([t, b], i) => h.el('li', { 'data-reveal': true, style: `--d:${i}` }, [h.el('b', { text: t }), h.el('p', { text: b })]))),
    ]),

    // ── The end: the halves dock one last time over a thank-you
    h.el('section', { class: 'bt-end', 'data-dock': true }, [
      h.el('div', { class: 'bt-end__mark', 'aria-hidden': 'true' }, [sideView(), frontView()]),
      words('Thank you.', 'bt-end__thanks', 'p'),
      h.el('p', { class: 'bt-end__note', 'data-reveal': true, style: '--d:3', text: 'Thanks for scrolling through BET. Brand identity and guidelines by Sarath Bhaskar at .taras design studio, for Think Dot, 2024.' }),
    ]),
  ];
};

// Fresh Learning — campus: warm ivory paper so the navy work stands out; headings rise in
// word by word, pictures swing in from alternate sides and drift, the five ideas stack
// like cards on a desk, the colours overlap as two circles, the pattern runs as a band
DESIGNS.campus = (p, h) => {
  const words = (text, cls) => h.el('h2', { class: `cp-words ${cls || ''}`.trim() },
    text.split(' ').map((w, i) => h.el('span', { class: 'cp-w', style: `--i:${i}` }, [h.el('span', { text: w })])));
  const kicker = (m) => h.el('p', { class: 'cp-kicker' }, [h.el('span', { text: m.n }), h.el('span', { text: m.label })]);
  const pic = (m, cls = '', attrs = {}) => h.el('figure', { class: `cp-pic ${cls}`.trim(), 'data-reveal': true, ...attrs }, [
    h.picture(m, { loading: 'lazy', style: m.w ? `aspect-ratio:${m.w} / ${m.h}` : null }),
  ]);
  const out = [];
  const mods = [...p.modules];
  let side = 0;
  while (mods.length) {
    const m = mods.shift();
    switch (m.type) {
      case 'chapter':
        out.push(h.el('section', { class: 'cp-brief', 'data-reveal': true }, [
          kicker(m), words(m.heading, 'cp-title'),
          h.el('span', { class: 'cp-rule', 'aria-hidden': 'true' }),
          h.el('div', { class: 'cp-cols' }, [].concat(m.body || []).map((t) => h.el('p', { text: t }))),
        ]));
        break;
      case 'split':
        out.push(h.el('section', { class: 'cp-sketch', 'data-reveal': true }, [
          h.el('div', { class: 'cp-sketch__text' }, [kicker(m), words(m.heading, 'cp-title cp-title--md'), h.el('p', { class: 'cp-copy', text: m.body })]),
          h.el('div', { class: 'cp-sketch__stack' }, [
            h.el('span', { class: 'cp-sheet cp-sheet--back', 'aria-hidden': 'true' }),
            pic(m.image, 'cp-sheet'),
          ]),
        ]));
        break;
      case 'image':
        if (/pattern/.test(m.src)) {
          // One seamless tile (an exact whole number of motifs each way) repeated across the band and slid by
          // exactly one tile, so the pattern fills any width and loops with no seam or gap
          out.push(h.el('section', { class: 'cp-band', role: 'img', 'aria-label': m.alt }, [
            h.el('div', { class: 'cp-band__fill', style: `background-image:url("${m.src.replace(/pattern\.jpg$/, 'pattern-seamless.webp')}")` }),
          ]));
        } else if (/brandmark|typeface/.test(m.src)) {
          out.push(pic(m, `cp-float ${side++ % 2 ? 'from-right' : 'from-left'}`));
        } else out.push(pic(m, 'cp-drift'));
        break;
      case 'cards': {
        // Five ideas assemble into one mark: a pinned panel steps through each idea as the page scrolls
        // (its photo wipes in, the mark's icon and words change), then ends on the whole brandmark.
        // Phones and reduced motion get the same content as a plain list.
        const mark = p.modules.find((x) => x.type === 'image' && /brandmark/.test(x.src));
        const steps = [...m.items, ...(mark ? [{ ...mark, final: true, title: m.heading }] : [])];
        const total = m.items.length;
        out.push(h.el('section', { class: 'cp-ideas' }, [
          h.el('header', { class: 'cp-ideas__head', 'data-reveal': true }, [kicker(m), words(m.heading, 'cp-title')]),
          h.el('div', { class: 'cp-steps', 'data-steps': true, style: `--n:${steps.length}` }, [
            h.el('div', { class: 'cp-steps__stage' }, [
              h.el('div', { class: 'cp-steps__media' }, steps.map((c, i) =>
                h.el('figure', { class: `cp-step-img${c.final ? ' is-final' : ''}`, 'data-i': i, style: `--o:${i * 3}` }, [h.picture(c, { loading: 'lazy' })]))),
              h.el('div', { class: 'cp-steps__panel' }, [
                h.el('div', { class: 'cp-steps__icons' }, steps.map((c, i) => c.icon
                  ? h.picture({ src: c.icon, alt: '' }, { class: 'cp-step-icon', 'data-i': i, loading: 'lazy', style: `--o:${i * 3 + 1}` })
                  : h.el('span', { class: 'cp-step-icon is-blank', 'data-i': i }))),
                h.el('div', { class: 'cp-steps__words' }, steps.map((c, i) => h.el('div', { class: 'cp-step-text', 'data-i': i, style: `--o:${i * 3 + 2}` }, [
                  h.el('p', { class: 'cp-card__n', text: c.final ? `${total} ideas` : `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}` }),
                  h.el('h3', { class: 'cp-card__title', text: c.title }),
                  c.body && h.el('p', { class: 'cp-card__body', text: c.body }),
                ]))),
                h.el('div', { class: 'cp-steps__bar', 'aria-hidden': 'true' }, m.items.map(() => h.el('span'))),
              ]),
            ]),
          ]),
        ]));
        break;
      }
      case 'palette':
        out.push(h.el('section', { class: 'cp-colour', 'data-reveal': true }, [
          h.el('div', { class: 'cp-colour__text' }, [kicker(m), words(m.heading, 'cp-title cp-title--md'), h.el('p', { class: 'cp-copy', text: m.body })]),
          h.el('div', { class: 'cp-venn' }, m.colours.map((c, i) => h.el('div', { class: 'cp-dot', style: `background:${c.hex};--i:${i}` }, [
            h.el('span', { class: 'cp-dot__name', text: c.name }),
            h.el('span', { class: 'cp-dot__code', text: [c.hex.toUpperCase(), c.note].filter(Boolean).join(' · ') }),
          ]))),
        ]));
        break;
      case 'duo':
        out.push(h.el('div', { class: 'cp-pair' }, m.images.map((x, i) => pic(x, i ? 'from-right' : 'from-left'))));
        break;
      case 'section': {
        // A chapter of applications: its heading, then its pictures in two offset columns that drift apart
        const pics = [];
        while (mods.length && (mods[0].type === 'image' || mods[0].type === 'duo')) {
          const x = mods.shift();
          pics.push(...(x.type === 'duo' ? x.images : [x]));
        }
        const [lead, ...rest] = pics;
        out.push(h.el('section', { class: 'cp-apps' }, [
          h.el('header', { class: 'cp-apps__head', 'data-reveal': true }, [
            h.el('span', { class: 'cp-apps__n', text: m.n }),
            h.el('div', {}, [h.el('p', { class: 'cp-kicker cp-kicker--solo', text: m.label }), words(m.line, 'cp-line')]),
          ]),
          lead && pic(lead, 'cp-drift'),
          rest.length > 0 && h.el('div', { class: 'cp-cols2' }, [
            h.el('div', { class: 'cp-col' }, rest.filter((_, i) => i % 2 === 0).map((x) => pic(x, 'from-left'))),
            h.el('div', { class: 'cp-col cp-col--low', 'data-parallax': '-0.08' }, rest.filter((_, i) => i % 2 === 1).map((x) => pic(x, 'from-right'))),
          ]),
        ]));
        break;
      }
      case 'text':
        out.push(h.el('p', { class: 'cp-credit', 'data-reveal': true, text: m.body }));
        break;
      default:
        out.push(h.module(m));
    }
  }
  return out;
};

// JC Construction — foundation: the page follows the Behance presentation board by board
// (green intro, white moodboard, logo logic, sunset concept, clay benefits, black clearspace,
// brand tone, mockups, thank-you), rebuilt as live panels so words, lines and pictures can move
DESIGNS.foundation = (p, h) => {
  const B = 'assets/work/branding/jc-construction/behance/';
  const im = (name, alt, attrs = {}) => h.picture({ src: B + name, alt }, { loading: 'lazy', ...attrs });
  const words = (node) => { splitWords(node); return node; };
  const head = (text, cls = '') => words(h.el('h2', { class: `fd-h ${cls}`.trim(), text }));
  const paras = (list, cls = 'fd-p') => h.el('div', { class: 'fd-paras' }, [].concat(list).map((t) => h.el('p', { class: cls, text: t })));
  // A thin line drawing of the mark's stepped edges, drawn on as it appears
  const outline = (cls = '') => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 300');
    svg.setAttribute('class', `fd-outline ${cls}`.trim());
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<path pathLength="1" d="M10 120 L200 20 L390 120 L390 260 M10 120 L10 260 M60 150 L200 75 L340 150 M200 20 L200 75 M60 150 L60 290 M340 150 L340 290"/>';
    return svg;
  };
  return p.modules.map((m) => {
    switch (m.type) {
      case 'film':
        return h.el('figure', { class: 'fd-film', 'data-reveal': true }, [h.module({ type: 'video', src: B + m.src, poster: B + m.poster })]);
      case 'plate': {
        const fig = h.el('figure', { class: `fd-plate${m.overlay ? ' has-overlay' : ''}${m.tone ? ` is-${m.tone}` : ''}`, 'data-reveal': true, 'data-enter': m.enter || 'rise' }, [
          h.el('div', { class: 'fd-plate__frame' }, [im(m.src, m.alt, m.still ? {} : { 'data-parallax': '0.05' })]),
          m.overlay && words(h.el('p', { class: `fd-overlay is-${m.at || 'top-left'}`, text: m.overlay })),
          m.labels && h.el('div', { class: 'fd-labels' }, m.labels.map((t) => h.el('span', { text: t }))),
        ]);
        return fig;
      }
      case 'intro':
        return h.el('section', { class: 'fd-panel fd-intro', 'data-reveal': true }, [
          h.el('div', { class: 'fd-intro__text' }, [
            im('logo.jpg', 'JC Construction & Excavation logo', { class: 'fd-logo' }),
            h.el('p', { class: 'fd-meta' }, m.meta.map((t) => h.el('span', { text: t }))),
            words(h.el('h2', { class: 'fd-h fd-h--sm fd-green', text: m.title })),
            words(h.el('p', { class: 'fd-quote', text: m.quote })),
            paras(m.body),
          ]),
          outline('fd-intro__lines'),
        ]);
      case 'mood':
        return h.el('section', { class: 'fd-panel fd-mood', 'data-reveal': true }, [
          h.el('figure', { class: 'fd-mood__art' }, [im('moodboard.jpg', 'Moodboard: leaf, glass tower, concrete and brick in angled frames')]),
          h.el('div', { class: 'fd-mood__text' }, [head('Moodboard.', 'fd-clay'), paras(m.body, 'fd-p fd-p--clay')]),
        ]);
      case 'concept':
        return h.el('section', { class: 'fd-panel fd-concept', 'data-reveal': true }, [
          h.el('p', { class: 'fd-label', text: 'Logo Logic / Concept' }),
          h.el('figure', { class: 'fd-steps' }, [im('steps.jpg', 'The mark in three steps: J and C, placement, out')]),
          paras(m.body),
        ]);
      case 'inspired':
        return h.el('section', { class: 'fd-panel fd-inspired', 'data-reveal': true }, [
          head('Inspired from.', 'fd-green'),
          h.el('figure', { class: 'fd-inspired__art' }, [im('inspired.jpg', 'The glass tower that inspired the mark, and the mark')]),
          paras(m.body),
        ]);
      case 'nature':
        return h.el('section', { class: 'fd-panel fd-nature', 'data-reveal': true }, [
          h.el('div', { class: 'fd-nature__text' }, [
            h.el('figure', { class: 'fd-nature__small' }, [im('leaf-small.jpg', 'Leaves with bright veins')]),
            head('Engineered by Nature.', 'fd-green'),
            paras(m.body),
          ]),
          h.el('figure', { class: 'fd-nature__big' }, [im('leaf-big.jpg', 'The veins of a leaf, close up', { 'data-parallax': '0.06' })]),
        ]);
      case 'significance':
        return h.el('section', { class: 'fd-panel fd-sig', 'data-reveal': true }, [
          h.el('figure', { class: 'fd-sig__photo' }, [im('crane.jpg', 'A crane over a rising tower at sunset', { 'data-parallax': '0.05' })]),
          h.el('div', { class: 'fd-sig__text' }, [head('Logo Concept & Brand Significance.'), paras(m.body)]),
        ]);
      case 'benefits':
        return h.el('section', { class: 'fd-panel fd-benefits', 'data-reveal': true }, [
          outline('fd-benefits__lines'),
          head('How It Helps the Brand Get Noticed Globally.', 'fd-dark'),
          h.el('ul', { class: 'fd-list' }, m.items.map(([k, v]) => h.el('li', {}, [h.el('b', { text: `${k}: ` }), v]))),
        ]);
      case 'clearspace':
        return h.el('section', { class: 'fd-panel fd-clear', 'data-reveal': true }, [
          head('Wordmark & Symbol Clearspace', 'fd-green fd-h--sm'),
          h.el('ul', { class: 'fd-list fd-list--light' }, m.items.map((t) => h.el('li', { text: t }))),
          h.el('figure', { class: 'fd-clear__art' }, [im('clearspace.jpg', 'Clear space around the wordmark and the symbol')]),
        ]);
      case 'tone':
        return h.el('section', { class: 'fd-panel fd-tone', 'data-reveal': true }, [
          h.el('p', { class: 'fd-label fd-label--light', text: 'Brand Tone' }),
          h.el('div', { class: 'fd-shard is-green' }, [h.el('p', { class: 'fd-codes' }, [h.el('span', { text: 'RGB' }), h.el('span', { text: '6% 58% 51%' }), h.el('span', { text: 'cmyk' }), h.el('span', { text: '89% 52% 70% 57%' }), h.el('span', { text: '#063a33' })])]),
          h.el('div', { class: 'fd-shard is-clay' }, [h.el('p', { class: 'fd-codes' }, [h.el('span', { text: 'RGB' }), h.el('span', { text: '181% 136% 106%' }), h.el('span', { text: 'cmyk' }), h.el('span', { text: '28% 47% 60% 4%' }), h.el('span', { text: '#b5886a' })])]),
          ...m.notes.map((n, i) => h.el('div', { class: `fd-note is-${i + 1}` }, [h.el('h3', { class: 'fd-h fd-h--xs fd-green', text: n.title }), paras(n.body, 'fd-p fd-p--sm')])),
        ]);
      case 'closing':
        return h.el('section', { class: 'fd-panel fd-closing', 'data-reveal': true }, [
          words(h.el('p', { class: 'fd-closing__thanks', text: 'Thank you for your time.' })),
          outline('fd-closing__lines'),
          h.el('p', { class: 'fd-closing__name' }, [h.el('span', { text: 'Brand Identity Design' }), h.el('span', { text: 'JC Construction & Excavation' })]),
          h.el('p', { class: 'fd-closing__year', text: 'Brand Identity | © 2025' }),
        ]);
      case 'text':
        return h.el('p', { class: 'fd-credit', 'data-reveal': true, text: m.body });
      default:
        return h.module(m);
    }
  });
};

// ── Poster collections ─────────────────────────────────────
// Every poster opens big in the poster viewer when clicked (js/lightbox.js)
// sizes: a poster card is at most 656px tall, so it never needs a copy wider than that times its shape
const posterImg = (h, m, attrs = {}) => h.picture(m, { loading: 'lazy', sizes: `(max-width: 720px) 100vw, ${Math.round(656 * m.w / m.h)}px`, style: `aspect-ratio:${m.w} / ${m.h};--ar:${(m.w / m.h).toFixed(4)}`, 'data-lightbox': '', 'data-title': m.title, ...attrs });
const posterCount = (p) => p.modules.filter((m) => m.type === 'poster').length;

// TCSL — a red-and-white wall: two staggered columns drifting at different speeds, each poster numbered in red
DESIGNS.redwall = (p, h) => {
  const posters = p.modules.filter((m) => m.type === 'poster');
  const card = (m, i) => h.el('figure', { class: 'rw2-card', tabindex: '0', 'data-reveal': true, style: `--i:${i % 2};order:${i}` }, [
    h.el('div', { class: 'rw2-frame' }, [posterImg(h, m)]),
    h.el('figcaption', {}, [
      h.el('span', { class: 'rw2-n', text: String(i + 1).padStart(2, '0') }),
      h.el('span', { class: 'rw2-title', text: m.title }),
      m.note && h.el('span', { class: 'rw2-note', text: m.note }),
    ]),
  ]);
  return [
    h.el('header', { class: 'rw2-head', 'data-reveal': true }, [
      h.el('span', { class: 'rw2-bar', 'aria-hidden': 'true' }),
      h.el('p', { text: `${posters.length} posters` }),
    ]),
    h.el('div', { class: 'rw2-wall' }, [
      h.el('div', { class: 'rw2-col' }, posters.map(card).filter((_, i) => i % 2 === 0)),
      h.el('div', { class: 'rw2-col rw2-col--low', 'data-parallax': '-0.12' }, posters.map(card).filter((_, i) => i % 2 === 1)),
    ]),
  ];
};

// Kadalas Cafe — aqua: the posters glide past sideways like a menu board, each with its line
// A poster card past the first few starts empty (its addresses kept in data-src / data-srcset);
// the strip loads it as it slides near, so a long row isn't fetched all at once
const EAGER_CARDS = 4;
const fill = (img) => {
  if (!img.dataset.src) return;
  if (img.dataset.srcset) img.setAttribute('srcset', img.dataset.srcset);
  img.setAttribute('src', img.dataset.src);
  delete img.dataset.src; delete img.dataset.srcset;
};
// Desktop: the row is pinned and slides sideways, so a picture loads when it is within one screen
// width of the row's window. Phones: the posters stack, so a picture loads as the page nears it.
const fillAsNeeded = (strip) => {
  const imgs = [...strip.querySelectorAll('img[data-src]')];
  if (!imgs.length) return;
  if (!('IntersectionObserver' in window)) return imgs.forEach(fill);
  const wide = window.matchMedia('(min-width: 721px)');
  const pin = strip.querySelector('.dz-hs__pin');
  const watch = (root, margin, when) => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting && when()) { fill(e.target); io.unobserve(e.target); }
    }), { root, rootMargin: margin });
    imgs.forEach((img) => io.observe(img));
  };
  watch(pin, '0px 100% 0px 100%', () => wide.matches);
  watch(null, '1200px 0px 1200px 0px', () => !wide.matches);
};

DESIGNS.carousel = (p, h) => {
  const posters = p.modules.filter((m) => m.type === 'poster');
  const cardImg = (m, i, attrs) => posterImg(h, m, i < EAGER_CARDS ? { loading: 'eager', fetchpriority: 'high', ...attrs } : { defer: true, ...attrs }); // the first posters on screen come first
  const strip = h.el('section', { class: 'dz-hs kc-strip', 'data-hs': true, 'data-hs-lead': true }, [
      h.el('div', { class: 'dz-hs__pin' }, [
        h.el('div', { class: 'dz-hs__track' }, [
          ...posters.map((m, i) => h.el('figure', { class: 'kc-card', tabindex: '0', style: `--tilt:${i % 2 ? 1.6 : -1.6}deg` }, [
            // a poster with translations sits in a frame that also holds its translation boxes
            m.tr && p.translate
              ? h.el('div', { class: 'tr-wrap', style: `--ar:${(m.w / m.h).toFixed(4)}` }, [cardImg(m, i, { 'data-tr': JSON.stringify(m.tr) }), spots(m.tr)])
              : cardImg(m, i),
            h.el('figcaption', {}, [h.el('b', { text: m.title }), m.note && h.el('span', { text: m.note })]),
          ])),
        ]),
        h.el('div', { class: 'kc-nav' }, [
          h.el('button', { class: 'kc-nav__btn', type: 'button', 'data-hs-step': '-1', 'aria-label': 'Previous posters' }, [arrowSvg('M10 3L5 8l5 5')]),
          h.el('button', { class: 'kc-nav__btn', type: 'button', 'data-hs-step': '1', 'aria-label': 'More posters' }, [arrowSvg('M6 3l5 5-5 5')]),
        ]),
      ]),
    ]);
  setTimeout(() => fillAsNeeded(strip), 0); // once the strip is on the page
  return [
    // posters in another language get a Translate switch above them
    p.translate && h.el('div', { class: 'tr-bar' }, [toggleButton(p.translate)]),
    strip,
  ];
};

// Motion Design — Self-Taught: a quiet, grid-aligned case study around the untouched film.
// Every section shares one grid: number and label on the left, content on the right.
// Everything shown comes from the film itself (frames, phrases, colours, timings) or the Behance text.
const tc = (s) => `00:${String(Math.floor(s)).padStart(2, '0')}`;
DESIGNS.reel = (p, h) => {
  const out = [];
  const head = (m) => h.el('header', { class: 'rl-head' }, [
    h.el('span', { class: 'rl-head__n', text: m.n }),
    h.el('span', { class: 'rl-head__label', text: m.label }),
  ]);
  const section = (m, cls, body) => h.el('section', { class: `rl-sec ${cls}`, 'data-reveal': true }, [head(m), h.el('div', { class: 'rl-sec__body' }, body)]);
  for (const m of p.modules) {
    switch (m.type) {
      case 'film': {
        // the film, unchanged, beside its spec sheet; a thin bar under it follows the playhead
        const video = h.module({ type: 'video', src: m.src, poster: m.poster, w: m.w, h: m.h, controls: true });
        const v = video.querySelector('video');
        const fill = h.el('i');
        const time = h.el('span', { text: `00:00 / ${tc(m.duration || 30)}` });
        v?.addEventListener('timeupdate', () => {
          if (!v.duration) return;
          fill.style.transform = `scaleX(${(v.currentTime / v.duration).toFixed(4)})`;
          time.textContent = `${tc(v.currentTime)} / ${tc(v.duration)}`;
        });
        out.push(h.el('section', { class: 'rl-film', 'data-reveal': true }, [
          h.el('div', { class: 'rl-film__screen' }, [
            video,
            h.el('div', { class: 'rl-film__bar', 'aria-hidden': 'true' }, [h.el('span', { class: 'rl-film__track' }, [fill]), time]),
          ]),
          h.el('dl', { class: 'rl-film__specs' }, m.specs.map(([k, val]) => h.el('div', {}, [h.el('dt', { text: k }), h.el('dd', { text: val })]))),
        ]));
        break;
      }
      case 'statement':
        out.push(section(m, 'rl-idea', [h.el('p', { class: 'rl-idea__text', text: m.body })]));
        break;
      case 'approach':
        out.push(section(m, 'rl-approach', [h.el('ol', { class: 'rl-approach__list' }, m.items.map((it, i) => h.el('li', {}, [
          h.el('span', { class: 'rl-approach__n', text: String(i + 1).padStart(2, '0') }),
          h.el('h3', { text: it.title }),
          h.el('p', { text: it.body }),
        ])))]));
        break;
      case 'timeline': {
        // the story laid out on its own clock: each beat at the second it appears
        const beats = m.beats.map((b) => h.el('li', { class: 'rl-beat', style: `--at:${(b.t / m.duration).toFixed(4)}` }, [
          h.el('figure', {}, [h.picture({ src: b.src, alt: b.alt }, { loading: 'lazy' })]),
          h.el('span', { class: 'rl-beat__t', text: tc(b.t) }),
          h.el('b', { class: 'rl-beat__w', text: b.words }),
        ]));
        out.push(section(m, 'rl-timeline', [
          h.el('ol', { class: 'rl-timeline__beats' }, beats),
          h.el('div', { class: 'rl-timeline__ruler', 'aria-hidden': 'true' }, Array.from({ length: m.duration / 5 + 1 }, (_, i) => h.el('span', { style: `--at:${(i * 5 / m.duration).toFixed(4)}`, text: tc(i * 5) }))),
        ]));
        break;
      }
      case 'guideline':
        // the motion system, as it can be seen in the film: one rule per card, each with a small visual
        out.push(section(m, 'rl-guide', [h.el('ul', { class: 'rl-guide__grid' }, m.rules.map((r) => h.el('li', { class: `rl-rule is-${r.kind}` }, [
          h.el('div', { class: 'rl-rule__visual', 'aria-hidden': 'true' }, ruleVisual(h, r)),
          h.el('h3', { text: r.title }),
          h.el('p', { text: r.body }),
        ])))]));
        break;
      case 'frames':
        // each frame plays its moment of the film on a loop (a short silent clip), only while on screen
        out.push(section(m, 'rl-frames', [h.el('ol', { class: 'rl-frames__grid' }, m.frames.map((f) => h.el('li', {}, [
          f.clip ? clipLoop(h, f) : h.picture({ src: f.src, alt: `Frame at ${tc(f.t)}` }, { loading: 'lazy' }),
          h.el('span', { text: tc(f.t) }),
        ])))]));
        break;
      case 'text':
        out.push(h.el('section', { class: 'rl-sec rl-credits', 'data-reveal': true }, [
          head({ n: '—', label: m.heading || 'Credits' }),
          h.el('div', { class: 'rl-sec__body' }, [h.el('p', { text: m.body })]),
        ]));
        break;
      default:
        out.push(h.module(m));
    }
  }
  return out;
};
// A frame that plays its few seconds of the film on a loop; loads and plays only when on screen
let clipWatch = null;
const clipLoop = (h, f) => {
  const v = h.el('video', { class: 'rl-clip', poster: f.src, loop: true, playsinline: true, preload: 'none', 'aria-label': `Moment at ${tc(f.t)}` });
  v.muted = true;
  v.dataset.src = f.clip;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    clipWatch ??= new IntersectionObserver((entries) => entries.forEach(({ target: c, isIntersecting }) => {
      if (isIntersecting) { if (!c.src) c.src = c.dataset.src; c.play?.().catch(() => {}); }
      else c.pause();
    }), { rootMargin: '200px 0px' });
    clipWatch.observe(v);
  }
  return v;
};

// The small visual at the top of each guideline card
const ruleVisual = (h, r) => {
  switch (r.kind) {
    case 'format': return [h.el('span', { class: 'rl-v-format' }, [h.el('i', { text: '4:5' })])];
    case 'rhythm': return [h.el('span', { class: 'rl-v-rhythm' }, r.marks.map((t) => h.el('i', { style: `--at:${(t / 30).toFixed(4)}` })))];
    case 'colour': return [h.el('span', { class: 'rl-v-colour' }, r.colours.map((c) => h.el('i', { style: `background:${c}` })))];
    case 'type': return [h.el('span', { class: 'rl-v-type', text: r.sample })];
    case 'composition': return [h.el('span', { class: 'rl-v-comp' }, [h.el('i')])];
    case 'light': return [h.el('span', { class: 'rl-v-light' }, [h.el('i')])];
    default: return [];
  }
};

// Other posters — an exhibition: a dark wall, each poster lit by its own spotlight, alternating sides with its label
DESIGNS.exhibit = (p, h) => p.modules.filter((m) => m.type === 'poster').map((m, i) =>
  h.el('section', { class: `ex-room${i % 2 ? ' is-right' : ''}`, 'data-reveal': true }, [
    h.el('span', { class: 'ex-light', 'aria-hidden': 'true' }),
    h.el('figure', { class: 'ex-frame', tabindex: '0', 'data-parallax': i % 2 ? '0.05' : '-0.05' }, [posterImg(h, m)]),
    h.el('div', { class: 'ex-label' }, [
      h.el('span', { class: 'ex-n', text: `No. ${String(i + 1).padStart(2, '0')}` }),
      h.el('h2', { class: 'ex-title', text: m.title }),
      m.note && h.el('p', { class: 'ex-note', text: m.note }),
    ]),
  ]));

// ── Brochures: a booklet you can leaf through. Pages pair up as leaves (front / back);
// a leaf turns over the spine in 3D; closed, the book slides so the cover sits centred.
DESIGNS.booklet = (p, h) => p.modules.filter((m) => m.type === 'booklet').map((m) => {
  const pages = m.pages;
  const leaves = [];
  for (let i = 0; i < pages.length; i += 2) leaves.push([pages[i], pages[i + 1]]);
  const face = (pg, side) => h.el('div', { class: `bk-face is-${side}` }, pg ? [h.picture(pg, { loading: 'lazy', draggable: 'false' })] : []);
  const leafEls = leaves.map(([front, back], i) => h.el('div', { class: 'bk-leaf', style: `--z:${leaves.length - i}` }, [face(front, 'front'), face(back, 'back')]));
  const book = h.el('div', { class: 'bk-book is-closed-front', style: `--pw:${m.w};--ph:${m.h}` }, [h.el('span', { class: 'bk-shade is-left' }), h.el('span', { class: 'bk-shade is-right' }), ...leafEls]);
  const label = h.el('p', { class: 'bk-count', 'aria-live': 'polite' });
  const prev = h.el('button', { class: 'bk-arrow is-prev', type: 'button', 'aria-label': 'Previous page' }, [arrowSvg('M10 3L5 8l5 5')]);
  const next = h.el('button', { class: 'bk-arrow is-next', type: 'button', 'aria-label': 'Next page' }, [arrowSvg('M6 3l5 5-5 5')]);
  let at = 0; // leaves turned
  const FLIP = 1250; // ms, matches the leaf's transition in css/designs.css
  const show = () => {
    leafEls.forEach((l, i) => {
      const turned = i < at;
      // the stack order a resting leaf takes on its side of the spine
      const rest = turned ? i + 1 : leaves.length - i + leaves.length;
      if (l.classList.contains('is-turned') !== turned) {
        // the turning leaf stays on top of both stacks for its whole turn, so it never slips
        // under a page halfway over; it settles into its stack once it lands
        l.classList.remove('is-flipping'); void l.offsetWidth; l.classList.add('is-flipping');
        l.style.zIndex = 1000 + (++flipSeq);
        clearTimeout(l.flipTimer);
        l.flipTimer = setTimeout(() => { l.classList.remove('is-flipping'); l.style.zIndex = l.restZ; }, FLIP + 30);
      } else if (!l.classList.contains('is-flipping')) l.style.zIndex = rest;
      l.restZ = rest;
      l.classList.toggle('is-turned', turned);
    });
    // decode the next pages ahead, so a page never turns over blank
    [at - 1, at, at + 1, at + 2].forEach((i) => leafEls[i]?.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; img.decode?.().catch(() => {}); }));
    book.classList.toggle('is-closed-front', at === 0);
    book.classList.toggle('is-closed-back', at === leaves.length);
    prev.disabled = at === 0;
    next.disabled = at === leaves.length;
    label.textContent = at === 0 ? 'Front cover' : at === leaves.length ? 'Back cover' : `Pages ${at * 2} – ${at * 2 + 1}`;
  };
  let flipSeq = 0;
  const go = (d) => { at = Math.max(0, Math.min(leaves.length, at + d)); show(); };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  // click the right half to turn forward, the left half to turn back
  book.addEventListener('click', (e) => { const r = book.getBoundingClientRect(); go(e.clientX > r.left + r.width / 2 ? 1 : -1); });
  const stage = h.el('section', { class: 'bk-stage', tabindex: '0', 'aria-label': `${p.title} brochure` }, [prev, book, next]);
  stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); });
  show();
  return h.el('div', { class: 'bk-wrap' }, [stage, label, h.el('p', { class: 'bk-hint', text: 'Use the arrows, or click a page, to turn it' })]);
});
const arrowSvg = (d) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  return svg;
};

// Netradyne Icons — glyph: an icon-system presentation. The icons come from one SVG sprite (fetched once
// and kept in the page), so every icon on the page — hero, keyline anatomy, size scale, library — is the
// real artwork, coloured by the text colour around it. Diagrams are drawn live on the same 24-unit grid.
const GLYPH_FAMILIES = {
  events: 'Driving events', maps: 'Maps & tracking', fleet: 'Fleet & vehicle', devices: 'Devices & video',
  weather: 'Weather & road', status: 'Status & alerts', data: 'Interface & reports',
};
const GLYPH_SIZES = [16, 24, 32, 42, 48];
let glyphSprite = null;
const loadGlyphSprite = (src) => {
  if (glyphSprite) return glyphSprite;
  glyphSprite = fetch(src).then((r) => r.text()).then((text) => {
    const box = document.createElement('div');
    box.setAttribute('aria-hidden', 'true');
    box.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    box.innerHTML = text;
    document.body.append(box);
  }).catch(() => { glyphSprite = null; });
  return glyphSprite;
};
// one icon from the sprite
const gi = (id, cls = 'ng-i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#n-${id}"/></svg>`;
// the 24-unit pixel grid with its padding and keylines; `keys` picks which keyline shapes show
const gridSVG = ({ size = 24, icon, keys = 'all', cls = '' } = {}) => {
  const u = 24 / size; // one pixel of this size, in grid units
  const lines = [];
  for (let i = 0; i <= size; i++) lines.push(`<path d="M${i * u} 0V24M0 ${i * u}H24"/>`);
  const pad = 2;
  const shapes = {
    circle: '<circle cx="12" cy="12" r="10"/>',
    square: '<rect x="3" y="3" width="18" height="18" rx="1.5"/>',
    portrait: '<rect x="4" y="2" width="16" height="20" rx="1.5"/>',
    landscape: '<rect x="2" y="4" width="20" height="16" rx="1.5"/>',
  };
  const show = keys === 'all' ? Object.keys(shapes) : [].concat(keys || []);
  return `<svg class="ng-grid ${cls}" viewBox="-0.6 -0.6 25.2 25.2" aria-hidden="true">
    <path class="ng-grid__pad" fill-rule="evenodd" d="M0 0H24V24H0Z M${pad} ${pad}V${24 - pad}H${24 - pad}V${pad}Z"/>
    <g class="ng-grid__px">${lines.join('')}</g>
    <g class="ng-grid__axes"><path d="M12 0V24M0 12H24M0 0L24 24M24 0L0 24"/></g>
    <g class="ng-grid__keys">${Object.entries(shapes).map(([k, s]) => `<g data-key="${k}" class="${show.includes(k) ? 'is-on' : ''}">${s}</g>`).join('')}</g>
    <rect class="ng-grid__edge" x="0" y="0" width="24" height="24"/>
    ${icon ? `<use class="ng-grid__icon" href="#n-${icon}" x="0" y="0" width="24" height="24"/>` : ''}
  </svg>`;
};
const hn = (h, tag, cls, html, attrs = {}) => { const n = h.el(tag, { class: cls, ...attrs }); n.innerHTML = html; return n; };
const glyphHead = (h, n, label, title, body) => h.el('header', { class: 'ng-head', 'data-reveal': true }, [
  h.el('p', { class: 'ng-kicker' }, [h.el('span', { text: n }), h.el('span', { text: label })]),
  h.el('h2', { class: 'ng-title', text: title }),
  body && h.el('p', { class: 'ng-lede', text: body }),
]);

DESIGNS.glyph = (p, h) => {
  const icons = p.icons || [];
  const byId = Object.fromEntries(icons.map((x) => [x[0], x]));
  const has = (id) => !!byId[id];
  loadGlyphSprite(p.sprite);
  const out = [];

  /* 1 · Hero: the set streams past in four rows; one icon at a time sits large on its keyline grid */
  const heroPicks = ['weaving', 'hard-braking', 'collision-warning', 'drowsy-camera', 'following-distance', 'seat-belt', 'truck-tractor', 'snow'].filter(has);
  const rowsOf = (n) => Array.from({ length: n }, (_, r) => icons.filter((_, i) => i % n === r).map((x) => x[0]));
  const hero = hn(h, 'section', 'ng-hero full-bleed', `
    <div class="ng-hero__field" aria-hidden="true">${rowsOf(5).map((row, r) => `
      <div class="ng-hero__row" style="--dur:${110 + r * 18}s;--dir:${r % 2 ? 'reverse' : 'normal'}"><div class="ng-hero__track">${[...row, ...row].map((id) => gi(id)).join('')}</div></div>`).join('')}
    </div>
    <div class="ng-hero__in">
      <div class="ng-hero__text">
        <p class="ng-kicker"><span>00</span><span>Icon system</span></p>
        <h2 class="ng-hero__title">One grid.<br><em>${icons.length} icons.</em></h2>
        <ul class="ng-chips">${['24 × 24 px canvas', '1.5 px stroke', '1.5 px corner radius', '0.1 px on sharp joins', '16 – 48 px'].map((t) => `<li>${t}</li>`).join('')}</ul>
      </div>
      <figure class="ng-hero__plate">
        <div class="ng-hero__stage">${gridSVG({ keys: 'circle', cls: 'ng-hero__grid' })}${gi(heroPicks[0], 'ng-i ng-hero__icon')}</div>
        <figcaption><span class="ng-hero__name">${byId[heroPicks[0]]?.[1] || ''}</span><span>24 px · keyline grid</span></figcaption>
      </figure>
    </div>`);
  // the featured icon changes every few seconds while the hero is on screen
  {
    let i = 0, timer = null;
    const name = hero.querySelector('.ng-hero__name');
    const stage = hero.querySelector('.ng-hero__stage');
    // the next icon is a new layer over the grid that fades in, then the old one goes
    // (fading the <use> inside the grid leaves it half-transparent in Safari)
    const step = () => {
      i = (i + 1) % heroPicks.length;
      const old = stage.querySelectorAll('.ng-hero__icon');
      stage.insertAdjacentHTML('beforeend', gi(heroPicks[i], 'ng-i ng-hero__icon is-new'));
      old.forEach((n) => n.classList.add('is-old'));
      setTimeout(() => old.forEach((n) => n.remove()), 600);
      name.textContent = byId[heroPicks[i]][1];
    };
    new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(step, 2600);
    }).observe(hero);
  }
  out.push(hero);

  /* 2 · Intro and numbers */
  const fams = Object.keys(GLYPH_FAMILIES);
  out.push(hn(h, 'section', 'ng-intro', `
    <p class="ng-intro__text" data-reveal>A complete interface icon language for Netradyne's fleet-safety platform: the driving events its cameras detect, the vehicles and devices in a fleet, the weather on the road, and every everyday action in the dashboard. Each icon starts on the same 24 px grid, with the same stroke, the same corners and the same breathing room, so a screen full of them reads as one voice.</p>
    <dl class="ng-stats">${[[icons.length, 'icons'], [fams.length, 'families'], [GLYPH_SIZES.length, 'sizes, 16–48 px'], ['1.5', 'px stroke & radius']].map(([n, t], i) => `<div data-reveal style="--d:${i}"><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>`));

  /* 3 · Anatomy: the grid, its padding and keylines, with an icon that fits each keyline shape */
  const fits = [['circle', 'Circle', 'tick', 'Ø 20 px'], ['square', 'Square', 'calender', '18 × 18 px'], ['portrait', 'Portrait', 'fuel', '16 × 20 px'], ['landscape', 'Landscape', 'truck-tractor', '20 × 16 px']].filter((f) => has(f[2]));
  const anatomy = h.el('section', { class: 'ng-anatomy ng-paper full-bleed' }, [
    h.el('div', { class: 'ng-wrap' }, [
      glyphHead(h, '01', 'Anatomy', 'Every icon sits on the same 24 px grid.', 'A 2 px padding keeps a 20 × 20 px live area. Four keyline shapes give every icon the same optical size, whether it is round, square, tall or wide.'),
      hn(h, 'div', 'ng-anatomy__body', `
        <figure class="ng-anatomy__plate" data-reveal>${gridSVG({ icon: fits[0]?.[2], keys: fits[0]?.[0] })}
          <span class="ng-dim ng-dim--top">24 px</span><span class="ng-dim ng-dim--side">24 px</span>
        </figure>
        <div class="ng-anatomy__side">
          <div class="ng-tabs" role="tablist" aria-label="Keyline shapes">${fits.map(([k, name, , dim], i) => `<button type="button" role="tab" class="ng-tab${i ? '' : ' is-on'}" data-key="${k}" aria-selected="${!i}"><b>${name}</b><span>${dim}</span></button>`).join('')}</div>
          <ol class="ng-legend">
            <li><b>Canvas</b><span>24 × 24 px, the master size every icon is drawn at</span></li>
            <li><b>Padding</b><span>2 px on every side, never drawn into</span></li>
            <li><b>Live area</b><span>20 × 20 px for the artwork</span></li>
            <li><b>Keylines</b><span>circle, square, portrait and landscape: one optical weight for every shape</span></li>
            <li><b>Centre & diagonals</b><span>to balance the mass and align details</span></li>
          </ol>
        </div>`),
    ]),
  ]);
  anatomy.addEventListener('click', (e) => {
    const t = e.target.closest('.ng-tab');
    if (!t) return;
    const f = fits.find((x) => x[0] === t.dataset.key);
    anatomy.querySelectorAll('.ng-tab').forEach((b) => { b.classList.toggle('is-on', b === t); b.setAttribute('aria-selected', String(b === t)); });
    anatomy.querySelectorAll('.ng-anatomy__plate [data-key]').forEach((g) => g.classList.toggle('is-on', g.dataset.key === f[0]));
    anatomy.querySelector('.ng-anatomy__plate .ng-grid__icon').setAttribute('href', `#n-${f[2]}`);
  });
  out.push(anatomy);

  /* 4 · The specification, each rule drawn */
  const spec = [
    ['Stroke', '1.5 px', 'One weight for every line, outline and detail.', '<path class="ng-d-line" d="M4 12H20"/><path class="ng-d-dim" d="M21.5 11.25v1.5M20.8 11.25h1.4M20.8 12.75h1.4"/>'],
    ['Corner radius', '1.5 px', 'Every main corner is rounded by 1.5 px — never a hard 90°.', '<path class="ng-d-line" d="M6 20V9.5A3.5 3.5 0 0 1 9.5 6H20"/><circle class="ng-d-guide" cx="9.5" cy="9.5" r="3.5"/><path class="ng-d-dim" d="M9.5 9.5L7 7"/>'],
    ['Sharp joins', '0.1 px', 'Tight points (arrow tips, triangles) keep their shape, softened by 0.1 px so no edge is truly sharp.', '<path class="ng-d-line ng-d-miter" d="M5 19L12 5L19 19"/><circle class="ng-d-guide" cx="12" cy="5.9" r="2.6"/>'],
    ['Caps & joins', 'Round', 'Lines end in round caps and meet in round joins.', '<path class="ng-d-line" d="M5 16L10 8L15 14L19 9"/><circle class="ng-d-dot" cx="5" cy="16" r=".5"/><circle class="ng-d-dot" cx="19" cy="9" r=".5"/>'],
    ['Padding', '2 px', 'The outer 2 px stay empty, so icons never crowd their container.', '<rect class="ng-d-guide" x="2" y="2" width="20" height="20"/><rect class="ng-d-edge" x="0.4" y="0.4" width="23.2" height="23.2"/><rect class="ng-d-line" x="5" y="5" width="14" height="14" rx="1.5"/>'],
    ['Delivery', 'Outlined', 'Strokes are expanded to one clean filled shape that takes any colour.', '<rect class="ng-d-line" x="4" y="7" width="7" height="10" rx="1.5"/><path class="ng-d-dim" d="M12.5 12h2.5M14 10.5l1.5 1.5-1.5 1.5"/><rect class="ng-d-fill" x="16.25" y="6.25" width="5.5" height="11.5" rx="2.25"/><rect class="ng-d-hole" x="17.75" y="7.75" width="2.5" height="8.5" rx=".75"/>'],
  ];
  out.push(h.el('section', { class: 'ng-spec' }, [
    glyphHead(h, '02', 'Specification', 'Six numbers make the whole set.'),
    hn(h, 'ul', 'ng-spec__grid', spec.map(([t, v, d, art], i) => `
      <li data-reveal style="--d:${i % 3}">
        <svg class="ng-d" viewBox="0 0 24 24" aria-hidden="true">${art}</svg>
        <p class="ng-spec__v">${v}</p><h3>${t}</h3><p>${d}</p>
      </li>`).join('')),
  ]));

  /* 5 · Sizes: the same rules at 16, 24, 32, 42 and 48 px */
  const sizeIcon = has('alerts') ? 'alerts' : icons[0]?.[0];
  const fmt = (n) => String(Math.round(n * 100) / 100);
  const sizes = h.el('section', { class: 'ng-sizes ng-paper full-bleed' }, [
    h.el('div', { class: 'ng-wrap' }, [
      glyphHead(h, '03', 'Sizes', 'Drawn at 24, built to scale.', 'Every value grows with the canvas: padding is 1/12 of it, stroke and corner radius 1/16. At 16 px the details are simplified so the 1 px lines stay crisp.'),
      hn(h, 'div', 'ng-sizes__row', GLYPH_SIZES.map((s, i) => `
        <figure class="ng-size${s === 24 ? ' is-master' : ''}" data-reveal style="--d:${i}">
          <div class="ng-size__plate">${gridSVG({ size: s, icon: sizeIcon, keys: 'circle' })}</div>
          <div class="ng-size__real" style="--s:${s}px">${gi(sizeIcon)}</div>
          <figcaption>
            <b>${s} × ${s}</b>${s === 24 ? '<em>master</em>' : ''}
            <dl><div><dt>Padding</dt><dd>${fmt(s / 12)} px</dd></div><div><dt>Stroke</dt><dd>${fmt(s / 16)} px</dd></div><div><dt>Radius</dt><dd>${fmt(s / 16)} px</dd></div><div><dt>Live area</dt><dd>${fmt(s - s / 6)} px</dd></div></dl>
          </figcaption>
        </figure>`).join('')),
    ]),
  ]);
  out.push(sizes);

  /* 6 · How an icon is made: five steps, one triangle alert */
  const T = 'M10.7 4.25L3.05 17.5A1.5 1.5 0 0 0 4.35 19.75H19.65A1.5 1.5 0 0 0 20.95 17.5L13.3 4.25A1.5 1.5 0 0 0 10.7 4.25Z';
  const steps = [
    ['Find the metaphor', 'Start from what the driver or fleet manager needs to recognise at a glance, and sketch it loosely.', `<path class="ng-s-sketch" d="M12 3.6c-2.6 4.3-5.1 8.9-8.3 15.7 5.2.4 11 .2 16.6-.1C17.6 13 15 8.2 12 3.6z"/><path class="ng-s-sketch" d="M12 9.5c.1 1.6-.1 3.1.1 4.6M12 16.6v.3"/>`],
    ['Fit a keyline', 'Place it on the 24 px grid inside the keyline that matches its shape.', `<circle class="ng-s-key" cx="12" cy="12" r="10"/><rect class="ng-s-key" x="2" y="4" width="20" height="16" rx="1.5"/><path class="ng-s-sketch" d="M12 4L3 19.75H21Z"/>`],
    ['Draw at 1.5 px', 'Rebuild it with geometric lines, 1.5 px stroke, snapped to the pixel grid.', `<path class="ng-s-stroke ng-s-sharp" d="M12 4L3 19.75H21Z"/><path class="ng-s-stroke" d="M12 9.5v4.75"/><circle class="ng-s-node" cx="12" cy="4" r=".55"/><circle class="ng-s-node" cx="3" cy="19.75" r=".55"/><circle class="ng-s-node" cx="21" cy="19.75" r=".55"/>`],
    ['Round the corners', 'Main corners get a 1.5 px radius; any tight point keeps a 0.1 px softening. Caps and joins are round.', `<path class="ng-s-stroke" d="${T}"/><path class="ng-s-stroke" d="M12 9.5v4.75"/><circle class="ng-s-stroke ng-s-dotfill" cx="12" cy="16.9" r=".35"/><circle class="ng-s-r" cx="4.35" cy="18.25" r="1.5"/><circle class="ng-s-r" cx="19.65" cy="18.25" r="1.5"/><circle class="ng-s-r" cx="12" cy="5" r="1.5"/>`],
    ['Outline and test', 'Expand the strokes into one filled shape, then check it at every size, light and dark.', ''],
  ];
  const finalIcon = sizeIcon; // the same triangle alert the steps build
  out.push(h.el('section', { class: 'ng-build' }, [
    glyphHead(h, '04', 'Construction', 'From an idea to a finished icon.'),
    hn(h, 'ol', 'ng-build__steps', steps.map(([t, d, art], i) => `
      <li class="ng-step" data-reveal style="--d:${i}">
        <div class="ng-step__art">${art
          ? `<svg viewBox="-0.6 -0.6 25.2 25.2" aria-hidden="true"><g class="ng-grid__px">${Array.from({ length: 25 }, (_, k) => `<path d="M${k} 0V24M0 ${k}H24"/>`).join('')}</g>${art}</svg>`
          : `<div class="ng-step__final">${gi(finalIcon)}<div class="ng-step__sizes">${[16, 24, 32, 48].map((s) => `<span style="--s:${s}px">${gi(finalIcon)}</span>`).join('')}</div></div>`}</div>
        <p class="ng-step__n">${pad(i + 1)}</p><h3>${t}</h3><p>${d}</p>
      </li>`).join('')),
  ]));

  /* 7 · Rules: do and don't, drawn */
  const sq = (extra = '') => `<rect class="ng-r-line" x="5" y="5" width="14" height="14" rx="1.5" ${extra}/>`;
  const rules = [
    ['One stroke weight', sq(), `<path class="ng-r-line" d="M6.5 5H17.5A1.5 1.5 0 0 1 19 6.5V17.5A1.5 1.5 0 0 1 17.5 19H6.5A1.5 1.5 0 0 1 5 17.5V6.5A1.5 1.5 0 0 1 6.5 5Z"/><path class="ng-r-line ng-r-heavy" d="M19 6.5V17.5"/>`, 'Mixing weights makes one part shout.'],
    ['Rounded corners', sq(), '<rect class="ng-r-line ng-r-miter" x="5" y="5" width="14" height="14"/>', 'Hard corners break the soft family look.'],
    ['Keep the padding', sq(), '<rect class="ng-r-line" x="1.2" y="1.2" width="21.6" height="21.6" rx="1.5"/>', 'Touching the edge crowds the container.'],
    ['Round caps', '<path class="ng-r-line" d="M5 12H19"/><path class="ng-r-line" d="M5 8H14M5 16H16"/>', '<path class="ng-r-line ng-r-butt" d="M5 12H19"/><path class="ng-r-line ng-r-butt" d="M5 8H14M5 16H16"/>', 'Square ends look cut off at small sizes.'],
    ['Flat, front-on', sq(), '<path class="ng-r-line" d="M5 9L12 5.5L19 9V16L12 19.5L5 16Z"/><path class="ng-r-line" d="M5 9L12 12.5L19 9M12 12.5V19.5"/>', 'Perspective and 3D fight the flat set.'],
    ['Open counters', '<rect class="ng-r-line" x="4" y="6" width="16" height="12" rx="1.5"/><path class="ng-r-line" d="M8 10H16M8 14H13"/>', '<rect class="ng-r-line" x="4" y="6" width="16" height="12" rx="1.5"/><path class="ng-r-line" d="M8 9.6H16M8 11.1H16M8 12.6H16M8 14.1H13"/>', 'Gaps under 1.5 px fill in on screen.'],
  ];
  out.push(h.el('section', { class: 'ng-rules ng-paper full-bleed' }, [
    h.el('div', { class: 'ng-wrap' }, [
      glyphHead(h, '05', 'Rules', 'Small decisions, made once.'),
      hn(h, 'ul', 'ng-rules__grid', rules.map(([t, ok, bad, why], i) => `
        <li class="ng-rule" data-reveal style="--d:${i % 3}">
          <div class="ng-rule__pair">
            <figure class="is-do"><svg viewBox="0 0 24 24" aria-hidden="true"><rect class="ng-r-pad" x="2" y="2" width="20" height="20"/>${ok}</svg><figcaption>Do</figcaption></figure>
            <figure class="is-dont"><svg viewBox="0 0 24 24" aria-hidden="true"><rect class="ng-r-pad" x="2" y="2" width="20" height="20"/>${bad}</svg><figcaption>Don't</figcaption></figure>
          </div>
          <h3>${t}</h3><p>${why}</p>
        </li>`).join('')),
    ]),
  ]));

  /* 8 · Families: seven groups, a few icons each; a click opens that family in the library */
  out.push(h.el('section', { class: 'ng-fams' }, [
    glyphHead(h, '06', 'Families', 'Seven families, one language.'),
    hn(h, 'ul', 'ng-fams__grid', fams.map((f, i) => {
      const list = icons.filter((x) => x[2] === f);
      return `<li data-reveal style="--d:${i % 4}"><button type="button" class="ng-fam" data-fam="${f}">
        <span class="ng-fam__icons">${list.slice(0, 9).map((x) => gi(x[0])).join('')}</span>
        <span class="ng-fam__name">${GLYPH_FAMILIES[f]}</span><span class="ng-fam__n">${list.length} icons →</span>
      </button></li>`;
    }).join('') + `<li data-reveal style="--d:3"><button type="button" class="ng-fam ng-fam--all" data-fam="">
        <span class="ng-fam__big">${icons.length}</span><span class="ng-fam__name">The whole set</span><span class="ng-fam__n">Open the library →</span>
      </button></li>`),
  ]));

  /* 9 · The library: every icon, to filter, search, resize and inspect */
  const lib = h.el('section', { class: 'ng-lib full-bleed', id: 'ng-library' });
  lib.innerHTML = `
    <div class="ng-wrap">
      <div class="ng-lib__head" data-reveal>
        <p class="ng-kicker"><span>07</span><span>Library</span></p>
        <h2 class="ng-title">All ${icons.length}, in one place.</h2>
      </div>
      <div class="ng-lib__bar">
        <div class="ng-lib__fams" role="group" aria-label="Families">
          <button type="button" class="ng-pill is-on" data-fam="">All <span>${icons.length}</span></button>
          ${fams.map((f) => `<button type="button" class="ng-pill" data-fam="${f}">${GLYPH_FAMILIES[f]} <span>${icons.filter((x) => x[2] === f).length}</span></button>`).join('')}
        </div>
        <div class="ng-lib__tools">
          <label class="ng-search"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#n-search"/></svg><input type="search" placeholder="Search icons" aria-label="Search icons"></label>
          <div class="ng-seg" role="group" aria-label="Icon size">${[16, 24, 32, 48].map((s) => `<button type="button" data-size="${s}" class="${s === 32 ? 'is-on' : ''}">${s}</button>`).join('')}</div>
          <button type="button" class="ng-mode" aria-pressed="false">Light</button>
        </div>
      </div>
      <p class="ng-lib__count" aria-live="polite"></p>
      <ul class="ng-lib__grid">${icons.map(([id, label, f]) => `<li data-fam="${f}" data-q="${(label + ' ' + id).toLowerCase()}"><button type="button" class="ng-cell" data-id="${id}" title="${label}">${gi(id)}<span>${label}</span></button></li>`).join('')}</ul>
      <p class="ng-lib__none" hidden>No icon matches that search.</p>
    </div>
    <div class="ng-inspect" hidden role="dialog" aria-modal="true" aria-label="Icon details">
      <div class="ng-inspect__card">
        <button type="button" class="ng-inspect__x" aria-label="Close">×</button>
        <div class="ng-inspect__plate"></div>
        <div class="ng-inspect__info">
          <p class="ng-inspect__fam"></p><h3 class="ng-inspect__name"></h3><p class="ng-inspect__file"></p>
          <div class="ng-inspect__sizes"></div>
          <div class="ng-inspect__swatches">${['#0b1120', '#3d7bff', '#4dc260', '#e5484d', '#f5a524'].map((c) => `<button type="button" style="--c:${c}" data-c="${c}" aria-label="Colour ${c}"></button>`).join('')}</div>
        </div>
      </div>
    </div>`;
  {
    const grid = lib.querySelector('.ng-lib__grid');
    const items = [...grid.children];
    const count = lib.querySelector('.ng-lib__count');
    const none = lib.querySelector('.ng-lib__none');
    const search = lib.querySelector('input');
    let fam = '';
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let n = 0;
      for (const li of items) { const on = (!fam || li.dataset.fam === fam) && (!q || li.dataset.q.includes(q)); li.hidden = !on; if (on) n++; }
      count.textContent = `${n} ${n === 1 ? 'icon' : 'icons'}${fam ? ` · ${GLYPH_FAMILIES[fam]}` : ''}${q ? ` · “${search.value.trim()}”` : ''}`;
      none.hidden = n > 0;
    };
    const setFam = (f) => { fam = f; lib.querySelectorAll('.ng-pill').forEach((b) => b.classList.toggle('is-on', b.dataset.fam === f)); apply(); };
    lib.querySelector('.ng-lib__fams').addEventListener('click', (e) => { const b = e.target.closest('.ng-pill'); if (b) setFam(b.dataset.fam); });
    search.addEventListener('input', apply);
    lib.querySelector('.ng-seg').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      lib.querySelectorAll('.ng-seg button').forEach((x) => x.classList.toggle('is-on', x === b));
      lib.style.setProperty('--cell-i', `${b.dataset.size}px`);
    });
    const mode = lib.querySelector('.ng-mode');
    mode.addEventListener('click', () => { const light = lib.classList.toggle('is-light'); mode.setAttribute('aria-pressed', String(light)); mode.textContent = light ? 'Dark' : 'Light'; });
    // the inspector: the icon on its grid, at every size, in a few colours
    const dlg = lib.querySelector('.ng-inspect');
    let lastCell = null;
    const open = (id) => {
      const [, label, f] = byId[id];
      dlg.querySelector('.ng-inspect__plate').innerHTML = gridSVG({ icon: id, keys: 'all' });
      dlg.querySelector('.ng-inspect__fam').textContent = GLYPH_FAMILIES[f];
      dlg.querySelector('.ng-inspect__name').textContent = label;
      dlg.querySelector('.ng-inspect__file').textContent = `${id}.svg`;
      dlg.querySelector('.ng-inspect__sizes').innerHTML = GLYPH_SIZES.map((s) => `<span style="--s:${s}px">${gi(id)}<em>${s}</em></span>`).join('');
      dlg.hidden = false;
      document.addEventListener('keydown', onKey, true);
      requestAnimationFrame(() => dlg.classList.add('is-open'));
      dlg.querySelector('.ng-inspect__x').focus({ preventScroll: true });
    };
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); close(); } };
    const close = () => { document.removeEventListener('keydown', onKey, true); dlg.classList.remove('is-open'); setTimeout(() => { dlg.hidden = true; }, 250); lastCell?.focus({ preventScroll: true }); };
    grid.addEventListener('click', (e) => { const c = e.target.closest('.ng-cell'); if (c) { lastCell = c; open(c.dataset.id); } });
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg || e.target.closest('.ng-inspect__x')) return close();
      const sw = e.target.closest('[data-c]');
      if (sw) dlg.querySelector('.ng-inspect__card').style.setProperty('--ic', sw.dataset.c);
    });
    // (Escape is caught first, while the panel is open, so it closes only the panel and not the page)
    // a family card further up opens the library on that family
    lib._setFam = setFam;
    apply();
  }
  out.push(lib);
  out[out.length - 2].addEventListener('click', (e) => {
    const b = e.target.closest('.ng-fam'); if (!b) return;
    lib._setFam(b.dataset.fam);
    lib.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });

  /* 10 · In use: how the set reads inside a fleet-safety dashboard (an illustration) */
  const ev = [['hard-braking', 'Hard braking', 'Truck 214 · I-80 W', '08:42', 'high'], ['following-distance', 'Following distance', 'Van 31 · Route 9', '09:15', 'mid'], ['drowsy-camera', 'Drowsiness', 'Truck 118 · NJ Tpke', '10:03', 'high'], ['speeding-violation', 'Speeding', 'Truck 214 · US-1', '11:27', 'mid'], ['seat-belt', 'Seat belt', 'Van 12 · Depot', '12:10', 'low']].filter((x) => has(x[0]));
  const nav = ['dashboard', 'fleet-tracking', 'alerts', 'coaching-sessions', 'reports-central', 'settings'].filter(has);
  out.push(hn(h, 'section', 'ng-use', `
    <header class="ng-head" data-reveal><p class="ng-kicker"><span>08</span><span>In use</span></p><h2 class="ng-title">Built for screens that move fast.</h2>
      <p class="ng-lede">An illustration of the set in a safety dashboard: the same weight and corners at 16, 20 and 24 px, side by side with type.</p></header>
    <div class="ng-ui" data-reveal>
      <nav class="ng-ui__nav" aria-hidden="true">${nav.map((id, i) => `<span class="${i === 2 ? 'is-on' : ''}">${gi(id)}</span>`).join('')}</nav>
      <div class="ng-ui__main">
        <div class="ng-ui__top"><b>Today's events</b><span>${has('filter-icon') ? gi('filter-icon') : ''}${has('calender') ? gi('calender') : ''}${has('download') ? gi('download') : ''}</span></div>
        <ul class="ng-ui__list">${ev.map(([id, t, where, time, lvl]) => `<li><span class="ng-ui__ic is-${lvl}">${gi(id)}</span><span class="ng-ui__t"><b>${t}</b><em>${where}</em></span><span class="ng-ui__time">${has('time') ? gi('time') : ''}${time}</span><span class="ng-ui__acts">${has('video-availability') ? gi('video-availability') : ''}${has('add-to-coaching') ? gi('add-to-coaching') : ''}</span></li>`).join('')}</ul>
      </div>
      <aside class="ng-ui__side">
        <p class="ng-ui__label">Vehicle 214</p>
        <div class="ng-ui__truck">${gi(has('side-view-truck') ? 'side-view-truck' : 'vehicle')}</div>
        <ul>${[['engine-status', 'Engine', 'ok'], ['tires', 'Tyres', 'ok'], ['brakes', 'Brakes', 'warn'], ['fuel', 'Fuel 62%', 'ok'], ['synced', 'Device synced', 'ok']].filter((x) => has(x[0])).map(([id, t, s]) => `<li class="is-${s}">${gi(id)}<span>${t}</span></li>`).join('')}</ul>
      </aside>
    </div>`));

  /* 11 · Close */
  out.push(hn(h, 'section', 'ng-end full-bleed', `
    <div class="ng-end__ring" aria-hidden="true">${icons.filter((_, i) => i % 9 === 0).slice(0, 32).map((x, i, a) => `<span style="--a:${(360 / a.length) * i}deg">${gi(x[0])}</span>`).join('')}</div>
    <p class="ng-end__text" data-reveal>Thank you.<br><em>${icons.length} icons, one grid.</em></p>`));
  return out;
};

// Designs that keep a project's own presentation blocks and restyle them (see css/designs.css);
// these only add motion to the pictures
const RESTYLE = {
  // JC: headings build word by word, and each mockup arrives its own way, in turn
  blueprint: { image: { 'data-zoom': true }, duo: 'wipe', words: true,
    enter: ['wipe-up', 'tilt', 'curtain', 'wipe-left', 'blur', 'zoom-out', 'split', 'wipe-right', 'drop'] },
  cube: { image: {}, duo: 'stagger' },
  book: { image: { 'data-parallax': '0.04' }, duo: 'frame' },
};
export const restyled = (design) => RESTYLE[design];

// Artwork a restyled design adds to its page header (or null).
// Optigrise: its symbol rebuilt from nine tiles — bars, arches and squares — in the brand's colours,
// which drop into place one by one when the page opens.
const HEAD_ART = {
  cube: (el) => el('div', { class: 'og-mark', 'aria-hidden': 'true' }, [
    ['bars', 'grey'], ['arch', 'yellow'], ['box', 'silver'],
    ['open-r', 'green'], ['box', 'white'], ['open-l', 'orange'],
    ['box', 'grey'], ['cup', 'blue'], ['bars', 'silver'],
  ].map(([shape, colour], i) => el('span', { class: `og-tile is-${shape} is-${colour}`, style: `--i:${i}` }))),
};
export const headArt = (design, el) => HEAD_ART[design]?.(el) || null;

// "Make strength visible." → each word in its own mask, so the heading can rise in word by word
export function splitWords(node) {
  const text = node.textContent;
  node.textContent = '';
  node.classList.add('wsplit');
  text.split(' ').forEach((w, i) => {
    if (i) node.append(' ');
    const outer = document.createElement('span');
    outer.className = 'w';
    outer.style.setProperty('--i', i);
    const inner = document.createElement('span');
    inner.textContent = w;
    outer.append(inner);
    node.append(outer);
  });
}

/* ── Motion ─────────────────────────────────────────────────
   Runs on the page's scroll. Returns a function that stops it. */
export function startMotion(page, reduced) {
  if (reduced) return () => {};
  const par = [...page.querySelectorAll('[data-parallax]')];
  const zoom = [...page.querySelectorAll('[data-zoom]')];
  // Two kinds of sideways rows: pinned ones slide as the page scrolls past them; "own" rows
  // (data-hs-own) scroll by themselves while the mouse is over them, and leave the page alone.
  // "Lead" rows (data-hs-lead, the poster pages) are pinned rows that start in line with the page
  // text, run on until their last poster reaches the middle, and slide HS_RATE px per px of page scroll.
  const strips = [...page.querySelectorAll('[data-hs]')].map((s) => {
    const own = s.hasAttribute('data-hs-own');
    return { s, pin: s.firstElementChild, track: s.querySelector('.dz-hs__track'), own, lead: own || s.hasAttribute('data-hs-lead'), x: 0, to: 0 };
  });
  const rateOf = (st) => (st.lead && !st.own ? HS_RATE : 1);
  // Pinned step-throughs (data-steps): which step shows follows how far the page has scrolled through them
  const stepSets = [...page.querySelectorAll('[data-steps]')].map((el) => ({
    el, stage: el.firstElementChild, n: el.querySelectorAll('.cp-step-img').length, at: -1,
    parts: [...el.querySelectorAll('[data-i]')],
  }));
  // Docking (data-dock): --t runs 0 → 1 as the section crosses the screen (BET's two halves slide together)
  const docks = [...page.querySelectorAll('[data-dock]')];
  // Pinned scenes (data-progress="n"): --p runs 0 → 1 while the scene is held on screen,
  // and data-step names which of its n steps is showing (CSS animates between steps)
  const progs = [...page.querySelectorAll('[data-progress]')].map((el) => ({ el, n: Number(el.dataset.progress) || 1, at: -1 }));
  if (!par.length && !zoom.length && !strips.length && !stepSets.length && !docks.length && !progs.length) return () => {};
  const wide = window.matchMedia('(min-width: 721px)');
  let frame = 0;
  const stepUpdate = (vh) => {
    for (const ss of stepSets) {
      const live = wide.matches;
      ss.el.classList.toggle('is-live', live);
      if (!live) continue;
      const r = ss.el.getBoundingClientRect();
      const run = ss.el.offsetHeight - vh;
      const t = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      ss.el.style.setProperty('--t', t.toFixed(4));
      const at = Math.min(ss.n - 1, Math.floor(t * ss.n));
      if (at === ss.at) continue;
      ss.dir = at > ss.at ? 1 : -1;
      ss.at = at;
      ss.stage.dataset.step = at;
      ss.stage.dataset.dir = ss.dir;
      ss.stage.classList.toggle('is-final', at === ss.n - 1 && !!ss.el.querySelector('.cp-step-img.is-final'));
      ss.stage.classList.toggle('is-even', at % 2 === 1);
      ss.parts.forEach((p) => {
        const i = Number(p.dataset.i);
        p.classList.toggle('is-on', i === at);
        p.classList.toggle('is-past', i < at);
      });
      ss.el.querySelectorAll('.cp-steps__bar span').forEach((b, i) => b.classList.toggle('is-on', i <= at));
    }
  };
  // An "own" row runs on past its last poster, so that poster can travel to the middle of the screen
  const maxOf = (st) => Math.max(0, st.track.scrollWidth - st.pin.clientWidth + (st.lead ? endRoom(st) : 0));
  const endRoom = (st) => {
    const last = st.track.lastElementChild;
    return last ? Math.max(0, (st.pin.clientWidth - last.offsetWidth) / 2 - (parseFloat(getComputedStyle(st.track).paddingRight) || 0)) : 0;
  };

  // The first poster of an "own" row starts where the page's title text starts (the row runs edge to
  // edge, and the text sits in the page's column, so the gap is measured rather than set)
  const lead = page.querySelector('.proj__lead');
  const alignLead = () => {
    for (const st of strips) {
      if (!st.lead) continue;
      if (!lead || !wide.matches) { st.track.style.paddingLeft = ''; continue; }
      const rowLeft = st.track.getBoundingClientRect().left + st.x; // where the row begins, ignoring its scroll
      st.track.style.paddingLeft = `${Math.max(0, lead.getBoundingClientRect().left - rowLeft).toFixed(1)}px`;
    }
  };
  const size = () => {
    alignLead();
    for (const st of strips) {
      const { s, pin, track } = st;
      if (st.own) { st.to = Math.min(st.to, maxOf(st)); continue; }
      s.style.height = wide.matches ? `${maxOf(st) / rateOf(st) + page.clientHeight}px` : '';
    }
  };
  const update = () => {
    frame = 0;
    const vh = page.clientHeight;
    if (!vh) return;
    page.style.setProperty('--sy', page.scrollTop.toFixed(0)); // for backgrounds that move with the scroll
    for (const el of par) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${(-off).toFixed(1)}px, 0)`;
    }
    for (const el of zoom) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.transform = `scale(${(1.14 - 0.14 * Math.min(1, t * 1.6)).toFixed(4)})`;
    }
    for (const st of strips) {
      const { s, pin, track } = st;
      if (!wide.matches) { track.style.transform = ''; st.x = st.to = 0; continue; }
      if (st.own) {
        // glide towards where the wheel or arrows sent it
        st.x += (st.to - st.x) * 0.16;
        if (Math.abs(st.to - st.x) < 0.5) st.x = st.to;
        else queue();
        track.style.transform = `translate3d(${(-st.x).toFixed(1)}px, 0, 0)`;
        continue;
      }
      const r = s.getBoundingClientRect();
      const run = s.offsetHeight - vh;
      const t = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      st.x = t * maxOf(st);
      track.style.transform = `translate3d(${(-st.x).toFixed(1)}px, 0, 0)`;
    }
    stepUpdate(vh);
    for (const pr of progs) {
      if (!wide.matches) { if (pr.at !== -1) { pr.at = -1; delete pr.el.dataset.step; } continue; }
      const r = pr.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      const run = pr.el.offsetHeight - vh;
      const t = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      pr.el.style.setProperty('--p', t.toFixed(4));
      const at = Math.min(pr.n - 1, Math.floor(t * pr.n));
      if (at !== pr.at) { pr.at = at; pr.el.dataset.step = at; }
    }
    for (const d of docks) {
      const r = d.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      d.style.setProperty('--t', Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.7))).toFixed(4));
    }
  };
  const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
  const resize = () => { size(); queue(); ends(); };
  const ro = new ResizeObserver(resize);
  ro.observe(page);
  strips.forEach(({ track }) => ro.observe(track));
  // Pictures arrive late (lazy) and widen the row: measure again as each one lands, so the
  // row always reaches the last one
  const loaded = (e) => { if (e.target.tagName === 'IMG') resize(); };
  strips.forEach(({ track }) => {
    track.addEventListener('load', loaded, true);
    // the row's pictures are all needed for its width: fetch them now rather than as they slide in.
    // Poster cards (.kc-card) know their size from their shape, so they load as they come near instead.
    if (!track.querySelector('.kc-card')) track.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
  });
  const stripOf = (node) => strips.find((st) => st.s === node?.closest?.('[data-hs]'));
  // Arrows grey out at either end
  const ends = () => strips.forEach((st) => {
    const prev = st.s.querySelector('[data-hs-step="-1"]'), next = st.s.querySelector('[data-hs-step="1"]');
    if (!prev && !next) return;
    let atStart, atEnd;
    if (st.own) { atStart = st.to <= 1; atEnd = st.to >= maxOf(st) - 1; }
    else {
      const r = st.s.getBoundingClientRect(), run = st.s.offsetHeight - page.clientHeight;
      atStart = r.top >= -1; atEnd = run <= 0 || r.top <= -run + 1;
    }
    if (prev) prev.disabled = atStart;
    if (next) next.disabled = atEnd;
  });
  const moveTo = (st, to) => { st.to = Math.min(maxOf(st), Math.max(0, to)); ends(); queue(); };
  // The mouse over an "own" row scrolls the row (up/down or sideways); anywhere else the page scrolls.
  // Over the posters the page never moves, even at the ends of the row; move the mouse off them to scroll the page.
  const wheel = (e) => {
    if (!wide.matches) return;
    const st = stripOf(e.target);
    if (!st) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const px = e.deltaMode === 1 ? d * 32 : e.deltaMode === 2 ? d * page.clientHeight : d;
    if (st.own) {
      if (!e.target.closest('.dz-hs__track')) return; // beside the row (e.g. its arrows): the page scrolls
      e.preventDefault();
      // an up/down wheel goes further, so a long row doesn't take endless turns; sideways swipes stay 1:1
      moveTo(st, st.to + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? px : px * WHEEL_BOOST));
    } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault(); // a sideways swipe on a pinned row moves it too
      page.scrollTop += e.deltaX / rateOf(st);
    }
  };
  page.addEventListener('wheel', wheel, { passive: false });
  // Click and drag an "own" row with the mouse; it carries on a little after letting go
  let drag = null;
  const down = (e) => {
    if (!wide.matches || e.pointerType !== 'mouse' || e.button !== 0) return;
    const st = stripOf(e.target);
    if (!st?.lead || !e.target.closest('.dz-hs__track')) return;
    drag = { st, x: e.clientX, from: st.own ? st.to : page.scrollTop, last: e.clientX, t: e.timeStamp, v: 0, moved: false };
  };
  const move = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < DRAG_START) return;
    if (!drag.moved) { drag.moved = true; drag.st.s.classList.add('is-dragging'); }
    const dt = Math.max(1, e.timeStamp - drag.t);
    drag.v = 0.8 * ((drag.last - e.clientX) / dt) + 0.2 * drag.v; // px per ms, smoothed
    drag.last = e.clientX; drag.t = e.timeStamp;
    if (drag.st.own) {
      drag.st.to = Math.min(maxOf(drag.st), Math.max(0, drag.from - dx));
      drag.st.x = drag.st.to; // follow the hand exactly while held
      queue();
    } else page.scrollTop = drag.from - dx / rateOf(drag.st); // a pinned row: the page carries it
  };
  const up = (e) => {
    if (!drag) return;
    const { st, moved, v, t } = drag;
    drag = null;
    if (!moved) return;
    st.s.classList.remove('is-dragging');
    // a row held still before letting go stays put; a fling carries on, never more than a few posters
    const speed = e.timeStamp - t > 80 ? 0 : Math.max(-DRAG_MAX_SPEED, Math.min(DRAG_MAX_SPEED, v));
    if (st.own) moveTo(st, st.to + speed * DRAG_THROW);
    else page.scrollBy({ top: (speed * DRAG_THROW) / rateOf(st), behavior: 'smooth' });
    // the click that ends a drag doesn't open the poster
    const stop = (c) => { c.stopPropagation(); c.preventDefault(); };
    window.addEventListener('click', stop, { capture: true, once: true });
    setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 0);
  };
  const noGhost = (e) => { if (stripOf(e.target)?.lead && e.target.closest('.dz-hs__track')) e.preventDefault(); };
  page.addEventListener('pointerdown', down);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  page.addEventListener('dragstart', noGhost);
  // Arrow buttons: one poster at a time
  const stepBy = (st, dir) => {
    const card = st.track.firstElementChild;
    const step = (card?.offsetWidth || 400) + (parseFloat(getComputedStyle(st.track).columnGap) || 0);
    if (st.own) return moveTo(st, st.to + dir * step);
    // a pinned row: one pixel down the page is one pixel along; bring the row into its stretch first
    const r = st.s.getBoundingClientRect(), run = st.s.offsetHeight - page.clientHeight;
    const into = r.top > 0 ? r.top : r.top < -run ? r.top + run : 0;
    page.scrollBy({ top: into + (dir * step) / rateOf(st), behavior: 'smooth' });
  };
  const clicks = (e) => {
    const b = e.target.closest?.('[data-hs-step]');
    const st = b && stripOf(b);
    if (st) stepBy(st, Number(b.dataset.hsStep));
  };
  page.addEventListener('click', clicks);
  page.addEventListener('scroll', ends, { passive: true });
  page.addEventListener('scroll', queue, { passive: true });
  wide.addEventListener('change', resize);
  resize();
  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    strips.forEach(({ track }) => track.removeEventListener('load', loaded, true));
    page.removeEventListener('wheel', wheel);
    page.removeEventListener('pointerdown', down);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    page.removeEventListener('dragstart', noGhost);
    page.removeEventListener('click', clicks);
    page.removeEventListener('scroll', ends);
    page.removeEventListener('scroll', queue);
    wide.removeEventListener('change', resize);
  };
}
