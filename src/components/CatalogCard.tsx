'use client';
import React from 'react';

type CatalogCardProps = {
  alt: string;
  title: string;
};

export const CatalogCard: React.FC<CatalogCardProps> = ({ alt, title }) => {
  return (
    <div className="flex flex-col border-2 border-black">
      {alt + title}
      <button
        type="button"
        className="hover:bg-blue-500"
      >
        เพิ่มเข้าตะกร้า
      </button>
    </div>
  );
};
