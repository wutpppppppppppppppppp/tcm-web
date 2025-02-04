import { Email, LogoFacebook, LogoLinkedin, Printer } from '@carbon/icons-react';
import { getTranslations } from 'next-intl/server';
import LineSvgComponent from './LineIcon';

export const SocialBtn = async () => {
  const t = await getTranslations('CatalogSlug');
  return (
    <div className="bg-box">
      <div className="share-btn scale-hover">
        <span className="text-share-btn">{t('share')}</span>
        <ul className="share-items">
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Facebook"><i><LogoFacebook className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Line"><i><LineSvgComponent className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="LinkedIn"><i><LogoLinkedin className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Mail"><i><Email className="h-full" /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Print"><i><Printer className="h-full" /></i></a></li>
        </ul>
      </div>
    </div>
  );
};
