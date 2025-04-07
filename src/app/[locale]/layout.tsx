import type { Metadata, Viewport } from 'next';
import Loading from '@/components/Loading';
import arcjet, { detectBot, request } from '@/libs/Arcjet';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'ขายเคมีภัณฑ์ นำเข้าเคมีภัณฑ์ เคมีแหลมทองมาร์เกตติ้ง จำกัด',
  description: 'ขายเคมีภัณฑ์ ทัลคัม กราไฟต์ แมกนีเซียมออกไซด์ เวอร์มิคูไลท์ เบนโทไนท์ จำหน่ายเคมีภัณฑ์ พร้อมจัดส่ง',
  keywords: ['เคมีแหลมทองมาร์เกตติ้ง', 'ทัลคัม', 'กราไฟต์', 'แมกนีเซียมออกไซด์', 'เวอร์มิคูไลท์', 'เบนโทไนท์', 'ขายเคมีภัณฑ์', 'ขายเคมี', 'นำเข้าเคมีภัณฑ์', 'นำเข้าเคมี', 'ซื้อเคมี', 'ซื้อเคมีภัณฑ์'],
  robots: 'index, follow',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/favicon-16x16.png', // Ensure the correct path
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '48x48',
      url: '/assets/favicon-48x48.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/assets/tcm-icon.png', // Apple devices icon
    },
  ],
  alternates: { canonical: 'https://thaichemicalmarketing.com', languages: { 'en-US': 'https://www.thaichemicalmarketing.com/en', 'th-TH': 'https://thaichemicalmarketing.com' } },
  // how it looks when shared on social media
  openGraph: {
    title: 'ขายเคมีภัณฑ์ นำเข้าเคมีภัณฑ์ | เคมีแหลมทองมาร์เกตติ้ง จำกัด',
    description: 'ขายเคมีภัณฑ์ ทัลคัม กราไฟต์ แมกนีเซียมออกไซด์ เวอร์มิคูไลท์ เบนโทไนท์ พร้อมจัดส่งทั่วประเทศ',
    url: 'https://thaichemicalmarketing.com',
    siteName: 'เคมีแหลมทองมาร์เกตติ้ง จำหน่ายเคมีภัณฑ์',
    type: 'website',
    images: [
      {
        url: 'https://thaichemicalmarketing.com/assets/og-image.jpg', // wait for the image to be uploaded
        width: 1200,
        height: 630,
        alt: 'ขายเคมีภัณฑ์ - เคมีแหลมทองมาร์เกตติ้ง',
      },
    ],
  },

  metadataBase: new URL('https://thaichemicalmarketing.com'),
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  height: 'device-height',
};
// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  }),
);

// Improve performance with local fonts
const anuphan = localFont({
  src: [
    {
      path: '../../../fonts/Anuphan-VariableFont_wght.ttf',
      weight: '100 700',
      style: 'normal',
    },
  ],
  variable: '--font-anuphan',
});

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Verify the request with Arcjet
  if (Env.ARCJET_KEY) {
    const req = await request();
    const decision = await aj.protect(req);

    // These errors are handled by the global error boundary, but you could also
    // redirect or show a custom error page
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error('No bots allowed');
      }

      throw new Error('Access denied');
    }
  }

  // Using internationalization in Client Components
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.

  return (
    <html lang={locale} title="ขายเคมีภัณฑ์ นำเข้าเคมีภัณฑ์ เคมีแหลมทองมาร์เกตติ้ง จำกัด | Thai Chemical Marketing Co., Ltd." className={anuphan.variable}>
      <head>
        <link
          rel="preload"
          href="/assets/tcm-icon.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/fonts/Anuphan-VariableFont_wght.ttf"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <Suspense fallback={<><Loading height="h-screen" /></>}>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            {props.children}
          </NextIntlClientProvider>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
