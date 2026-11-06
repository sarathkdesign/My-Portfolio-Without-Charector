/*
  VIDEO — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
*/

export default {
  slug: 'video',
  name: 'Video',
  intro: '', // add a line about this category here
  cover: { src: 'assets/work/video/tile-poster.jpg', alt: 'Video: a still from the showreel',
    video: 'assets/work/video/tile.mp4', videoPoster: 'assets/work/video/tile-poster.jpg' } , // the homepage tile plays this video

  projects: [
    {
      slug: 'taras-racing',
      title: 'Taras Racing',
      subtitle: 'A short car film',
      client: 'Taras Racing',
      year: '',
      services: ['Video'],
      hideCover: true,
      thumb: { src: 'assets/work/video/taras-racing/thumb.jpg', alt: 'A red hatchback lit by a band of light in the dark, from the film' },
      cover: { src: 'assets/work/video/taras-racing/poster.jpg', alt: 'A red hatchback driving at night, from the film' },
      modules: [
        { type: 'video', src: 'assets/work/video/taras-racing/film.mp4', poster: 'assets/work/video/taras-racing/poster.jpg', w: 1162, h: 576, controls: true },
      ],
    },
  ],
};
