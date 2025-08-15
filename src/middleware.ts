import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'ru'];

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
