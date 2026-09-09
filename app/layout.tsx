import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://silav-movie.vercel.app'),
  title: {
    default: 'Silav Movie | فیلم و دراما بە ژێرنوسی کوردی',
    template: '%s | Silav Movie',
  },
  description: 'پلاتفۆرمێکی مۆدێرن بۆ دۆزینەوەی فیلم و دراما، ژێرنوسی کوردی، لیستی دڵخواز، گەڕانی پێشکەوتوو و پێشنیاری ناوەڕۆک.',
  keywords: ['Silav Movie', 'Kurdish movies', 'فیلمی کوردی', 'ژێرنوسی کوردی', 'Kurdish subtitles'],
  applicationName: 'Silav Movie',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Silav Movie',
    description: 'فیلم و دراما بە ژێرنوسی کوردی',
    type: 'website',
    locale: 'ku_IQ',
    siteName: 'Silav Movie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silav Movie',
    description: 'فیلم و دراما بە ژێرنوسی کوردی',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ku" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
