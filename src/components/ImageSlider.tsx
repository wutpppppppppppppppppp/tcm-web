'use client'; // Mark the component as a client component

import Image from 'next/image';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/custom-arrow.css';

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image} className="my-auto">
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            className='w-full'
            width={300}
            height={300}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
