/*
  BROCHURE DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
*/

export default {
  slug: 'brochure-design',
  name: 'Brochure Design',
  intro: '', // add a line about this category here
  cover: { src: 'assets/work/brochure-design/cover.jpg', alt: 'Brochure: a profile portrait with red eye make-up and red lips' },

  // The moving wall at the top of the category page: this category's own work
  wall: [
    { src: 'assets/work/brochure-design/cover.jpg', w: 1254, h: 1254 },
    { src: 'assets/work/brochure-design/truly-herbivore/page-01.jpg', w: 1400, h: 1980 },
    { src: 'assets/work/brochure-design/truly-herbivore/page-09.jpg', w: 1400, h: 1980 },
    { src: 'assets/work/brochure-design/truly-herbivore/page-20.jpg', w: 1400, h: 1980 },
    { src: 'assets/work/brochure-design/truly-herbivore/page-29.jpg', w: 1400, h: 1980 },
    { src: 'assets/work/brochure-design/initial-hygiene/page-1.jpg', w: 1400, h: 1979 },
    { src: 'assets/work/brochure-design/initial-hygiene/page-2.jpg', w: 1400, h: 1979 },
    { src: 'assets/work/brochure-design/initial-hygiene/page-4.jpg', w: 1400, h: 1979 },
  ],
  projects: [
    {
      slug: 'truly-herbivore',
      title: 'Truly Herbivore',
      subtitle: 'Menu card for a multi-cuisine veg restaurant',
      client: 'Truly Herbivore',
      year: '',
      services: ['Menu design'],
      design: 'booklet', // leaf through it like a printed menu
      hideCover: true,
      theme: { bg: '#f3ebe3', ink: '#5a3a22', accent: '#8a5a33', soft: 'rgba(90,58,34,0.7)', line: 'rgba(90,58,34,0.14)' },
      thumb: { src: 'assets/work/brochure-design/truly-herbivore/page-01.jpg', alt: 'Truly Herbivore menu cover' },
      cover: { src: 'assets/work/brochure-design/truly-herbivore/page-01.jpg', alt: 'Truly Herbivore menu cover' },
      modules: [
        { type: 'booklet', w: 1400, h: 1980, pages: [
          { src: 'assets/work/brochure-design/truly-herbivore/page-01.jpg', alt: 'Front cover: The Menu, Truly Herbivore veg restaurant' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-02.jpg', alt: 'Menu page 2' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-03.jpg', alt: 'Menu page 3' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-04.jpg', alt: 'Menu page 4' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-05.jpg', alt: 'Menu page 5' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-06.jpg', alt: 'Menu page 6' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-07.jpg', alt: 'Menu page 7' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-08.jpg', alt: 'Menu page 8' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-09.jpg', alt: 'Menu page 9' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-10.jpg', alt: 'Menu page 10' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-11.jpg', alt: 'Menu page 11' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-12.jpg', alt: 'Menu page 12' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-13.jpg', alt: 'Menu page 13' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-14.jpg', alt: 'Menu page 14' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-15.jpg', alt: 'Menu page 15' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-16.jpg', alt: 'Menu page 16' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-17.jpg', alt: 'Menu page 17' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-18.jpg', alt: 'Menu page 18' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-19.jpg', alt: 'Menu page 19' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-20.jpg', alt: 'Menu page 20' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-21.jpg', alt: 'Menu page 21' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-22.jpg', alt: 'Menu page 22' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-23.jpg', alt: 'Menu page 23' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-24.jpg', alt: 'Menu page 24' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-25.jpg', alt: 'Menu page 25' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-26.jpg', alt: 'Menu page 26' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-27.jpg', alt: 'Menu page 27' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-28.jpg', alt: 'Menu page 28' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-29.jpg', alt: 'Menu page 29' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-30.jpg', alt: 'Menu page 30' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-31.jpg', alt: 'Menu page 31' },
          { src: 'assets/work/brochure-design/truly-herbivore/page-32.jpg', alt: 'Back cover: Thank you, with the restaurant locations' },
        ] },
      ],
    },
    {
      slug: 'initial-hygiene',
      title: 'Initial Hygiene',
      subtitle: 'Product brochure for Rentokil Initial Hygiene India',
      client: 'Rentokil Initial',
      year: '',
      services: ['Brochure design'],
      design: 'booklet', // leaf through it like a printed booklet
      hideCover: true,
      theme: { bg: '#e8eef5', ink: '#123a5c', accent: '#2a78bd', soft: 'rgba(18,58,92,0.7)', line: 'rgba(18,58,92,0.14)' },
      thumb: { src: 'assets/work/brochure-design/initial-hygiene/page-1.jpg', alt: 'Initial Hygiene brochure cover' },
      cover: { src: 'assets/work/brochure-design/initial-hygiene/page-1.jpg', alt: 'Initial Hygiene brochure cover' },
      modules: [
        { type: 'booklet', w: 1400, h: 1979, pages: [
          { src: 'assets/work/brochure-design/initial-hygiene/page-1.jpg', alt: 'Front cover: a washroom with Initial hygiene products, make your premises safe and hygienic' },
          { src: 'assets/work/brochure-design/initial-hygiene/page-2.jpg', alt: 'Challenges faced by organisations, risk zones and why partner with Rentokil Initial' },
          { src: 'assets/work/brochure-design/initial-hygiene/page-3.jpg', alt: 'Menstrual hygiene, toilet and cubicle hygiene, and hand hygiene products' },
          { src: 'assets/work/brochure-design/initial-hygiene/page-4.jpg', alt: 'Back cover: hand dryers, scenting and air hygiene, Ductoscopy and contact details' },
        ] },
      ],
    },
  ],
};
