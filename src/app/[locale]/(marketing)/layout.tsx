import { Header } from '@/components/Header';
import Navbar from '@/components/navbar';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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

  const translations = {
    home_link: t('home_link'),
    about_link: t('about_link'),
    catalog_link: t('catalog_link'),
    contact_link: t('contact_link'),
  };

  return (
    <>
      <Header />
      <BaseTemplate
        leftNav={(
          <Navbar translations={translations} />
        )}
      >
        <div className="py-5 text-xl">{props.children}</div>
      </BaseTemplate>
    </>
  );
}
