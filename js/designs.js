/* ─────────────────────────────────────────────────────────────
   Case-study designs: each branding project can name a `design`, and its
   modules are laid out in that design's own composition, in the colours,
   type and mood of the brand (`theme`). Motion (parallax, scroll zoom,
   a sideways filmstrip, stacking cards) is switched on per element with
   data attributes and driven by the page's own scroll.
   ───────────────────────────────────────────────────────────── */

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const pad = (n) => String(n).padStart(2, '0');
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
  // Aakara — an earthen editorial: serif, roman numerals, drop caps, pictures drifting in clay frames
  earthen(p, h) {
    const { list, credits } = chapters(p.modules);
    let n = 0, k = 0;
    return [
      ...list.flatMap((c) => [
        c.text && h.el('section', { class: 'ea-text', 'data-reveal': true }, [
          h.el('p', { class: 'ea-num', text: ROMAN[n++] }),
          h.el('h2', { class: 'ea-head', text: c.text.heading }),
          h.el('p', { class: 'ea-body', text: c.text.body }),
        ]),
        ...c.media.map((m) => {
          if (m.type !== 'image') return h.module(m);
          const inset = tall(m) || k++ % 3 === 1;
          return h.el('figure', { class: `ea-fig${inset ? ' is-inset' : ''}`, 'data-reveal': true }, [
            h.picture(m, { loading: 'lazy', 'data-parallax': '0.06', style: `aspect-ratio:${m.w} / ${m.h}` }),
          ]);
        }),
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
          out.push(h.el('section', { class: 'cp-band', 'aria-label': m.alt }, [
            h.el('div', { class: 'cp-band__track' }, [0, 1, 2, 3].map(() => h.picture({ src: m.src.replace(/pattern\.jpg$/, 'pattern-tile.jpg'), alt: '' }, { loading: 'lazy' }))),
          ]));
        } else if (/brandmark|typeface/.test(m.src)) {
          out.push(pic(m, `cp-float ${side++ % 2 ? 'from-right' : 'from-left'}`));
        } else out.push(pic(m, 'cp-drift'));
        break;
      case 'cards':
        out.push(h.el('section', { class: 'cp-ideas' }, [
          h.el('header', { class: 'cp-ideas__head', 'data-reveal': true }, [kicker(m), words(m.heading, 'cp-title')]),
          h.el('ol', { class: 'cp-stack' }, m.items.map((c, i) => h.el('li', { class: 'cp-card', style: `--i:${i}` }, [
            h.el('figure', { class: 'cp-card__media' }, [h.picture(c, { loading: 'lazy' })]),
            h.el('div', { class: 'cp-card__text' }, [
              c.icon && h.picture({ src: c.icon, alt: '' }, { class: 'cp-card__icon', loading: 'lazy' }),
              h.el('p', { class: 'cp-card__n', text: `${i + 1} / ${m.items.length}` }),
              h.el('h3', { class: 'cp-card__title', text: c.title }),
              h.el('p', { class: 'cp-card__body', text: c.body }),
            ]),
          ]))),
        ]));
        break;
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
const posterImg = (h, m, attrs = {}) => h.picture(m, { loading: 'lazy', style: `aspect-ratio:${m.w} / ${m.h}`, 'data-lightbox': '', 'data-title': m.title, ...attrs });
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
DESIGNS.carousel = (p, h) => {
  const posters = p.modules.filter((m) => m.type === 'poster');
  return [
    h.el('section', { class: 'dz-hs kc-strip', 'data-hs': true }, [
      h.el('div', { class: 'dz-hs__pin' }, [
        h.el('div', { class: 'dz-hs__track' }, [
          h.el('div', { class: 'kc-intro' }, [
            h.el('p', { class: 'kc-kicker', text: `${posters.length} posters` }),
            h.el('h2', { class: 'kc-title', text: p.title }),
            h.el('p', { class: 'kc-sub', text: p.subtitle }),
          ]),
          ...posters.map((m, i) => h.el('figure', { class: 'kc-card', tabindex: '0', style: `--tilt:${i % 2 ? 1.6 : -1.6}deg` }, [
            posterImg(h, m),
            h.el('figcaption', {}, [h.el('b', { text: m.title }), m.note && h.el('span', { text: m.note })]),
          ])),
        ]),
      ]),
    ]),
  ];
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
  const strips = [...page.querySelectorAll('[data-hs]')].map((s) => ({ s, pin: s.firstElementChild, track: s.querySelector('.dz-hs__track') }));
  if (!par.length && !zoom.length && !strips.length) return () => {};
  const wide = window.matchMedia('(min-width: 721px)');
  let frame = 0;

  const size = () => {
    for (const { s, pin, track } of strips) {
      s.style.height = wide.matches ? `${track.scrollWidth - pin.clientWidth + page.clientHeight}px` : '';
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
    for (const { s, pin, track } of strips) {
      if (!wide.matches) { track.style.transform = ''; continue; }
      const r = s.getBoundingClientRect();
      const run = s.offsetHeight - vh;
      const t = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      track.style.transform = `translate3d(${(-t * (track.scrollWidth - pin.clientWidth)).toFixed(1)}px, 0, 0)`;
    }
  };
  const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
  const resize = () => { size(); queue(); };
  const ro = new ResizeObserver(resize);
  ro.observe(page);
  strips.forEach(({ track }) => ro.observe(track));
  page.addEventListener('scroll', queue, { passive: true });
  wide.addEventListener('change', resize);
  resize();
  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    page.removeEventListener('scroll', queue);
    wide.removeEventListener('change', resize);
  };
}
