import { SocialBtn } from '@/components/SocialBtn';
import { routing } from '@/libs/i18nNavigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

type ProductDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const catalogList = ['Talcum', 'Graphite', 'MgO', 'Vermiculite', 'Bentonite', 'Ceramic', 'Food_chemical', 'Swimming_pool'];

type SlugKeys = 'Talcum' | 'Graphite' | 'MgO' | 'Vermiculite' | 'Bentonite' | 'Ceramic' | 'Food_chemical' | 'Swimming_pool';

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
        <div className="container flex items-start justify-evenly">
          <Image
            src="/p300.png" // `${slug}_slug_pic.jpg` || `${slug}_slug_pic.jpg` ||
            alt={t(`${slug}.metadata` as `${SlugKeys}.metadata`)}
            width={300}
            height={300}
            className="rounded-lg"
          />
          <div className="pl-5 text-left">
            <h1 className="product">{t(`${slug}.name` as `${SlugKeys}.name`)}</h1>
            <h2 className="product">{t(`${slug}.h1` as `${SlugKeys}.h1`)}</h2>
            <h3 className="product prose">
              {t(`${slug}.h2` as `${SlugKeys}.h2`)}
            </h3>
            <hr className="solid"></hr>
            <p className="product">
              "
              {t(`${slug}.p` as `${SlugKeys}.p`)}
              "
            </p>
          </div>
        </div>
      </section>
      <section>
        <SocialBtn />
      </section>
    </>
  );
}

export const dynamicParams = false;
