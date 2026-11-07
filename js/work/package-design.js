/*
  PACKAGE DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
*/

export default {
  slug: 'package-design',
  name: 'Package Design',
  intro: '', // add a line about this category here
  cover: { src: 'assets/work/package-design/cover.jpg', alt: 'Package: Rainbow perfume boxes and bottle in warm studio light' },

  // The moving wall at the top of the category page: this category's own work
  wall: [
    { src: 'assets/work/package-design/cover.jpg', w: 901, h: 1352 },
    { src: 'assets/work/package-design/mezzcla/01.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/package-design/mezzcla/02.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/package-design/mezzcla/04.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/package-design/awa/neem-lines.jpg', w: 1280, h: 1206 },
    { src: 'assets/work/package-design/awa/deep-cleansing.jpg', w: 1280, h: 1206 },
    { src: 'assets/work/package-design/awa/neem-watercolour.jpg', w: 1280, h: 1206 },
    { src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', w: 2000, h: 1424 },
    { src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-top.jpg', w: 2000, h: 1500 },
    { src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-stack.jpg', w: 2000, h: 1500 },
  ],
  projects: [
    {
      slug: 'mezzcla',
      title: 'Mezzcla',
      subtitle: 'Bottle packaging for a smoothie range',
      client: 'Mezzcla',
      year: '',
      services: ['Package design'],
      design: 'carousel', // same gallery interface, in Mezzcla's red
      hideCover: true,
      theme: { bg: '#f6d9d4', ink: '#3b1210', accent: '#7fc28a', soft: 'rgba(59,18,16,0.7)', line: 'rgba(59,18,16,0.14)' },
      thumb: { src: 'assets/work/package-design/mezzcla/03.jpg', alt: 'Three Mezzcla smoothie bottles floating on red' },
      cover: { src: 'assets/work/package-design/mezzcla/03.jpg', alt: 'Three Mezzcla smoothie bottles floating on red' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mezzcla/03.jpg', w: 1600, h: 2000, title: 'Mezzcla range', note: 'Range', alt: 'Three Mezzcla smoothie bottles floating on red' },
        { type: 'poster', src: 'assets/work/package-design/mezzcla/01.jpg', w: 1600, h: 2000, title: 'Nuts and dates', note: 'Ingredients', alt: 'Mezzcla bottles among almonds, cashews, dates and banana' },
        { type: 'poster', src: 'assets/work/package-design/mezzcla/02.jpg', w: 1600, h: 2000, title: 'Nuts and dates', note: 'Ingredients', alt: 'Mezzcla bottles with a nut blend among almonds, cashews and dates' },
        { type: 'poster', src: 'assets/work/package-design/mezzcla/04.jpg', w: 1600, h: 2000, title: 'Fruit', note: 'Ingredients', alt: 'Mezzcla bottles among mango, watermelon, peach and blueberries' },
      ],
    },
    {
      slug: 'mothers-kitchen',
      title: 'Mothers Kitchen',
      subtitle: 'Pure ghee jar label and vegan pancake sleeve',
      client: 'Mothers Kitchen Almere',
      year: '',
      services: ['Package design'],
      design: 'carousel', // same gallery interface, in the label's purple and yellow
      hideCover: true,
      theme: { bg: '#efe6f7', ink: '#2d1450', accent: '#f2c200', soft: 'rgba(45,20,80,0.7)', line: 'rgba(45,20,80,0.14)' },
      thumb: { src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', alt: 'Mothers Kitchen Pure Ghee jar with a purple label on a white table' },
      cover: { src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', alt: 'Mothers Kitchen Pure Ghee jar with a purple label on a white table' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', w: 2000, h: 1424, title: 'Pure Ghee', note: 'Jar label', alt: 'Mothers Kitchen Pure Ghee jar with a purple label on a white table' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-top.jpg', w: 2000, h: 1500, title: 'Vegan Pancake', note: 'Tub sleeve, front', alt: 'Mothers Kitchen Vegan Pancake sleeve seen from above: a stack of pancakes with berries on a dark blue background' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-stack.jpg', w: 2000, h: 1500, title: 'Vegan Pancake', note: 'Tub sleeve, back with instructions', alt: 'Two stacked tubs wrapped in the Mothers Kitchen Vegan Pancake sleeve, showing the orange back panel with instructions' },
      ],
    },
    {
      slug: 'roban-cb',
      hidden: true, // taken off the site; delete this line to show it again
      title: 'Roban CB',
      subtitle: 'Pouch packaging for a rat-killer powder',
      client: 'PCI',
      year: '',
      services: ['Package design'],
      design: 'carousel', // same gallery interface, in the pouch's greens
      hideCover: true,
      theme: { bg: '#e2ecc9', ink: '#123a14', accent: '#f5d400', soft: 'rgba(18,58,20,0.72)', line: 'rgba(18,58,20,0.14)' },
      thumb: { src: 'assets/work/package-design/roban-cb/pouch.jpg', alt: 'Roban CB rat-killer pouch, front and back, in green' },
      cover: { src: 'assets/work/package-design/roban-cb/pouch.jpg', alt: 'Roban CB rat-killer pouch, front and back, in green' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/roban-cb/pouch.jpg', w: 2000, h: 1424, title: 'Roban CB', note: 'Front and back', alt: 'Roban CB The Rat Killer powder concentrate pouch, front and back' },
      ],
    },
    {
      slug: 'awa-naturals',
      title: 'AWA Naturals',
      subtitle: 'Facewash tube and carton packaging',
      client: 'AWA Naturals',
      year: '',
      services: ['Package design'],
      design: 'carousel', // same gallery interface as the poster pages, in AWA's fresh green
      hideCover: true,
      theme: { bg: '#e3f1dc', ink: '#1f3a17', accent: '#a8d98a', soft: 'rgba(31,58,23,0.7)', line: 'rgba(31,58,23,0.14)' },
      thumb: { src: 'assets/work/package-design/awa/neem-lines.jpg', alt: 'AWA Refreshing Neem facewash tube and carton' },
      cover: { src: 'assets/work/package-design/awa/neem-lines.jpg', alt: 'AWA Refreshing Neem facewash tube and carton' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/awa/neem-lines.jpg', w: 1280, h: 1206, title: 'Refreshing Neem Facewash', note: 'Line pattern', alt: 'AWA Refreshing Neem facewash in a green line pattern' },
        { type: 'poster', src: 'assets/work/package-design/awa/deep-cleansing.jpg', w: 1280, h: 1206, title: 'Deep Cleansing Facewash', note: 'Watercolour', alt: 'AWA Deep Cleansing facewash in blue watercolour' },
        { type: 'poster', src: 'assets/work/package-design/awa/neem-watercolour.jpg', w: 1280, h: 1206, title: 'Refreshing Neem Facewash', note: 'Watercolour', alt: 'AWA Refreshing Neem facewash in green watercolour' },
      ],
    },
  ],
};
