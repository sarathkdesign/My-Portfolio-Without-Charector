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

  `thumb` is the thumbnail on the category page (falls back to `cover`);
  `cover` is the first image on the project page.
  Anything in [square brackets] is a placeholder to replace.
*/

export default {
  slug: 'branding',
  name: 'Branding',
  intro: '', // add a line about this category here
  // The tile on the homepage. It is also one of the wall images below: opening the page,
  // the tile flies into its place in the moving wall.
  cover: { src: 'assets/work/branding/cover.jpg', alt: 'Red tote bag reading BRANDING, carried over a dark coat' },
  // The moving wall at the top of this page: two rows gliding in opposite directions.
  // Add or remove images here; w and h are each image's pixel size.
  wall: [
    { src: 'assets/work/branding/wall/01.jpg', w: 666, h: 1000, brand: 'zio' },
    { src: 'assets/work/branding/wall/02.jpg', w: 1333, h: 1000, brand: 'aakara' },
    { src: 'assets/work/branding/wall/03.jpg', w: 1500, h: 1000, brand: 'bet' },
    { src: 'assets/work/branding/wall/04.jpg', w: 1428, h: 1000, brand: 'zio' },
    { src: 'assets/work/branding/wall/05.jpg', w: 1333, h: 1000, brand: 'aakara' },
    { src: 'assets/work/branding/wall/06.jpg', w: 1500, h: 1000, brand: 'bet' },
    { src: 'assets/work/branding/wall/07.jpg', w: 1050, h: 1500, brand: 'zio' },
    { src: 'assets/work/branding/wall/08.jpg', w: 1595, h: 1000, brand: 'aakara' },
    { src: 'assets/work/branding/wall/09.jpg', w: 1500, h: 1000, brand: 'bet' },
    { src: 'assets/work/branding/wall/10.jpg', w: 777, h: 1000, brand: 'zio' },
    { src: 'assets/work/branding/wall/11.jpg', w: 1330, h: 1000, brand: 'frame' },
    { src: 'assets/work/branding/wall/12.jpg', w: 1500, h: 1000, brand: 'web' },
    { src: 'assets/work/branding/wall/13.jpg', w: 1500, h: 1000, brand: 'web' },
  ],

  projects: [
    // ── From public/workd for website 2/Branding/INDSOFT — the brand mark presentation.
    //    Its own page design: statement, pinned anatomy, gradient field, rounded bento, closing line
    {
      slug: 'indsoft',
      title: 'IndSoft',
      subtitle: 'Brand mark for an IT consulting and project management company',
      client: 'IndSoft',
      year: '',
      services: ['Brand mark', 'Logo design', 'Brand identity'],
      summary: 'A brand mark for a company with 25 years in IT consulting and project management: one confident stroke that holds a handshake, a tick, a rising arrow and a happy client.',
      theme: {
        bg: '#000000', ink: '#ffffff', accent: '#14e88f', soft: 'rgba(255,255,255,0.68)',
        font: "'Rubik', var(--text)",
        fontHref: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap',
        // sampled from the brand's gradient background
        gradient: 'linear-gradient(95deg, #01ffb1 0%, #14e88f 30%, #0197fe 72%, #7d5bff 100%)',
        mesh: 'radial-gradient(110% 90% at 0% 0%, #01ffb1 0%, rgba(1,255,177,0) 58%), radial-gradient(90% 85% at 100% 0%, #0197fe 0%, rgba(1,151,254,0) 62%), radial-gradient(70% 70% at 25% 100%, #3b0500 0%, rgba(59,5,0,0) 72%), radial-gradient(70% 75% at 80% 100%, #3b0b42 0%, rgba(59,11,66,0) 72%), #050505',
      },
      thumb: { src: 'assets/work/branding/indsoft/thumb.jpg', alt: 'IndSoft billboard on a stone wall' },
      cover: { src: 'assets/work/branding/indsoft/cover.jpg', alt: 'IndSoft brand mark on its green-to-blue gradient' },
      modules: [
        {
          type: 'statement',
          kicker: 'IndSoft / Brand mark',
          heading: 'Twenty-five years of clients who *got a yes.*',
          pair: [
            { tag: '→ The problem', text: 'IndSoft has spent 25 years in IT consulting and project management. Tech marks tend to be interchangeable — swooshes, circuits, globes — and say nothing about what clients actually get. This one had to carry what IndSoft is valued for: trusted partnership, projects delivered, and growth on both sides of the table.' },
            { tag: '→ The answer', text: 'One continuous mark that reads as a handshake, a tick and a rising arrow at once, with a happy client hidden in the negative space. Four ideas, drawn as a single confident gesture, lit in a vivid signal green.' },
          ],
        },
        {
          type: 'anatomy',
          kicker: 'Logo logic',
          heading: 'Four ideas, *one mark.*',
          mark: { src: 'assets/work/branding/indsoft/symbol.jpg', alt: 'The IndSoft symbol' },
          steps: [
            { src: 'assets/work/branding/indsoft/logic-handshake.jpg', alt: 'Two people shaking hands', part: 'assets/work/branding/indsoft/part-handshake.jpg',
              tag: 'Person 01 + Person 02', title: 'The handshake', body: 'Two strokes meet like two people shaking hands: the strong relationships and trust between IndSoft and its clients, and its commitment to their success.' },
            { src: 'assets/work/branding/indsoft/logic-tick.jpg', alt: 'A hand ticking off steps toward a flag', part: 'assets/work/branding/indsoft/part-tick.jpg',
              tag: 'Tick mark', title: 'The tick', body: 'Success in project management and IT consulting — quality assurance, and a track record of delivering on time.' },
            { src: 'assets/work/branding/indsoft/logic-arrow.jpg', alt: 'A person facing a giant upward arrow', part: 'assets/work/branding/indsoft/part-arrow.jpg',
              tag: 'Upward arrow', title: 'The rising arrow', body: 'Growth and progress across a 25-year journey, and the belief that driving customer success is what drives IndSoft’s own growth.' },
            { src: 'assets/work/branding/indsoft/logic-client.jpg', alt: 'A person with both hands raised in a doorway of light', part: 'assets/work/branding/indsoft/part-client.jpg',
              tag: 'Happy person', title: 'The happy client', body: 'In the empty space sits a hidden figure raising both hands: a client whose expectations were met, and exceeded.' },
          ],
        },
        {
          type: 'gradient',
          kicker: 'Colour',
          heading: 'Signal green on a moving field.',
          body: 'The mark glows in a green-to-teal gradient. Behind it, the brand field runs from that green into sky blue, then down into ember and violet on near-black — the energy of technology on a calm, dark base.',
          colours: [
            { hex: '#01FFB1', name: 'Signal green' }, { hex: '#14E88F', name: 'Mark green' }, { hex: '#0197FE', name: 'Sky blue' },
            { hex: '#3B0B42', name: 'Violet' }, { hex: '#3B0500', name: 'Ember' }, { hex: '#050505', name: 'Night' },
          ],
        },
        {
          type: 'bento',
          kicker: 'Brand mark versions',
          line: 'Primary and secondary marks on black and white, and lockups on solid and gradient shapes.',
          items: [
            { src: 'assets/work/branding/indsoft/mark-black.jpg', alt: 'Primary brand mark on black', caption: 'Primary · black' },
            { src: 'assets/work/branding/indsoft/mark-white.jpg', alt: 'Primary brand mark on white', caption: 'Primary · white' },
            { src: 'assets/work/branding/indsoft/secondary-black.jpg', alt: 'Secondary stacked brand mark on black', caption: 'Secondary · black', span: 'third' },
            { src: 'assets/work/branding/indsoft/secondary-white.jpg', alt: 'Secondary stacked brand mark on white', caption: 'Secondary · white', span: 'third' },
            { src: 'assets/work/branding/indsoft/cover.jpg', alt: 'Primary brand mark on the gradient', caption: 'On gradient' },
            { src: 'assets/work/branding/indsoft/lockups.jpg', alt: 'Lockups on black and gradient shapes, and a vertical lockup', caption: 'Lockups', span: 'wide' },
          ],
        },
        {
          type: 'bento',
          kicker: 'In use',
          line: 'The mark scales up into a graphic: cropped large, glowing across billboards, standees and screens.',
          items: [
            { src: 'assets/work/branding/indsoft/billboard.jpg', alt: 'IndSoft billboard on a stone wall', caption: 'Billboard', span: 'wide' },
            { src: 'assets/work/branding/indsoft/standee.jpg', alt: 'IndSoft standee outside an office building', caption: 'Standee', span: 'tall' },
            { src: 'assets/work/branding/indsoft/laptop.jpg', alt: 'IndSoft screen on a laptop', caption: 'Laptop' },
            { src: 'assets/work/branding/indsoft/tablet.jpg', alt: 'IndSoft screen on a tablet', caption: 'Tablet' },
          ],
        },
        {
          type: 'closing',
          mark: { src: 'assets/work/branding/indsoft/symbol.jpg', alt: '' },
          heading: 'Delivering IT solutions *with excellence.*',
          kicker: 'IndSoft — brand mark',
        },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ],
    },
    // ── From public/workd for website 2/Branding — presented with the brand’s own colours (theme)
    {
      "slug": "jc-construction",
      "design": "foundation",
      "title": "JC Construction",
      "subtitle": "Brand identity for a Philadelphia concrete and excavation company",
      "client": "JC Construction & Excavation",
      "year": "2025",
      "services": [
        "Brand identity",
        "Logo design",
        "Brand guidelines",
        "Brand applications"
      ],
      "summary": "An identity for “The Concrete Company in Philadelphia”: a mark built like a structure, and a system that works on helmets, trucks, hoardings and screens.",
      "theme": {
        "bg": "#023a31",
        "ink": "#f3ede5",
        "accent": "#c4946f",
        "soft": "rgba(243,237,229,0.72)"
      ,
        "font": "'Poppins', var(--text)",
        "fontHref": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      },
      "thumb": {
        "src": "assets/work/branding/jc-construction/behance/business-card.jpg",
        "alt": "JC Construction business card on a studded steel plate"
      },
      "cover": {
        "src": "assets/work/branding/jc-construction/cover.jpg",
        "alt": "JC Construction & Excavation logo over a city skyline"
      },
      "modules": [
        { type: 'film', src: 'reveal.mp4', poster: 'reveal-poster.jpg' },
        { type: 'plate', src: 'truck.jpg', alt: 'JC Construction truck: we shape the world that shapes you', labels: ['Brand Identity | © 2025', '.taras'], enter: 'curtain' },
        { type: 'intro', meta: ['Brand Identity | © 2025', 'Client: JC Construction & Excavation | USA'], title: 'JC Construction & Excavation | USA', quote: '“We shape the world that shapes you.”',
          body: 'At JC Construction, concrete isn’t just a material it’s the foundation of everything we build, stand for, and believe in. Based in Philadelphia, we’ve grown into one of the city’s most trusted concrete specialists by doing one thing consistently: delivering work that lasts. From the first cut into the ground to the final, smooth finish, our team handles every stage of concrete construction with precision. Our reputation as “The Concrete Company in Philadelphia” is built on reliability, craftsmanship, and a commitment to doing the job right, not just fast.' },
        { type: 'mood', body: ['The mood board for JC Constructions captures the essence of strength, trust, and timeless craftsmanship. It blends modern architectural precision with raw construction authenticity, symbolizing the company’s balance between innovation and reliability.', 'The visual language draws inspiration from steel structures, concrete textures, and clean geometric forms, representing stability and integrity. Warm earthy tones and deep grays emphasize a grounded, professional identity while subtle accents of blue suggest vision, progress, and trust.'] },
        { type: 'concept', body: ['From the simple forms of J and C emerges a structure steady, balanced, and ascending. Each segment aligns like beams in construction, reflecting the precision and discipline behind every project.', 'This union of letters becomes more than initials; it becomes a symbol of strength, order, and craftsmanship a mark built brick by brick, just as JC Constructions builds trust through every foundation it lays.'] },
        { type: 'inspired', body: ['The logo draws its form from the towering silhouettes of modern architecture clean lines, confident stance, and a sense of upward momentum.', 'Like sunlight catching the edges of a skyscraper, the symbol embodies growth, stability, and ambition. It reflects how JC Constructions transforms inspiration from real structures into a timeless identity that stands tall a reflection of buildings that rise, and a brand that endures.'] },
        { type: 'nature', body: ['The architecture of a leaf is nature’s engineering masterpiece an intricate network where every vein serves structure, purpose, and flow. This natural design achieves what every great construction strives for: efficiency, strength, and balance.', 'At JC Construction, we draw inspiration from this organic intelligence crafting structures that echo the same harmony found in nature. Every line, every joint, and every foundation is built with precision, shaped by purpose, and inspired by life itself.'] },
        { type: 'film', src: 'intro-motion.mp4', poster: 'intro-motion-poster.jpg' },
        { type: 'significance', body: ['The JC Constructions logo is built on the foundation of strength, structure, and trust the core pillars of the construction industry. The design integrates the initials ‘J’ and ‘C’ in a bold, geometric form, symbolizing architectural precision and engineering excellence.', 'The simplicity of the logo ensures it remains instantly recognizable across various mediums from on site signage to global digital platforms. Its distinctive form allows it to stand out in a crowded market.', 'The modern yet timeless style reflects JC Construction’s commitment to building not just structures, but lasting relationships and global trust.'] },
        { type: 'benefits', items: [['Strong Visual Identity', 'The bold, minimal design ensures visibility and memorability in both print and digital media.'], ['Universal Appeal', 'The geometric form and clean typography transcend language barriers, giving the logo a global aesthetic.'], ['Professional Consistency', 'The cohesive visual structure builds trust and communicates expertise across every brand touchpoint.'], ['Scalability', 'Works effectively on any scale — from helmets and blueprints to billboards ensuring brand consistency worldwide.']] },
        { type: 'plate', src: 'building.jpg', alt: 'A modern building beside a tall green sign: we shape the world that shapes you', enter: 'wipe' },
        { type: 'clearspace', items: ['Clearspace is the term for a specific amount of space that a logo must have on all sides, no matter where it is used. The reason for clear space is to ensure that a logo maximizes visibility and impact.', 'When our mark is used alone, proper spatial margins ensure a strong presence and show confidence and respect for the brand.'] },
        { type: 'plate', src: 'typography.jpg', alt: 'Typography: Aileron in Light, Regular, Semi Bold and Bold', enter: 'columns', still: true },
        { type: 'tone', notes: [
          { title: 'Deep Green', body: 'The deep green background conveys earthiness and connection to nature, aligning perfectly with excavation and construction industries rooted in the ground itself. It also gives a premium, trustworthy and modern feel.' },
          { title: 'Muted Clay', body: 'This muted, earthy tone resembles natural soil and raw materials, capturing the tactile essence of construction. It symbolizes reliability, skill, and attention to detail while adding a human, approachable warmth to the otherwise strong and structured identity.' },
          { title: 'Colour Relationship', body: ['The deep green and white form a crisp, trustworthy contrast, ideal for legibility and brand recognition.', 'The muted clay tone complements the deep green naturally, creating a visual dialogue between earth and structure a literal representation of construction and excavation.', 'Together, the palette evokes strength, warmth, and reliability, projecting JC Construction & Excavation as a company that builds with integrity and care.'] },
        ] },
        { type: 'film', src: 'shape-motion.mp4', poster: 'shape-motion-poster.jpg' },
        { type: 'plate', src: 'business-card.jpg', alt: 'Business card on a studded steel plate', overlay: 'Solid Foundations. Stronger Futures.', at: 'top-left', enter: 'zoom' },
        { type: 'plate', src: 'stationery.jpg', alt: 'Letterhead, business cards and folder on green', enter: 'drop' },
        { type: 'plate', src: 'kit.jpg', alt: 'Helmets, T-shirt and tote in a copper frame around the badge', enter: 'tiles', still: true },
        { type: 'plate', src: 'tote.jpg', alt: 'Green branded tote bag', enter: 'wipe' },
        { type: 'plate', src: 'mug.jpg', alt: 'Branded mug in raking light', enter: 'light' },
        { type: 'plate', src: 'keychain.jpg', alt: 'Branded keychain in a jeans pocket', overlay: 'Engineering the impossible.', at: 'bottom-right', enter: 'rise' },
        { type: 'plate', src: 'cards.jpg', alt: 'Tape, hoarding, cap, excavator, brochure and container cards, and a billboard in an underpass', enter: 'tiles', still: true },
        { type: 'film', src: 'impossible-motion.mp4', poster: 'impossible-motion-poster.jpg' },
        { type: 'plate', src: 'precision.jpg', alt: 'Billboard in a concrete underpass', overlay: 'Precision built. Purpose driven.', at: 'bottom-left', enter: 'light' },
        { type: 'plate', src: 'website.jpg', alt: 'Website: solid foundations, stronger futures', enter: 'zoom', still: true, tone: 'light' },
        { type: 'plate', src: 'gantry.jpg', alt: 'Highway gantry billboard: solid foundations, stronger futures', enter: 'curtain' },
        { type: 'closing' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ]
    },
    // ── From public/workd for website 2/Branding — presented with the brand’s own colours (theme)
    {
      "slug": "optigrise",
      "hidden": true, // taken off the site; set to false (or delete this line) to show it again
      "design": "cube",
      "title": "Optigrise",
      "subtitle": "Brand identity for a digital and technology consultancy",
      "client": "Optigrise",
      "year": "",
      "services": [
        "Brand identity",
        "Logo design",
        "Brand guidelines",
        "Brand applications"
      ],
      "summary": "A problem-solver’s identity for a consultancy working across Digital, Technology, Consulting, Infrastructure and Next Gen Services, from the US and India.",
      "theme": {
        "bg": "#073c59",
        "ink": "#ffffff",
        "accent": "#fad200",
        "soft": "rgba(255,255,255,0.74)"
      },
      "thumb": {
        "src": "assets/work/branding/optigrise/thumb-reception.jpg",
        "alt": "Optigrise reception desk and meeting room glass with the symbol pattern"
      },
      "cover": {
        "src": "assets/work/branding/optigrise/cover.jpg",
        "alt": "Optigrise symbol as a colourful 3D metal sign"
      },
      "hideCover": true, // the 3D sign photo is left off the page
      "modules": [
        {
          "type": "chapter",
          "n": "01",
          "label": "The brief",
          "heading": "Stand apart in a sea of blue swooshes.",
          "body": [
            "Optigrise offers end-to-end solutions for its clients’ toughest challenges through a consultative approach, across Digital, Technology, Consulting, Infrastructure and Next Gen Services — IoT, cloud, data analytics and more — from its headquarters in the US and a global solutions hub in India.",
            "Technology consultancies tend to look alike. Optigrise needed a mark with an idea in it: one that says “we solve hard problems” and holds five service lines together."
          ]
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/mark.jpg",
              "alt": "Optigrise primary brand mark",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/mark-inverse.jpg",
              "alt": "Optigrise primary brand mark on navy",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "split",
          "n": "02",
          "label": "The idea",
          "heading": "A Rubik’s cube: the universal symbol of problem solving.",
          "accent": "#6dc065",
          "body": "Solving a cube takes patience, diligence and mental fortitude — exactly what Optigrise brings to its clients’ toughest challenges. So the icon became the face of a cube: nine cells on a 3×3 grid.",
          "image": {
            "src": "assets/work/branding/optigrise/idea-cube.jpg",
            "alt": "Hands solving a Rubik’s cube",
            "w": 1999,
            "h": 735
          }
        },
        {
          "type": "cards",
          "n": "03",
          "label": "Layers of meaning",
          "heading": "One icon, read three ways.",
          "cols": 3,
          "accent": "#3989c9",
          "items": [
            {
              "src": "assets/work/branding/optigrise/logic-digital.jpg",
              "alt": "Binary code",
              "icon": "assets/work/branding/optigrise/icon-digital.jpg",
              "title": "Digital",
              "body": "The strokes resemble the binary digits 0 and 1, for the expertise in digital and software solutions.",
              "w": 1400,
              "h": 514
            },
            {
              "src": "assets/work/branding/optigrise/logic-consulting.jpg",
              "alt": "Consultants around a table",
              "icon": "assets/work/branding/optigrise/icon-consulting.jpg",
              "title": "Consulting",
              "body": "One part is a meeting room seen from above — four chairs around a table — with a plus sign for positive impact.",
              "w": 1400,
              "h": 514
            },
            {
              "src": "assets/work/branding/optigrise/logic-technology.jpg",
              "alt": "An integrated circuit chip",
              "icon": "assets/work/branding/optigrise/icon-technology.jpg",
              "title": "Technology",
              "body": "Another part is an integrated circuit chip, for advanced technologies such as artificial intelligence.",
              "w": 1400,
              "h": 514
            }
          ]
        },
        {
          "type": "palette",
          "n": "04",
          "label": "Colour",
          "heading": "Five services, five faces of the cube.",
          "accent": "#ff4e00",
          "body": "Like the faces of a cube, each colour stands for one of the major services: Digital, Technology, Consulting, Infrastructure and Next Gen. Deep navy and grey hold them together. The typeface is Nexa — geometric and technical, like the grid-built icon.",
          "colours": [
            {
              "hex": "#FAD200",
              "name": "Yellow"
            },
            {
              "hex": "#6DC065",
              "name": "Green"
            },
            {
              "hex": "#3989C9",
              "name": "Blue"
            },
            {
              "hex": "#FF4E00",
              "name": "Orange"
            },
            {
              "hex": "#073C59",
              "name": "Navy"
            },
            {
              "hex": "#8F8E8E",
              "name": "Grey"
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/construction.jpg",
          "alt": "Brand mark construction grid",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/secondary.jpg",
              "alt": "Secondary brand mark",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/secondary-inverse.jpg",
              "alt": "Secondary brand mark on navy",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/typeface.jpg",
          "alt": "Brand font: Nexa",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/pattern.jpg",
          "alt": "Brand pattern built from the icon",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "section",
          "n": "05",
          "label": "Print and material",
          "line": "The oversized icon as a crop: one colour block is enough to know the brand.",
          "accent": "#fad200"
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/business-cards.jpg",
              "alt": "Business cards",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/folder.jpg",
              "alt": "File folder",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/gold-foil.jpg",
              "alt": "Gold foil",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/deboss.jpg",
              "alt": "Hard paper deboss",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/metal.jpg",
          "alt": "3D metal signage",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "section",
          "n": "06",
          "label": "Spaces",
          "line": "“Excelling Technology in Digital Transformation” — from the front door to the stage.",
          "accent": "#6dc065"
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/front-signage.jpg",
          "alt": "Front signage on a timber facade",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/facade.jpg",
              "alt": "Front signage on a curved facade",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/reception.jpg",
              "alt": "Reception",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/office.jpg",
              "alt": "Office wall pattern",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/conference.jpg",
              "alt": "Conference room glass",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/stage.jpg",
          "alt": "Stage backdrop",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "section",
          "n": "07",
          "label": "Campaign and digital",
          "line": "Big colour blocks for metro, subway and airport; the same system on screen.",
          "accent": "#ff4e00"
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/metro.jpg",
              "alt": "Metro ad",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/subway.jpg",
              "alt": "Subway ad",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/airport.jpg",
          "alt": "Airport ad screen",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "image",
          "src": "assets/work/branding/optigrise/website.jpg",
          "alt": "Website on a laptop",
          "w": 1999,
          "h": 1188
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/optigrise/tshirt.jpg",
              "alt": "T-shirt",
              "w": 1999,
              "h": 1188
            },
            {
              "src": "assets/work/branding/optigrise/memento.jpg",
              "alt": "Excellence award memento",
              "w": 1999,
              "h": 1188
            }
          ]
        },
        {
          "type": "text",
          "heading": "Credits",
          "body": "Designed by Sarath Bhaskar."
        }
      ]
    },
    // ── From public/workd for website 2/Branding — presented with the brand’s own colours (theme)
    {
      "slug": "fresh-learning",
      "hidden": true, // taken off the site; set to false (or delete this line) to show it again
      "design": "campus",
      "title": "Fresh Learning",
      "subtitle": "Brand identity for an online learning academy",
      "client": "Fresh Learning",
      "year": "",
      "services": [
        "Brand identity",
        "Logo design",
        "Brand guidelines",
        "Brand applications"
      ],
      "summary": "One symbol that tells the whole story of learning online: what you learn, where, who helps you, and where it takes you.",
      "theme": {
        "bg": "#f3ecdf",
        "ink": "#0c2953",
        "accent": "#c78d2b",
        "soft": "rgba(12,41,83,0.74)",
        "line": "rgba(12,41,83,0.16)"
      },
      "thumb": {
        "src": "assets/work/branding/fresh-learning/thumb-subway.jpg",
        "alt": "Fresh Learning posters on a subway wall: you stop growing the day you stop learning"
      },
      "cover": {
        "src": "assets/work/branding/fresh-learning/cover.jpg",
        "alt": "Fresh Learning gold signage on a navy facade"
      },
      "modules": [
        {
          "type": "chapter",
          "n": "01",
          "label": "The brief",
          "heading": "More than a mortarboard.",
          "body": [
            "Fresh Learning is an online academy. Education brands often fall back on caps, gowns and generic books; this one needed a single symbol that could carry the whole idea of learning online — and feel trustworthy to students and parents alike."
          ]
        },
        {
          "type": "split",
          "n": "02",
          "label": "Process",
          "heading": "It started on paper.",
          "body": "Dozens of pencil explorations combined a book, a screen, hands and rays of light, refined until every idea fitted inside one compact, balanced shape.",
          "image": {
            "src": "assets/work/branding/fresh-learning/sketches.jpg",
            "alt": "Pencil sketches exploring the mark",
            "w": 1670,
            "h": 1230
          }
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/brandmark.jpg",
          "alt": "Fresh Learning brandmark in gold on navy",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "cards",
          "n": "03",
          "label": "Logo logic",
          "heading": "Five ideas, one mark.",
          "cols": 5,
          "items": [
            {
              "src": "assets/work/branding/fresh-learning/idea-book.jpg",
              "alt": "An open book",
              "icon": "assets/work/branding/fresh-learning/icon-book.jpg",
              "title": "The open book",
              "body": "Knowledge, education and the wisdom shared with every student.",
              "w": 1400,
              "h": 676
            },
            {
              "src": "assets/work/branding/fresh-learning/idea-device.jpg",
              "alt": "A student in a video class",
              "icon": "assets/work/branding/fresh-learning/icon-device.jpg",
              "title": "The digital device",
              "body": "The screen at the centre is the platform — and, from above, a student learning at it.",
              "w": 1400,
              "h": 623
            },
            {
              "src": "assets/work/branding/fresh-learning/idea-hands.jpg",
              "alt": "A mentor helping a student",
              "icon": "assets/work/branding/fresh-learning/icon-hands.jpg",
              "title": "The supporting hands",
              "body": "Mentoring and support: students are in good hands.",
              "w": 1400,
              "h": 676
            },
            {
              "src": "assets/work/branding/fresh-learning/idea-sun.jpg",
              "alt": "Sunrise over a field",
              "icon": "assets/work/branding/fresh-learning/icon-sun.jpg",
              "title": "The sun’s rays",
              "body": "Growth, passion and a fresh start to every day of learning.",
              "w": 1400,
              "h": 676
            },
            {
              "src": "assets/work/branding/fresh-learning/idea-raised.jpg",
              "alt": "A student celebrating at a laptop",
              "icon": "assets/work/branding/fresh-learning/icon-raised.jpg",
              "title": "The raised hands",
              "body": "Success — and students at the centre of the academy.",
              "w": 1400,
              "h": 676
            }
          ]
        },
        {
          "type": "palette",
          "n": "04",
          "label": "Colour and type",
          "heading": "Trust in navy, optimism in gold.",
          "body": "Deep navy brings trust and focus; warm gold brings optimism and achievement. Accius T, set for both text and display, is modern, energetic and versatile like the academy.",
          "colours": [
            {
              "hex": "#0C2953",
              "name": "Navy",
              "note": "PANTONE 2767 C"
            },
            {
              "hex": "#C78D2B",
              "name": "Gold",
              "note": "PANTONE 7510 C"
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/typeface.jpg",
          "alt": "Brand typeface: Accius T",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/construction.jpg",
              "alt": "Brandmark construction",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/in-shape.jpg",
              "alt": "Brandmark in shape",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/pattern.jpg",
          "alt": "Brand pattern built from the icon",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "section",
          "n": "05",
          "label": "Print and finishes",
          "line": "Navy and gold stationery, with emboss, deboss and dimensional versions for a premium feel."
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/business-cards.jpg",
          "alt": "Business cards in navy and gold",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/envelope.jpg",
              "alt": "Envelope",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/id-card.jpg",
              "alt": "ID card",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/gold-3d.jpg",
          "alt": "Gold 3D signage",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/emboss.jpg",
              "alt": "Gold emboss on dark paper",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/3d-wall.jpg",
              "alt": "3D signage on a block wall",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "section",
          "n": "06",
          "label": "Digital first",
          "line": "An online academy lives on screens: the website on every device, and a navy-and-gold app icon."
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/tablet.jpg",
              "alt": "Website on a tablet",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/phone.jpg",
              "alt": "Website on a phone",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/app-icon.jpg",
          "alt": "Mobile app icon",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "section",
          "n": "07",
          "label": "Campaign",
          "line": "“You stop growing the day you stop learning.” Warm student photography on navy and gold."
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/banners.jpg",
              "alt": "Street banners",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/billboard.jpg",
              "alt": "Street billboard",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/indoor-ad.jpg",
              "alt": "Indoor ad",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/subway.jpg",
              "alt": "Subway ads",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/flyers.jpg",
          "alt": "Flyers",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "section",
          "n": "08",
          "label": "Spaces and merchandise",
          "line": "Gold on navy at the door, at reception and on the things students carry."
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/side-sign.jpg",
              "alt": "Illuminated side signage",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/front-sign.jpg",
              "alt": "Front signage on a slatted wall",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/fresh-learning/facade.jpg",
          "alt": "Front signage on a blue facade",
          "w": 2000,
          "h": 1260
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/reception.jpg",
              "alt": "Reception",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/interior.jpg",
              "alt": "Interior signage",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/fresh-learning/diary.jpg",
              "alt": "Diary",
              "w": 2000,
              "h": 1260
            },
            {
              "src": "assets/work/branding/fresh-learning/tshirt.jpg",
              "alt": "T-shirt",
              "w": 2000,
              "h": 1260
            }
          ]
        },
        {
          "type": "text",
          "heading": "Credits",
          "body": "Designed by Sarath Bhaskar."
        }
      ]
    },
    {
      slug: 'aakara',
      design: 'earthen', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#f2e8d8', ink: '#3a1c12', accent: '#9b2a1e', soft: 'rgba(58,28,18,0.74)', line: 'rgba(58,28,18,0.18)', font: "'Cormorant Garamond', Georgia, serif", fontHref: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap' },
      title: 'Aakara',
      subtitle: 'Brand identity design for a pottery studio',
      client: '',
      year: '2024–25',
      services: ['Art direction', 'Branding', 'Logo design'],
      summary: 'Aakara is a pottery studio in Wayanad, Kerala, making handcrafted ceramics that celebrate simplicity, authenticity and mindful living. The identity draws on craftsmanship, organic forms and the studio\'s philosophy of slow living — from logotype and symbol to colour, typography, packaging and studio applications.',
      thumb: { src: 'assets/work/branding/aakara/thumb.jpg', alt: 'Aakara banner hanging in a timber-lattice space' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/aakara/01.webp', alt: 'Aakara banner hanging in a timber-lattice space' },
      link: 'https://www.behance.net/gallery/253598323/Aakara-Brand-Identity-Design-for-a-Pottery-Studio',
      modules: [
        { type: 'image', src: 'assets/work/branding/aakara/01.webp', alt: 'Aakara banner hanging in a timber-lattice space', w: 2800, h: 2100 },
        { type: 'image', src: 'assets/work/branding/aakara/02.webp', alt: 'Brand introduction board in terracotta red', w: 2800, h: 1304 },
        { type: 'text', heading: 'Discovery', body: 'The work began with understanding the studio — its craft, its values and the story behind every handmade piece. Wayanad’s earthy landscapes and the organic beauty of ceramics set the direction: warm, minimal and enduring across physical and digital touchpoints.' },
        { type: 'image', src: 'assets/work/branding/aakara/03.jpg', alt: 'Moodboard of clay, landscapes and earthy textures', w: 2800, h: 3256 },
        { type: 'image', src: 'assets/work/branding/aakara/04.jpg', alt: 'Process board: hands at the potter’s wheel and early studies', w: 2800, h: 4412 },
        { type: 'text', heading: 'Challenge', body: 'Translate the tactile nature of pottery into a visual system that feels simple, timeless and premium without losing its human character — one that holds up across packaging, studio signage, merchandise and digital.' },
        { type: 'image', src: 'assets/work/branding/aakara/05.webp', alt: 'Aakara logotype and symbol on black', w: 2800, h: 2831 },
        { type: 'image', src: 'assets/work/branding/aakara/06.jpg', alt: 'From clay to identity: the inspiration behind the symbol', w: 2800, h: 3524 },
        { type: 'text', heading: 'Identity system', body: 'A balanced logotype, a memorable standalone symbol and a flexible system of earthy colour, refined typography and natural texture.' },
        { type: 'image', src: 'assets/work/branding/aakara/07.webp', alt: 'Identity system: logo colourways and earthy palette', w: 2800, h: 3698 },
        { type: 'video', src: 'assets/work/branding/aakara/08.mp4', poster: 'assets/work/branding/aakara/08-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/aakara/09.webp', alt: 'Aakara symbol beside hands holding a clay bowl', w: 2800, h: 1564 },
        { type: 'image', src: 'assets/work/branding/aakara/10.jpg', alt: 'Social media designs over a potter’s wheel', w: 2800, h: 2129 },
        { type: 'image', src: 'assets/work/branding/aakara/11.jpg', alt: 'Terracotta vase and mirror in the studio', w: 2800, h: 3731 },
        { type: 'image', src: 'assets/work/branding/aakara/12.webp', alt: 'Solution board in terracotta red', w: 2800, h: 2090 },
        { type: 'text', heading: 'Applications', body: 'Stationery, stickers, staff ID, a website, bookmarks and posters, apparel and the studio itself.' },
        { type: 'image', src: 'assets/work/branding/aakara/13.jpg', alt: 'Logo stickers and branded envelope', w: 2800, h: 3967 },
        { type: 'image', src: 'assets/work/branding/aakara/14.webp', alt: 'Business cards and staff ID', w: 2800, h: 2090 },
        { type: 'image', src: 'assets/work/branding/aakara/15.webp', alt: 'Aakara website on a tablet', w: 2800, h: 2100 },
        { type: 'image', src: 'assets/work/branding/aakara/16.webp', alt: 'Bookmark and poster designs', w: 2800, h: 2090 },
        { type: 'image', src: 'assets/work/branding/aakara/17.webp', alt: 'Quiet Luxury in Clay campaign visual', w: 2800, h: 1804 },
        { type: 'image', src: 'assets/work/branding/aakara/18.webp', alt: 'Logo on a black T-shirt', w: 2800, h: 1755 },
        { type: 'video', src: 'assets/work/branding/aakara/19.mp4', poster: 'assets/work/branding/aakara/19-poster.jpg' },
        { type: 'text', heading: 'Outcome', body: 'An identity that pairs minimalism with organic character — premium yet approachable — and positions Aakara as a modern artisan brand rooted in tradition.' },
        { type: 'image', src: 'assets/work/branding/aakara/20.webp', alt: 'Studio interior with shelves of pottery', w: 1200, h: 1600 },
        { type: 'image', src: 'assets/work/branding/aakara/21.jpg', alt: 'Framed brand artwork on a sideboard', w: 2800, h: 2105 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ],
    },
    {
      slug: 'zio-fashion',
      design: 'runway', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#0b0b0b', ink: '#f3f1ee', accent: '#ff4a1c', soft: 'rgba(243,241,238,0.7)', line: 'rgba(243,241,238,0.16)' },
      title: 'ZIO Fashion',
      subtitle: 'Premium fashion brand identity',
      client: '',
      year: '2026',
      services: ['Branding', 'Graphic design', 'Logo design'],
      summary: 'ZIO is a premium fashion and lifestyle brand offering apparel, accessories and gym wear for men and women. The brief called for a timeless identity that communicates confidence, quality and modern elegance, and adapts across retail, packaging, digital and brand communications.',
      thumb: { src: 'assets/work/branding/zio-fashion/thumb.jpg', alt: 'Red ZIO tote bag carried over a dark coat' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/zio-fashion/05.jpg', alt: 'White ZIO tote bag on concrete steps' },
      link: 'https://www.behance.net/gallery/253292477/ZIO-FASHION-Premium-Fashion-Brand-Identity',
      modules: [
        { type: 'image', src: 'assets/work/branding/zio-fashion/01.webp', alt: 'Black ZIO tote hanging on a mesh fence', w: 2800, h: 1867 },
        { type: 'text', heading: 'The brand', body: 'A premium label built on quality materials, refined craftsmanship and timeless design — from everyday essentials to performance gym wear that moves freely and still looks sharp.' },
        { type: 'video', src: 'assets/work/branding/zio-fashion/02.mp4', poster: 'assets/work/branding/zio-fashion/02-poster.jpg' },
        { type: 'text', heading: 'Challenge', body: 'Create a sophisticated, contemporary identity that communicates confidence, quality and modern elegance, and adapts across digital platforms, retail environments, packaging and brand communications.' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/03.jpg', alt: 'Brand board: idea, logo and taglines', w: 2800, h: 6597 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/04.webp', alt: 'Move With Purpose campaign and logo', w: 2800, h: 3568 },
        { type: 'text', heading: 'Approach', body: 'A refined system built on simplicity and versatility: clean typography, balanced proportions and a minimal design language, made to stay consistent across print, digital, social, packaging, signage and future brand extensions.' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/05.jpg', alt: 'White ZIO tote bag on concrete steps', w: 2800, h: 1960 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/06.webp', alt: 'Model in an orange ZIO hoodie', w: 2800, h: 2800 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/07.webp', alt: 'ZIO business cards', w: 1401, h: 966 },
        { type: 'text', heading: 'Wordmark', body: 'A custom wordmark of minimal forms and precise typography — highly legible, premium in tone, and at home on storefronts, labels, apparel, packaging and screens.' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/08.jpg', alt: 'Orange ZIO tote carried in city light', w: 2800, h: 4000 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/09.jpg', alt: 'ZIO campaign poster on a street display', w: 2800, h: 4200 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/10.jpg', alt: 'Black ZIO shopping bag', w: 2800, h: 4000 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/11.webp', alt: 'Woven ZIO label on a denim jacket', w: 1400, h: 926 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/12.webp', alt: 'ZIO neck label on a black hoodie', w: 1400, h: 930 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/13.webp', alt: 'Your Style Is the Signature roll-up banner', w: 1400, h: 1800 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/14.webp', alt: 'Orange tote with the oversized ZIO wordmark', w: 1400, h: 2100 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/15.webp', alt: 'Street banner with the ZIO tagline', w: 1400, h: 1800 },
        { type: 'image', src: 'assets/work/branding/zio-fashion/16.webp', alt: 'ZIO perfume bottle', w: 2800, h: 1588 },
        { type: 'text', heading: 'Outcome', body: 'The identity positions ZIO as a modern premium fashion brand with a strong visual presence, and gives it a scalable foundation for retail, e-commerce and marketing.' },
        { type: 'video', src: 'assets/work/branding/zio-fashion/17.mp4', poster: 'assets/work/branding/zio-fashion/17-poster.jpg' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar with Sudeep Divakaran.' },
      ],
    },
    {
      slug: 'form-and-flow',
      design: 'flow', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#f3f4fb', ink: '#0b1040', accent: '#1f2bff', soft: 'rgba(11,16,64,0.72)', line: 'rgba(11,16,64,0.14)' },
      title: 'Form & Flow',
      subtitle: 'Brand identity for a commercial interior design firm',
      client: '',
      year: '2025',
      services: ['Art direction', 'Brand identity', 'Logo design'],
      summary: 'Form & Flow designs commercial interiors. Its identity is built on a mark that brings together power, precision and vision, set in a confident electric blue and carried across print, digital, signage and workwear.',
      thumb: { src: 'assets/work/branding/form-and-flow/thumb.jpg', alt: 'Form & Flow logo over rippling blue light' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/form-and-flow/26.jpg', alt: 'Form & Flow billboard on a building: Designing Spaces with Strategic Flow' },
      link: 'https://www.behance.net/gallery/235380971/Form-Flow-Brand-Identity-Design',
      modules: [
        { type: 'image', src: 'assets/work/branding/form-and-flow/01.webp', alt: 'Form & Flow logo over rippling blue light', w: 1400, h: 832 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/02.webp', alt: 'Identity overview: logo, colours and lockups', w: 2800, h: 1908 },
        { type: 'text', heading: 'The mark', body: 'The symbol layers four ideas. A tiger for power — the authority and presence commercial spaces need. A diamond for precision, formed under pressure like great interiors born of careful planning. A pencil for vision, because every space starts with a sketch. And an F joined to its mirror image: the balance between form and flow, structure and movement.' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/03.webp', alt: 'Logo logic: tiger, diamond, pencil and mirrored F', w: 2800, h: 1742 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/04.webp', alt: 'Form & Flow logo on electric blue', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/05.webp', alt: 'Form & Flow logo on white', w: 2800, h: 1800 },
        { type: 'text', heading: 'Identity system', body: 'A triangle drawn from the mark sits quietly behind the logo and key content, never on its own. Poppins carries the typography, with a palette of electric blue, white and black and clear rules for clear space and misuse.' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/06.webp', alt: 'Brand element: the supporting triangle', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/07.webp', alt: 'Colour palette', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/08.webp', alt: 'Poppins type specimen', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/09.webp', alt: 'Logo misuse examples', w: 2800, h: 1800 },
        { type: 'text', heading: 'Applications', body: 'Business cards, stationery, staff ID, website and app, social media, billboards and building signage, caps, hard hats, totes and T-shirts.' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/10.webp', alt: 'Business card front and back', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/11.jpg', alt: 'Business cards on blue', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/12.webp', alt: 'Stationery set', w: 1400, h: 901 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/13.webp', alt: 'Staff ID card on a lanyard', w: 1400, h: 1050 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/14.jpg', alt: 'Website on a tablet', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/15.webp', alt: 'Website on a laptop', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/16.webp', alt: 'Social media banner', w: 2800, h: 1742 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/17.webp', alt: 'Mobile app on a phone', w: 1400, h: 2100 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/18.webp', alt: 'Brand presentation on a phone', w: 1400, h: 933 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/19.webp', alt: 'Mobile app icon', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/20.webp', alt: 'Billboards on a building wall', w: 1170, h: 780 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/21.webp', alt: 'Social media posts', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/22.webp', alt: 'Poster series', w: 1170, h: 780 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/23.webp', alt: 'Building facade signage', w: 1400, h: 933 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/24.webp', alt: 'Billboard pair on a wall', w: 1170, h: 780 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/25.webp', alt: 'Large-format display in a showroom', w: 2800, h: 2100 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/26.jpg', alt: 'Billboard on a building', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/27.webp', alt: 'Illuminated Form & Flow sign on a concrete wall', w: 1400, h: 1050 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/28.webp', alt: 'Embroidered blue cap', w: 1400, h: 934 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/29.webp', alt: 'Branded hard hat', w: 1400, h: 933 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/30.jpg', alt: 'Tote bag among foliage', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/form-and-flow/31.webp', alt: 'Branded T-shirt', w: 2800, h: 1867 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'consciousness',
      design: 'waves', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#061417', ink: '#e4f1ef', accent: '#39b7ab', soft: 'rgba(228,241,239,0.7)', line: 'rgba(228,241,239,0.14)', font: "'Jost', var(--text)", fontHref: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap' },
      title: 'Consciousness',
      subtitle: 'Brand identity for a sound healing studio',
      client: '',
      year: '',
      services: ['Brand identity', 'Logo design'],
      summary: 'Consciousness Sound Healing Studio is a wellness space in Chennai offering sound-healing therapies that combine ancient instruments with modern practice. The identity turns calm, resonance and renewal into a single mark and a warm, quiet visual language.',
      thumb: { src: 'assets/work/branding/consciousness/thumb.jpg', alt: 'Consciousness logo on a teal-to-orange gradient' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/consciousness/04.webp', alt: 'Consciousness logo with flowing teal waves on black' },
      link: 'https://www.behance.net/gallery/232087527/Brand-Identity_Consciousness-Sound-Healing-Studio',
      modules: [
        { type: 'image', src: 'assets/work/branding/consciousness/01.webp', alt: 'Woman resting among singing bowls', w: 2800, h: 1800 },
        { type: 'video', src: 'assets/work/branding/consciousness/02.mp4', poster: 'assets/work/branding/consciousness/02-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/consciousness/03.webp', alt: 'About the studio', w: 2800, h: 1235 },
        { type: 'image', src: 'assets/work/branding/consciousness/04.webp', alt: 'Consciousness logo with flowing teal waves on black', w: 2800, h: 1800 },
        { type: 'text', heading: 'The mark', body: 'One symbol, several readings: the singing bowl and the layered acoustic waves it creates; a pared-down peacock feather; a figure in meditation; a rising sun for a fresh, stress-free day; and, in the curve of the waves, a smile of rejuvenation.' },
        { type: 'image', src: 'assets/work/branding/consciousness/05.jpg', alt: 'The logo concept: bowl, frequency, feather, meditation, sunrise and smile', w: 2800, h: 6375 },
        { type: 'image', src: 'assets/work/branding/consciousness/06.webp', alt: 'Logo construction grid', w: 2800, h: 1800 },
        { type: 'text', heading: 'Identity system', body: 'Primary and secondary lockups on black, white and saffron, Open Sans for type, and a palette of cool teals balanced by warm orange.' },
        { type: 'image', src: 'assets/work/branding/consciousness/07.webp', alt: 'Logo variations and usage', w: 2800, h: 2277 },
        { type: 'image', src: 'assets/work/branding/consciousness/08.webp', alt: 'Open Sans typeface', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/09.webp', alt: 'Colour palette', w: 2800, h: 1800 },
        { type: 'text', heading: 'Applications', body: 'Building signage, posters, social media, a website and mobile screens.' },
        { type: 'image', src: 'assets/work/branding/consciousness/10.jpg', alt: 'Signage on a building', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/11.webp', alt: 'Poster series in a gallery', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/12.webp', alt: 'Let the Vibrations Heal Your Soul wall graphic', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/13.webp', alt: 'Brand messages in three colourways', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/14.webp', alt: 'Campaign poster beside a portrait', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/15.webp', alt: 'Website design', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/16.webp', alt: 'Social media stories', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/consciousness/17.webp', alt: 'App on a phone', w: 1975, h: 1278 },
        { type: 'image', src: 'assets/work/branding/consciousness/18.webp', alt: 'Mobile site in hand', w: 2005, h: 1288 },
        { type: 'video', src: 'assets/work/branding/consciousness/19.mp4', poster: 'assets/work/branding/consciousness/19-poster.jpg' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'eva-design-group',
      design: 'noir', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#0a0a0a', ink: '#ece6da', accent: '#b49a6a', soft: 'rgba(236,230,218,0.68)', line: 'rgba(180,154,106,0.45)' },
      title: 'EVA Design Group',
      subtitle: 'Minimal brand identity for a home interiors company',
      client: '',
      year: '',
      services: ['Branding', 'Logo design', 'Typography'],
      summary: 'EVA Design Group helps homeowners transform their interiors — from kitchen countertops and bathroom remodels to a fresh coat of paint — with quality materials and attentive service at good value. The identity is minimal and refined, with a premium feel suited to the homes it serves.',
      thumb: { src: 'assets/work/branding/eva-design-group/thumb.jpg', alt: 'EVA Design Group sign on a lakeside house in autumn' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/eva-design-group/01.jpg', alt: 'EVA Design Group storefront signage at dusk' },
      link: 'https://www.behance.net/gallery/229518285/Minimal-Brand-Identity_EVA-Design-Group',
      modules: [
        { type: 'image', src: 'assets/work/branding/eva-design-group/01.jpg', alt: 'EVA Design Group storefront signage at dusk', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/eva-design-group/02.jpg', alt: 'About board with storefront and branded merchandise', w: 2800, h: 5011 },
        { type: 'image', src: 'assets/work/branding/eva-design-group/03.jpg', alt: 'Taglines, logo and signage pylon', w: 2800, h: 5582 },
        { type: 'text', heading: 'Identity system', body: 'A restrained palette of black, white and a warm metallic accent, set in SF Pro Display.' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/04.jpg', alt: 'SF Pro Display type, colours and app icons', w: 2800, h: 7543 },
        { type: 'text', heading: 'Applications', body: 'Storefront and wayfinding signage, merchandise, a website and social media.' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/05.jpg', alt: 'Website on tablet and laptop', w: 2800, h: 6645 },
        { type: 'image', src: 'assets/work/branding/eva-design-group/06.jpg', alt: 'Apparel, framed art and social posts', w: 2800, h: 8069 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'taras',
      design: 'studio', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#0c0c0c', ink: '#f4f4f0', accent: '#c8f031', soft: 'rgba(244,244,240,0.7)', line: 'rgba(244,244,240,0.14)' },
      title: 'taras',
      subtitle: 'Personal brand identity for a design studio',
      client: 'Self-initiated',
      year: '',
      services: ['Brand identity', 'Logo design', 'Visual identity'],
      summary: 'taras is Sarath Bhaskar’s own design studio. The name is “Sarat(h)” spelled backwards — a reminder to look, think and design differently — and the identity stands for original thinking, bold expression and identity-driven design.',
      thumb: { src: 'assets/work/branding/taras/thumb.jpg', alt: 'Lime and black taras business cards' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/taras/05.jpg', alt: 'Lime and black taras business cards' },
      link: 'https://www.behance.net/gallery/227790961/Minimal-Logo-Identity_taras-design-studio',
      modules: [
        { type: 'image', src: 'assets/work/branding/taras/01.jpg', alt: 'The taras name: a reflection of identity and creativity', w: 2800, h: 5944 },
        { type: 'text', heading: 'The idea', body: '“Great design often comes from seeing things from the other side.” The square at the heart of the mark stands for structure, clarity and trust — the grids and systems of design — and for the creativity that comes from pushing thoughtfully against them.' },
        { type: 'image', src: 'assets/work/branding/taras/02.jpg', alt: 'The origin of taras and the meaning of the square', w: 2800, h: 4987 },
        { type: 'image', src: 'assets/work/branding/taras/03.jpg', alt: 'Logo, colours and Poppins type', w: 2800, h: 8755 },
        { type: 'video', src: 'assets/work/branding/taras/04.mp4', poster: 'assets/work/branding/taras/04-poster.jpg' },
        { type: 'text', heading: 'Applications', body: 'Business cards, cups, staff ID, site hoarding, motion pieces and a website, in a vivid lime-to-green gradient with black, set in Poppins.' },
        { type: 'image', src: 'assets/work/branding/taras/05.jpg', alt: 'Lime and black taras business cards', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/taras/06.webp', alt: 'Branded paper cups', w: 2800, h: 2100 },
        { type: 'image', src: 'assets/work/branding/taras/07.webp', alt: 'Staff ID card', w: 2800, h: 2100 },
        { type: 'image', src: 'assets/work/branding/taras/08.webp', alt: 'Design Beyond Boundaries site hoarding', w: 2800, h: 1867 },
        { type: 'video', src: 'assets/work/branding/taras/09.mp4', poster: 'assets/work/branding/taras/09-poster.jpg' },
        { type: 'video', src: 'assets/work/branding/taras/10.mp4', poster: 'assets/work/branding/taras/10-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/taras/11.webp', alt: 'Website on a tablet', w: 2800, h: 1866 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator, Photoshop and After Effects.' },
      ],
    },
    {
      slug: '40-feet',
      design: 'manifest', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#121110', ink: '#f4efe9', accent: '#ff5a1f', soft: 'rgba(244,239,233,0.7)', line: 'rgba(244,239,233,0.14)' },
      title: '40 Feet',
      subtitle: 'The Container Cafe',
      client: '40 Feet Cafe & Restaurant',
      year: '',
      services: ['Brand strategy', 'Logo design', 'Visual identity', 'Brand guidelines', 'Signage system', 'Packaging design', 'Social media branding'],
      summary: '40 Feet is a multi-cuisine café in Trivandrum, Kerala, built from repurposed shipping containers. Its identity captures that industrial architecture while staying warm, creative and welcoming.',
      thumb: { src: 'assets/work/branding/40-feet/thumb.jpg', alt: '40 Feet branded shipping container lifted against the sky' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/40-feet/13.webp', alt: '40 Feet branded shipping container lifted against the sky' },
      link: 'https://www.behance.net/gallery/205643747/40-Feet-Cafe-Restaurant-Branding',
      modules: [
        { type: 'image', src: 'assets/work/branding/40-feet/01.webp', alt: 'Black-and-white café interior', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/40-feet/02.webp', alt: 'Project introduction', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/03.webp', alt: 'The 40 Feet café, built from shipping containers', w: 2800, h: 1800 },
        { type: 'text', heading: 'Challenge', body: 'Create a bold, memorable identity for an unconventional concept — a vibrant café built from shipping containers — that reflects its industrial architecture yet feels warm and welcoming, stands out in Trivandrum’s growing café culture, and stays recognisable across signage, packaging, merchandise and digital.' },
        { type: 'image', src: 'assets/work/branding/40-feet/04.webp', alt: 'Guests dining at the café', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/05.webp', alt: 'Logo on white and orange beside diners', w: 2800, h: 1800 },
        { type: 'text', heading: 'Approach', body: 'A modern, minimal identity drawn from the café’s container architecture. Bold typography and a structured logo echo the strength and modular form of a shipping container, while a vibrant orange brings energy, appetite and warmth. Nexa carries the type across environmental graphics, packaging, uniforms and social media.' },
        { type: 'image', src: 'assets/work/branding/40-feet/06.webp', alt: '40 Feet logo on black', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/07.webp', alt: 'Nexa typeface and a branded delivery rider', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/08.jpg', alt: '40 Feet of Deliciousness billboard', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/09.webp', alt: 'Food and coffee posters on the street', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/10.webp', alt: 'Cap, laptop and container interior', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/11.webp', alt: 'Social media profile', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/12.webp', alt: 'Social media post design', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/13.webp', alt: '40 Feet branded shipping container lifted against the sky', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/14.webp', alt: 'The container café among trees', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/40-feet/15.jpg', alt: 'Branded T-shirts', w: 2800, h: 1800 },
        { type: 'text', heading: 'Outcome', body: 'A distinctive destination brand that reinforces the café’s concept from the moment guests arrive, with a scalable system that keeps a bold, consistent presence on every platform.' },
        { type: 'image', src: 'assets/work/branding/40-feet/16.jpg', alt: 'Mango drink', w: 2800, h: 1800 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ],
    },
    {
      slug: 'initium-world',
      design: 'split', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#f1f4f2', ink: '#0c1d15', accent: '#17b26a', soft: 'rgba(12,29,21,0.72)', line: 'rgba(12,29,21,0.12)' },
      title: 'Initium World',
      subtitle: 'Brand identity for an international conference organiser',
      client: '',
      year: '',
      services: ['Branding', 'Logo design', 'Visual identity'],
      summary: 'Initium World organises international conferences and professional training in Bangalore, bringing industry leaders and professionals together to share ideas, build connections and grow. The identity presents it as a premium, forward-looking platform for learning and collaboration.',
      thumb: { src: 'assets/work/branding/initium-world/thumb.jpg', alt: 'Initium World stickers and app icons' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/initium-world/05.webp', alt: 'Initium World logo on a green gradient, white and black' },
      link: 'https://www.behance.net/gallery/205207613/Brand-Identity-Design_Initium-World',
      modules: [
        { type: 'image', src: 'assets/work/branding/initium-world/01.webp', alt: 'Silhouette in front of a conference stage', w: 2800, h: 1862 },
        { type: 'image', src: 'assets/work/branding/initium-world/02.webp', alt: 'Project introduction', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/03.webp', alt: 'Brand cards: Connecting minds, enhancing skills', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/04.webp', alt: 'Initium World logo', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/05.webp', alt: 'Initium World logo on a green gradient, white and black', w: 2800, h: 1662 },
        { type: 'text', heading: 'Identity system', body: 'The mark is set in green — for prosperity and growth — against a dark background that underlines the brand’s strength. Acumin carries the typography, with navy, green and white lockups for every context.' },
        { type: 'image', src: 'assets/work/branding/initium-world/06.webp', alt: 'Brand tone', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/07.webp', alt: 'Logo construction', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/08.webp', alt: 'App icons', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/09.webp', alt: 'Logo lockups', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/10.webp', alt: 'Acumin typeface', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/11.webp', alt: 'Messaging layout', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/12.webp', alt: 'Social media grid', w: 2800, h: 1800 },
        { type: 'text', heading: 'Applications', body: 'Delegate passes and lanyards, branded merchandise, printed collateral, posters, apparel, a watch app and outdoor signage.' },
        { type: 'image', src: 'assets/work/branding/initium-world/13.webp', alt: 'Delegate pass and lanyard', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/14.webp', alt: 'Logo pattern, bottle and tape', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/15.jpg', alt: 'Printed collateral', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/16.jpg', alt: 'Poster in a waiting area', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/17.webp', alt: 'T-shirt and smartwatch', w: 2800, h: 1800 },
        { type: 'image', src: 'assets/work/branding/initium-world/18.jpg', alt: 'Outdoor signage', w: 2800, h: 1800 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator, Photoshop and After Effects.' },
      ],
    },
    {
      slug: 'debarro-interiors',
      design: 'architect', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#f7f6f2', ink: '#121212', accent: '#e07b1a', soft: 'rgba(18,18,18,0.68)', line: 'rgba(18,18,18,0.16)' },
      title: 'Debarro Interiors',
      subtitle: 'Brand identity for an interior design studio',
      client: '',
      year: '',
      services: ['Branding', 'Logo design', 'Visual identity'],
      summary: 'Debarro Interiors creates bespoke interiors that balance luxury with function. The identity borrows from nature’s master builders — the honeybee and its honeycomb — to express precision, structure and collaborative craft.',
      thumb: { src: 'assets/work/branding/debarro-interiors/thumb.jpg', alt: 'Debarro Interiors logo over fluted glass' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/debarro-interiors/07.webp', alt: 'Debarro Interiors logo on black and orange panels' },
      link: 'https://www.behance.net/gallery/204263485/Branding_Debarro-Interiors',
      modules: [
        { type: 'image', src: 'assets/work/branding/debarro-interiors/01.webp', alt: 'Debarro Interiors logo over fluted glass', w: 1536, h: 1024 },
        { type: 'text', heading: 'The mark', body: 'Inspired by the architect of the natural world: bees build honeycomb through cooperation and collective intelligence, each playing its part in the structure. The hexagon — symmetrical, efficient and strong — becomes the building block of the mark.' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/02.webp', alt: 'The hexagon concept', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/03.webp', alt: 'Brand introduction', w: 2800, h: 1867 },
        { type: 'video', src: 'assets/work/branding/debarro-interiors/04.mp4', poster: 'assets/work/branding/debarro-interiors/04-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/05.jpg', alt: 'Curved concrete interior', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/06.webp', alt: 'Logo concept: inspired by the architect', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/07.webp', alt: 'Debarro Interiors logo on black and orange panels', w: 2800, h: 1867 },
        { type: 'text', heading: 'Identity system', body: 'A clean wordmark with defined clear space, Aileron in weights from Thin to Black, and a palette of black, white and burnt orange.' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/08.webp', alt: 'Wordmark clear space', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/09.webp', alt: 'Aileron typeface', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/10.webp', alt: 'Colour palette', w: 2800, h: 1867 },
        { type: 'text', heading: 'Applications', body: 'Stationery, an app icon, a website, apparel and social media.' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/11.jpg', alt: 'Business cards on concrete', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/12.webp', alt: 'Stationery with wooden blocks', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/13.webp', alt: 'App icon on a phone', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/14.webp', alt: 'Website on devices', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/15.webp', alt: 'Branded T-shirt', w: 2800, h: 1867 },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/16.webp', alt: 'Social media posts', w: 2800, h: 1867 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'sidhi',
      design: 'herbal', // its own page design (js/designs.js), in the brand's colours
      theme: { bg: '#3f5223', ink: '#f2eedf', accent: '#d8c47c', soft: 'rgba(242,238,223,0.76)', line: 'rgba(242,238,223,0.2)', font: "'Marcellus', Georgia, serif", fontHref: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap' },
      title: 'Sidhi',
      subtitle: 'Brand identity for an Ayurvedic life-science brand',
      client: '',
      year: '',
      services: ['Brand identity', 'Logo design', 'Packaging design'],
      summary: 'Sidhi Advanced Life Science grew from a traditional Ayurvedic lineage, with the aim of bringing restorative remedies drawn from ancient texts to modern life. The identity pairs that heritage with clarity across skincare packaging.',
      thumb: { src: 'assets/work/branding/sidhi/thumb-aloe-vera.jpg', alt: 'Sidhi Aloe Vera Gold box and bottle on olive green' },
      cover: { src: 'assets/work/branding/sidhi/02.webp', alt: 'Sidhi logo with a skincare tube and a mortar of herbs' },
      link: 'https://www.behance.net/gallery/97752159/Branding_Sidhi-Advanced-Life-Science',
      modules: [
        { type: 'image', src: 'assets/work/branding/sidhi/01.webp', alt: 'Ayurveda introduction among basil leaves', w: 1400, h: 900 },
        { type: 'image', src: 'assets/work/branding/sidhi/02.webp', alt: 'Sidhi logo with a skincare tube and a mortar of herbs', w: 1400, h: 1049 },
        { type: 'text', heading: 'The mark', body: 'One icon, four readings: a vaidyan in tapas seeking enlightenment, for the research behind each formula; a leaf, for the brand’s roots in nature; a peacock feather, for India’s traditions of care; and a drop, for pure oils and creams.' },
        { type: 'image', src: 'assets/work/branding/sidhi/03.webp', alt: 'Oil bottle, logo logic and its four meanings', w: 1400, h: 2285 },
        { type: 'text', heading: 'Applications', body: 'Bottles, tubes and boxes in a deep herbal green.' },
        { type: 'image', src: 'assets/work/branding/sidhi/04.webp', alt: 'Packaging, setting and potted plant', w: 1400, h: 2840 },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
  ],
};
