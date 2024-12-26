import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

type IContactProps = {
  params: Promise<{ slug: string; locale: string }>;
};
type ContactItem = 'name' | 'address' | 'phone' | 'fax' | 'line_id' | 'email' | 'website' | 'office_hours' | 'map';

export async function generateMetadata(props: IContactProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Contact',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Contact(props: IContactProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Contact',
  });
  const contactItems: ContactItem[] = [
    'name',
    'address',
    'phone',
    'fax',
    'line_id',
    'email',
    'website',
    'office_hours',
    'map',
  ];

  return (
    <>
      <h1>{t('contact_info.title')}</h1>
      <div className="grid grid-rows-9 gap-4">
        {contactItems.map(item => (
          <div key={item} className="flex gap-6 border-b-2">
            <dt className="min-w-[120px] font-semibold">
              {t(`contact_info.${item}.title`)}
              :
            </dt>
            <dd>
              {item === 'map'
                ? (
                    <a
                      href={t(`contact_info.${item}.value`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Maps 🌎
                    </a>
                  )
                : item === 'email'
                  ? (
                      <a
                        href={`mailto:${t(`contact_info.${item}.value`)}`}
                        className="text-blue-600 hover:underline"
                      >
                        {t(`contact_info.${item}.value`)}
                      </a>
                    )
                  : (
                      t(`contact_info.${item}.value`)
                    )}
            </dd>
          </div>
        ))}
      </div>
      <h1>ภาพกิจการ</h1>
      <div className="flex gap-4">
        <div>
          <Image
            src="/assets/images/tcm-warehouse2.jpg"
            alt={t('contact_info.name.value')}
            width={300}
            height={200}
          />
          <p className="flex h-24 items-center justify-center bg-gray-100 text-center">{t('image.title1')}</p>
        </div>
        <div>
          <Image
            src="/assets/images/tcm-warehouse3.jpg"
            alt={t('contact_info.name.value')}
            width={300}
            height={200}
          />
          <p className="flex h-24 items-center justify-center bg-gray-100 text-center">{t('image.title2')}</p>
        </div>
        <div>
          <Image
            src="/assets/images/tcm-bigbag.jpg"
            alt={t('contact_info.name.value')}
            width={300}
            height={200}
          />
          <p className="flex h-24 items-center justify-center bg-gray-100 text-center">{t('image.title3')}</p>
        </div>
      </div>
    </>
  );
};
