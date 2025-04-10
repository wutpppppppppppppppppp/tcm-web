import type { SlugKeys } from '@/constants/CatalogList';
import type { Metadata } from 'next';
import ImageSlider from '@/components/ImageSlider';
import { SocialBtn } from '@/components/SocialBtn';
import { CATALOG_LIST } from '@/constants/CatalogList';
import { getCatalogTranslation } from '@/libs/getCatalogProductMeta';
import { routing } from '@/libs/i18nNavigation';
import { checkFileExists } from '@/utils/checkFileExists';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ProductDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales
    .map(locale =>
      CATALOG_LIST.map(slug => ({
        slug,
        locale,
      })),
    )
    .flat(1);
}

export async function generateMetadata(props: ProductDetailProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const catalog = await getCatalogTranslation(locale);
  const product = catalog[slug];
  return {
    title: product?.meta_title ?? catalog.meta_title,
    description: product?.meta_description ?? catalog.meta_description,
    keywords: product?.keywords ?? catalog.keywords,
    openGraph: {
      title: product?.meta_title ?? catalog.meta_title,
      url: `https://thaichemicalmarketing.com/catalog/${encodeURIComponent(slug)}`,
      description: product?.meta_description ?? catalog.meta_description,
      siteName: 'เคมีแหลมทองมาร์เกตติ้ง จำหน่ายเคมีภัณฑ์',
      type: 'website',
      images: [
        {
          url: `https://thaichemicalmarketing.com/assets/images/${encodeURIComponent(slug)}_1.jpeg`,
          width: 1200,
          height: 630,
          alt: product?.meta_title ?? catalog.meta_title,
        },
      ],
    },
  };
}

export default async function ProductDetail(props: ProductDetailProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Catalog',
  });
  const maxImages = 3; // Maximum number of expected images
  const images = Array.from({ length: maxImages }, (_, index) => {
    const imagePath = `/assets/images/${slug}_${index + 1}.jpeg`;
    return checkFileExists(imagePath) ? imagePath : null;
  }).filter(Boolean) as string[]; // Remove `null` values

  // Fallback: If no valid images are found, use a placeholder
  const validImages = images.length > 0 ? images : ['/placeholder.png'];
  return (
    <>
      <section className="mx-auto">
        <h1>
          {t('title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="container flex w-full flex-col items-start justify-center gap-10 md:flex-row">
          {/* Image Slider */}
          <div className="w-full max-w-sm md:w-1/3">
            <ImageSlider images={validImages} />
          </div>

          {/* Text Box */}
          <div className="w-full space-y-4 text-left md:w-1/2">
            <h1 className="product text-2xl font-semibold">
              {t(`${slug}.name` as `${SlugKeys}.name`)}
            </h1>
            <h2 className="product text-xl font-medium text-gray-700">
              {t(`${slug}.h1` as `${SlugKeys}.h1`)}
            </h2>
            <h3 className="product text-lg font-normal text-gray-600">
              {t(`${slug}.h2` as `${SlugKeys}.h2`)}
            </h3>
            <hr className="border-gray-300" />
            <p className="product text-base leading-relaxed text-gray-800">
              {t(`${slug}.p` as `${SlugKeys}.p`)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid gap-4">
        <SocialBtn />
      </section>
    </>
  );
}

export const dynamicParams = false;
