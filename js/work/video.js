/*
  VIDEO — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
  Each placeholderProject(n) below is a stand-in: replace it with a real entry.
*/

import { placeholderProject } from './placeholders.js';

export default {
  slug: 'video',
  name: 'Video',
  intro: '[A line about your video work.]',
  cover: { src: 'assets/work/video/tile-poster.jpg', alt: 'Video: a still from the showreel',
    video: 'assets/work/video/tile.mp4', videoPoster: 'assets/work/video/tile-poster.jpg' }, // the homepage tile plays this video

  projects: [
    placeholderProject(16),
    placeholderProject(17),
    placeholderProject(18),
    placeholderProject(19),
    placeholderProject(20),
    placeholderProject(21),
  ],
};
