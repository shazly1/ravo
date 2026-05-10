export const revalidate = 0;
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import CategoryCard from '@/components/public/CategoryCard';

export default async function CategoriesPage() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Categories</h1>
        <p className="text-gray-400">Browse products by category</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-white mb-2">No categories yet</h3>
          <p className="text-gray-400">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat: any) => (
            <CategoryCard key={cat._id.toString()} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}