import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';

export const Header = async () => {
  const t = await getTranslations('RootLayout');

  return (
    <div className="flex items-center justify-between bg-gray-300 px-4 py-2">
      <div className="text-gray-700">Thai Chemical Marketing Co.,LTD</div>
      <div className="flex items-center gap-4">
        <Link
          href="/sign-in/"
          className="text-gray-700 hover:text-gray-200"
        >
          {t('sign_in_link')}
        </Link>
        <Link
          href="/sign-up/"
          className="text-gray-700 hover:text-gray-200"
        >
          {t('sign_up_link')}
        </Link>
        <LocaleSwitcher />
      </div>
    </div>
  );
};
