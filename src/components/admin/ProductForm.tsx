'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  product?: any;
  isEdit?: boolean;
}

export default function ProductForm({ product, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: product?.title || '',
    description: product?.description || '',
    image: product?.image || '',
    images: product?.images?.join('\n') || '',
    price: product?.price || '',
    currency: product?.currency || 'USD',
    category: product?.category?._id || product?.category || '',
    affiliateLink: product?.affiliateLink || '',
    affiliateStore: product?.affiliateStore || 'amazon',
    featured: product?.featured || false,
  });

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const url = isEdit ? `/api/products/${product._id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: form.images.split('\n').map((s: string) => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to save'); return; }
      router.push('/admin/products');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <div>
        <label className="label">Product Title *</label>
        <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="e.g. Sony WH-1000XM5 Headphones" required />
      </div>

      <div>
        <label className="label">Description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input min-h-[100px] resize-none" placeholder="Describe the product..." required rows={4} />
      </div>

      <div>
        <label className="label">Main Image URL *</label>
        <input name="image" value={form.image} onChange={handleChange} className="input" placeholder="https://example.com/image.jpg" required />
        {form.image && (
          <div className="mt-2 rounded-xl overflow-hidden w-32 h-24 bg-dark-700">
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div>
        <label className="label">Extra Images (one URL per line)</label>
        <textarea
          value={form.images}
          onChange={e => setForm(prev => ({ ...prev, images: e.target.value }))}
          className="input min-h-[80px] resize-none"
          placeholder={"https://example.com/image2.jpg\nhttps://example.com/image3.jpg"}
          rows={3}
        />
        <p className="text-gray-500 text-xs mt-1">Add up to 5 extra images, one per line</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Price (optional)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="input" placeholder="0.00" min="0" step="0.01" />
        </div>
        <div>
          <label className="label">Currency</label>
          <select name="currency" value={form.currency} onChange={handleChange} className="input">
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
            <option value="SAR">SAR</option>
            <option value="AED">AED</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Category *</label>
        <select name="category" value={form.category} onChange={handleChange} className="input" required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.icon} {cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Affiliate Link *</label>
        <input name="affiliateLink" value={form.affiliateLink} onChange={handleChange} className="input" placeholder="https://amazon.com/dp/..." required />
      </div>

      <div>
        <label className="label">Store</label>
        <select name="affiliateStore" value={form.affiliateStore} onChange={handleChange} className="input">
          <option value="amazon">Amazon</option>
          <option value="noon">Noon</option>
          <option value="jumia">Jumia</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-brand-500" />
        <label htmlFor="featured" className="text-gray-300 text-sm cursor-pointer">Feature this product on homepage</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}