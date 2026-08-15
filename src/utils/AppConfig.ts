import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'บริษัท เคมีแหลมทองมาร์เกตติ้ง จำกัด',
  locales: ['th', 'en'],
  defaultLocale: 'th',
  localePrefix,
};
