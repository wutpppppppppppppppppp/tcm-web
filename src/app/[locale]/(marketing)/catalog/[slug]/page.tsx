import { routing } from '@/libs/i18nNavigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ProductDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales
    .map(locale =>
      Array.from(Array.from({ length: 6 }).keys()).map(elt => ({
        slug: `${elt}`,
        locale,
      })),
    )
    .flat(1);
}

export async function generateMetadata(props: ProductDetailProps) {
  const { locale, slug } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'CatalogSlug',
  });

  return {
    title: t('meta_title', { slug }),
    description: t('meta_description', { slug }),
  };
}

export default async function ProductDetail(props: ProductDetailProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'CatalogSlug',
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-4 text-2xl font-bold">{t('title', { slug })}</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* <div>
          <Image
            src={image || '/placeholder.jpg'}
            alt={t('description')}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div> */}
        <div>
          <p className="mb-4 text-lg">{t('description')}</p>
          <div className="prose max-w-none">
            {t('full_description')}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamicParams = false;
