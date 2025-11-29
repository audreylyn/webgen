import { Website } from '../types';

export const DEFAULT_WEBSITE: Website = {
  id: '',
  subdomain: '',
  title: 'My New Website',
  logo: '',
  favicon: '',
  status: 'active',
  createdAt: '',
  theme: {
    primary: '#b96b40', // brand-600 (Terracotta)
    secondary: '#fbf8f3', // brand-50 (Warm Cream)
    button: '#b96b40', // brand-600 (Primary Action Button)
    accent: '#c58550', // brand-500 (Golden Bronze)
    background: 'light',
    headingFont: 'Playfair Display',
    bodyFont: 'Lato',
    colors: {
      brand50: '#fbf8f3', // Warm Cream
      brand100: '#f5efe4', // Secondary button hover
      brand200: '#ebdcc4', // Secondary button border
      brand500: '#c58550', // Golden Bronze - Accent
      brand600: '#b96b40', // Terracotta - Primary button
      brand700: '#9a5336', // Primary button hover
      brand900: '#67392b', // Deep Coffee - Secondary button text
    },
  },
  messenger: {
    enabled: false,
    pageId: '',
    welcomeMessage: '',
  },
  enabledSections: {
    hero: true,
    products: true,
    about: true,
    contact: true,
    benefits: true,
    testimonials: false,
    faq: false,
    gallery: false,
    team: false,
    pricing: false,
    callToAction: false,
  },
  content: {
    hero: {
      title: 'Your Awesome Headline',
      subtext: 'A compelling subtext to describe your business.',
      image: '/hero.jpg',
      buttonLink: '#products',
      heroType: 'default',
    },
    about: {
      image: 'https://placehold.co/800x600?text=About+Us',
      subtitle: 'OUR PHILOSOPHY',
      title: 'About Us',
      paragraphs: ['Tell your story here...', 'Add more details about your business...']
    },
    contact: { 
      phone: '', 
      email: '', 
      address: '',
      hours: {
        weekday: 'Tue - Fri: 7am - 4pm',
        weekend: 'Sat - Sun: 8am - 3pm',
        closed: 'Closed Mondays'
      },
      catering: {
        text: 'Planning a wedding, corporate event, or need a large order? We require at least 48 hours notice for large orders and 2 weeks for wedding cakes.',
        link: '#catering',
        linkText: 'VIEW CATERING MENU'
      },
      inquiryTypes: ['General Question', 'Custom Order', 'Catering Inquiry', 'Event Planning', 'Other']
    },
    products: [],
    benefits: [],
    testimonials: [],
    faq: [],
    gallery: [],
    team: [],
    pricing: [],
    callToAction: { 
      text: 'Ready to get started?', 
      description: 'Take the next step and experience the difference. Order online for quick pickup or visit us today.',
      backgroundColor: '#8B5A3C',
      buttons: [
        { id: '1', text: 'Order Now', link: '#products', style: 'solid' },
        { id: '2', text: 'Contact Us', link: '#contact', style: 'outlined' }
      ]
    },
    footer: {
      tagline: 'Handcrafting moments of joy through the art of baking. Sustainable, organic, and always fresh.',
      quickLinks: [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Products', href: '#products' },
        { label: 'Contact', href: '#contact' },
      ],
      exploreLinks: [
        { label: 'Order Online', href: '#products' },
        { label: 'Our Story', href: '#about' },
        { label: 'Contact & Custom Orders', href: '#contact' },
      ],
      hours: [
        { day: 'Monday', time: 'Closed' },
        { day: 'Tuesday - Friday', time: '7am - 4pm' },
        { day: 'Saturday - Sunday', time: '8am - 3pm' },
      ],
      copyright: 'All rights reserved.',
    },
    socialLinks: [
      { platform: 'facebook', url: '', enabled: false },
      { platform: 'instagram', url: '', enabled: false },
      { platform: 'twitter', url: '', enabled: false },
      { platform: 'linkedin', url: '', enabled: false },
      { platform: 'youtube', url: '', enabled: false },
    ],
  },
  marketing: {
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
    },
    socialPost: '',
  }
};

export default DEFAULT_WEBSITE;
