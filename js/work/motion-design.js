/*
  MOTION DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
*/

export default {
  slug: 'motion-design',
  name: 'Motion Design',
  intro: '', // add a line about this category here
  cover: { src: 'assets/work/motion-design/tile-poster.jpg', alt: 'Motion: a still from the motion reel, glowing blue light on black',
    video: 'assets/work/motion-design/tile.mp4', videoPoster: 'assets/work/motion-design/tile-poster.jpg', videoZoom: 0.85 }, // the homepage tile plays this video

  // The moving wall at the top of the category page: this category's own work
  wall: [
    { src: 'assets/work/motion-design/tile-poster.jpg', w: 1080, h: 1350 },
    { src: 'assets/work/motion-design/self-taught/frames/03.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/07.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/11.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/13.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/16.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/18.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/20.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/25.jpg', w: 720, h: 900 },
    { src: 'assets/work/motion-design/self-taught/frames/27.jpg', w: 720, h: 900 },
  ],
  projects: [
    // From Behance: https://www.behance.net/gallery/221699357/Motion-Design-Self-Taught (published March 2025)
    {
      slug: 'self-taught',
      title: 'Motion Design — Self-Taught',
      subtitle: 'A self-taught animation, made in After Effects',
      client: '',
      year: '2025',
      services: ['Motion design', '2D animation'],
      summary: 'An animation born from curiosity and the wish to explore motion in storytelling. Every frame was crafted without formal training — through experimentation, observation and creative problem-solving, turning rough concepts into fluid motion through patience and iteration.',
      design: 'reel', // its own page design (js/designs.js): a reel built from the film's frames, phrases and colours
      hideCover: true,
      theme: { bg: '#060608', ink: '#f3f0ff', accent: '#e36497', soft: 'rgba(243,240,255,0.66)', line: 'rgba(243,240,255,0.14)' },
      thumb: { src: 'assets/work/motion-design/self-taught/poster.jpg', alt: 'A glowing eye in pink and blue light on black, from the animation' },
      cover: { src: 'assets/work/motion-design/self-taught/poster.jpg', alt: 'A glowing eye in pink and blue light on black, from the animation' },
      link: 'https://www.behance.net/gallery/221699357/Motion-Design-Self-Taught',
      modules: [
        { type: 'film', src: 'assets/work/motion-design/self-taught/motion.mp4', poster: 'assets/work/motion-design/self-taught/poster.jpg', w: 720, h: 900, duration: 30,
          specs: [['Duration', '30 s'], ['Frame rate', '30 fps'], ['Format', '4:5 · 720 × 900'], ['Tool', 'After Effects'], ['Year', '2025']] },
        // The idea and approach are Sarath's own words, from the Behance project
        { type: 'statement', n: '01', label: 'The idea', body: 'An inspired, self-taught creation, born from pure curiosity and the desire to explore motion in storytelling.' },
        { type: 'approach', n: '02', label: 'Approach', items: [
          { title: 'Curiosity', body: 'The piece began as a wish to explore motion as a way of telling a story.' },
          { title: 'Learning by doing', body: 'Every frame was crafted without formal training, through experimentation, observation and creative problem-solving.' },
          { title: 'Patience and iteration', body: 'Rough concepts became fluid motion, one pass at a time.' },
        ] },
        // Beats at the second each one appears in the film
        { type: 'timeline', n: '03', label: 'Story structure', duration: 30, beats: [
          { t: 3, words: '.taras', src: 'assets/work/motion-design/self-taught/frames/03.jpg', alt: 'The .taras mark glowing in lime on black' },
          { t: 7, words: 'Follow your passion', src: 'assets/work/motion-design/self-taught/frames/07.jpg', alt: 'A pink light streaking towards a glowing point' },
          { t: 8, words: 'Immerse yourself', src: 'assets/work/motion-design/self-taught/frames/08.jpg', alt: 'The words Immerse yourself on black' },
          { t: 13, words: 'Believe yourself', src: 'assets/work/motion-design/self-taught/frames/13.jpg', alt: 'Fine pink lines radiating from the words Believe yourself' },
          { t: 16, words: 'Focus', src: 'assets/work/motion-design/self-taught/frames/16.jpg', alt: 'The word FOCUS on a pink-to-violet gradient' },
          { t: 20, words: 'Inspire', src: 'assets/work/motion-design/self-taught/frames/20.jpg', alt: 'The word Inspire inside tilted outline frames' },
          { t: 25, words: 'Do it', src: 'assets/work/motion-design/self-taught/frames/25.jpg', alt: 'The words Do it at the centre of radiating lines' },
          { t: 27, words: 'The eye', src: 'assets/work/motion-design/self-taught/frames/27.jpg', alt: 'An outlined eye with a glowing violet iris' },
        ] },
        // The motion system as it can be seen in the film
        { type: 'guideline', n: '04', label: 'Motion guideline', rules: [
          { kind: 'format', title: 'Format', body: 'Portrait 4:5 at 720 × 900, thirty frames a second, thirty seconds long.' },
          { kind: 'rhythm', title: 'Rhythm', body: 'Eight beats in thirty seconds: a new idea every three to four seconds, with room to breathe between them.', marks: [3, 7, 8, 13, 16, 20, 25, 27] },
          { kind: 'colour', title: 'Colour', body: 'A black ground and white type; lime for the .taras mark; a pink-to-violet gradient for light and energy; red for the first eye.', colours: ['#000000', '#ffffff', '#d4ed4b', '#e36497', '#7737cc', '#d83f2d'] },
          { kind: 'type', title: 'Type', body: 'One short phrase per scene, centred, white on black. FOCUS is the one phrase set in capitals.', sample: 'Do it' },
          { kind: 'composition', title: 'Composition', body: 'A single focal point at the centre of the frame: a square, a point of light, a word, an eye.' },
          { kind: 'light', title: 'Light and form', body: 'Soft glows, radiating lines and thin outline shapes carry the movement from one phrase to the next.' },
        ] },
        { type: 'frames', n: '05', label: 'Frames', frames: [
          { src: 'assets/work/motion-design/self-taught/frames/01.jpg', t: 1, clip: 'assets/work/motion-design/self-taught/clips/01.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/03.jpg', t: 3, clip: 'assets/work/motion-design/self-taught/clips/03.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/06.jpg', t: 6, clip: 'assets/work/motion-design/self-taught/clips/06.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/07.jpg', t: 7, clip: 'assets/work/motion-design/self-taught/clips/07.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/08.jpg', t: 8, clip: 'assets/work/motion-design/self-taught/clips/08.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/09.jpg', t: 9, clip: 'assets/work/motion-design/self-taught/clips/09.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/11.jpg', t: 11, clip: 'assets/work/motion-design/self-taught/clips/11.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/13.jpg', t: 13, clip: 'assets/work/motion-design/self-taught/clips/13.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/14.jpg', t: 14, clip: 'assets/work/motion-design/self-taught/clips/14.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/15.jpg', t: 15, clip: 'assets/work/motion-design/self-taught/clips/15.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/16.jpg', t: 16, clip: 'assets/work/motion-design/self-taught/clips/16.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/18.jpg', t: 18, clip: 'assets/work/motion-design/self-taught/clips/18.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/20.jpg', t: 20, clip: 'assets/work/motion-design/self-taught/clips/20.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/22.jpg', t: 22, clip: 'assets/work/motion-design/self-taught/clips/22.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/24.jpg', t: 24, clip: 'assets/work/motion-design/self-taught/clips/24.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/25.jpg', t: 25, clip: 'assets/work/motion-design/self-taught/clips/25.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/26.jpg', t: 26, clip: 'assets/work/motion-design/self-taught/clips/26.mp4' },
          { src: 'assets/work/motion-design/self-taught/frames/27.jpg', t: 27, clip: 'assets/work/motion-design/self-taught/clips/27.mp4' },
        ] },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ],
    },
  ],
};
