import Image from 'next/image';
import React from 'react';

type CatalogCardProps = {
  alt: string;
  title: string;
};

export const CatalogCard: React.FC<CatalogCardProps> = async ({ alt, title }) => {
  return (
    <div className="flex w-96 flex-col border-2">
      <Image src="/images/catalog/1.jpg" alt={alt} width={300} height={300} />
      <h2>{title}</h2>
      <button
        type="button"
        className="bg-gradient-to-t from-teal-200 to-violet-500 text-white hover:bg-white hover:text-black"
      >
        เพิ่มเข้าตะกร้า
      </button>
    </div>
  );
};
