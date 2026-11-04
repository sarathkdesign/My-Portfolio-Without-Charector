/*
  POSTER DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
  Each placeholderProject(n) below is a stand-in: replace it with a real entry.
*/

import { placeholderProject } from './placeholders.js';

export default {
  slug: 'poster-design',
  name: 'Poster Design',
  intro: '[A line about your posters.]',
  // The tile on the homepage
  // whole: the poster shows uncropped in its tile, on the `bg` colour
  cover: { src: 'assets/work/poster-design/tcsl-gandhi-jayanti/poster.jpg', alt: 'TCSL Gandhi Jayanti poster: a charkha wheel of planes, ships and trucks on red', whole: true, bg: '#df2027' },

  projects: [
    {
      slug: 'tcsl-gandhi-jayanti',
      title: 'TCSL Gandhi Jayanti',
      subtitle: 'Gandhi Jayanti poster',
      client: 'TCSL',
      year: '',
      services: ['Poster design'],
      whole: true, // the poster shows whole on its page
      thumb: { src: 'assets/work/poster-design/tcsl-gandhi-jayanti/poster.jpg', alt: 'TCSL Gandhi Jayanti poster: a charkha wheel of planes, ships and trucks on red' },
      cover: { src: 'assets/work/poster-design/tcsl-gandhi-jayanti/poster.jpg', alt: 'TCSL Gandhi Jayanti poster: a charkha wheel made of planes, ships and trucks, “Remembering Mahatma Gandhi and his timeless ideals of peace, truth and simplicity”' },
      modules: [],
    },
    {
      slug: 'tcsl-diwali',
      title: 'TCSL Diwali',
      subtitle: 'Diwali greeting poster',
      client: 'TCSL',
      year: '',
      services: ['Poster design'],
      whole: true, // the poster shows whole on its page
      thumb: { src: 'assets/work/poster-design/tcsl-diwali/poster.webp', alt: 'TCSL Diwali poster: a glowing parcel rising from a diya flame' },
      cover: { src: 'assets/work/poster-design/tcsl-diwali/poster.webp', alt: 'TCSL Diwali poster: “Let the light of joy reach every doorstep”, a glowing TCSL parcel rising from a diya flame' },
      modules: [],
    },
    {
      slug: 'tcsl-worldwide',
      title: 'TCSL Worldwide',
      subtitle: 'International shipping poster',
      client: 'TCSL',
      year: '',
      services: ['Poster design'],
      whole: true,
      thumb: { src: 'assets/work/poster-design/tcsl-worldwide/poster.jpg', alt: 'TCSL poster: a globe in the clouds circled by parcels, gifts and medicines' },
      cover: { src: 'assets/work/poster-design/tcsl-worldwide/poster.jpg', alt: 'TCSL poster: “Your next shipment, worldwide”, a globe in the clouds circled by documents, medicines, food, gifts and parcels' },
      modules: [],
    },
    placeholderProject(11),
    placeholderProject(12),
    placeholderProject(13),
    placeholderProject(14),
    placeholderProject(15),
    placeholderProject(16),
  ],
};
