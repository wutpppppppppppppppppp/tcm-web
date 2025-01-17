import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Events, Currency, Shuttle } from '@carbon/icons-react';
import tcm_warehouse from '@/public/assets/images/tcm-warehouse.jpg';
import Image from 'next/image';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return (
    <>
      <section className="flex h-[calc(0.4*100vw)] w-screen flex-col bg-blue-500">
        <div className="h-[85%] w-full"></div>
        <div className="flex h-[15%] w-full bg-[#F4F4F4]">

        </div>
      </section>

      <section className="flex flex-col items-center justify-center mb-0">
        <h1 className="flex flex-col items-center gap-2">
          {t(`section_two_title`)}
          <hr className="w-12 border-t-2 border-black"></hr>
        </h1>
        <p>{t(`section_two_description_one`)}</p>
        <p>{t(`section_two_description_two`)}</p>
        <p className="text-base font-bold">{t(`section_two_footer`)}</p>
      </section>

      <section>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3DB2A1" />
              <stop offset="100%" stopColor="#1D265C" />
            </linearGradient>
          </defs>
          <path fill="url(#gradient1)" fillOpacity="1" d="M0,20L60,24C120,28,240,36,360,46.7C480,57,600,69,720,74.7C840,80,960,80,1080,76C1200,72,1320,64,1380,59.3L1440,56L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z"></path>
        </svg>
        <div className='w-full h-fit pt-8 pb-12 bg-gradient-to-r from-[#3DB2A1] to-[#1D265C] flex flex-row flex-wrap gap-12 justify-center items-center'>
          <div className='flex flex-col text-white items-center w-96'>
            <Events size="160" className='mb-8' />
            <h2 className='mb-2'>{t(`section_three_one_title`)}</h2>
            <h2 className='font-normal text-center'>{t(`section_three_one_description`)}</h2>
          </div>
          <div className='flex flex-col text-white items-center w-96'>
            <Currency size="160" className='mb-8' />
            <h2 className='mb-2'>{t(`section_three_two_title`)}</h2>
            <h2 className='font-normal text-center'>{t(`section_three_two_description`)}</h2>
          </div>
          <div className='flex flex-col text-white items-center w-96'>
            <Shuttle size="160" className='mb-8' />
            <h2 className='mb-2'>{t(`section_three_three_title`)}</h2>
            <h2 className='font-normal text-center'>{t(`section_three_three_description`)}</h2>
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

      <section className='mx-20'>
        <h1>
          {t(`section_four_title`)}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
      </section>

      <section>
        <div className='flex flex-row flex-wrap justify-center gap-20 w-full h-fit px-20 py-16 text-white bg-gradient-to-r from-[#1797C7] to-[#1D265C]'>
          <div className='flex flex-col text-center justify-center w-2/5'>
            <h2 className='mb-4'>{t(`section_five_title`)}</h2>
            <p>{t(`section_five_description_one`)}</p>
            <p>{t(`section_five_description_two`)}</p>
            <p className='font-bold'>{t(`section_five_description_three`)}</p>
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
    </>
  );
};
