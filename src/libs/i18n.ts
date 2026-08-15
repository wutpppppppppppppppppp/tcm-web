import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18nNavigation';

// Translations live in `src/locales/*.json` and are edited directly in this
// repository. Thai is the default locale; English is the secondary one.

// Using internationalization in Server Components
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
