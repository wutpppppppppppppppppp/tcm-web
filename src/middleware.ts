import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/i18nNavigation';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!robots\\.txt|sitemap\\.xml|_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
