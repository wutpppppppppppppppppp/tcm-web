import LineQR from '@/public/assets/images/line_qr.png';
import { Earth, Email, LocationCompany, PhoneFilled } from '@carbon/icons-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export const Footer = async () => {
  const t = await getTranslations('Footer');

  return (
    <div className="footer flex h-80 flex-col bg-[#263248] py-4 text-white md:flex-row">
      <div className="flex-1 p-4" id="description">
        <h1>{t('description.title')}</h1>
        <p>{t('description.content')}</p>
      </div>
      <div className="flex-1 p-4" id="contact">
        <h1>{t('contact.title')}</h1>
        <ul>
          <li id="address" className="flex items-start">
            <i><LocationCompany className="mr-2 size-4" /></i>
            <span>{t('contact.address')}</span>
          </li>
          <li id="phone" className="flex items-start">
            <i><PhoneFilled className="mr-2 size-4" /></i>
            <span>{t('contact.phone')}</span>
          </li>
          <li id="mail" className="flex items-start">
            <i><Email className="mr-2 size-4" /></i>
            <span>{t('contact.mail')}</span>
          </li>
          <li id="website" className="flex items-start">
            <i><Earth className="mr-2 size-4" /></i>
            <span>{t('contact.website')}</span>
          </li>
        </ul>

      </div>
      <div className="flex-1 p-4" id="line id">
        <h1>{t('line.title')}</h1>
        <Image src={LineQR} alt="QR Code" width={200} height={200} />
      </div>
    </div>
  );
};
