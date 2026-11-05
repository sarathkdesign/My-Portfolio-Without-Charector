/*
  POSTER DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
  Posters live in three collections: TCSL, Kadalas Cafe and Other Posters.
*/


export default {
  slug: 'poster-design',
  name: 'Poster Design',
  intro: '[A line about your posters.]',
  // The tile on the homepage
  // whole: the poster shows uncropped in its tile, on the `bg` colour
  cover: { src: 'assets/work/poster-design/cover.jpg', alt: 'Poster: a dark figure behind textured glass with a glowing orange band across the eyes' },

  // The moving wall at the top of the page: posters at their own shapes, so none is cropped
  wall: [
    { src: 'assets/work/poster-design/tcsl-gandhi-jayanti/poster.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/meaty-tales.jpg', w: 904, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/native-touch.jpg', w: 1414, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/international-courier.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/landing-soon.jpg', w: 1066, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/thala-vazhai-virunthu.jpg', w: 1409, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/india-new-zealand-fta.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/chicken-tales.jpg', w: 904, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/vishu-2026.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/diwali.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/key-to-tasty-tales.jpg', w: 1066, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/new-year-celebration.jpg', w: 1414, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/worldwide.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/other-posters/earthi-face-wash.jpg', w: 904, h: 1280 },
  ],
  // Three collections, each a tile on the category page with a gallery page of its own (js/designs.js)
  projects: [
    {
      slug: 'tcsl',
      title: 'TCSL',
      subtitle: 'Poster series for TCSL',
      client: 'TCSL',
      year: '',
      services: ['Poster design'],
      design: 'carousel', // same interface as every poster page, in TCSL's red
      hideCover: true,
      theme: { bg: '#f7dedb', ink: '#3b1212', accent: '#f2a59e', soft: 'rgba(59,18,18,0.7)', line: 'rgba(59,18,18,0.14)' },
      thumb: { src: 'assets/work/poster-design/tcsl/international-courier.jpg', alt: 'TCSL International Courier poster' },
      cover: { src: 'assets/work/poster-design/tcsl/gandhi-jayanti.jpg', alt: 'TCSL Gandhi Jayanti poster' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/tcsl/gandhi-jayanti.jpg', w: 1600, h: 2000, title: 'Gandhi Jayanti', alt: 'TCSL Gandhi Jayanti poster: a charkha wheel of planes, ships and trucks', note: '2nd October' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/india-new-zealand-fta.jpg', w: 1600, h: 2000, title: 'India – New Zealand FTA', alt: 'TCSL poster: India – New Zealand FTA is now in force', note: 'Industry update' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/international-courier.jpg', w: 1600, h: 2000, title: 'International Courier', alt: 'TCSL International Courier poster: your next shipment, worldwide', note: 'Service' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/diwali.jpg', w: 1600, h: 2000, title: 'Diwali', alt: 'TCSL Diwali poster: a glowing parcel rising from a diya flame', note: 'Festival greeting' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/worldwide.jpg', w: 1600, h: 2000, title: 'Worldwide Shipping', alt: 'TCSL poster: your next shipment, worldwide, a globe circled by parcels', note: 'Service' },
      ],
    },
    {
      slug: 'kadalas-cafe',
      title: 'Kadalas Cafe',
      subtitle: 'Launch posters for Kadalas Cafe',
      client: 'Kadalas Cafe',
      year: '',
      location: 'Calicut, Kerala',
      design: 'carousel', // aqua page, posters gliding past sideways
      hideCover: true, // no large poster at the top: every poster is in the strip below
      theme: { bg: '#bfe9e4', ink: '#0f3b39', accent: '#f2b35b', soft: 'rgba(15,59,57,0.7)', line: 'rgba(15,59,57,0.16)' },
      thumb: { src: 'assets/work/poster-design/kadalas-cafe/meaty-tales.jpg', alt: 'Kadalas Cafe poster: Meaty Tales to Remember' },
      cover: { src: 'assets/work/poster-design/kadalas-cafe/landing-soon.jpg', alt: 'Kadalas Cafe poster: Landing soon at Kozhikode' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/key-to-tasty-tales.jpg', w: 1066, h: 1280, title: 'The key to tasty tales', alt: 'Kadalas Cafe poster: a fork shaped like a key, opening soon', note: 'Opening soon' },
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/landing-soon.jpg', w: 1066, h: 1280, title: 'Landing soon at Kozhikode', alt: 'Kadalas Cafe poster: a chef’s hat as a hot-air balloon', note: 'Teaser' },
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/meaty-tales.jpg', w: 904, h: 1280, title: 'Meaty Tales to Remember', alt: 'Kadalas Cafe poster: a burger topped with an origami bull', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/chicken-tales.jpg', w: 904, h: 1280, title: 'Chicken Tales to Remember', alt: 'Kadalas Cafe poster: a burger topped with an origami rooster', note: 'Menu' },
      ],
    },
    {
      slug: 'other-posters',
      title: 'Other Posters',
      subtitle: 'Posters for brands, restaurants, events and festivals',
      client: '',
      year: '',
      services: ['Poster design'],
      design: 'carousel', // same interface as every poster page, in the posters' warm yellows and oranges
      hideCover: true,
      theme: { bg: '#f7e8c8', ink: '#3a2a10', accent: '#f0b44c', soft: 'rgba(58,42,16,0.7)', line: 'rgba(58,42,16,0.14)' },
      thumb: { src: 'assets/work/poster-design/other-posters/native-touch.jpg', alt: 'Native Touch Valentine’s Day poster' },
      cover: { src: 'assets/work/poster-design/other-posters/vishu-2026.jpg', alt: 'Happy Vishu 2026 poster' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/other-posters/native-touch.jpg', w: 1414, h: 2000, title: 'Native Touch', alt: 'Native Touch Valentine’s Day poster: Yes. Anyone.', note: 'Valentine’s Day' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/thala-vazhai-virunthu.jpg', w: 1409, h: 2000, title: 'Thala Vazhai Virunthu', alt: 'Thala Vazhai Virunthu poster: a South Indian meal on a banana leaf', note: 'Weekend lunch' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/vishu-2026.jpg', w: 1600, h: 2000, title: 'Vishu 2026', alt: 'Happy Vishu 2026 poster with a peacock-feather crown', note: 'Festival greeting' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/new-year-celebration.jpg', w: 1414, h: 2000, title: 'New Year Celebration', alt: 'New Year celebration flyer with ticket prices and event highlights', note: 'Event flyer' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/earthi-hair-care.jpg', w: 1280, h: 1280, title: 'earthi — cherished care', alt: 'earthi hair care poster: cherished care', note: 'Product' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/earthi-face-wash.jpg', w: 904, h: 1280, title: 'earthi — rosy fresh', alt: 'earthi facial wash poster: rosy fresh', note: 'Product' },
      ],
    },
  ],
};
