import { getTranslations } from 'next-intl/server';
import { FaFacebookSquare, FaLine, FaLinkedin, FaPrint } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

export const SocialBtn = async () => {
  const t = await getTranslations('CatalogSlug');
  return (
    <div className="bg-box">
      <div className="share-btn">
        <span className="text-share-btn">{t('share')}</span>
        <ul className="share-items">
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Facebook"><i><FaFacebookSquare className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Line"><i><FaLine className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="LinkedIn"><i><FaLinkedin className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Mail"><i><IoMail className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Print"><i><FaPrint className="h-full" /></i></a></li>
        </ul>
      </div>
    </div>
  );
};
