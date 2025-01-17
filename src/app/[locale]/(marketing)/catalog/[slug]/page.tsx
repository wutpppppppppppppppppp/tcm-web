import { SocialBtn } from '@/components/SocialBtn';
import { routing } from '@/libs/i18nNavigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

type ProductDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const catalogList = ['Talcum', 'Graphite', 'MgO', 'Vermiculte', 'Bentonite'];

type SlugKeys = 'Talcum' | 'Graphite' | 'MgO' | 'Vermiculite' | 'Bentonite';

export async function generateStaticParams() {
  return routing.locales
    .map(locale =>
      catalogList.map(slug => ({
        slug,
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
    namespace: 'Catalog',
  });
  // const key = switch (locale) {
  //   case "th":
  //       return "product_th"
  //     break;

  //   default:
  //     break;
  // }

  // product[key]
  return (
    <>
      <section>
        <h1>
          {t('title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="container flex">
          <Image
            src="/p300.png" // `${slug}_slug_pic.jpg` || `${slug}_slug_pic.jpg` ||
            alt={t(`${slug}.metadata` as `${SlugKeys}.metadata`)}
            width={500}
            height={500}
            className="rounded-lg"
          />
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-2xl font-bold">{t(`${slug}.name` as `${SlugKeys}.name`)}</h1>
            <h2 className="mb-4 text-lg">{t(`${slug}.h1` as `${SlugKeys}.h1`)}</h2>
            <h3 className="prose max-w-none">
              {t(`${slug}.h2` as `${SlugKeys}.h2`)}
            </h3>
            <p>{t(`${slug}.p` as `${SlugKeys}.p`)}</p>
            <SocialBtn />
          </div>
        </div>
      </section>
    </>
  );
}

export const dynamicParams = false;
