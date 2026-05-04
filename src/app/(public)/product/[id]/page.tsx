import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';

const storeColors: Record<string, string> = {
  amazon: 'bg-yellow-500 hover:bg-yellow-400',
  noon: 'bg-yellow-400 hover:bg-yellow-300',
  jumia: 'bg-orange-500 hover:bg-orange-400',
  other: 'bg-brand-500 hover:bg-brand-400',
};

const storeLabels: Record<string, string> = {
  amazon: '🛒 Buy on Amazon',
  noon: '🛒 Buy on Noon',
  jumia: '🛒 Buy on Jumia',
  other: '🛒 Buy Now',
};

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectDB();
  const product = await Product.findById(params.id).populate('category', 'name slug').lean() as any;
  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="card overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 md:h-96 object-cover"
            
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          {/* Category badge */}
          {product.category && (
            <Link
              href={`/products?category=${product.category._id}`}
              className="inline-flex items-center w-fit gap-1.5 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-full px-3 py-1 text-sm font-medium hover:bg-brand-500/20 transition-colors"
            >
              {product.category.name}
            </Link>
          )}

          <h1 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          {product.price && (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-brand-400">
                {product.price} {product.currency || 'USD'}
              </span>
            </div>
          )}

          <p className="text-gray-400 leading-relaxed">{product.description}</p>

          {/* Store badge */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Available on:</span>
            <span className="badge bg-dark-600 text-gray-300 capitalize px-3 py-1">
              {product.affiliateStore}
            </span>
          </div>

          {/* Buy Now Button */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`btn-primary text-center text-lg py-4 ${storeColors[product.affiliateStore] || storeColors.other}`}
          >
            {storeLabels[product.affiliateStore] || storeLabels.other}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <p className="text-gray-600 text-xs">
            * You will be redirected to the external store. RAVO is not responsible for external store content.
          </p>
        </div>
      </div>
    </div>
  );
}
