'use client';
import Link from 'next/link';

const storeBadgeColors: Record<string, string> = {
  amazon: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  noon: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20',
  jumia: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  other: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
};

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product._id}`} className="card group flex flex-col hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-200">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        {product.affiliateStore && (
          <span className={`absolute top-2 right-2 badge border ${storeBadgeColors[product.affiliateStore] || storeBadgeColors.other} capitalize`}>
            {product.affiliateStore}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {product.category && (
          <span className="text-xs text-gray-500 mb-1">{product.category.name}</span>
        )}
        <h3 className="font-semibold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors flex-1">
          {product.title}
        </h3>
        {product.price && (
          <div className="text-brand-400 font-bold mb-3">
            {product.price} {product.currency || 'USD'}
          </div>
        )}
        <div className="btn-primary text-sm py-2 text-center w-full mt-auto">
          View Deal →
        </div>
      </div>
    </Link>
  );
}