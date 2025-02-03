'use client';

import banner_1 from '@/public/assets/images/banner-1.png';
import banner_2 from '@/public/assets/images/banner-2.png';
import Image from 'next/image';
import React, { useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/custom-arrow.css';

type ClientComponentProps = {
  translations: Record<string, string>;
};

export default function LandingSwiper({ translations }: ClientComponentProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = (key: string) => translations[key] || key;

  return (
    <Swiper
      navigation
      modules={[Autoplay, Navigation]}
      className="flex h-full w-screen bg-white"
      onSlideChange={swiper => setActiveSlide(swiper.activeIndex)}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div className="relative flex items-center justify-center">
          <Image className="h-full" src={banner_1} alt="โกดัง_1" title="โกดัง_1" placeholder="blur" priority />
          <div
            className={`absolute flex flex-col items-center justify-center transition-all duration-[1500ms] ${
              activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="landing">{t('Banner_one_topic')}</h1>
            <p className="landing_one">
              "
              {t('Banner_one_description_one')}
              "
            </p>
            <p className="landing_two">{t('Banner_one_description_two')}</p>
            <p className="landing_two">{t('Banner_one_description_three')}</p>
            <p className="landing_two">{t('Banner_one_description_four')}</p>
            <p className="landing_two">{t('Banner_one_description_five')}</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative flex items-center justify-center">
          <Image className="h-full" src={banner_2} alt="โกดัง_2" title="โกดัง_2" placeholder="blur" priority />
          <div
            className={`absolute flex flex-col items-center justify-center transition-all duration-700 ${
              activeSlide === 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl text-[#00662E]">{t('Banner_two_topic')}</h1>
            <p className="text-shadow text-3xl font-bold text-white">
              "
              {t('Banner_two_description_one')}
              "
            </p>
            <p className="text-shadow text-2xl font-bold text-white">{t('Banner_two_description_two')}</p>
            <p className="text-shadow text-2xl font-bold text-white">{t('Banner_two_description_three')}</p>
            <p className="text-shadow text-2xl font-bold text-white">{t('Banner_two_description_four')}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
