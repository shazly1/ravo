'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/public/ProductCard';
import CategoryFilterBar from '@/components/public/CategoryFilterBar';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || []));
  }, []);

 useEffect(() => {
  const cat = searchParams.get('category');
  const s = searchParams.get('search');
  if (cat) setSelectedCategory(cat);
  if (s !== null) setSearchInput(s);
}, []);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: '24' });
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      const currentSearch = searchInput;
      if (currentSearch) params.set('search', currentSearch);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.pagination?.pages || 1);
      setLoading(false);
    };
    fetchProducts();
  }, [page, selectedCategory, searchInput, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setPage(1);
    setSelectedCategory(cat);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">All Products</h1>
        <p className="text-gray-400">Find the best deals from top stores</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="input flex-1"
        />
        <button type="submit" className="btn-primary px-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>

      <CategoryFilterBar
        categories={categories}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="bg-dark-600 h-48 w-full" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-dark-600 rounded w-3/4" />
                <div className="h-3 bg-dark-600 rounded w-1/2" />
                <div className="h-8 bg-dark-600 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
          <p className="text-gray-400">Try a different search or category</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="text-gray-400 text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-secondary disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}