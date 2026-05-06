import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLoginModal from '../components/admin/AdminLoginModal';
import { useAllArtworks, useCreateArtwork, useUpdateArtwork, useDeleteArtwork, useUploadImage } from '../hooks/useAdmin';
import type { Artwork, Category } from '../types';
import { Loader2, Pencil, Trash2, Plus, Star, StarOff, LogOut, Upload, X } from 'lucide-react';

const CATEGORIES: Category[] = [
  'drawings', 'paintings', 'sculptures', 'prints', 'geometric',
  'design', 'photography', 'code',
  'WIPdrawings', 'WIPsculptures', 'WIPkinetics', 'WIPprints',
];

const emptyForm = (): Omit<Artwork, 'id' | 'created_at' | 'updated_at'> => ({
  title: '', media: '', description: '', image_src: '',
  category: 'drawings', display_order: 0, is_featured: 0, featured_order: null,
});

export default function AdminPage() {
  const { user, logout, loginModalOpen, openLogin, closeLogin } = useAuth();
  const { data: artworks = [], isLoading } = useAllArtworks();

  const createArtwork  = useCreateArtwork();
  const updateArtwork  = useUpdateArtwork();
  const deleteArtwork  = useDeleteArtwork();
  const uploadImage    = useUploadImage();

  const [filterCat, setFilterCat]         = useState<string>('all');
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [showForm, setShowForm]            = useState(false);
  const [form, setForm]                    = useState(emptyForm());
  const [confirmDelete, setConfirmDelete]  = useState<number | null>(null);
  const [formError, setFormError]          = useState('');
  const [uploading, setUploading]          = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-stone-700 mb-6">Portfolio Admin</h1>
          <button
            onClick={openLogin}
            className="px-8 py-2 bg-stone-800 text-white text-sm tracking-wide hover:bg-stone-900 transition-colors"
          >
            Sign In
          </button>
        </div>
        {loginModalOpen && (
          <AdminLoginModal onClose={closeLogin} onLoginSuccess={() => {}} />
        )}
      </div>
    );
  }

  const displayed = filterCat === 'all'
    ? artworks
    : artworks.filter(a => a.category === filterCat);

  function openNew() {
    setEditingArtwork(null);
    setForm(emptyForm());
    setFormError('');
    setShowForm(true);
  }

  function openEdit(a: Artwork) {
    setEditingArtwork(a);
    setForm({
      title: a.title, media: a.media ?? '', description: a.description ?? '',
      image_src: a.image_src, category: a.category,
      display_order: a.display_order, is_featured: a.is_featured,
      featured_order: a.featured_order,
    });
    setFormError('');
    setShowForm(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { path } = await uploadImage.mutateAsync({ file, category: form.category });
      setForm(f => ({ ...f, image_src: path }));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    try {
      if (editingArtwork) {
        await updateArtwork.mutateAsync({ ...editingArtwork, ...form });
      } else {
        await createArtwork.mutateAsync(form);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed');
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteArtwork.mutateAsync(id);
      setConfirmDelete(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function toggleFeatured(a: Artwork) {
    const featuredOnes = artworks.filter(x => x.is_featured);
    const newOrder = a.is_featured ? null : (featuredOnes.length + 1);
    await updateArtwork.mutateAsync({ ...a, is_featured: a.is_featured ? 0 : 1, featured_order: newOrder });
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-light tracking-widest uppercase text-stone-700">Portfolio Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-400">{user.email}</span>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white text-sm hover:bg-stone-900 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Artwork
          </button>

          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="px-3 py-2 border border-stone-300 text-sm bg-white text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-400"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <span className="text-sm text-stone-400 ml-auto">{displayed.length} artworks</span>
        </div>

        {/* Artwork table */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>
        ) : (
          <div className="bg-white border border-stone-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="text-left px-4 py-3 font-medium text-stone-500 uppercase tracking-wide text-xs">Image</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-500 uppercase tracking-wide text-xs">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-500 uppercase tracking-wide text-xs hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-500 uppercase tracking-wide text-xs hidden lg:table-cell">Media</th>
                  <th className="text-center px-4 py-3 font-medium text-stone-500 uppercase tracking-wide text-xs">Featured</th>
                  <th className="text-right px-4 py-3 font-medium text-stone-500 uppercase tracking-wide text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map(a => (
                  <tr key={a.id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="px-4 py-2">
                      <img src={a.image_src} alt={a.title} className="w-10 h-10 object-cover rounded" />
                    </td>
                    <td className="px-4 py-2 font-medium text-stone-800">{a.title}</td>
                    <td className="px-4 py-2 text-stone-500 hidden md:table-cell">{a.category}</td>
                    <td className="px-4 py-2 text-stone-400 hidden lg:table-cell truncate max-w-xs">{a.media}</td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => toggleFeatured(a)} className="text-stone-300 hover:text-amber-500 transition-colors">
                        {a.is_featured ? <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> : <StarOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(a)} className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setConfirmDelete(a.id)} className="p-1.5 text-stone-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {displayed.length === 0 && (
              <p className="text-center text-stone-400 py-12">No artworks in this category.</p>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl my-8 rounded-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <h2 className="text-base font-medium text-stone-900">
                {editingArtwork ? 'Edit Artwork' : 'New Artwork'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="px-6 py-5 space-y-4">
              {/* Title */}
              <Field label="Title" required>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className={fieldCls} required />
              </Field>

              {/* Category */}
              <Field label="Category" required>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                  className={fieldCls}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              {/* Image */}
              <Field label="Image">
                <div className="flex gap-2">
                  <input value={form.image_src} onChange={e => setForm(f => ({ ...f, image_src: e.target.value }))}
                    placeholder="/images/Category/filename.jpg"
                    className={fieldCls + ' flex-1'} />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 px-3 border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-50 transition-colors">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload
                  </button>
                  <input ref={fileRef} type="file" accept="image/*,video/mp4"
                    onChange={handleFileUpload} className="hidden" />
                </div>
                {form.image_src && (
                  <img src={form.image_src} alt="preview" className="mt-2 h-24 w-24 object-cover rounded border border-stone-200" />
                )}
              </Field>

              {/* Media */}
              <Field label="Media / dimensions">
                <input value={form.media ?? ''} onChange={e => setForm(f => ({ ...f, media: e.target.value }))}
                  placeholder="Oil on canvas, 24 × 36 inches, 2024"
                  className={fieldCls} />
              </Field>

              {/* Description */}
              <Field label="Description">
                <textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3} className={fieldCls} />
              </Field>

              {/* Display order */}
              <Field label="Display order">
                <input type="number" value={form.display_order}
                  onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                  className={fieldCls + ' w-24'} />
              </Field>

              {/* Featured */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!form.is_featured}
                  onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked ? 1 : 0 }))}
                  className="w-4 h-4 rounded border-stone-300" />
                <span className="text-sm text-stone-700">Show in featured collection (homepage)</span>
              </label>

              {formError && <p className="text-sm text-red-600">{formError}</p>}

              <div className="flex gap-3 pt-2">
                <button type="submit"
                  disabled={createArtwork.isPending || updateArtwork.isPending}
                  className="flex items-center gap-2 px-5 py-2 bg-stone-800 text-white text-sm hover:bg-stone-900 disabled:opacity-50 transition-colors">
                  {(createArtwork.isPending || updateArtwork.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingArtwork ? 'Save Changes' : 'Create Artwork'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2 border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-base font-medium text-stone-900 mb-2">Delete artwork?</h3>
            <p className="text-sm text-stone-500 mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)}
                disabled={deleteArtwork.isPending}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 transition-colors">
                {deleteArtwork.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
              <button onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-stone-300 text-sm text-stone-600 rounded hover:bg-stone-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const fieldCls = 'w-full px-3 py-2 border border-stone-300 text-sm rounded focus:outline-none focus:ring-1 focus:ring-stone-400';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-stone-600 uppercase tracking-wide mb-1.5">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  );
}
