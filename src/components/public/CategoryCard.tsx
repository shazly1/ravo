import Link from 'next/link';

export default function CategoryCard({ category }: { category: any }) {
  const isImage = category.icon && (
    category.icon.startsWith('http://') || 
    category.icon.startsWith('https://')
  );

  return (
    <Link
      href={`/products?category=${category._id}`}
      className="card p-4 text-center hover:border-brand-500/50 hover:bg-dark-700 transition-all duration-200 group"
    >
      <div className="mb-2 flex items-center justify-center h-16">
        {isImage ? (
          <img
            src={category.icon}
            alt={category.name}
            className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform duration-200"
          />
        ) : (
          <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
            {category.icon || '🏷️'}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-white text-sm group-hover:text-brand-400 transition-colors">
        {category.name}
      </h3>
    </Link>
  );
}