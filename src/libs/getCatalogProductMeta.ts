// export async function getCatalogProductMeta(locale: string, slug: string) {
//   const t = await getTranslations({ locale, namespace: 'Catalog' });

//   // Get the whole catalog object
//   const catalog = t.raw() as Record<string, any>;

//   // Get the specific product
//   const product = catalog[slug] as ProductMeta | undefined;

//   if (!product) {
//     return {
//       title: catalog.meta_title,
//       description: catalog.meta_description,
//       keywords: catalog.keywords,
//     };
//   }

//   return {
//     title: product.meta_title || catalog.meta_title,
//     description: product.meta_description || catalog.meta_description,
//     keywords: product.keywords || catalog.keywords,
//   };
// }

export async function getCatalogTranslation(locale: string) {
  const messages = await import(`@/locales/${locale}.json`);
  console.error(messages.Catalog);
  return messages.Catalog;
}
