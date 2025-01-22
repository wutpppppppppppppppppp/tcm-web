'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { CatalogCard } from './CatalogCard';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/custom-arrow.css';

const catalogList = ['Talcum', 'Graphite', 'MgO', 'Vermiculite', 'Bentonite', 'Ceramic', 'Food_chemical', 'Swimming_pool'];
type IndexKeys = 'Talcum' | 'Graphite' | 'MgO' | 'Vermiculite' | 'Bentonite' | 'Ceramic' | 'Food_chemical' | 'Swimming_pool';

type ClientComponentProps = {
  translations: Record<string, string>;
  params?: Promise<{ locale: string }>;
  locale: string; // Add this property
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
    // Optionally, show a loader or return null while waiting for the locale
    return <div>Loading...</div>;
  }
  return (
    <Swiper
      navigation
      modules={[Navigation]}
      className="max-w-5xl"
      spaceBetween={30}
      freeMode
      direction="horizontal"
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {catalogList.map(index => (
        <SwiperSlide key={index}>
          <Link
            href={`/catalog/${index}`}
            className="product"
          >
            <CatalogCard title={c(`${index}` as `${IndexKeys}`)} locale={locale} imgPath={index} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
