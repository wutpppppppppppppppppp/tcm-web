'use client';
import placeholder from '@/public/placeholder.png';
import Image, { type StaticImageData } from 'next/image';
import React, { useState } from 'react';

type CatalogCardProps = {
  title: string;
  locale: string;
  imgPath: string;
};

export const CatalogCard: React.FC<CatalogCardProps> = (props: CatalogCardProps) => {
  const buttonText = props.locale === 'th' ? 'แสดงรายละเอียด' : 'View Details';
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(`/assets/images/${props.imgPath}_Profile.png`);
  return (
    <div className="flex flex-col items-center border-2">
      <Image src={imgSrc} width={250} height={250} className="p-4" alt={props.title} onError={() => setImgSrc(placeholder)} />
      <h3 className="mb-2 text-pretty text-center font-extrabold">{props.title}</h3>
      <button
        type="button"
        className="hidden h-10 place-self-stretch border border-[#42C5AB] bg-gradient-to-l from-[#1A1C57] to-[#42C5AB] font-normal text-white hover:from-white hover:to-white hover:text-[#42C5AB] md:block"
      >
        {buttonText}
      </button>
    </div>
  );
};
