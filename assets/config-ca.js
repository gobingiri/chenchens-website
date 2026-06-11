/**
 * Chen Chen's Nashville Hot Chicken — Canada Configuration
 * =========================================================
 * All country-specific data lives here. Edit this file to update
 * locations, hours, links, and copy for the Canadian site.
 */
const COUNTRY_CONFIG = {
  country: 'ca',
  countryName: 'Canada',
  flag: '🇨🇦',
  lang: 'en-CA',
  currency: 'CAD',
  currencySymbol: '$',

  /* ── Brand copy ─────────────────────────────────────── */
  tagline: 'Born in China. Raised in Nashville. Served in Toronto.',
  heroHeadline: 'Nashville Heat.<br><span class="gradient-text">Szechuan Soul.</span>',
  heroSubline: 'Toronto Made.',
  heroCopy: 'Chef-driven Nashville hot chicken fused with bold Szechuan flavors — crispy, juicy, and handcrafted from scratch. Ranked #1 on Yelp Canada\'s Top 100 Places to Eat. Proudly Halal.',
  metaTitle: "Chen Chen's Nashville Hot Chicken | Toronto, Canada | Yelp's #1",
  metaDescription: "Chen Chen's Nashville Hot Chicken — bold Southern flavors with a chef-driven Asian twist. Halal, crispy, made from scratch at The Well, Toronto. Ranked #1 on Yelp Canada.",

  /* ── Opening Soon banner (set to true to show) ──────── */
  openingSoon: false,
  openingSoonText: '',

  /* ── Locations ───────────────────────────────────────── */
  locations: [
    {
      name: 'The Well — Wellington Market',
      shortName: 'The Well',
      address: '486 Front St W, Toronto, ON M5V 0V2',
      phone: '(289) 272-6096',
      phoneTel: '+12892726096',
      email: 'chenchensthewell@gmail.com',
      timezone: 'America/Toronto',
      hours: [
        { days: 'Mon–Thu', open: '11:00', close: '21:00', label: '11 AM – 9 PM' },
        { days: 'Fri–Sat', open: '11:00', close: '22:00', label: '11 AM – 10 PM' },
        { days: 'Sun',     open: '11:00', close: '21:00', label: '11 AM – 9 PM' }
      ],
      mapUrl: 'https://share.google/Nvvb3e9XgejrzErsb',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3957!3d43.6425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM4JzMzLjAiTiA3OcKwMjMnNDQuNSJX!5e0!3m2!1sen!2sca!4v1',
      orderPickupUrl: 'https://order.toasttab.com/online/chenchenshotchicken-thewell',
      orderPickupLabel: 'Order Pickup — The Well',
      orderDeliveryUrl: 'https://www.order.store/store/chen-chens-nashville-hot-chicken/UULX-sfeSVe6tpkre8_CTg',
      orderDeliveryLabel: 'Order Delivery',
      schema: {
        streetAddress: '486 Front St W',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        postalCode: 'M5V 0V2',
        addressCountry: 'CA',
        geo: { latitude: 43.6425, longitude: -79.3957 }
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
