
import { Website } from '../types';

const DB_NAME = 'WebGenDB';
const DB_VERSION = 2; // Incremented version to force upgrade if needed, though simple check below handles key additions
const STORE_NAME = 'websites';

// Initial Mock Data (Used to seed the DB on first load)
const INITIAL_DATA: Website[] = [
  {
    id: '1',
    subdomain: 'bakery-delight',
    title: 'Bakery Delight',
    logo: '',
    favicon: '',
    status: 'active',
    createdAt: new Date().toISOString(),
    theme: {
      primary: '#d97706', // amber-600
      secondary: '#fef3c7', // amber-100
      button: '#b45309', // amber-700
      background: 'light',
    },
    messenger: {
      enabled: true,
      pageId: '100000000000000', // Example Page ID
      welcomeMessage: 'Hi! How can we help you today?',
    },
    enabledSections: {
      hero: true,
      products: true,
      about: true,
      contact: true,
      benefits: true,
      testimonials: true,
      faq: false,
    },
    content: {
      hero: {
        title: 'Freshly Baked Goodness',
        subtext: 'Artisan breads and pastries made with love every morning.',
        image: 'https://placehold.co/1200x600/fef3c7/d97706?text=Bakery+Hero',
      },
      about: 'We are a family-owned bakery dedicated to bringing you the freshest pastries in town.',
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'hello@bakerydelight.com',
        address: '123 Baker Street',
      },
      products: [
        {
          id: 'p1',
          name: 'Croissant',
          description: 'Buttery, flaky, and fresh from the oven.',
          image: 'https://placehold.co/400x300?text=Croissant',
          price: '₱180',
        },
        {
          id: 'p2',
          name: 'Sourdough Loaf',
          description: 'Traditional slow-fermented sourdough bread.',
          image: 'https://placehold.co/400x300?text=Sourdough',
          price: '₱350',
        },
      ],
      benefits: [
        {
          id: 'b1',
          title: 'Always Fresh',
          description: 'We bake in small batches throughout the day.',
          icon: 'Clock',
        },
        {
          id: 'b2',
          title: 'Organic Ingredients',
          description: 'We use 100% organic flour and dairy.',
          icon: 'Leaf',
        },
      ],
      testimonials: [
        {
          id: 't1',
          name: 'Sarah J.',
          role: 'Regular Customer',
          content: 'The best croissants I have ever tasted outside of Paris!',
          avatar: 'https://placehold.co/150x150?text=S',
        },
      ],
      faq: [],
      footerText: '© 2024 Bakery Delight. All rights reserved.',
      socialLinks: [
        { platform: 'facebook', url: '#', enabled: true },
        { platform: 'instagram', url: '#', enabled: true },
        { platform: 'twitter', url: '', enabled: false },
        { platform: 'linkedin', url: '', enabled: false },
        { platform: 'youtube', url: '', enabled: false },
      ],
    },
    marketing: {
      seo: {
        metaTitle: 'Bakery Delight - Fresh Artisan Bread & Pastries',
        metaDescription: 'Visit Bakery Delight for the best sourdough and croissants in town. Freshly baked every morning.',
        keywords: ['bakery', 'fresh bread', 'pastries', 'croissant', 'sourdough'],
      },
      socialPost: 'Start your morning right with our freshly baked croissants! 🥐☕ #BakeryDelight #FreshBread #MorningVibes',
    },
  },
];

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        // Seed initial data
        INITIAL_DATA.forEach((item) => {
          store.add(item);
        });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const getWebsites = async (): Promise<Website[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting websites', error);
    return [];
  }
};

export const getWebsiteById = async (id: string): Promise<Website | undefined> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting website by id', error);
    return undefined;
  }
};

export const saveWebsite = async (website: Website): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(website);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error saving website', error);
    throw error;
  }
};

export const deleteWebsite = async (id: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error deleting website', error);
    throw error;
  }
};
