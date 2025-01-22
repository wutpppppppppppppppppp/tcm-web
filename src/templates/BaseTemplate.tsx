import { AppConfig } from '@/utils/AppConfig';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="flex w-full flex-col items-center text-gray-700 antialiased">
      <header>
        <div className="flex-col justify-items-center pb-8 pt-16">
          <Image
            src="/tcm-icon.png"
            alt={AppConfig.name}
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold text-gray-900">
            {AppConfig.name}
          </h1>
          <h2 className="text-xl">{t('description')}</h2>
        </div>

        <div className="flex justify-center">
          <nav>
            <ul className="flex list-none flex-wrap gap-0 text-xl">
              {props.leftNav}
            </ul>
          </nav>

          <nav>
            <ul className="flex list-none flex-wrap gap-0 text-xl">
              {props.rightNav}
            </ul>
          </nav>
        </div>
      </header>

      <main>{props.children}</main>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
        {t.rich('made_with', {
          author: () => (
            <Link
              href="https://github.com/wutpppppppppppppppppp"
            >
              wutpppppppppppppppppp
            </Link>
          ),
        })}
        {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
      </footer>
    </div>
  );
};
