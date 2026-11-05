/*
  PACKAGE DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
  Each placeholderProject(n) below is a stand-in: replace it with a real entry.
*/

import { placeholderProject } from './placeholders.js';

export default {
  slug: 'package-design',
  name: 'Package Design',
  intro: '[A line about your packaging.]',
  cover: { src: 'assets/work/package-design/cover.jpg', alt: 'Package: Rainbow perfume boxes and bottle in warm studio light' },

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
    placeholderProject(12),
    placeholderProject(13),
    placeholderProject(14),
    placeholderProject(15),
    placeholderProject(16),
    placeholderProject(17),
  ],
};
