import Link from 'next/link';

export default function CategoryCard({ category }: { category: any }) {
  return (
    <Link
      href={`/products?category=${category._id}`}
      className="card p-5 text-center hover:border-brand-500/50 hover:bg-dark-700 transition-all duration-200 group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
        {category.icon || '🏷️'}
      </div>
      <h3 className="font-semibold text-white text-sm group-hover:text-brand-400 transition-colors">
        {category.name}
      </h3>
    </Link>
  );
}
