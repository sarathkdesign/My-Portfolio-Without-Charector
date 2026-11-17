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
      thumb: { src: 'assets/work/package-design/mezzcla/tile.jpg', alt: 'Three Mezzcla smoothie bottles floating on red' },
      cover: { src: 'assets/work/package-design/mezzcla/03.jpg', alt: 'Three Mezzcla smoothie bottles floating on red' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mezzcla/03.jpg', w: 1600, h: 2000, title: 'Mezzcla range', note: 'Range', alt: 'Three Mezzcla smoothie bottles floating on red' },
        { type: 'poster', src: 'assets/work/package-design/mezzcla/01.jpg', w: 1600, h: 2000, title: 'Nuts and dates', note: 'Ingredients', alt: 'Mezzcla bottles among almonds, cashews, dates and banana' },
        { type: 'poster', src: 'assets/work/package-design/mezzcla/02.jpg', w: 1600, h: 2000, title: 'Nuts and dates', note: 'Ingredients', alt: 'Mezzcla bottles with a nut blend among almonds, cashews and dates' },
        { type: 'poster', src: 'assets/work/package-design/mezzcla/04.jpg', w: 1600, h: 2000, title: 'Fruit', note: 'Ingredients', alt: 'Mezzcla bottles among mango, watermelon, peach and blueberries' },
      ],
    },
    {
      slug: 'mothers-kitchen-pure-ghee',
      title: 'Mothers Kitchen Pure Ghee',
      subtitle: 'Jar label design',
      client: 'Mothers Kitchen Almere',
      year: '',
      services: ['Package design'],
      design: 'carousel', // the label’s purple and yellow
      hideCover: true,
      theme: { bg: '#efe6f7', ink: '#2d1450', accent: '#f2c200', soft: 'rgba(45,20,80,0.7)', line: 'rgba(45,20,80,0.14)' },
      thumb: { src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', alt: 'Mothers Kitchen Pure Ghee jar with a purple label on a white table' },
      cover: { src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', alt: 'Mothers Kitchen Pure Ghee jar with a purple label on a white table' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/pure-ghee.jpg', w: 2000, h: 1424, title: 'Pure Ghee', note: 'Jar label', alt: 'Mothers Kitchen Pure Ghee jar with a purple label on a white table' },
      ],
    },
    {
      slug: 'mothers-kitchen-vegan-pancake',
      title: 'Mothers Kitchen Vegan Pancake',
      subtitle: 'Tub sleeve design, front and back',
      client: 'Mothers Kitchen Almere',
      year: '',
      services: ['Package design'],
      design: 'carousel', // the sleeve’s slate and orange
      hideCover: true,
      theme: { bg: '#e4e9ee', ink: '#17212c', accent: '#f08a24', soft: 'rgba(23,33,44,0.7)', line: 'rgba(23,33,44,0.14)' },
      thumb: { src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-top.jpg', alt: 'Mothers Kitchen Vegan Pancake sleeve seen from above: a stack of pancakes with berries' },
      cover: { src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-top.jpg', alt: 'Mothers Kitchen Vegan Pancake sleeve seen from above: a stack of pancakes with berries' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-top.jpg', w: 2000, h: 1500, title: 'Vegan Pancake', note: 'Tub sleeve, front', alt: 'Mothers Kitchen Vegan Pancake sleeve seen from above: a stack of pancakes with berries on a dark blue background' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/vegan-pancake-stack.jpg', w: 2000, h: 1500, title: 'Vegan Pancake', note: 'Tub sleeve, back with instructions', alt: 'Two stacked tubs wrapped in the Mothers Kitchen Vegan Pancake sleeve, showing the orange back panel with instructions' },
      ],
    },
    {
      slug: 'mothers-kitchen-instant-foods',
      title: 'Mothers Kitchen Instant Foods',
      subtitle: 'Pouch designs for ready-made flatbreads, and the batter range poster',
      client: 'Mothers Kitchen Almere',
      year: '',
      services: ['Package design'],
      design: 'carousel', // the pouches’ warm wheat and orange
      hideCover: true,
      theme: { bg: '#f7ead6', ink: '#3a2410', accent: '#f2b31b', soft: 'rgba(58,36,16,0.7)', line: 'rgba(58,36,16,0.14)' },
      thumb: { src: 'assets/work/package-design/mothers-kitchen/tile-instant-foods-2.jpg', alt: 'Mothers Kitchen Multigrain Chapati pouch with chapatis flying out of it, on a wooden table with grains and flour' },
      cover: { src: 'assets/work/package-design/mothers-kitchen/methi-thepla.jpg', alt: 'Mothers Kitchen Methi Thepla pouch in blue and orange beside a plate of thepla' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/methi-thepla.jpg', w: 1254, h: 1254, title: 'Methi Thepla', note: 'Pouch', alt: 'Mothers Kitchen Methi Thepla pouch in blue and orange beside a plate of thepla, green chutney and fenugreek leaves' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/multigrain-chapati.jpg', w: 1199, h: 1312, title: 'Multigrain Chapati', note: 'Pouch', alt: 'Two Mothers Kitchen Multigrain Chapati pouches on a kitchen table with a stack of chapatis and a bowl of curry' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/multigrain-chapati-ad.jpg', w: 1254, h: 1254, title: 'Multigrain Chapati', note: 'Advertisement', alt: 'Mothers Kitchen Multigrain Chapati pouch with chapatis floating above it: nutritious, healthy, tasty, wholesome' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/multigrain-poori.jpg', w: 1254, h: 1254, title: 'Multigrain Poori', note: 'Pouch', alt: 'Mothers Kitchen Multigrain Poori pouch in orange beside puffed pooris and a bowl of chana masala' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/protein-batters.jpg', w: 1414, h: 2000, title: 'Protein Batters', note: 'Poster', alt: 'Mothers Kitchen Almere poster on green: Healthiest high protein batters from MKA, with the range of idly, dosa, ragi, carrot, adai and appam batter tubs' },
      ],
    },
    {
      slug: 'mothers-kitchen-batters',
      title: 'Mothers Kitchen Idli & Dosa Batters',
      subtitle: 'Pouch designs for a range of six fresh batters',
      client: 'Mothers Kitchen Almere',
      year: '',
      services: ['Package design'],
      design: 'carousel', // same gallery interface, in the range's signature blue and orange
      hideCover: true,
      theme: { bg: '#e3e8f3', ink: '#14234d', accent: '#f26a1b', soft: 'rgba(20,35,77,0.7)', line: 'rgba(20,35,77,0.14)' },
      thumb: { src: 'assets/work/package-design/mothers-kitchen/tile-batters-3.jpg', alt: 'Two white Mothers Kitchen Appam Batter family-pack pouches with appam and curry on a banana leaf, on deep green' },
      cover: { src: 'assets/work/package-design/mothers-kitchen/batter-adai.jpg', alt: 'Two blue Mothers Kitchen Adai Idly & Dosa Batter family-pack pouches on blue' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/batter-adai.jpg', w: 1199, h: 1312, title: 'Adai Idly & Dosa Batter', note: 'Family pack', alt: 'Mothers Kitchen batter packaging: two blue Adai Idly & Dosa Batter pouches with a crispy adai dosa and chutneys on the front' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/batter-carrot.jpg', w: 1199, h: 1312, title: 'Carrot Idly & Dosa Batter', note: 'Family pack', alt: 'Mothers Kitchen batter packaging: two orange Carrot Idly & Dosa Batter pouches with carrot uttapam on the front' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/batter-spinach.jpg', w: 1199, h: 1312, title: 'Spinach Idly & Dosa Batter', note: 'Family pack', alt: 'Mothers Kitchen batter packaging: two dark green Spinach Idly & Dosa Batter pouches with a bowl of spinach batter on the front' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/batter-ragi.jpg', w: 1199, h: 1312, title: 'Ragi Idly & Dosa Batter', note: 'Family pack', alt: 'Mothers Kitchen batter packaging: two brown Ragi Idly & Dosa Batter pouches with ragi paniyaram and green chutney on the front' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/batter-pesarattu.jpg', w: 1199, h: 1312, title: 'Pesarattu Batter', note: 'Family pack', alt: 'Mothers Kitchen batter packaging: two green Pesarattu Idly & Dosa Batter pouches with a green moong pesarattu on the front' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/batter-appam.jpg', w: 1199, h: 1312, title: 'Appam Batter', note: 'Family pack', alt: 'Mothers Kitchen batter packaging: two white and green Appam Batter pouches with appams and curry on a banana leaf on the front' },
      ],
    },
    {
      slug: 'mothers-kitchen-hot-spicy-mixture',
      title: 'Mothers Kitchen Hot & Spicy Mixture',
      titleLead: { text: 'Mothers Kitchen', color: '#fcba04' }, // the bag's yellow
      subtitle: 'Snack bag design',
      client: 'Mothers Kitchen Almere',
      year: '',
      services: ['Package design'],
      design: 'carousel', // the bag’s chilli red and yellow
      hideCover: true,
      theme: { bg: '#000000', ink: '#ff3324', accent: '#f6b21a', soft: 'rgba(255,51,36,0.78)', line: 'rgba(255,51,36,0.22)' }, // black, with every word in the bag's chilli red
      thumb: { src: 'assets/work/package-design/mothers-kitchen/mixture-display.jpg', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag in red, with a bowl of mixture inside a flame' },
      cover: { src: 'assets/work/package-design/mothers-kitchen/mixture-snack-bag.jpg', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag in red, with a bowl of mixture inside a flame' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/mixture-snack-bag.jpg', w: 1123, h: 1401, title: 'Hot & Spicy Mixture', note: 'Pack shot', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag: red bag on a wooden table with a bowl of mixture and a green plant' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/mixture-family-pack.jpg', w: 1123, h: 1400, title: 'Hot & Spicy Mixture', note: 'Family pack', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag: red bag on a dark table, with spilled mixture and a red chilli' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/mixture-feast.jpg', w: 1123, h: 1400, title: 'Hot & Spicy Mixture', note: 'Snack spread', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag: red bag on rustic wood, scattered with mixture, chilli powder and dried chillies' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/mixture-flat-lay.jpg', w: 1536, h: 1024, title: 'Hot & Spicy Mixture', note: 'Flat lay', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag: red bag lying on black marble with chillies and curry leaves' },
        { type: 'poster', src: 'assets/work/package-design/mothers-kitchen/mixture-display.jpg', w: 1536, h: 1024, title: 'Hot & Spicy Mixture', note: 'Display', alt: 'Mothers Kitchen Hot & Spicy Mixture snack bag: red bag standing on slate beside a small bowl of mixture' },
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
      thumb: { src: 'assets/work/package-design/awa/tile.jpg', alt: 'AWA Refreshing Neem facewash tube and carton' },
      cover: { src: 'assets/work/package-design/awa/neem-lines.jpg', alt: 'AWA Refreshing Neem facewash tube and carton' },
      modules: [
        { type: 'poster', src: 'assets/work/package-design/awa/neem-lines.jpg', w: 1280, h: 1206, title: 'Refreshing Neem Facewash', note: 'Line pattern', alt: 'AWA Refreshing Neem facewash in a green line pattern' },
        { type: 'poster', src: 'assets/work/package-design/awa/deep-cleansing.jpg', w: 1280, h: 1206, title: 'Deep Cleansing Facewash', note: 'Watercolour', alt: 'AWA Deep Cleansing facewash in blue watercolour' },
        { type: 'poster', src: 'assets/work/package-design/awa/neem-watercolour.jpg', w: 1280, h: 1206, title: 'Refreshing Neem Facewash', note: 'Watercolour', alt: 'AWA Refreshing Neem facewash in green watercolour' },
      ],
    },
  ],
};
