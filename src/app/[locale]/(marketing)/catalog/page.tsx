import { CatalogCard } from '@/components/CatalogCard';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type ICatalogProps = {
  params: Promise<{ locale: string }>;
};

const catalogList = ['Talcum', 'Graphite', 'MgO', 'Vermiculte', 'Bentonite'];

export async function generateMetadata(props: ICatalogProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Catalog',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
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
      <section>
        <h1>
          {t('title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="grid grid-cols-1 justify-items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
          {catalogList.map(index => (
            <Link
              key={index}
              href={`/catalog/${index}`}
            >
              <CatalogCard title={index} />
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h1>
          คำค้นสินค้า
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
      </section>
    </>
  );
};
