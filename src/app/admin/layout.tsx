import { getServerUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <AdminSidebar user={user} />
      <main className="flex-1 md:ml-64 p-6 animate-page">{children}</main>
    </div>
  );
}
