import type { MetadataRoute } from 'next';

const BASE_URL = 'https://random-travel.ho04029.workers.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/trips', '/favorite', '/auth'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
