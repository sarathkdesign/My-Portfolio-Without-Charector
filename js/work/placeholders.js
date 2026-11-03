/*
  Stand-in artwork and text for projects that don't have their real images yet.
  Once a project has its own images, replace `cover` and `modules` with the real ones
  (see the Aakara entry in branding.js for the full format).
*/

const ART = [
  'a large orange circle on a cobalt-blue field',
  'a row of cream arches on terracotta',
  'a grid of lime dots on forest green',
  'sweeping cyan light trails on black',
  'a red block over black diagonal stripes on pink',
  'stacked brown, cream and black rectangles on ochre',
  'a glowing sun setting over a dark horizon',
  'concentric cream rings on red',
  'olive diagonal bands with a black square',
];
const pick = (n) => ((n - 1) % ART.length) + 1;

// Upright artwork (thumbnails, side-by-side rows)
export const art = (n) => ({ src: `assets/work/placeholder-0${pick(n)}.svg`, alt: `Placeholder artwork: ${ART[pick(n) - 1]}` });
// Landscape artwork (full-width images)
export const wide = (n) => ({ src: `assets/work/wide-0${pick(n)}.svg`, alt: `Placeholder artwork: ${ART[pick(n) - 1]}` });

// A typical case-study run: full-width images, a note, a side-by-side pair
export const placeholderModules = (n) => [
  { type: 'image', ...wide(n) },
  { type: 'image', ...wide(n + 1) },
  { type: 'text', heading: '[Section heading]', body: '[A few lines about this stage of the project — the brief, the idea, or how the system works.]' },
  { type: 'row', images: [art(n + 2), art(n + 3)] },
  { type: 'image', ...wide(n + 4) },
  { type: 'image', ...wide(n + 5) },
];

// A complete placeholder project, numbered so each one looks different
export const placeholderProject = (n, extra = {}) => ({
  slug: `project-${String(n).padStart(2, '0')}`,
  title: `[Project name ${String(n).padStart(2, '0')}]`,
  subtitle: '[One-line description]',
  client: '[Client]',
  year: '[Year]',
  services: ['[Service]', '[Service]'],
  summary: '[Two or three sentences about the brief and the idea behind the work.]',
  cover: art(n),
  link: '',
  modules: placeholderModules(n),
  ...extra,
});
