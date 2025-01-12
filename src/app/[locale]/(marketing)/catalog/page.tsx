import { CatalogCard } from '@/components/CatalogCard';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type IPortfolioProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IPortfolioProps) {
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

export default async function Portfolio(props: IPortfolioProps) {
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
        <CatalogCard alt="งาน 1" title="เทลคัม เพาเดอร์, แป้งทัลคัม(talcum)" />
        <div className="grid grid-cols-1 justify-items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from(Array.from({ length: 6 }).keys()).map(elt => (
            <Link
              key={elt}
              href={`/portfolio/${elt}`}
            >
              {t('description', { name: elt })}
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
