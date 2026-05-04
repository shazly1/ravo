'use client';
import { useState, useEffect } from 'react';

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const fetchAdmins = async () => {
    setLoading(true);
    const res = await fetch('/api/admins');
    const data = await res.json();
    setAdmins(data.admins || []);
    setLoading(false);
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    const res = await fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Failed to create admin'); }
    else {
      setSuccess(`Admin "${form.name}" created successfully!`);
      setForm({ name: '', email: '', password: '' });
      await fetchAdmins();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, adminName: string) => {
    if (!confirm(`Delete admin "${adminName}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admins/${id}`, { method: 'DELETE' });
    await fetchAdmins();
    setDeleting(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Admin Management</h1>
        <p className="text-gray-400 mt-1">Create and manage admin accounts</p>
      </div>

      {/* Add Admin Form */}
      <div className="card p-6 mb-8 max-w-xl">
        <h2 className="font-semibold text-white mb-4">Create New Admin</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-4 py-3 text-sm">{success}</div>}
          <div>
            <label className="label">Full Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input" placeholder="John Doe" required />
          </div>
          <div>
            <label className="label">Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input" placeholder="admin@ravo.com" required />
          </div>
          <div>
            <label className="label">Password *</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input" placeholder="Min 8 characters" required minLength={8} />
          </div>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Creating...' : '+ Create Admin'}
          </button>
        </form>
      </div>

      {/* Admins List */}
      <div>
        <h2 className="font-semibold text-white mb-4">All Admins ({admins.length})</h2>
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : admins.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No admins yet. Create one above!</div>
          ) : (
            <div className="divide-y divide-dark-700">
              {admins.map((admin: any) => (
                <div key={admin._id} className="flex items-center justify-between p-4 hover:bg-dark-700/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-400 font-bold">
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-medium">{admin.name}</div>
                      <div className="text-gray-500 text-sm">{admin.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(admin._id, admin.name)}
                    disabled={deleting === admin._id}
                    className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
                  >
                    {deleting === admin._id ? '...' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
