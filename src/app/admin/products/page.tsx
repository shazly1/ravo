'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products?limit=50');
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    await fetchProducts();
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">{products.length} products total</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">+ Add Product</Link>
      </div>
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🛍️</div>
            <p className="text-gray-400 mb-4">No products yet</p>
            <Link href="/admin/products/new" className="btn-primary">Add your first product</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Product</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium hidden md:table-cell">Store</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium hidden lg:table-cell">Featured</th>
                  <th className="text-right p-4 text-gray-400 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-dark-700/50 last:border-0 hover:bg-dark-700/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-dark-600 flex-shrink-0" />
                        <span className="text-white text-sm font-medium line-clamp-1 max-w-[200px]">{p.title}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-gray-400 text-sm">{p.category?.name || '—'}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="badge bg-dark-600 text-gray-300 capitalize px-2 py-1">{p.affiliateStore}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {p.featured ? <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-1">Featured</span> : <span className="text-gray-600 text-sm">—</span>}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${p._id}`} className="btn-secondary text-xs px-3 py-1.5">Edit</Link>
                        <button
                          onClick={() => handleDelete(p._id, p.title)}
                          disabled={deleting === p._id}
                          className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          {deleting === p._id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}