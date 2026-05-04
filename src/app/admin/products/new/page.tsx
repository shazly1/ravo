import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
        <span className="text-gray-600">/</span>
        <span className="text-white">New Product</span>
      </div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Add New Product</h1>
      <div className="card p-6">
        <ProductForm />
      </div>
    </div>
  );
}
