

export const DOTCMS_BASE_URL = process.env.NEXT_PUBLIC_DOTCMS_BASE_URL;
export const DOTCMS_API_URL = `${DOTCMS_BASE_URL}/api/v1/graphql`;

if (!process.env.NEXT_PUBLIC_DOTCMS_BASE_URL) {
  console.warn('⚠️  NEXT_PUBLIC_DOTCMS_BASE_URL is not set. Using fallback URL.');
}


export const CACHE_REVALIDATION = {
  BANNER: 3600, // hour
  PRODUCTS: 1800, // 30mins
  EVENTS: 1800, // 30mins
  BLOGS: 900, // 15mins
};


export const SITE_CONFIG = {
  name: 'Explore the World',
  description: 'Discover amazing Products, events, and insights',
  url: process.env.NEXT_PUBLIC_SITE_URL
};

export const NAV_LINKS = [
  { label: 'Features', href: '/' },
  { label: 'Downloads', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Blog', href: '#' },
];


export const FOOTER_LINKS = {
  catalog: [
    { label: 'Link 1', href: '/catalog/link-1' },
    { label: 'Link 2', href: '/catalog/link-2' },
    { label: 'Link 3', href: '/catalog/link-3' },
    { label: 'Link 4', href: '/catalog/link-4' },
    { label: 'Link 5', href: '/catalog/link-5' },
  ],
  services: [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Delivery', href: '/delivery' },
  ],
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'News', href: '/news' },
    { label: 'Partners', href: '/partners' },
  ],
};
