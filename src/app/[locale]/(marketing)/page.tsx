import LandingSwiper from '@/components/LandingSwiper';
import LineIcon from '@/components/LineIcon';
import ProductSwiper from '@/components/ProductSwiper';
import tcm_warehouse from '@/public/assets/images/tcm-warehouse.jpg';
import { Currency, Email, Events, PhoneFilled, Shuttle, Store } from '@carbon/icons-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  const translations = {
    Banner_one_topic: t('banner_one_topic'),
    Banner_one_description_one: t('banner_one_description_one'),
    Banner_one_description_two: t('banner_one_description_two'),
    Banner_one_description_three: t('banner_one_description_three'),
    Banner_one_description_four: t('banner_one_description_four'),
    Banner_one_description_five: t('banner_one_description_five'),
    Banner_two_topic: t('banner_two_topic'),
    Banner_two_description_one: t('banner_two_description_one'),
    Banner_two_description_two: t('banner_two_description_two'),
    Banner_two_description_three: t('banner_two_description_three'),
    Banner_two_description_four: t('banner_two_description_four'),
  };

  const c = await getTranslations({
    locale,
    namespace: 'Catalog',
  });

  const cc = await getTranslations({
    locale,
    namespace: 'CatalogCard',
  });

  const translations_c = {
    Talcum: c('Talcum.name'),
    Graphite: c('Graphite.name'),
    MgO: c('MgO.name'),
    Vermiculite: c('Vermiculite.name'),
    Bentonite: c('Bentonite.name'),
    Ceramic: c('Ceramic.name'),
    Food_chemical: c('Food_chemical.name'),
    Swimming_pool: c('Swimming_pool.name'),
    view_details: cc('view_details'),
  };

  const articleItems = [
    'one',
    'two',
    'three',
    'four',
  ];

  type ArticleKeys = 'one' | 'two' | 'three' | 'four';

  return (
    <>
      <section className="max-w-none">
        <LandingSwiper translations={translations} />
        <div className="grid min-h-20 w-full grid-cols-4 divide-x divide-[#CCCCCC] bg-[#F4F4F4] p-4">
          <div className="flex w-full flex-row items-center justify-center gap-8 px-8">
            <div className="flex flex-col items-center justify-center gap-1">
              <PhoneFilled size="32" />
              <h2 className="m-0">{t('tel_title')}</h2>
            </div>
            <div className="flex flex-col">
              <p className="m-0">{t('tel_one')}</p>
              <p className="m-0">{t('tel_two')}</p>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-8 px-8">
            <div className="flex flex-col items-center justify-center gap-1">
              <Email size="32" />
              <h2 className="m-0">{t('email_title')}</h2>
            </div>
            <p>{t('email')}</p>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-8 px-8">
            <div className="flex flex-col items-center justify-center gap-1">
              <Store size="32" />
              <h2 className="m-0">{t('address_title')}</h2>
            </div>
            <div className="flex flex-col">
              <p className="m-0">{t('address_one')}</p>
              <p className="m-0">{t('address_two')}</p>
            </div>
          </div>
          <div className="flex w-full flex-row px-8">
            <LineIcon width="40" height="40" className="text-green-400" />
          </div>
        </div>
      </section>

      <section className="mb-0 flex max-w-none flex-col items-center justify-center">
        <h1 className="flex flex-col items-center gap-2">
          {t(`section_two_title`)}
          <hr className="w-12 border-t-2 border-black"></hr>
        </h1>
        <p>{t(`section_two_description_one`)}</p>
        <p>{t(`section_two_description_two`)}</p>
        <p className="text-base font-bold">{t(`section_two_footer`)}</p>
      </section>

      <section className="max-w-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3DB2A1" />
              <stop offset="100%" stopColor="#1D265C" />
            </linearGradient>
          </defs>
          <path fill="url(#gradient1)" fillOpacity="1" d="M0,20L60,24C120,28,240,36,360,46.7C480,57,600,69,720,74.7C840,80,960,80,1080,76C1200,72,1320,64,1380,59.3L1440,56L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z"></path>
        </svg>
        <div className="flex h-fit w-full flex-row flex-wrap items-center justify-center gap-12 bg-gradient-to-r from-[#3DB2A1] to-[#1D265C] pb-12 pt-8">
          <div className="flex w-96 flex-col items-center text-white">
            <Events size="160" className="mb-8" />
            <h2 className="mb-2">{t(`section_three_one_title`)}</h2>
            <h2 className="text-center font-normal">{t(`section_three_one_description`)}</h2>
          </div>
          <div className="flex w-96 flex-col items-center text-white">
            <Currency size="160" className="mb-8" />
            <h2 className="mb-2">{t(`section_three_two_title`)}</h2>
            <h2 className="text-center font-normal">{t(`section_three_two_description`)}</h2>
          </div>
          <div className="flex w-96 flex-col items-center text-white">
            <Shuttle size="160" className="mb-8" />
            <h2 className="mb-2">{t(`section_three_three_title`)}</h2>
            <h2 className="text-center font-normal">{t(`section_three_three_description`)}</h2>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3DB2A1" />
              <stop offset="100%" stopColor="#1D265C" />
            </linearGradient>
          </defs>
          <path fill="url(#gradient2)" fillOpacity="1" d="M0,24L60,26.7C120,29,240,35,360,44C480,53,600,64,720,72C840,80,960,84,1080,81.3C1200,78,1320,69,1380,64L1440,60L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </section>

      <section className="mx-20 h-fit max-w-none">
        <h1>
          {t(`section_four_title`)}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <ProductSwiper translations={translations_c} />
      </section>

      <section className="max-w-none">
        <div className="flex h-fit w-full flex-row flex-wrap justify-center gap-10 bg-gradient-to-r from-[#1797C7] to-[#1D265C] px-20 py-16 text-white lg:gap-20">
          <div className="flex flex-col justify-center text-center lg:w-2/5">
            <h2 className="mb-4">{t(`section_five_title`)}</h2>
            <p>{t(`section_five_description_one`)}</p>
            <p>{t(`section_five_description_two`)}</p>
            <p className="font-bold">{t(`section_five_description_three`)}</p>
          </div>
          <Image className="w-[34.6875rem]" src={tcm_warehouse} alt="โกดัง" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1797C7" />
              <stop offset="100%" stopColor="#1D265C" />
            </linearGradient>
          </defs>
          <path fill="url(#gradient3)" fillOpacity="1" d="M0,24L60,26.7C120,29,240,35,360,44C480,53,600,64,720,72C840,80,960,84,1080,81.3C1200,78,1320,69,1380,64L1440,60L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </section>

      <section className="mx-20 max-w-none">
        <h1>
          {t(`section_six_title`)}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {articleItems.map(item => (
            <div key={item} className="flex h-[32rem] w-56 flex-col border">
              <Image
                src={`/assets/images/Powder-${item}.jpg`}
                alt={`section_six_${item}_title_en`}
                className="h-40 w-full"
                width={320}
                height={320}
              />
              <div className="grow p-3">
                <h2>{t(`section_six_${item}_title_th` as `section_six_${ArticleKeys}_title_th`)}</h2>
                <h2>{t(`section_six_${item}_title_en` as `section_six_${ArticleKeys}_title_en`)}</h2>
                <p>
                  {t(`section_six_${item}_description` as `section_six_${ArticleKeys}_description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
