import warehouse2 from '@/public/assets/images/tcm-warehouse2.jpg';
import warehouse3 from '@/public/assets/images/tcm-warehouse3.jpg';
import warehouse4 from '@/public/assets/images/tcm-warehouse4.jpg';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

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
      <section className="mx-auto">
        <h1>
          {t('contact_info.title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>
        <div id="table">
          {contactItems.map(item => (
            <div key={item} className="flex items-center justify-center border-b-2 py-4">
              <h2 className="table">
                {t(`contact_info.${item}.title`)}
              </h2>
              <p className="table">
                {item === 'map'
                  ? (
                      <Link
                        href={t(`contact_info.${item}.value`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Maps 🌎
                      </Link>
                    )
                  : item === 'email'
                    ? (
                        <Link
                          href={`mailto:${t(`contact_info.${item}.value`)}`}
                        >
                          {t(`contact_info.${item}.value`)}
                        </Link>
                      )
                    : item === 'line_id'
                      ? (
                          <Link
                            href={`http://line.me/ti/p/~${t(`contact_info.${item}.value`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t(`contact_info.${item}.value`)}
                          </Link>
                        )
                      : (
                          t(`contact_info.${item}.value`)
                        )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto">
        <h1>
          {t('image.title')}
          <hr className="w-10 border-t-2 border-black"></hr>
        </h1>

        <div className="flex gap-4">
          <div>
            <Image
              src={warehouse2}
              alt={t('contact_info.name.value')}
            />
            <p className="flex items-center justify-center bg-gray-100 py-4 text-center">{t('image.title1')}</p>
          </div>
          <div>
            <Image
              src={warehouse3}
              alt={t('contact_info.name.value')}
            />
            <p className="flex items-center justify-center bg-gray-100 py-4 text-center">{t('image.title2')}</p>
          </div>
          <div>
            <Image
              src={warehouse4}
              alt={t('contact_info.name.value')}
            />
            <p className="flex items-center justify-center bg-gray-100 py-4 text-center">{t('image.title3')}</p>
          </div>
        </div>
      </section>
      <iframe
        title="tcm-warehouse"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.78150431927!2d100.50266301178024!3d13.73167419770131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298e0c16327ff%3A0x5fa7ae36fc3737d3!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4hOC4oeC4teC5geC4q-C4peC4oeC4l-C4reC4h-C4oeC4suC4o-C5jOC5gOC4geC4leC4leC4tOC5ieC4hyDguIjguLPguIHguLHguJQgKOC4quC4s-C4meC4seC4geC4h-C4suC4meC5g-C4q-C4jeC5iCk!5e0!3m2!1sen!2sth!4v1735223999027!5m2!1sen!2sth"
        className="h-[30rem] w-full border-0"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      >
      </iframe>
    </>
  );
};
