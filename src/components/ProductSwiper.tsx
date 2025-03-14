'use client';

import type { SlugKeys } from '@/constants/CatalogList';
import { CATALOG_LIST } from '@/constants/CatalogList';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CatalogCard } from './CatalogCard';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/custom-arrow.css';

type ClientComponentProps = {
  translations: Record<string, string>;
  params?: Promise<{ locale: string }>;
  locale: string;
};

export default function ProductSwiper({ translations, params, locale }: ClientComponentProps) {
  const c = (key: string) => translations[key] || key;
  const [resolvedLocale, setResolvedLocale] = useState<string | null>(locale || null);

  useEffect(() => {
    if (!locale && params) {
      params.then((resolvedParams) => {
        setResolvedLocale(resolvedParams.locale);
      });
    }
  }, [locale, params]);

  if (!resolvedLocale) {
    return <div>Loading...</div>;
  }
  return (
    <Swiper
      navigation
      modules={[Navigation]}
      spaceBetween={30}
      freeMode
      className="max-w-sm lg:max-w-5xl"
      direction="horizontal"
      breakpoints={{
        0: { slidesPerView: 1, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
      }}
    >
      {CATALOG_LIST.map(index => (
        <SwiperSlide key={index}>
          <Link
            href={`/catalog/${index}`}
            className="product"
          >
            <CatalogCard title={c(`${index}` as `${SlugKeys}`)} locale={locale} imgPath={index} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
