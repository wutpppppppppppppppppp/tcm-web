import type { SlugKeys } from '@/constants/CatalogList';
import type { Metadata } from 'next';
import { CatalogCard } from '@/components/CatalogCard';
import { CATALOG_LIST } from '@/constants/CatalogList';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type ICatalogProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ICatalogProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Catalog' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [t('keywords')],
    alternates: {
      canonical: `https://thaichemicalmarketing.com/${locale}/catalog`,
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: `https://thaichemicalmarketing.com/${locale}/catalog`,
      type: 'website',
    },
  };
}

export default async function Portfolio(props: ICatalogProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Catalog',
  });

  return (
    <>
      <section className="mx-auto">
        <h1>
          {t('title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {CATALOG_LIST.map(index => (
            <Link
              key={index}
              href={`/catalog/${index}`}
              className="product"
            >
              <CatalogCard title={t(`${index}.name` as `${SlugKeys}.name`)} locale={locale} imgPath={index} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto">
        <h1>
          {t('keywords')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
      </section>
    </>
  );
};
