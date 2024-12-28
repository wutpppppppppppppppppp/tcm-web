import { Header } from '@/components/Header';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  return (
    <>
      <Header />
      <BaseTemplate
        leftNav={(
          <>
            <li>
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('home_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('about_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('catalog_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/contact/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('contact_link')}
              </Link>
            </li>
          </>
        )}
      >
        <div className="py-5 text-xl">{props.children}</div>
      </BaseTemplate>
    </>
  );
}
