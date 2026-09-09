import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silav Movie',
  description: 'فیلم و دراما بە ژێرنوسی کوردی',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ku" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
