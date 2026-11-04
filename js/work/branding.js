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
  intro: '[A line about your branding work.]',
  // The tile on the homepage. It is also one of the wall images below: opening the page,
  // the tile flies into its place in the moving wall.
  cover: { src: 'assets/work/branding/wall/07.jpg', alt: 'Red ZIO tote bag carried over a dark coat' },
  // The moving wall at the top of this page: two rows gliding in opposite directions.
  // Add or remove images here; w and h are each image's pixel size.
  wall: [
    { src: 'assets/work/branding/wall/01.jpg', w: 666, h: 1000 },
    { src: 'assets/work/branding/wall/02.jpg', w: 1333, h: 1000 },
    { src: 'assets/work/branding/wall/03.jpg', w: 1500, h: 1000 },
    { src: 'assets/work/branding/wall/04.jpg', w: 1428, h: 1000 },
    { src: 'assets/work/branding/wall/05.jpg', w: 1333, h: 1000 },
    { src: 'assets/work/branding/wall/06.jpg', w: 1500, h: 1000 },
    { src: 'assets/work/branding/wall/07.jpg', w: 1050, h: 1500 },
    { src: 'assets/work/branding/wall/08.jpg', w: 1595, h: 1000 },
    { src: 'assets/work/branding/wall/09.jpg', w: 1500, h: 1000 },
    { src: 'assets/work/branding/wall/10.jpg', w: 777, h: 1000 },
    { src: 'assets/work/branding/wall/11.jpg', w: 1330, h: 1000 },
    { src: 'assets/work/branding/wall/12.jpg', w: 1500, h: 1000 },
    { src: 'assets/work/branding/wall/13.jpg', w: 1500, h: 1000 },
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
      },
      "thumb": {
        "src": "assets/work/branding/jc-construction/thumb.jpg",
        "alt": "JC Construction hoarding wrapped around a building under construction"
      },
      "cover": {
        "src": "assets/work/branding/jc-construction/cover.jpg",
        "alt": "JC Construction & Excavation logo over a city skyline"
      },
      "modules": [
        {
          "type": "chapter",
          "n": "01",
          "label": "The brief",
          "heading": "Make strength visible.",
          "body": [
            "JC Construction is a Philadelphia company specialising in concrete: excavation, footings, walls, slabs and concrete pumping. Its work is the part of a building nobody sees once it is finished, so the brand had to show what the concrete hides — strength, precision and trust.",
            "The identity needed to read from across a site, on the side of a truck and on a helmet, and still feel modern enough for a company ready to grow beyond its city."
          ]
        },
        {
          "type": "split",
          "n": "02",
          "label": "Direction",
          "heading": "Steel, concrete and clean geometry.",
          "body": "The moodboard set the tone before any drawing: steel structures, raw concrete, the precision of modern architecture and the engineering of nature. Deep greys and warm earth tones gave a grounded base; a touch of blue pointed to vision and progress.",
          "image": {
            "src": "assets/work/branding/jc-construction/moodboard.jpg",
            "alt": "Moodboard: leaf, glass tower, concrete and brick in angled frames",
            "w": 860,
            "h": 1095
          }
        },
        {
          "type": "split",
          "n": "03",
          "label": "The mark",
          "heading": "Two letters, built like a structure.",
          "reverse": true,
          "fit": "contain",
          "body": "The J and the C are reduced to simple geometric parts, placed together, then pushed out of line so their segments stack like beams. The initials become a structure: steady, balanced and rising, assembled piece by piece the way the company builds.",
          "image": {
            "src": "assets/work/branding/jc-construction/logic-steps.jpg",
            "alt": "The mark in three steps: J and C, placement, pushed out",
            "w": 1540,
            "h": 610
          }
        },
        {
          "type": "cards",
          "label": "Two references",
          "heading": "Towers that rise. Leaves that carry load.",
          "cols": 2,
          "items": [
            {
              "src": "assets/work/branding/jc-construction/logic-tower.jpg",
              "alt": "The mark beside the glass tower that inspired it",
              "title": "Architecture",
              "body": "The upward step of the mark comes from the silhouettes of modern towers: clean edges, a confident stance, a building on its way up.",
              "w": 1160,
              "h": 622
            },
            {
              "src": "assets/work/branding/jc-construction/logic-leaf.jpg",
              "alt": "Leaf veins: nature’s structural engineering",
              "title": "Nature",
              "body": "The angled segments echo the veins of a leaf, where every line carries load and purpose: efficient, strong and balanced.",
              "w": 700,
              "h": 989
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/brandmark.jpg",
          "alt": "JC Construction brandmark in copper on deep green",
          "w": 2000,
          "h": 1045
        },
        {
          "type": "palette",
          "n": "04",
          "label": "Colour and type",
          "heading": "Grounded green, warm copper.",
          "body": "Deep construction green is serious and steady; copper brings warmth and material — clay, timber, weathered metal. Aileron, a clean geometric sans in four weights, carries every message.",
          "colours": [
            {
              "hex": "#023A31",
              "name": "Construction green"
            },
            {
              "hex": "#C4946F",
              "name": "Copper"
            },
            {
              "hex": "#F3EDE5",
              "name": "Concrete white"
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/typography.jpg",
          "alt": "Aileron typeface in four weights",
          "w": 2000,
          "h": 1045
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/construction.jpg",
              "alt": "Logo construction grid",
              "w": 2000,
              "h": 1045
            },
            {
              "src": "assets/work/branding/jc-construction/clearspace.jpg",
              "alt": "Wordmark clear space",
              "w": 2000,
              "h": 1045
            }
          ]
        },
        {
          "type": "section",
          "n": "05",
          "label": "On paper",
          "line": "Bold copper segments, cropped across every piece, so a single card still reads as JC."
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/business-card.jpg",
          "alt": "Business card on a studded steel plate",
          "w": 2000,
          "h": 1333
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/stationery.jpg",
              "alt": "Letterhead, business cards and folder",
              "w": 2000,
              "h": 1045
            },
            {
              "src": "assets/work/branding/jc-construction/id-card.jpg",
              "alt": "ID card and lanyard",
              "w": 2000,
              "h": 1045
            }
          ]
        },
        {
          "type": "section",
          "n": "06",
          "label": "On site",
          "line": "Where the brand is seen every day: helmets, vests and workwear."
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/worker.jpg",
          "alt": "Worker in a branded helmet and T-shirt on site",
          "w": 2000,
          "h": 1333
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/worker-back.jpg",
              "alt": "Branded T-shirt from behind on site",
              "w": 2000,
              "h": 1333
            },
            {
              "src": "assets/work/branding/jc-construction/helmets.jpg",
              "alt": "Branded green and white safety helmets",
              "w": 2000,
              "h": 1045
            }
          ]
        },
        {
          "type": "section",
          "n": "07",
          "label": "Fleet and equipment",
          "line": "The largest canvas a construction company owns, carrying the brand across the city."
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/excavator.jpg",
          "alt": "Branded excavator in front of towers under construction",
          "w": 2000,
          "h": 1400
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/truck.jpg",
              "alt": "Branded truck: we shape the world that shapes you",
              "w": 2000,
              "h": 1400
            },
            {
              "src": "assets/work/branding/jc-construction/crane-hook.jpg",
              "alt": "Branded crane hook against a blue sky",
              "w": 2000,
              "h": 1400
            }
          ]
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/forklift.jpg",
          "alt": "Forklift carrying a branded container",
          "w": 2000,
          "h": 1400
        },
        {
          "type": "section",
          "n": "08",
          "label": "Merchandise",
          "line": "For the team and for clients, from tees and totes to caps and badges."
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/tshirt.jpg",
              "alt": "Green branded T-shirt",
              "w": 2000,
              "h": 1333
            },
            {
              "src": "assets/work/branding/jc-construction/tote.jpg",
              "alt": "Green branded tote bag",
              "w": 2000,
              "h": 1333
            }
          ]
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/cap.jpg",
              "alt": "Branded cap on paving",
              "w": 2000,
              "h": 1045
            },
            {
              "src": "assets/work/branding/jc-construction/badges.jpg",
              "alt": "Branded badges",
              "w": 2000,
              "h": 1045
            }
          ]
        },
        {
          "type": "section",
          "n": "09",
          "label": "The city",
          "line": "“We shape the world that shapes you.” Hoardings, gantries and site fences carry the brand lines."
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/hoarding.jpg",
          "alt": "Hoarding wrapped around a building under construction",
          "w": 2000,
          "h": 1500
        },
        {
          "type": "image",
          "src": "assets/work/branding/jc-construction/gantry.jpg",
          "alt": "Highway gantry billboard: solid foundations, stronger futures",
          "w": 2000,
          "h": 1400
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/fence.jpg",
              "alt": "Site fencing board",
              "w": 2000,
              "h": 1400
            },
            {
              "src": "assets/work/branding/jc-construction/street-boards.jpg",
              "alt": "Street boards",
              "w": 2000,
              "h": 1045
            }
          ]
        },
        {
          "type": "section",
          "n": "10",
          "label": "Spaces",
          "line": "Indoors, the symbol becomes a quiet, confident presence."
        },
        {
          "type": "duo",
          "images": [
            {
              "src": "assets/work/branding/jc-construction/signage.jpg",
              "alt": "Dimensional building signage",
              "w": 2000,
              "h": 1045
            },
            {
              "src": "assets/work/branding/jc-construction/reception.jpg",
              "alt": "Reception desk with the logo",
              "w": 2000,
              "h": 1045
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
      "slug": "optigrise",
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
        "src": "assets/work/branding/optigrise/thumb.jpg",
        "alt": "Optigrise symbol as a colourful 3D metal sign"
      },
      "cover": {
        "src": "assets/work/branding/optigrise/cover.jpg",
        "alt": "Optigrise symbol as a colourful 3D metal sign"
      },
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
        "bg": "#0c2953",
        "ink": "#f6f1e7",
        "accent": "#d9a043",
        "soft": "rgba(246,241,231,0.74)"
      },
      "thumb": {
        "src": "assets/work/branding/fresh-learning/thumb.jpg",
        "alt": "Fresh Learning gold signage on a navy facade"
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
        { type: 'image', src: 'assets/work/branding/aakara/01.webp', alt: 'Aakara banner hanging in a timber-lattice space' },
        { type: 'image', src: 'assets/work/branding/aakara/02.webp', alt: 'Brand introduction board in terracotta red' },
        { type: 'text', heading: 'Discovery', body: 'The work began with understanding the studio — its craft, its values and the story behind every handmade piece. Wayanad’s earthy landscapes and the organic beauty of ceramics set the direction: warm, minimal and enduring across physical and digital touchpoints.' },
        { type: 'image', src: 'assets/work/branding/aakara/03.webp', alt: 'Moodboard of clay, landscapes and earthy textures' },
        { type: 'image', src: 'assets/work/branding/aakara/04.webp', alt: 'Process board: hands at the potter’s wheel and early studies' },
        { type: 'text', heading: 'Challenge', body: 'Translate the tactile nature of pottery into a visual system that feels simple, timeless and premium without losing its human character — one that holds up across packaging, studio signage, merchandise and digital.' },
        { type: 'image', src: 'assets/work/branding/aakara/05.webp', alt: 'Aakara logotype and symbol on black' },
        { type: 'image', src: 'assets/work/branding/aakara/06.webp', alt: 'From clay to identity: the inspiration behind the symbol' },
        { type: 'text', heading: 'Identity system', body: 'A balanced logotype, a memorable standalone symbol and a flexible system of earthy colour, refined typography and natural texture.' },
        { type: 'image', src: 'assets/work/branding/aakara/07.webp', alt: 'Identity system: logo colourways and earthy palette' },
        { type: 'video', src: 'assets/work/branding/aakara/08.mp4', poster: 'assets/work/branding/aakara/08-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/aakara/09.webp', alt: 'Aakara symbol beside hands holding a clay bowl' },
        { type: 'image', src: 'assets/work/branding/aakara/10.webp', alt: 'Social media designs over a potter’s wheel' },
        { type: 'image', src: 'assets/work/branding/aakara/11.webp', alt: 'Terracotta vase and mirror in the studio' },
        { type: 'image', src: 'assets/work/branding/aakara/12.webp', alt: 'Solution board in terracotta red' },
        { type: 'text', heading: 'Applications', body: 'Stationery, stickers, staff ID, a website, bookmarks and posters, apparel and the studio itself.' },
        { type: 'image', src: 'assets/work/branding/aakara/13.webp', alt: 'Logo stickers and branded envelope' },
        { type: 'image', src: 'assets/work/branding/aakara/14.webp', alt: 'Business cards and staff ID' },
        { type: 'image', src: 'assets/work/branding/aakara/15.webp', alt: 'Aakara website on a tablet' },
        { type: 'image', src: 'assets/work/branding/aakara/16.webp', alt: 'Bookmark and poster designs' },
        { type: 'image', src: 'assets/work/branding/aakara/17.webp', alt: 'Quiet Luxury in Clay campaign visual' },
        { type: 'image', src: 'assets/work/branding/aakara/18.webp', alt: 'Logo on a black T-shirt' },
        { type: 'video', src: 'assets/work/branding/aakara/19.mp4', poster: 'assets/work/branding/aakara/19-poster.jpg' },
        { type: 'text', heading: 'Outcome', body: 'An identity that pairs minimalism with organic character — premium yet approachable — and positions Aakara as a modern artisan brand rooted in tradition.' },
        { type: 'image', src: 'assets/work/branding/aakara/20.webp', alt: 'Studio interior with shelves of pottery' },
        { type: 'image', src: 'assets/work/branding/aakara/21.webp', alt: 'Framed brand artwork on a sideboard' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ],
    },
    {
      slug: 'zio-fashion',
      title: 'ZIO Fashion',
      subtitle: 'Premium fashion brand identity',
      client: '',
      year: '2026',
      services: ['Branding', 'Graphic design', 'Logo design'],
      summary: 'ZIO is a premium fashion and lifestyle brand offering apparel, accessories and gym wear for men and women. The brief called for a timeless identity that communicates confidence, quality and modern elegance, and adapts across retail, packaging, digital and brand communications.',
      thumb: { src: 'assets/work/branding/zio-fashion/thumb.jpg', alt: 'Red ZIO tote bag carried over a dark coat' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/zio-fashion/05.webp', alt: 'White ZIO tote bag on concrete steps' },
      link: 'https://www.behance.net/gallery/253292477/ZIO-FASHION-Premium-Fashion-Brand-Identity',
      modules: [
        { type: 'image', src: 'assets/work/branding/zio-fashion/01.webp', alt: 'Black ZIO tote hanging on a mesh fence' },
        { type: 'text', heading: 'The brand', body: 'A premium label built on quality materials, refined craftsmanship and timeless design — from everyday essentials to performance gym wear that moves freely and still looks sharp.' },
        { type: 'video', src: 'assets/work/branding/zio-fashion/02.mp4', poster: 'assets/work/branding/zio-fashion/02-poster.jpg' },
        { type: 'text', heading: 'Challenge', body: 'Create a sophisticated, contemporary identity that communicates confidence, quality and modern elegance, and adapts across digital platforms, retail environments, packaging and brand communications.' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/03.webp', alt: 'Brand board: idea, logo and taglines' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/04.webp', alt: 'Move With Purpose campaign and logo' },
        { type: 'text', heading: 'Approach', body: 'A refined system built on simplicity and versatility: clean typography, balanced proportions and a minimal design language, made to stay consistent across print, digital, social, packaging, signage and future brand extensions.' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/05.webp', alt: 'White ZIO tote bag on concrete steps' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/06.webp', alt: 'Model in an orange ZIO hoodie' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/07.webp', alt: 'ZIO business cards' },
        { type: 'text', heading: 'Wordmark', body: 'A custom wordmark of minimal forms and precise typography — highly legible, premium in tone, and at home on storefronts, labels, apparel, packaging and screens.' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/08.webp', alt: 'Orange ZIO tote carried in city light' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/09.webp', alt: 'ZIO campaign poster on a street display' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/10.webp', alt: 'Black ZIO shopping bag' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/11.webp', alt: 'Woven ZIO label on a denim jacket' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/12.webp', alt: 'ZIO neck label on a black hoodie' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/13.webp', alt: 'Your Style Is the Signature roll-up banner' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/14.webp', alt: 'Orange tote with the oversized ZIO wordmark' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/15.webp', alt: 'Street banner with the ZIO tagline' },
        { type: 'image', src: 'assets/work/branding/zio-fashion/16.webp', alt: 'ZIO perfume bottle' },
        { type: 'text', heading: 'Outcome', body: 'The identity positions ZIO as a modern premium fashion brand with a strong visual presence, and gives it a scalable foundation for retail, e-commerce and marketing.' },
        { type: 'video', src: 'assets/work/branding/zio-fashion/17.mp4', poster: 'assets/work/branding/zio-fashion/17-poster.jpg' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar with Sudeep Divakaran.' },
      ],
    },
    {
      slug: 'form-and-flow',
      title: 'Form & Flow',
      subtitle: 'Brand identity for a commercial interior design firm',
      client: '',
      year: '2025',
      services: ['Art direction', 'Brand identity', 'Logo design'],
      summary: 'Form & Flow designs commercial interiors. Its identity is built on a mark that brings together power, precision and vision, set in a confident electric blue and carried across print, digital, signage and workwear.',
      thumb: { src: 'assets/work/branding/form-and-flow/thumb.jpg', alt: 'Form & Flow logo over rippling blue light' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/form-and-flow/26.webp', alt: 'Form & Flow billboard on a building: Designing Spaces with Strategic Flow' },
      link: 'https://www.behance.net/gallery/235380971/Form-Flow-Brand-Identity-Design',
      modules: [
        { type: 'image', src: 'assets/work/branding/form-and-flow/01.webp', alt: 'Form & Flow logo over rippling blue light' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/02.webp', alt: 'Identity overview: logo, colours and lockups' },
        { type: 'text', heading: 'The mark', body: 'The symbol layers four ideas. A tiger for power — the authority and presence commercial spaces need. A diamond for precision, formed under pressure like great interiors born of careful planning. A pencil for vision, because every space starts with a sketch. And an F joined to its mirror image: the balance between form and flow, structure and movement.' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/03.webp', alt: 'Logo logic: tiger, diamond, pencil and mirrored F' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/04.webp', alt: 'Form & Flow logo on electric blue' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/05.webp', alt: 'Form & Flow logo on white' },
        { type: 'text', heading: 'Identity system', body: 'A triangle drawn from the mark sits quietly behind the logo and key content, never on its own. Poppins carries the typography, with a palette of electric blue, white and black and clear rules for clear space and misuse.' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/06.webp', alt: 'Brand element: the supporting triangle' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/07.webp', alt: 'Colour palette' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/08.webp', alt: 'Poppins type specimen' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/09.webp', alt: 'Logo misuse examples' },
        { type: 'text', heading: 'Applications', body: 'Business cards, stationery, staff ID, website and app, social media, billboards and building signage, caps, hard hats, totes and T-shirts.' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/10.webp', alt: 'Business card front and back' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/11.webp', alt: 'Business cards on blue' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/12.webp', alt: 'Stationery set' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/13.webp', alt: 'Staff ID card on a lanyard' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/14.webp', alt: 'Website on a tablet' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/15.webp', alt: 'Website on a laptop' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/16.webp', alt: 'Social media banner' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/17.webp', alt: 'Mobile app on a phone' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/18.webp', alt: 'Brand presentation on a phone' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/19.webp', alt: 'Mobile app icon' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/20.webp', alt: 'Billboards on a building wall' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/21.webp', alt: 'Social media posts' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/22.webp', alt: 'Poster series' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/23.webp', alt: 'Building facade signage' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/24.webp', alt: 'Billboard pair on a wall' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/25.webp', alt: 'Large-format display in a showroom' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/26.webp', alt: 'Billboard on a building' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/27.webp', alt: 'Illuminated Form & Flow sign on a concrete wall' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/28.webp', alt: 'Embroidered blue cap' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/29.webp', alt: 'Branded hard hat' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/30.webp', alt: 'Tote bag among foliage' },
        { type: 'image', src: 'assets/work/branding/form-and-flow/31.webp', alt: 'Branded T-shirt' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'consciousness',
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
        { type: 'image', src: 'assets/work/branding/consciousness/01.webp', alt: 'Woman resting among singing bowls' },
        { type: 'video', src: 'assets/work/branding/consciousness/02.mp4', poster: 'assets/work/branding/consciousness/02-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/consciousness/03.webp', alt: 'About the studio' },
        { type: 'image', src: 'assets/work/branding/consciousness/04.webp', alt: 'Consciousness logo with flowing teal waves on black' },
        { type: 'text', heading: 'The mark', body: 'One symbol, several readings: the singing bowl and the layered acoustic waves it creates; a pared-down peacock feather; a figure in meditation; a rising sun for a fresh, stress-free day; and, in the curve of the waves, a smile of rejuvenation.' },
        { type: 'image', src: 'assets/work/branding/consciousness/05.webp', alt: 'The logo concept: bowl, frequency, feather, meditation, sunrise and smile' },
        { type: 'image', src: 'assets/work/branding/consciousness/06.webp', alt: 'Logo construction grid' },
        { type: 'text', heading: 'Identity system', body: 'Primary and secondary lockups on black, white and saffron, Open Sans for type, and a palette of cool teals balanced by warm orange.' },
        { type: 'image', src: 'assets/work/branding/consciousness/07.webp', alt: 'Logo variations and usage' },
        { type: 'image', src: 'assets/work/branding/consciousness/08.webp', alt: 'Open Sans typeface' },
        { type: 'image', src: 'assets/work/branding/consciousness/09.webp', alt: 'Colour palette' },
        { type: 'text', heading: 'Applications', body: 'Building signage, posters, social media, a website and mobile screens.' },
        { type: 'image', src: 'assets/work/branding/consciousness/10.webp', alt: 'Signage on a building' },
        { type: 'image', src: 'assets/work/branding/consciousness/11.webp', alt: 'Poster series in a gallery' },
        { type: 'image', src: 'assets/work/branding/consciousness/12.webp', alt: 'Let the Vibrations Heal Your Soul wall graphic' },
        { type: 'image', src: 'assets/work/branding/consciousness/13.webp', alt: 'Brand messages in three colourways' },
        { type: 'image', src: 'assets/work/branding/consciousness/14.webp', alt: 'Campaign poster beside a portrait' },
        { type: 'image', src: 'assets/work/branding/consciousness/15.webp', alt: 'Website design' },
        { type: 'image', src: 'assets/work/branding/consciousness/16.webp', alt: 'Social media stories' },
        { type: 'image', src: 'assets/work/branding/consciousness/17.webp', alt: 'App on a phone' },
        { type: 'image', src: 'assets/work/branding/consciousness/18.webp', alt: 'Mobile site in hand' },
        { type: 'video', src: 'assets/work/branding/consciousness/19.mp4', poster: 'assets/work/branding/consciousness/19-poster.jpg' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'eva-design-group',
      title: 'EVA Design Group',
      subtitle: 'Minimal brand identity for a home interiors company',
      client: '',
      year: '',
      services: ['Branding', 'Logo design', 'Typography'],
      summary: 'EVA Design Group helps homeowners transform their interiors — from kitchen countertops and bathroom remodels to a fresh coat of paint — with quality materials and attentive service at good value. The identity is minimal and refined, with a premium feel suited to the homes it serves.',
      thumb: { src: 'assets/work/branding/eva-design-group/thumb.jpg', alt: 'EVA Design Group sign on a lakeside house in autumn' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/eva-design-group/01.webp', alt: 'EVA Design Group storefront signage at dusk' },
      link: 'https://www.behance.net/gallery/229518285/Minimal-Brand-Identity_EVA-Design-Group',
      modules: [
        { type: 'image', src: 'assets/work/branding/eva-design-group/01.webp', alt: 'EVA Design Group storefront signage at dusk' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/02.webp', alt: 'About board with storefront and branded merchandise' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/03.webp', alt: 'Taglines, logo and signage pylon' },
        { type: 'text', heading: 'Identity system', body: 'A restrained palette of black, white and a warm metallic accent, set in SF Pro Display.' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/04.webp', alt: 'SF Pro Display type, colours and app icons' },
        { type: 'text', heading: 'Applications', body: 'Storefront and wayfinding signage, merchandise, a website and social media.' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/05.webp', alt: 'Website on tablet and laptop' },
        { type: 'image', src: 'assets/work/branding/eva-design-group/06.webp', alt: 'Apparel, framed art and social posts' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'taras',
      title: 'taras',
      subtitle: 'Personal brand identity for a design studio',
      client: 'Self-initiated',
      year: '',
      services: ['Brand identity', 'Logo design', 'Visual identity'],
      summary: 'taras is Sarath Bhaskar’s own design studio. The name is “Sarat(h)” spelled backwards — a reminder to look, think and design differently — and the identity stands for original thinking, bold expression and identity-driven design.',
      thumb: { src: 'assets/work/branding/taras/thumb.jpg', alt: 'Lime and black taras business cards' }, // Behance thumbnail
      cover: { src: 'assets/work/branding/taras/05.webp', alt: 'Lime and black taras business cards' },
      link: 'https://www.behance.net/gallery/227790961/Minimal-Logo-Identity_taras-design-studio',
      modules: [
        { type: 'image', src: 'assets/work/branding/taras/01.webp', alt: 'The taras name: a reflection of identity and creativity' },
        { type: 'text', heading: 'The idea', body: '“Great design often comes from seeing things from the other side.” The square at the heart of the mark stands for structure, clarity and trust — the grids and systems of design — and for the creativity that comes from pushing thoughtfully against them.' },
        { type: 'image', src: 'assets/work/branding/taras/02.webp', alt: 'The origin of taras and the meaning of the square' },
        { type: 'image', src: 'assets/work/branding/taras/03.webp', alt: 'Logo, colours and Poppins type' },
        { type: 'video', src: 'assets/work/branding/taras/04.mp4', poster: 'assets/work/branding/taras/04-poster.jpg' },
        { type: 'text', heading: 'Applications', body: 'Business cards, cups, staff ID, site hoarding, motion pieces and a website, in a vivid lime-to-green gradient with black, set in Poppins.' },
        { type: 'image', src: 'assets/work/branding/taras/05.webp', alt: 'Lime and black taras business cards' },
        { type: 'image', src: 'assets/work/branding/taras/06.webp', alt: 'Branded paper cups' },
        { type: 'image', src: 'assets/work/branding/taras/07.webp', alt: 'Staff ID card' },
        { type: 'image', src: 'assets/work/branding/taras/08.webp', alt: 'Design Beyond Boundaries site hoarding' },
        { type: 'video', src: 'assets/work/branding/taras/09.mp4', poster: 'assets/work/branding/taras/09-poster.jpg' },
        { type: 'video', src: 'assets/work/branding/taras/10.mp4', poster: 'assets/work/branding/taras/10-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/taras/11.webp', alt: 'Website on a tablet' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator, Photoshop and After Effects.' },
      ],
    },
    {
      slug: '40-feet',
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
        { type: 'image', src: 'assets/work/branding/40-feet/01.webp', alt: 'Black-and-white café interior' },
        { type: 'image', src: 'assets/work/branding/40-feet/02.webp', alt: 'Project introduction' },
        { type: 'image', src: 'assets/work/branding/40-feet/03.webp', alt: 'The 40 Feet café, built from shipping containers' },
        { type: 'text', heading: 'Challenge', body: 'Create a bold, memorable identity for an unconventional concept — a vibrant café built from shipping containers — that reflects its industrial architecture yet feels warm and welcoming, stands out in Trivandrum’s growing café culture, and stays recognisable across signage, packaging, merchandise and digital.' },
        { type: 'image', src: 'assets/work/branding/40-feet/04.webp', alt: 'Guests dining at the café' },
        { type: 'image', src: 'assets/work/branding/40-feet/05.webp', alt: 'Logo on white and orange beside diners' },
        { type: 'text', heading: 'Approach', body: 'A modern, minimal identity drawn from the café’s container architecture. Bold typography and a structured logo echo the strength and modular form of a shipping container, while a vibrant orange brings energy, appetite and warmth. Nexa carries the type across environmental graphics, packaging, uniforms and social media.' },
        { type: 'image', src: 'assets/work/branding/40-feet/06.webp', alt: '40 Feet logo on black' },
        { type: 'image', src: 'assets/work/branding/40-feet/07.webp', alt: 'Nexa typeface and a branded delivery rider' },
        { type: 'image', src: 'assets/work/branding/40-feet/08.webp', alt: '40 Feet of Deliciousness billboard' },
        { type: 'image', src: 'assets/work/branding/40-feet/09.webp', alt: 'Food and coffee posters on the street' },
        { type: 'image', src: 'assets/work/branding/40-feet/10.webp', alt: 'Cap, laptop and container interior' },
        { type: 'image', src: 'assets/work/branding/40-feet/11.webp', alt: 'Social media profile' },
        { type: 'image', src: 'assets/work/branding/40-feet/12.webp', alt: 'Social media post design' },
        { type: 'image', src: 'assets/work/branding/40-feet/13.webp', alt: '40 Feet branded shipping container lifted against the sky' },
        { type: 'image', src: 'assets/work/branding/40-feet/14.webp', alt: 'The container café among trees' },
        { type: 'image', src: 'assets/work/branding/40-feet/15.webp', alt: 'Branded T-shirts' },
        { type: 'text', heading: 'Outcome', body: 'A distinctive destination brand that reinforces the café’s concept from the moment guests arrive, with a scalable system that keeps a bold, consistent presence on every platform.' },
        { type: 'image', src: 'assets/work/branding/40-feet/16.webp', alt: 'Mango drink' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar.' },
      ],
    },
    {
      slug: 'initium-world',
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
        { type: 'image', src: 'assets/work/branding/initium-world/01.webp', alt: 'Silhouette in front of a conference stage' },
        { type: 'image', src: 'assets/work/branding/initium-world/02.webp', alt: 'Project introduction' },
        { type: 'image', src: 'assets/work/branding/initium-world/03.webp', alt: 'Brand cards: Connecting minds, enhancing skills' },
        { type: 'image', src: 'assets/work/branding/initium-world/04.webp', alt: 'Initium World logo' },
        { type: 'image', src: 'assets/work/branding/initium-world/05.webp', alt: 'Initium World logo on a green gradient, white and black' },
        { type: 'text', heading: 'Identity system', body: 'The mark is set in green — for prosperity and growth — against a dark background that underlines the brand’s strength. Acumin carries the typography, with navy, green and white lockups for every context.' },
        { type: 'image', src: 'assets/work/branding/initium-world/06.webp', alt: 'Brand tone' },
        { type: 'image', src: 'assets/work/branding/initium-world/07.webp', alt: 'Logo construction' },
        { type: 'image', src: 'assets/work/branding/initium-world/08.webp', alt: 'App icons' },
        { type: 'image', src: 'assets/work/branding/initium-world/09.webp', alt: 'Logo lockups' },
        { type: 'image', src: 'assets/work/branding/initium-world/10.webp', alt: 'Acumin typeface' },
        { type: 'image', src: 'assets/work/branding/initium-world/11.webp', alt: 'Messaging layout' },
        { type: 'image', src: 'assets/work/branding/initium-world/12.webp', alt: 'Social media grid' },
        { type: 'text', heading: 'Applications', body: 'Delegate passes and lanyards, branded merchandise, printed collateral, posters, apparel, a watch app and outdoor signage.' },
        { type: 'image', src: 'assets/work/branding/initium-world/13.webp', alt: 'Delegate pass and lanyard' },
        { type: 'image', src: 'assets/work/branding/initium-world/14.webp', alt: 'Logo pattern, bottle and tape' },
        { type: 'image', src: 'assets/work/branding/initium-world/15.webp', alt: 'Printed collateral' },
        { type: 'image', src: 'assets/work/branding/initium-world/16.webp', alt: 'Poster in a waiting area' },
        { type: 'image', src: 'assets/work/branding/initium-world/17.webp', alt: 'T-shirt and smartwatch' },
        { type: 'image', src: 'assets/work/branding/initium-world/18.webp', alt: 'Outdoor signage' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator, Photoshop and After Effects.' },
      ],
    },
    {
      slug: 'debarro-interiors',
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
        { type: 'image', src: 'assets/work/branding/debarro-interiors/01.webp', alt: 'Debarro Interiors logo over fluted glass' },
        { type: 'text', heading: 'The mark', body: 'Inspired by the architect of the natural world: bees build honeycomb through cooperation and collective intelligence, each playing its part in the structure. The hexagon — symmetrical, efficient and strong — becomes the building block of the mark.' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/02.webp', alt: 'The hexagon concept' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/03.webp', alt: 'Brand introduction' },
        { type: 'video', src: 'assets/work/branding/debarro-interiors/04.mp4', poster: 'assets/work/branding/debarro-interiors/04-poster.jpg' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/05.webp', alt: 'Curved concrete interior' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/06.webp', alt: 'Logo concept: inspired by the architect' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/07.webp', alt: 'Debarro Interiors logo on black and orange panels' },
        { type: 'text', heading: 'Identity system', body: 'A clean wordmark with defined clear space, Aileron in weights from Thin to Black, and a palette of black, white and burnt orange.' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/08.webp', alt: 'Wordmark clear space' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/09.webp', alt: 'Aileron typeface' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/10.webp', alt: 'Colour palette' },
        { type: 'text', heading: 'Applications', body: 'Stationery, an app icon, a website, apparel and social media.' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/11.webp', alt: 'Business cards on concrete' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/12.webp', alt: 'Stationery with wooden blocks' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/13.webp', alt: 'App icon on a phone' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/14.webp', alt: 'Website on devices' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/15.webp', alt: 'Branded T-shirt' },
        { type: 'image', src: 'assets/work/branding/debarro-interiors/16.webp', alt: 'Social media posts' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
    {
      slug: 'sidhi',
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
        { type: 'image', src: 'assets/work/branding/sidhi/01.webp', alt: 'Ayurveda introduction among basil leaves' },
        { type: 'image', src: 'assets/work/branding/sidhi/02.webp', alt: 'Sidhi logo with a skincare tube and a mortar of herbs' },
        { type: 'text', heading: 'The mark', body: 'One icon, four readings: a vaidyan in tapas seeking enlightenment, for the research behind each formula; a leaf, for the brand’s roots in nature; a peacock feather, for India’s traditions of care; and a drop, for pure oils and creams.' },
        { type: 'image', src: 'assets/work/branding/sidhi/03.webp', alt: 'Oil bottle, logo logic and its four meanings' },
        { type: 'text', heading: 'Applications', body: 'Bottles, tubes and boxes in a deep herbal green.' },
        { type: 'image', src: 'assets/work/branding/sidhi/04.webp', alt: 'Packaging, setting and potted plant' },
        { type: 'text', heading: 'Credits', body: 'Designed by Sarath Bhaskar. Made with Adobe Illustrator and Photoshop.' },
      ],
    },
  ],
};
