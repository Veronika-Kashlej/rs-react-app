import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';
import { ReduxProvider } from '@/providers/ReduxProvider';
import './globals.css';
import Navigation from './components/navigation/Navigation';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'PokeWTF',
  icons: [
    { rel: 'icon', url: '/favicon.png', type: 'image/png', sizes: '32x32' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  return (
    <NextIntlClientProvider locale={locale}>
      <ReduxProvider>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}
