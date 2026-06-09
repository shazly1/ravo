import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products – RAVO',
  description: 'Browse hundreds of products from Amazon, Noon and Jumia. Find the best deals on electronics, fashion, gym equipment, skincare and more in Egypt.',
  keywords: 'buy online egypt, amazon deals, noon offers, jumia products, best price egypt, online shopping',
  openGraph: {
    title: 'All Products – RAVO',
    description: 'Browse hundreds of products from Amazon, Noon and Jumia.',
    url: 'https://ravo-self.vercel.app/products',
    siteName: 'RAVO',
    type: 'website',
    images: [{ url: 'https://ravo-self.vercel.app/ravo-icon.jpeg' }],
  },
  alternates: {
    canonical: 'https://ravo-self.vercel.app/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}