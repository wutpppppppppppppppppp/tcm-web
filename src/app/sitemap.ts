import type { MetadataRoute } from 'next';
import { CATALOG_LIST } from '@/constants/CatalogList';
import { routing } from '@/libs/i18nNavigation';
import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Define your pages (excluding the locale segment since it's handled in the routing)
  const pages = [
    { path: '/', changeFrequency: 'daily', priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/catalog', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Generate entries for all locales
  routing.locales.forEach((locale) => {
    pages.forEach((page) => {
      // Generate the correct URL based on whether it's the default locale
      const localePath = locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? page.path // Default locale with no prefix when using as-needed
        : `/${locale}${page.path}`; // All other locales

      sitemapEntries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency as any,
        priority: page.priority,
      });
    });
  });

  CATALOG_LIST.forEach((productName) => {
    routing.locales.forEach((locale) => {
      const localePath = locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `/catalog/${productName}`
        : `/${locale}/catalog/${productName}`;

      sitemapEntries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as any,
        priority: 0.8,
      });
    });
  });

  return sitemapEntries;
}
