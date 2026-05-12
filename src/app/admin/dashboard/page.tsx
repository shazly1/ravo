import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import User from '@/models/User';
import { getServerUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
// الضربة القاضية: دي بتخلي الداشبورد ميعملش كاش للأرقام ويجيبها دايماً طازة من الداتابيز
export const revalidate = 0; 

export default async function AdminDashboard() {
  const user = await getServerUser();
  if (!user) redirect('/admin/login');

  await connectDB();

  // جلب البيانات - countDocuments() هنا هتجيب الرقم الحقيقي مهما كان كبير
  const [totalProducts, totalCategories, totalAdmins, recentProducts] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    User.countDocuments({ role: 'admin' }),
    Product.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: '🛍️', href: '/admin/products' },
    { label: 'Categories', value: totalCategories, icon: '📂', href: '/admin/categories' },
    ...(user?.role === 'super_admin' ? [{ label: 'Admins', value: totalAdmins, icon: '👥', href: '/admin/admins' }] : []),
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Welcome back, {user?.name} 👋</h1>
        <p className="text-gray-400 mt-1">Here's what's happening on your platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card p-6 hover:border-brand-500/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-gray-600 group-hover:text-brand-400 transition-colors text-sm">View →</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* باقي الكود كما هو (Quick Actions & Recent Products Table) */}
      <div className="mb-10">
        <h2 className="font-display text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="btn-primary">+ Add Product</Link>
          <Link href="/admin/categories" className="btn-secondary">+ Add Category</Link>
          {user?.role === 'super_admin' && (
            <Link href="/admin/admins" className="btn-secondary">+ Add Admin</Link>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-white">Recent Products</h2>
          <Link href="/admin/products" className="text-brand-400 text-sm hover:text-brand-300">View all →</Link>
        </div>
        <div className="card overflow-hidden">
          {recentProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No products yet. <Link href="/admin/products/new" className="text-brand-400 hover:underline">Add one →</Link></div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Product</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium hidden md:table-cell">Store</th>
                  <th className="text-right p-4 text-gray-400 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((p: any) => (
                  <tr key={p._id.toString()} className="border-b border-dark-700/50 last:border-0 hover:bg-dark-700/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-dark-600" />
                        <span className="text-white text-sm font-medium line-clamp-1">{p.title}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-gray-400 text-sm">{(p.category as any)?.name || '—'}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="badge bg-dark-600 text-gray-300 capitalize px-2 py-1">{p.affiliateStore}</span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/admin/products/${p._id}`} className="text-brand-400 text-sm hover:text-brand-300">Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}