/*
  The categories, in the order the tiles appear on the homepage.
  Each one lives in its own file in this folder; to add a category, copy a file,
  give it a new `slug` and `name`, and list it here.
*/

import branding from './branding.js';
import posterDesign from './poster-design.js';
import packageDesign from './package-design.js';
import brochureDesign from './brochure-design.js';
import motionDesign from './motion-design.js';
import iconography from './iconography.js';
import video from './video.js';

export const categories = [branding, posterDesign, packageDesign, brochureDesign, motionDesign, iconography, video];
