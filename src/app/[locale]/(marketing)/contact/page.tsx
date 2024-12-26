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
      <section>
        <h1>{t('contact_info.title')}</h1>
        <div className="grid grid-rows-9 gap-4">
          {contactItems.map(item => (
            <dl key={item} className="flex gap-6 border-b-2">
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
            </dl>
          ))}
        </div>
      </section>
      <section>
        <h1>ภาพกิจการ</h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <Image
              src="/assets/images/tcm-warehouse2.jpg"
              alt={t('contact_info.name.value')}
              width={300}
              height={200}
            />
            <p className="flex items-center justify-center bg-gray-100 py-4 text-center">{t('image.title1')}</p>
          </div>
          <div>
            <Image
              src="/assets/images/tcm-warehouse3.jpg"
              alt={t('contact_info.name.value')}
              width={300}
              height={200}
            />
            <p className="flex items-center justify-center bg-gray-100 py-4 text-center">{t('image.title2')}</p>
          </div>
          <div>
            <Image
              src="/assets/images/tcm-bigbag.jpg"
              alt={t('contact_info.name.value')}
              width={300}
              height={200}
            />
            <p className="flex items-center justify-center bg-gray-100 py-4 text-center">{t('image.title3')}</p>
          </div>
        </div>
      </section>
      <iframe title="tcm-warehouse" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.78150431927!2d100.50266301178024!3d13.73167419770131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298e0c16327ff%3A0x5fa7ae36fc3737d3!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4hOC4oeC4teC5geC4q-C4peC4oeC4l-C4reC4h-C4oeC4suC4o-C5jOC5gOC4geC4leC4leC4tOC5ieC4hyDguIjguLPguIHguLHguJQgKOC4quC4s-C4meC4seC4geC4h-C4suC4meC5g-C4q-C4jeC5iCk!5e0!3m2!1sen!2sth!4v1735223999027!5m2!1sen!2sth" className="h-[30rem] w-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </>
  );
};
