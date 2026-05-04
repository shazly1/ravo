import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) notFound();
  await connectDB();
  const product = await Product.findById(params.id).populate('category', 'name _id').lean();
  if (!product) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
        <span className="text-gray-600">/</span>
        <span className="text-white">Edit</span>
      </div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">Edit Product</h1>
      <div className="card p-6">
        <ProductForm product={JSON.parse(JSON.stringify(product))} isEdit />
      </div>
    </div>
  );
}
