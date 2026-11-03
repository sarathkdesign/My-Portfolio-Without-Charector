/*
  ─────────────────────────────────────────────────────────────
  EDIT ME — every piece of personal content lives in this file.
  Anything in [SQUARE BRACKETS] is a placeholder to replace.
  ─────────────────────────────────────────────────────────────

  Work
  · The homepage tiles, category pages and project pages are filled from
    js/work/ — one file per category (branding.js explains the format).
*/

export const content = {
  name: 'SARATH',
  role: 'Senior Designer',
  intro:
    'Senior Designer with 12+ years of experience across brand identity, digital products, motion, illustration, and print in India and Qatar. Skilled in building visual and design systems and turning complex information into clear, consistent experiences.',

  email: 'sarathkbhaskar@gmail.com', // shown on the Contact page
  phone: '+91 9995 888 650', // shown on the Contact page
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sarath-bhaskar-designer/' },
    { label: 'Behance', url: 'https://www.behance.net/SarathK' },
    { label: 'Instagram', url: 'https://www.instagram.com/we_taras/' },
  ],

  // Experience page, newest first (from the CV)
  experience: [
    {
      years: 'Mar 2021 — Present',
      role: 'Senior Visual Designer',
      company: 'Netradyne Technologies',
      location: 'Bengaluru, India',
      points: [
        'Develop and maintain visual and design systems that establish consistent visual language and reusable design elements across digital products.',
        'Lead visual design for the IDMS dashboard, translating complex Driveri device data into clear and accessible visual experiences for drivers and safety managers.',
        'Create illustrations, icons, micro-animations, splash screens, empty states, onboarding graphics, and feature visuals for Driveri and Installer applications.',
        'Define visual hierarchy, composition, typography, and visual language to improve clarity and consistency across product experiences.',
        'Collaborate with product and design teams to translate functional requirements into polished visual communication and product assets.',
      ],
    },
    {
      years: 'Feb 2018 — Jan 2021',
      role: 'Concept Designer',
      company: 'Brainwash Branding Solutions',
      location: 'Calicut, Kerala',
      points: [
        'Created 800+ visual assets including logos, brand identities, brochures, packaging, websites, and digital creatives.',
        'Developed brand concepts and visual identities for digital and print applications.',
        'Created visual content for websites and mobile applications with a focus on communication, usability, and presentation.',
        'Conducted market and design-trend research to support creative concepts, brand development, and campaigns.',
      ],
    },
    {
      years: '2014 — 2018',
      role: 'Graphic Designer',
      company: 'Amigoz Creative Solutions',
      location: 'India & Qatar',
      points: [
        'Led visual assets for marketing campaigns, social media, corporate communications, and brand materials.',
        'Produced digital and print design solutions supporting brand communication and business requirements.',
      ],
    },
  ],
  competencies: [
    'Visual Design', 'Brand Identity', 'Visual Systems', 'Design Systems', 'Motion Graphics', 'Illustration',
    'UI Visual Design', 'Micro-animations', 'Icon Design', 'Typography', 'Layout & Composition', 'Digital & Print Design',
    'Marketing Collateral', 'Packaging', 'Creative Direction', 'Design Research', 'Brand Communications',
  ],

  sound: {
    // Optional: path to a looping ambient track, e.g. 'assets/audio/ambient.mp3'.
    // Leave null to use the built-in, very quiet interface ticks only.
    // Either way, sound is off until the visitor turns it on.
    ambientSrc: null,
  },
};
