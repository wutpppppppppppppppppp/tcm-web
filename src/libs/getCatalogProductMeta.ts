export async function getCatalogTranslation(locale: string) {
  const messages = await import(`@/locales/${locale}.json`);
  return messages.Catalog;
}
