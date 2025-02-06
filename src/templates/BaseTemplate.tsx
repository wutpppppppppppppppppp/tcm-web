import { AppConfig } from '@/utils/AppConfig';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Suspense } from 'react'
import Loading from '@/components/Loading';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="flex w-screen flex-col items-center text-gray-700 antialiased">
      <header>
        <div className="flex-col justify-items-center pb-8 pt-16">
          <Image
            src="/tcm-icon.png"
            alt={AppConfig.name}
            width={100}
            height={100}
          />
          <h1 className="text-gray-900">
            {AppConfig.name}
          </h1>
          <h2 className="text-xl">{t('description')}</h2>
        </div>
      </header>

      <nav>
        <ul className="flex w-full list-none flex-wrap justify-between gap-0 text-xl md:w-fit md:justify-normal">
          {props.leftNav}
        </ul>
        <ul className="flex list-none flex-wrap gap-0 text-xl">
          {props.rightNav}
        </ul>
      </nav>

      <Suspense fallback={<><Loading height='h-[calc(100vh-4rem)]'/></>}>
        <main className='w-full'>{props.children}</main>
      </Suspense>

      <footer className="border-t border-gray-300 py-8 text-center md:text-base text-sm">
        {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
        {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
      </footer>
    </div >
  );
};
