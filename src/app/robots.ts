import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/cart', '/checkout', '/early'],
      },
    ],
    sitemap: 'https://www.thekolossal.com/sitemap.xml',
    host: 'https://www.thekolossal.com',
  };
}
