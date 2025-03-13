import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/admin'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
