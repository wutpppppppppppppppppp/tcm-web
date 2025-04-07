// types/catalog.ts

export type ProductMeta = {
  name: string;
  metadata: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  h1: string;
  h2?: string;
  p: string;
};

export type CatalogTranslation = {
  meta_title: string;
  meta_description: string;
  title: string;
  description: string;
  keywords: string;
  [slug: string]: string | ProductMeta;
};
