/*
  POSTER DESIGN — one entry per project, shown in this order.
  The format is explained at the top of branding.js; copy the Aakara entry there as a starting point.
  Posters live in four collections: TCSL, Kadalas Cafe, Adaminde Chayakada and Other Posters.
*/


export default {
  slug: 'poster-design',
  name: 'Poster Design',
  intro: '', // add a line about this category here
  // The tile on the homepage
  // whole: the poster shows uncropped in its tile, on the `bg` colour
  cover: { src: 'assets/work/poster-design/cover.jpg', alt: 'Poster: a dark figure behind textured glass with a glowing orange band across the eyes' },

  // The moving wall at the top of the page: posters at their own shapes, so none is cropped
  wall: [
    { src: 'assets/work/poster-design/tcsl-gandhi-jayanti/poster.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/meaty-tales.jpg', w: 904, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/native-touch.jpg', w: 1414, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/international-courier.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/landing-soon.jpg', w: 1066, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/thala-vazhai-virunthu.jpg', w: 1409, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/india-new-zealand-fta.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/chicken-tales.jpg', w: 904, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/vishu-2026.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/diwali.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/adaminde-chayakada/opening-soon-kottayam.jpg', w: 1414, h: 2000 },
    { src: 'assets/work/poster-design/kadalas-cafe/key-to-tasty-tales.jpg', w: 1066, h: 1280 },
    { src: 'assets/work/poster-design/other-posters/new-year-celebration.jpg', w: 1414, h: 2000 },
    { src: 'assets/work/poster-design/tcsl/worldwide.jpg', w: 1600, h: 2000 },
    { src: 'assets/work/poster-design/other-posters/earthi-face-wash.jpg', w: 904, h: 1280 },
  ],
  // Four collections, each a tile on the category page with a gallery page of its own (js/designs.js)
  projects: [
    {
      slug: 'tcsl',
      title: 'TCSL',
      subtitle: 'Poster series for TCSL',
      client: 'TCSL',
      year: '',
      services: ['Poster design'],
      design: 'carousel', // same interface as every poster page, in TCSL's red
      hideCover: true,
      theme: { bg: '#f7dedb', ink: '#3b1212', accent: '#f2a59e', soft: 'rgba(59,18,18,0.7)', line: 'rgba(59,18,18,0.14)' },
      thumb: { src: 'assets/work/poster-design/tcsl/international-courier.jpg', alt: 'TCSL International Courier poster' },
      cover: { src: 'assets/work/poster-design/tcsl/gandhi-jayanti.jpg', alt: 'TCSL Gandhi Jayanti poster' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/tcsl/gandhi-jayanti.jpg', w: 1600, h: 2000, title: 'Gandhi Jayanti', alt: 'TCSL Gandhi Jayanti poster: a charkha wheel of planes, ships and trucks', note: '2nd October' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/india-new-zealand-fta.jpg', w: 1600, h: 2000, title: 'India – New Zealand FTA', alt: 'TCSL poster: India – New Zealand FTA is now in force', note: 'Industry update' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/international-courier.jpg', w: 1600, h: 2000, title: 'International Courier', alt: 'TCSL International Courier poster: your next shipment, worldwide', note: 'Service' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/diwali.jpg', w: 1600, h: 2000, title: 'Diwali', alt: 'TCSL Diwali poster: a glowing parcel rising from a diya flame', note: 'Festival greeting' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/worldwide.jpg', w: 1600, h: 2000, title: 'Worldwide Shipping', alt: 'TCSL poster: your next shipment, worldwide, a globe circled by parcels', note: 'Service' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/childrens-day.jpg', w: 1600, h: 2000, title: 'Children’s Day', alt: 'TCSL Children’s Day poster: children playing football with a cardboard-box robot in a TCSL band. Little dreams, big futures', note: 'Greeting' },
        { type: 'poster', src: 'assets/work/poster-design/tcsl/sea-freight.jpg', w: 1600, h: 1998, title: 'Sea Freight', alt: 'TCSL poster: Bigger shipments, smarter shipping, a container ship at port with FCL and LCL shipping options', note: 'Service' },
      ],
    },
    {
      slug: 'kadalas-cafe',
      title: 'Kadalas Cafe',
      subtitle: 'Launch posters for Kadalas Cafe',
      client: 'Kadalas Cafe',
      year: '',
      location: 'Calicut, Kerala',
      design: 'carousel', // aqua page, posters gliding past sideways
      hideCover: true, // no large poster at the top: every poster is in the strip below
      theme: { bg: '#bfe9e4', ink: '#0f3b39', accent: '#f2b35b', soft: 'rgba(15,59,57,0.7)', line: 'rgba(15,59,57,0.16)' },
      thumb: { src: 'assets/work/poster-design/kadalas-cafe/meaty-tales.jpg', alt: 'Kadalas Cafe poster: Meaty Tales to Remember' },
      cover: { src: 'assets/work/poster-design/kadalas-cafe/landing-soon.jpg', alt: 'Kadalas Cafe poster: Landing soon at Kozhikode' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/key-to-tasty-tales.jpg', w: 1066, h: 1280, title: 'The key to tasty tales', alt: 'Kadalas Cafe poster: a fork shaped like a key, opening soon', note: 'Opening soon' },
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/landing-soon.jpg', w: 1066, h: 1280, title: 'Landing soon at Kozhikode', alt: 'Kadalas Cafe poster: a chef’s hat as a hot-air balloon', note: 'Teaser' },
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/meaty-tales.jpg', w: 904, h: 1280, title: 'Meaty Tales to Remember', alt: 'Kadalas Cafe poster: a burger topped with an origami bull', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/kadalas-cafe/chicken-tales.jpg', w: 904, h: 1280, title: 'Chicken Tales to Remember', alt: 'Kadalas Cafe poster: a burger topped with an origami rooster', note: 'Menu' },
      ],
    },
    {
      slug: 'adaminde-chayakada',
      title: 'Adaminde Chayakada (Adam\u2019s Tea Shop)',
      subtitle: 'Every dish has its own character, hand-drawn in Illustrator from what’s on the plate. The illustrations made the restaurant stand out, got people curious and talking, and helped grow the business.',
      tileSubtitle: 'Restaurant product posters', // the short line under its tile on the Poster Design page
      client: 'Adaminde Chayakada',
      year: '',
      location: 'Calicut & Kottayam, Kerala',
      services: ['Product illustration / Poster design'],
      design: 'carousel', // same interface as every poster page, in the poster's mustard and cocoa
      hideCover: true,
      theme: { bg: '#f6e2b3', ink: '#2b211d', accent: '#f2a51e', soft: 'rgba(43,33,29,0.7)', line: 'rgba(43,33,29,0.14)' },
      thumb: { src: 'assets/work/poster-design/adaminde-chayakada/takeaway-offer.jpg', alt: 'Adaminde Chayakada poster: a rooster at the parcel counter, 10% off takeaway orders above ₹500' },
      cover: { src: 'assets/work/poster-design/adaminde-chayakada/opening-soon-kottayam.jpg', alt: 'Adaminde Chayakada poster: two cartoon roosters on the phone, opening soon in Kottayam' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/opening-soon-kottayam.jpg', w: 1414, h: 2000, title: 'Opening soon in Kottayam', alt: 'Adaminde Chayakada poster on dark brown: a rooster in a T-shirt calls a rooster in a mundu and sunglasses, with Malayalam speech bubbles, announcing the opening in Kottayam', note: 'Launch' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/home-delivery.jpg', w: 1414, h: 2000, title: 'Home Delivery', alt: 'Adaminde Chayakada poster: A rooster on a yellow scooter with a delivery box: if you’re hungry, call us, with the home delivery numbers', note: 'Home delivery' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/all-day-menu.jpg', w: 1000, h: 2000, title: 'All-Day Menu', alt: 'Adaminde Chayakada poster: Tall menu board of roosters through the day, from the 6 am breakfast to the late-night meals', note: '8 × 4 ft board' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/biriyani-varieties.jpg', w: 1414, h: 2000, title: '15 Varieties of Biriyani', alt: 'Adaminde Chayakada poster: A copper biriyani pot over a wood fire: 15 varieties of biriyani from 20th July 2016', note: 'Menu launch' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/biriyani-sadya.jpg', w: 1414, h: 2000, title: 'Biriyani Sadya', alt: 'Adaminde Chayakada poster: Six kinds of biriyani laid out on a banana leaf for Adaminde Biriyani Sadya', note: 'Food festival' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/payasam-festival.jpg', w: 1414, h: 2000, title: 'Payasam Festival', alt: 'Adaminde Chayakada poster: A rooster stirring a giant payasam pot beside the list of payasams on offer', note: 'Food festival' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/takeaway-offer.jpg', w: 1414, h: 2000, title: 'Takeaway Offer', alt: 'Adaminde Chayakada poster: A rooster at the parcel counter: 10% off takeaway orders above ₹500, 5% off all others', note: 'Offer' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/chicken-kosarakolli.jpg', w: 1414, h: 2000, title: 'Chicken Kosarakolli', alt: 'Adaminde Chayakada poster: A cheeky cartoon rooster for the Chicken Kosarakolli dish', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/chicken-adichupoli.jpg', w: 1240, h: 1760, title: 'Chicken Adichupoli', alt: 'Adaminde Chayakada poster: A rooster in sunglasses, a T-shirt and a wristwatch for Chicken Adichupoli', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/perillatha-chicken-fry.jpg', w: 1000, h: 1419, title: 'Perillatha Chicken Fry', alt: 'Adaminde Chayakada poster: A rooster posing with a hand on its hip for Perillatha Chicken Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/solar-chicken-fry.jpg', w: 1000, h: 1415, title: 'Solar Chicken Fry', alt: 'Adaminde Chayakada poster: A rooster sweating under a blazing sun for Solar Chicken Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/veerappan-chicken.jpg', w: 1409, h: 2000, title: 'Veerappan Chicken', alt: 'Adaminde Chayakada poster: A moustached rooster in army green with a rifle for Veerappan Chicken', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/chicken-pottitherichathu.jpg', w: 1000, h: 1415, title: 'Chicken Pottitherichathu', alt: 'Adaminde Chayakada poster: A rooster bursting out of a bomb blast for Chicken Pottitherichathu', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/chicken-piduttham-vittathu.jpg', w: 1000, h: 1419, title: 'Chicken Piduttham Vittathu', alt: 'Adaminde Chayakada poster: A man chasing a runaway rooster for Chicken Piduttham Vittathu', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/khalbum-karalum-fry.jpg', w: 1000, h: 1419, title: 'Khalbum Karalum Fry', alt: 'Adaminde Chayakada poster: Two roosters in love, hugging, for Khalbum Karalum Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/mundhiya-njandu-fry.jpg', w: 1000, h: 1419, title: 'Mundhiya Njandu Fry', alt: 'Adaminde Chayakada poster: A crab in a chef’s hat holding a spatula for Mundhiya Njandu Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/onnonnara-beef-fry.jpg', w: 1000, h: 1410, title: 'Onnonnara Beef Fry', alt: 'Adaminde Chayakada poster: A smiling bowl of beef fry holding up its own name banner for Onnonnara Beef Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/bhejaraya-brain-fry.jpg', w: 1000, h: 1416, title: 'Bhejaraya Brain Fry', alt: 'Adaminde Chayakada poster: A grinning goat for Bhejaraya Brain Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/pooti-theeratha-koonthal-fry.jpg', w: 1000, h: 1419, title: 'Pooti Theeratha Koonthal Fry', alt: 'Adaminde Chayakada poster: A cheerful squid for Pooti Theeratha Koonthal Fry', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/panchara-koya.jpg', w: 1000, h: 1419, title: 'Panchara Koya', alt: 'Adaminde Chayakada poster: A slice of sweet bread with an almond for Panchara Koya', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/muttakkakka.jpg', w: 1000, h: 1419, title: 'Muttakkakka', alt: 'Adaminde Chayakada poster: An egg with a moustache, a white cap and a green belt for Muttakkakka', note: 'Menu' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/thakarppan-tamarind.jpg', w: 1000, h: 1419, title: 'Thakarppan Tamarind', alt: 'Adaminde Chayakada poster: A boy pulling a sour face over a glass of tamarind drink for Thakarppan Tamarind', note: 'Drink' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/ozhivakkan-pattatha-chemmeen-fry.jpg', w: 1409, h: 2000, title: 'Ozhivakkan Pattatha Chemmeen Fry', alt: 'Adaminde Chayakada poster: A prawn in a top hat for Ozhivakkan Pattatha Chemmeen Fry, from Adaminde Athbhutha Nombuthura', note: 'Nombuthura special' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/chicken-cheeripanjathu.jpg', w: 1409, h: 2000, title: 'Chicken Cheeripanjathu', alt: 'Adaminde Chayakada poster: A rooster racing past in a cloud of dust for Chicken Cheeripanjathu, from Adaminde Athbhutha Nombuthura', note: 'Nombuthura special' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/choodan-chicken-fry.jpg', w: 1409, h: 2000, title: 'Choodan Chicken Fry', alt: 'Adaminde Chayakada poster: An angry rooster with folded wings for Choodan Chicken Fry, from Adaminde Athbhutha Nombuthura', note: 'Nombuthura special' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/palkkaran-chicken-fry.jpg', w: 1409, h: 2000, title: 'Palkkaran Chicken Fry', alt: 'Adaminde Chayakada poster: A rooster carrying milk cans for Palkkaran Chicken Fry, from Adaminde Athbhutha Nombuthura', note: 'Nombuthura special' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/swargakozhi.jpg', w: 1409, h: 2000, title: 'Swargakozhi', alt: 'Adaminde Chayakada poster: A rooster with a halo rising on a cloud for Swargakozhi, from Adaminde Athbhutha Nombuthura', note: 'Nombuthura special' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/eid-mubarak.jpg', w: 1409, h: 2000, title: 'Eid Mubarak', alt: 'Adaminde Chayakada poster: A cartoon egg in a white cap surrounded by roosters before a mosque skyline: Eid Mubarak', note: 'Festival greeting' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/thank-you-calicut.jpg', w: 2000, h: 1333, title: 'Thank You, Calicut', alt: 'Adaminde Chayakada poster: Roosters outside the tea shop under bunting: thank you for being here, and a happy Eid', note: '6 × 4 ft board' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/chickens-tour.jpg', w: 2000, h: 1414, title: 'Chickens’ Tour', alt: 'Adaminde Chayakada poster: Roosters leaving on a yellow bus: we will be back at our Chayakada on 20th July 2016', note: 'Break notice' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/thanks-dubai.jpg', w: 1500, h: 1060, title: 'Thanks, Dubai', alt: 'Adaminde Chayakada poster: Roosters and a cartoon egg in front of the Dubai skyline: thanks, see you again', note: 'Event' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/facebook-10k-likes.jpg', w: 1414, h: 2000, title: '10K+ Likes', alt: 'Adaminde Chayakada poster: A rooster giving a thumbs up with a sign reading 10K+ Likes, Thank You', note: 'Social media' },
        { type: 'poster', src: 'assets/work/poster-design/adaminde-chayakada/somalian-parotta.jpg', w: 1414, h: 2000, title: '‘Somalian’', alt: 'Adaminde Chayakada poster: Pencil sketch of a cook spinning parotta dough, announcing ‘Somalian’ dishes and the new shop on Beach Road, Calicut', note: 'Opening soon' },
      ],
    },
    {
      slug: 'other-posters',
      title: 'Other Posters',
      subtitle: 'Posters for brands, restaurants, events and festivals',
      client: '',
      year: '',
      services: ['Poster design'],
      design: 'carousel', // same interface as every poster page, in the posters' warm yellows and oranges
      hideCover: true,
      theme: { bg: '#f7e8c8', ink: '#3a2a10', accent: '#f0b44c', soft: 'rgba(58,42,16,0.7)', line: 'rgba(58,42,16,0.14)' },
      thumb: { src: 'assets/work/poster-design/other-posters/native-touch.jpg', alt: 'Native Touch Valentine’s Day poster' },
      cover: { src: 'assets/work/poster-design/other-posters/vishu-2026.jpg', alt: 'Happy Vishu 2026 poster' },
      whole: true,
      modules: [
        { type: 'poster', src: 'assets/work/poster-design/other-posters/native-touch.jpg', w: 1414, h: 2000, title: 'Native Touch', alt: 'Native Touch Valentine’s Day poster: Yes. Anyone.', note: 'Valentine’s Day' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/thala-vazhai-virunthu.jpg', w: 1409, h: 2000, title: 'Thala Vazhai Virunthu', alt: 'Thala Vazhai Virunthu poster: a South Indian meal on a banana leaf', note: 'Weekend lunch' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/vishu-2026.jpg', w: 1600, h: 2000, title: 'Vishu 2026', alt: 'Happy Vishu 2026 poster with a peacock-feather crown', note: 'Festival greeting' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/new-year-celebration.jpg', w: 1414, h: 2000, title: 'New Year Celebration', alt: 'New Year celebration flyer with ticket prices and event highlights', note: 'Event flyer' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/earthi-hair-care.jpg', w: 1115, h: 1115, title: 'earthi — cherished care', alt: 'earthi hair care poster: cherished care', note: 'Product' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/earthi-face-wash.jpg', w: 904, h: 1280, title: 'earthi — rosy fresh', alt: 'earthi facial wash poster: rosy fresh', note: 'Product' },
        { type: 'poster', src: 'assets/work/poster-design/other-posters/online-tuition-classes.jpg', w: 1600, h: 2000, title: 'Online Tuition Classes', alt: 'Online tuition classes poster for school students and coding beginners: subjects offered and why choose us', note: 'Education' },
      ],
    },
  ],
};
