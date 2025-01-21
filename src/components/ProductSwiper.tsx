'use client';

import placeholder from '@/public/p300.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/custom-arrow.css';

const catalogList = ['Talcum', 'Graphite', 'MgO', 'Vermiculite', 'Bentonite', 'Ceramic', 'Food_chemical', 'Swimming_pool'];

type ClientComponentProps = {
  translations: Record<string, string>;
};

export default function ProductSwiper({ translations }: ClientComponentProps) {
  const c = (key: string) => translations[key] || key;

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
            <div className="flex flex-col items-center border-2">
              <Image src={placeholder} width={300} height={300} className="p-4" alt={c(`${index}`)} />
              <h3 className="mb-2 text-pretty text-center font-extrabold">{c(`${index}`)}</h3>
              <button
                type="button"
                className="h-10 place-self-stretch border border-[#42C5AB] bg-gradient-to-l from-[#1A1C57] to-[#42C5AB] font-normal text-white hover:from-white hover:to-white hover:text-[#42C5AB]"
              >
                {c('view_details')}
              </button>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
