/*
  ─────────────────────────────────────────────────────────────
  BRANDING — one entry per project, shown in this order.
  Every category file (poster-design.js, video.js, …) works the same way.
  ─────────────────────────────────────────────────────────────

  Adding a project
  1. Put its images in a folder, e.g. assets/work/branding/aakara/
     (JPG or WebP, about 2400px wide for full-width images; keep files under ~1 MB).
  2. Add an entry below. `slug` becomes the page address: /work/branding/aakara
  3. List its content in `modules`, top to bottom, like a Behance project:

     { type: 'image', src: 'assets/work/branding/aakara/01.jpg', alt: 'What the image shows' }
     { type: 'row',   images: [{ src: '…/02.jpg', alt: '…' }, { src: '…/03.jpg', alt: '…' }] }   // side by side
     { type: 'text',  heading: 'The idea', body: 'A few lines of text.' }
     { type: 'video', src: 'assets/work/branding/aakara/reel.mp4', poster: '…/reel.jpg' }        // plays silently on a loop
     { type: 'embed', src: 'https://player.vimeo.com/video/123456789', title: 'Brand film' }       // Vimeo / YouTube

  `cover` is the thumbnail on the category page and the first image on the project page.
  Anything in [square brackets] is a placeholder to replace.
*/

import { art, placeholderModules } from './placeholders.js';

export default {
  slug: 'branding',
  name: 'Branding',
  intro: '[A line about your branding work.]',
  // The tile on the homepage and the banner at the top of this category's page
  cover: { src: 'assets/work/placeholder-06.svg', alt: 'Placeholder artwork: stacked brown, cream and black rectangles on ochre' },

  projects: [
    {
      slug: 'aakara',
      title: 'Aakara',
      subtitle: 'Brand identity design for a pottery studio',
      client: '[Client]',
      year: '2026',
      services: ['Art direction', 'Branding', 'Logo design'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(6),
      link: 'https://www.behance.net/gallery/253598323/Aakara-Brand-Identity-Design-for-a-Pottery-Studio',
      modules: placeholderModules(6),
    },
    {
      slug: 'zio-fashion',
      title: 'ZIO Fashion',
      subtitle: 'Premium fashion brand identity',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(5),
      link: '',
      modules: placeholderModules(5),
    },
    {
      slug: 'form-and-flow',
      title: 'Form & Flow',
      subtitle: 'Brand identity design',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(4),
      link: '',
      modules: placeholderModules(4),
    },
    {
      slug: 'consciousness',
      title: 'Consciousness',
      subtitle: 'Brand identity for a sound healing studio',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(7),
      link: '',
      modules: placeholderModules(7),
    },
    {
      slug: 'eva-design-group',
      title: 'EVA Design Group',
      subtitle: 'Minimal brand identity',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(9),
      link: '',
      modules: placeholderModules(9),
    },
    {
      slug: 'taras',
      title: 'taras',
      subtitle: '[One-line description]',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(3),
      link: '',
      modules: placeholderModules(3),
    },
    {
      slug: '40-feet',
      title: '40 Feet',
      subtitle: 'The Container Cafe',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(1),
      link: '',
      modules: placeholderModules(1),
    },
    {
      slug: 'initium-world',
      title: 'Initium World',
      subtitle: '[One-line description]',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(2),
      link: '',
      modules: placeholderModules(2),
    },
    {
      slug: 'debarro-interiors',
      title: 'Debarro Interiors',
      subtitle: '[One-line description]',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(8),
      link: '',
      modules: placeholderModules(8),
    },
    {
      slug: 'sidhi',
      title: 'Sidhi',
      subtitle: '[One-line description]',
      client: '[Client]',
      year: '[Year]',
      services: ['Branding'],
      summary: '[Two or three sentences about the brief and the idea behind the identity.]',
      cover: art(10),
      link: '',
      modules: placeholderModules(10),
    },
  ],
};
