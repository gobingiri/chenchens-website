/**
 * Chen Chen's Nashville Hot Chicken — United States Configuration
 * ================================================================
 * All country-specific data lives here. When the US location launches,
 * update the TODO fields below — it's a one-file edit to go live.
 */
const COUNTRY_CONFIG = {
  country: 'us',
  countryName: 'United States',
  flag: '🇺🇸',
  lang: 'en-US',
  currency: 'USD',
  currencySymbol: '$',

  /* ── Brand copy ─────────────────────────────────────── */
  tagline: 'Born in China. Raised in Nashville. Finally Home to the USA.',
  heroHeadline: 'Nashville Heat.<br><span class="gradient-text">Asian Soul.</span>',
  heroSubline: 'Finally Home.',
  heroCopy: 'Chef-Driven Nashville Hot Chicken, Inspired by Southern Tradition and Asian Roots.',
  metaTitle: "Chen Chen's Nashville Hot Chicken | Coming to the United States",
  metaDescription: "Chen Chen's Nashville Hot Chicken is expanding to the USA. Bold Southern flavors with a chef-driven Asian twist. Halal, crispy, made from scratch. Join our VIP waitlist.",

  /* ── Opening Soon banner ────────────────────────────── */
  /* Set to false and fill in location data to launch */
  openingSoon: true,
  openingSoonText: '🇺🇸 Now Open in Nashville — Order Now!',

  /* ── Locations ───────────────────────────────────────── */
  locations: [
    {
      name: '[TODO: US Location Name]',        // e.g. 'Midtown — Houston'
      shortName: '[TODO: Short Name]',          // e.g. 'Midtown'
      address: '[TODO: Full US Address]',       // e.g. '123 Main St, Houston, TX 77002'
      phone: '[TODO: US Phone]',                // e.g. '(713) 555-0199'
      phoneTel: '[TODO: +1XXXXXXXXXX]',
      email: '[TODO: us@chenchenshotchicken.com]',
      timezone: 'America/Chicago',              // TODO: Adjust for actual city
      hours: [
        { days: 'Mon–Thu', open: '11:00', close: '21:00', label: 'TBA' },
        { days: 'Fri–Sat', open: '11:00', close: '22:00', label: 'TBA' },
        { days: 'Sun',     open: '11:00', close: '21:00', label: 'TBA' }
      ],
      mapUrl: '[TODO: Google Maps URL]',
      mapEmbed: '',
      orderPickupUrl: '[TODO: Toast or Square pickup URL]',
      orderPickupLabel: 'Order Pickup',
      orderDeliveryUrl: '[TODO: Uber Eats / DoorDash URL]',
      orderDeliveryLabel: 'Order Delivery',
      schema: {
        streetAddress: '[TODO]',
        addressLocality: '[TODO]',
        addressRegion: '[TODO]',
        postalCode: '[TODO]',
        addressCountry: 'US',
        geo: { latitude: 0, longitude: 0 }      // TODO: Set coordinates
      }
    }
  ],

  /* ── Social links ───────────────────────────────────── */
  social: {
    instagram: 'https://www.instagram.com/chenchens.hotchicken/',
    instagramHandle: '@chenchenshotchicken',
    instagramFeedUrl: '', // Paste Behold.so or NoCodeAPI JSON Feed URL here for a live feed
    tiktok: 'https://www.tiktok.com/@chenchenshotchicken',
    facebook: 'https://www.facebook.com/chenchenshotchicken'
  }
};
