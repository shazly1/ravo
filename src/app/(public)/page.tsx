export const revalidate = 60;
import type { Metadata } from 'next';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ProductCard from '@/components/public/ProductCard';
import CategoryCard from '@/components/public/CategoryCard';

export const metadata: Metadata = {
  title: 'RAVO – Best Deals from Amazon, Noon & Jumia',
  description: 'Discover the best product deals from Amazon, Noon, Jumia and more. RAVO helps you find top offers in Egypt all in one place.',
  keywords: 'best deals egypt, amazon egypt, noon deals, jumia offers, online shopping egypt, affiliate products',
  openGraph: {
    title: 'RAVO – Best Deals from Amazon, Noon & Jumia',
    description: 'Discover the best product deals from Amazon, Noon, Jumia and more.',
    url: 'https://ravo-self.vercel.app',
    siteName: 'RAVO',
    type: 'website',
    images: [{ url: 'https://ravo-self.vercel.app/ravo-icon.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAVO – Best Deals from Amazon, Noon & Jumia',
    description: 'Discover the best product deals from Amazon, Noon, Jumia and more.',
    images: ['https://ravo-self.vercel.app/ravo-icon.jpeg'],
  },
  alternates: {
    canonical: 'https://ravo-self.vercel.app',
  },
};

async function getData() {
  await connectDB();
  const [featuredProducts, categories] = await Promise.all([
    Product.find({ featured: true }).populate('category', 'name slug icon').limit(8).lean(),
    Category.find().limit(8).lean(),
  ]);
  return { featuredProducts, categories };
}

export default async function HomePage() {
  const { featuredProducts, categories } = await getData();
  return (
    <div>
      <section className="relative overflow-hidden bg-dark-900 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse-slow" />
            <span className="text-brand-400 text-sm font-medium">Best Deals from Top Stores</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Amazing
            <span className="text-brand-500"> Products</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Find the best deals from Amazon, Noon, Jumia and more.
          </p>
          <div className="flex flex-col gap-4 items-center max-w-xl mx-auto w-full mb-4">
            <form action="/products" method="get" className="flex gap-3 w-full">
              <input type="text" name="search" placeholder="Search for products..." className="input flex-1 text-base" />
              <button type="submit" className="btn-primary px-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </form>
            <div className="flex gap-4">
              <Link href="/products" className="btn-secondary">Browse All</Link>
              <Link href="/categories" className="btn-secondary">Categories</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-dark-700 bg-dark-800/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['Amazon', 'Noon', 'Jumia'].map((store) => (
              <div key={store} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-full" />
                <span className="font-semibold text-gray-300">{store}</span>
              </div>
            ))}
            <div className="text-gray-600 text-sm">+ more stores</div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-dashed border-brand-500/30 rounded-2xl p-8 text-center bg-brand-500/5">
            <div className="text-4xl mb-3">📢</div>
            <h3 className="text-xl font-bold text-white mb-2">مساحة مخصصة للإعلانات</h3>
            <p className="text-gray-400 mb-4">برجاء التواصل للمزيد من المعلومات</p>
            <a href="https://whatsapp.com/channel/0029VbDGUstJZg4GfkvZlY1f" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              انضم لقناتنا على واتساب
            </a>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-white">Shop by Category</h2>
              <p className="text-gray-400 mt-1">Browse products by category</p>
            </div>
            <Link href="/categories" className="btn-outline hidden sm:flex">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat: any) => (
              <CategoryCard key={cat._id.toString()} category={cat} />
            ))}
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-dark-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl font-bold text-white">Featured Products</h2>
                <p className="text-gray-400 mt-1">Hand-picked deals just for you</p>
              </div>
              <Link href="/products" className="btn-outline hidden sm:flex">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredProducts.length === 0 && categories.length === 0 && (
        <section className="py-32 text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">No products yet</h2>
          <p className="text-gray-400 mb-6">Login to the admin panel to start adding products.</p>
          <Link href="/admin/login" className="btn-primary">Go to Admin</Link>
        </section>
      )}

      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to find your next deal?</h2>
          <p className="text-brand-100 text-lg mb-8">Explore thousands of products from top stores.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-colors">
            Shop Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}