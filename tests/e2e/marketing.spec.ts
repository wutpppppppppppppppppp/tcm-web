import type { ConsoleMessage, Page, Response } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { CATALOG_LIST } from '../../src/constants/CatalogList';

// `localePrefix` is 'as-needed' with 'th' as the default locale, so Thai routes
// are served unprefixed and English routes carry an `/en` prefix. next-intl
// also negotiates the locale from `Accept-Language`, so each block below sends
// the header matching the routes it asks for — otherwise the browser default
// (en-US) redirects the unprefixed Thai routes to `/en`.
const LOCALES = [
  { code: 'th', prefix: '', browserLocale: 'th-TH' },
  { code: 'en', prefix: '/en', browserLocale: 'en-US' },
] as const;

const PAGES = ['/', '/about', '/contact', '/catalog'] as const;

/**
 * Assets referenced by the app that do not exist, and so fail on every request.
 * These are pre-existing defects, not regressions:
 *
 * - the sized favicons and apple-touch icon are served from the `public/` root
 *   (`/favicon-32x32.png`) but referenced under `/assets/`
 * - the preloaded font lives in the repo-root `fonts/` directory, which is not
 *   web-served; `next/font/local` bundles it correctly, so only the preload
 *   hint is broken
 * - three catalog products have no `_Profile.png`, so `next/image` 400s on them
 *
 * Listed here so the suite still fails on any *new* broken asset. Remove
 * entries as the underlying paths are fixed.
 */
const KNOWN_MISSING_ASSETS = [
  '/assets/favicon-16x16.png',
  '/assets/favicon-32x32.png',
  '/assets/favicon-48x48.png',
  '/assets/tcm-icon.png',
  '/fonts/Anuphan-VariableFont_wght.ttf',
  '/assets/images/Ceramic_Profile.png',
  '/assets/images/Food_chemical_Profile.png',
  '/assets/images/Swimming_pool_Profile.png',
];

/**
 * `@vercel/analytics` and `@vercel/speed-insights` are injected by the Vercel
 * edge network at runtime. Their scripts do not exist in a local or CI build,
 * so they 404 everywhere except a real deployment.
 */
const isVercelRuntimeScript = (source: string) => source.startsWith('/_vercel/');

/**
 * `next/image` wraps the real source in a `url` query parameter, so a failing
 * optimiser request has to be judged on what it was trying to load.
 */
const failingSource = (rawUrl: string) => {
  const url = new URL(rawUrl);

  return url.searchParams.get('url') ?? url.pathname;
};

const routeFor = (prefix: string, page: string) =>
  page === '/' ? prefix || '/' : `${prefix}${page}`;

/**
 * Next.js renders a page perfectly well while a client component throws
 * underneath it, so asserting on the document status alone would let exactly
 * the regressions we care about through. This watches for uncaught exceptions
 * and for sub-resources that fail to load.
 */
const watchForFailures = (page: Page) => {
  const pageErrors: string[] = [];
  const badResponses: string[] = [];

  page.on('pageerror', error => pageErrors.push(error.message));

  page.on('response', (response: Response) => {
    const source = failingSource(response.url());

    const expected = KNOWN_MISSING_ASSETS.includes(source) || isVercelRuntimeScript(source);

    if (response.status() >= 400 && !expected) {
      badResponses.push(`${response.status()} ${source}`);
    }
  });

  page.on('console', (message: ConsoleMessage) => {
    // Resource-load failures are covered by the response listener above, with
    // the URL attached; the console message for them carries no detail.
    if (message.type() === 'error' && !message.text().includes('Failed to load resource')) {
      pageErrors.push(message.text());
    }
  });

  return { pageErrors, badResponses };
};

for (const locale of LOCALES) {
  test.describe(`${locale.code} marketing routes`, () => {
    test.use({ locale: locale.browserLocale });

    for (const path of PAGES) {
      const route = routeFor(locale.prefix, path);

      test(`${route} renders without client-side errors`, async ({ page }) => {
        const { pageErrors, badResponses } = watchForFailures(page);

        const response = await page.goto(route);

        expect(response?.status()).toBe(200);

        await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
        await expect(page.locator('body')).toBeVisible();

        expect(pageErrors).toEqual([]);
        expect(badResponses).toEqual([]);
      });
    }
  });
}

test.describe('catalog detail pages', () => {
  test.use({ locale: 'th-TH' });

  for (const slug of CATALOG_LIST) {
    test(`/catalog/${slug} resolves`, async ({ page }) => {
      const { pageErrors, badResponses } = watchForFailures(page);

      const response = await page.goto(`/catalog/${slug}`);

      expect(response?.status()).toBe(200);

      await expect(page.locator('body')).toBeVisible();

      expect(pageErrors).toEqual([]);
      expect(badResponses).toEqual([]);
    });
  }
});

test.describe('routing edges', () => {
  test.use({ locale: 'en-US' });

  test('an unknown locale falls through to a 404', async ({ page }) => {
    const response = await page.goto('/xx/about');

    expect(response?.status()).toBe(404);
  });

  test('an English browser is redirected to the /en tree', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('crawler endpoints', () => {
  test('robots.txt is served', async ({ request }) => {
    const response = await request.get('/robots.txt');

    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('Sitemap');
  });

  test('sitemap.xml is served and lists both locales', async ({ request }) => {
    const response = await request.get('/sitemap.xml');

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('<urlset');
    expect(body).toContain('/en');
  });
});
