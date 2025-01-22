import tcm_bigbag from '@/public/assets/images/tcm-bigbag.jpg';
import tcm_graphite from '@/public/assets/images/tcm-graphite.jpg';
import tcm_talcum from '@/public/assets/images/tcm-talcum.jpg';
import tcm_woodenpallet from '@/public/assets/images/tcm-woodenpallet.jpg';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return (
    <>
      <section>
        <h1>
          {t('meta_title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="flex flex-col items-center">
          <h2>{t('meta_description')}</h2>
          <p className="text-justify">{t('about_paragraph')}</p>
          <Image className="mb-2" src={tcm_bigbag} alt="สารเคมี" />
          <Link href="/" className="about">{t('index.meta_title')}</Link>
          <Link href="/" className="about">{t('index.meta_description')}</Link>
        </div>
        <div className="mt-2 flex flex-col">
          <p>{t('about_footer_one')}</p>
          <p>{t('about_footer_two')}</p>
          <p className="font-bold">
            {t('about_footer_three')}
            {' '}
&nbsp;
            <Link href="/" className="about">{t('index.meta_title')}</Link>
          </p>
          <p className="font-bold">
            {t('location_title')}
            :
            <span className="font-normal">
              &nbsp;
              {t('location')}
            </span>
          </p>
          <p className="font-bold">
            {t('tel_title')}
            &nbsp;
            :
            <span className="font-normal">
              &nbsp;
              {t('tel')}
            </span>
          </p>
          <p className="font-bold">
            {t('fax_title')}
            &nbsp;
            :
            <span className="font-normal">
              &nbsp;
              {t('fax')}
            </span>
          </p>
          <p className="font-bold">
            {t('email_title')}
            &nbsp;
            :
            <span className="font-normal">
              &nbsp;
              {t('email')}
            </span>
          </p>
        </div>
      </section>

      <section>
        <h1>
          {t('product.meta_title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div className="flex flex-col">
          <h2>{t('product.meta_description')}</h2>
          <ul>
            <li>
              {t('product.description_one')}
            </li>
            <li>
              {t('product.description_two')}
            </li>
            <li>
              {t('product.description_three')}
            </li>
          </ul>
          <Image className="mb-2" src={tcm_talcum} alt="Talcum" />
          <ul>
            <li>
              {t('product.category_one')}
            </li>
            <li>
              {t('product.category_two')}
            </li>
            <li>
              {t('product.category_three')}
            </li>
            <li>
              {t('product.category_four')}
            </li>
            <li>
              {t('product.category_five')}
            </li>
            <li>
              {t('product.category_six')}
            </li>
            <li>
              {t('product.category_seven')}
            </li>
          </ul>
          <Image className="mb-2" src={tcm_graphite} alt="Graphite" />
          <ul>
            <li className="font-bold">
              {t('product.product_one')}
              <span className="font-normal">
                &nbsp;
                -
                {t('product.product_one_description')}
              </span>
            </li>
            <li className="font-bold">
              {t('product.product_two')}
              <span className="font-normal">
                &nbsp;
                -
                {t('product.product_two_description')}
              </span>
            </li>
            <li className="font-bold">
              {t('product.product_three')}
              <span className="font-normal">
                &nbsp;
                -
                {t('product.product_three_description')}
              </span>
            </li>
            <li className="font-bold">
              {t('product.product_four')}
              <span className="font-normal">
                &nbsp;
                -
                {t('product.product_four_description')}
              </span>
            </li>
          </ul>
          <Image className="mb-2" src={tcm_woodenpallet} alt="WoodenPallet" />
          <p className="text-justify font-bold">
            {t('about_service_title')}
            <span className="font-normal">{t('about_service_description')}</span>
          </p>
          <Link href="/" className="about">{t('footer')}</Link>
          <p className="font-bold">
            {t('tel_title')}
            &nbsp;
            :
            <span className="font-normal">
              &nbsp;
              {t('tel')}
            </span>
          </p>
        </div>
      </section>
    </>
  );
};
