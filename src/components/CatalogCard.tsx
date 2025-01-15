import placeholder from '@/public/p300.png';
import Image from 'next/image';
import React from 'react';

type CatalogCardProps = {
  title: string;
};

export const CatalogCard: React.FC<CatalogCardProps> = async ({ title }) => {
  return (
    <div className="flex flex-col items-center border-2">
      <Image src={placeholder} width={300} height={300} className="m-4" alt={title} />
      <h3 className="mb-2">{title}</h3>
      <button
        type="button"
        className="h-10 place-self-stretch border border-[#42C5AB] bg-gradient-to-l from-[#1A1C57] to-[#42C5AB] text-white hover:from-white hover:to-white hover:text-[#42C5AB]"
      >
        ดูรายละเอียด
      </button>
    </div>
  );
};
