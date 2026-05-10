'use client';
import { useState, useEffect } from 'react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError('');
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), icon: image || '🏷️', image }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Failed to add'); }
    else { setName(''); setImage(''); await fetchCategories(); }
    setSaving(false);
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Delete category "${catName}"?`)) return;
    setDeleting(id);
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    await fetchCategories();
    setDeleting(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Categories</h1>
        <p className="text-gray-400 mt-1">Manage product categories</p>
      </div>

      <div className="card p-6 mb-8 max-w-xl">
        <h2 className="font-semibold text-white mb-4">Add New Category</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">{error}</div>}
          
          <div>
            <label className="label">Category Name * (English or Arabic)</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="input" 
              placeholder="e.g. Electronics / إلكترونيات" 
              required 
            />
          </div>

          <div>
            <label className="label">Category Image URL</label>
            <input
              value={image}
              onChange={e => setImage(e.target.value)}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
            {image && (
              <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden bg-dark-700">
                <img src={image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Adding...' : '+ Add Category'}
          </button>
        </form>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No categories yet. Add one above!</div>
        ) : (
          <div className="divide-y divide-dark-700">
            {categories.map((cat: any) => (
              <div key={cat._id} className="flex items-center justify-between p-4 hover:bg-dark-700/30 transition-colors">
                <div className="flex items-center gap-3">
                  {cat.icon && cat.icon.startsWith('http') ? (
                    <img src={cat.icon} alt={cat.name} className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <span className="text-2xl">{cat.icon || '🏷️'}</span>
                  )}
                  <span className="text-white font-medium">{cat.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(cat._id, cat.name)}
                  disabled={deleting === cat._id}
                  className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
                >
                  {deleting === cat._id ? '...' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}