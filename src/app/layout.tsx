import { Metadata } from 'next';
import { ReduxProvider } from '@/providers/ReduxProvider';
import './globals.css';
import Navigation from './components/navigation/Navigation';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'PokeWTF',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.png',
      type: 'image/png',
      sizes: '32x32',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <Navigation />
            <main>{children}</main>
          </ThemeProvider>
        </ReduxProvider>{' '}
      </body>
    </html>
  );
}
