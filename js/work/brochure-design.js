/*
  BROCHURE DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
  Each placeholderProject(n) below is a stand-in: replace it with a real entry.
*/

import { placeholderProject } from './placeholders.js';

export default {
  slug: 'brochure-design',
  name: 'Brochure Design',
  intro: '[A line about your brochures.]',
  cover: { src: 'assets/work/brochure-design/cover.jpg', alt: 'Brochure: a profile portrait with red eye make-up and red lips' },

  projects: [
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
    placeholderProject(13),
    placeholderProject(14),
    placeholderProject(15),
    placeholderProject(16),
    placeholderProject(17),
    placeholderProject(18),
  ],
};
