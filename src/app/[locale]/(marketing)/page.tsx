import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return (
    <>
      <section className="flex h-[calc(0.4*100vw)] w-screen flex-col bg-blue-500">
        <div className="h-[85%] w-full"></div>
        <div className="flex h-[15%] w-full bg-[#F4F4F4]">

        </div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <h1 className="flex flex-col items-center gap-2">
          {t(`section_two_title`)}
          <hr className="w-12 border-t-2 border-black"></hr>
        </h1>
        <p>{t(`section_two_description_one`)}</p>
        <p>{t(`section_two_description_two`)}</p>
        <p className="text-base font-bold">{t(`section_two_footer`)}</p>
      </section>
    </>
  );
};
