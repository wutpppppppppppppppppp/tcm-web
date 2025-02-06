'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type ClientComponentProps = {
  translations: Record<string, string>;
};

export default function Navbar({ translations }: ClientComponentProps) {
  const currentPath = usePathname();
  const locale = useLocale();

  const isActive = (path: string) => {
    const localizedPath = `/${locale}${path === '/' ? '' : path}`;

    const nonLocalizedPath = path === '/' ? '/' : path;

    return currentPath === localizedPath || currentPath === nonLocalizedPath;
  };

  const getLocalizedPath = (path: string) => `/${locale}${path === '/' ? '' : path}`;

  return (
    <>
      <li>
        <Link
          href={getLocalizedPath('/')}
          className={`nav ${
            isActive('/') ? 'nav_hover' : 'text-gray-700'
          }`}
        >
          {translations.home_link}
        </Link>
      </li>
      <li>
        <Link
          href={getLocalizedPath('/about')}
          className={`nav ${
            isActive('/about') ? 'nav_hover' : 'text-gray-700'
          }`}
        >
          {translations.about_link}
        </Link>
      </li>
      <li>
        <Link
          href={getLocalizedPath('/catalog')}
          className={`nav ${
            isActive('/catalog') ? 'nav_hover' : 'text-gray-700'
          }`}
        >
          {translations.catalog_link}
        </Link>
      </li>
      <li>
        <Link
          href={getLocalizedPath('/contact')}
          className={`nav ${
            isActive('/contact') ? 'nav_hover' : 'text-gray-700'
          }`}
        >
          {translations.contact_link}
        </Link>
      </li>
    </>
  );
}
