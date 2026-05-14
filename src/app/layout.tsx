import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAVO – Find the Best Deals',
  description: 'Discover top products from Amazon, Noon, Jumia and more.',
  icons: {
    icon: '/ravo-icon.jpeg',
    apple: '/ravo-icon.jpeg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ac-39ea6cy-shard-00-00.igzayc1.mongodb.net" />
      </head>
      <body className="bg-dark-900 text-white font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}