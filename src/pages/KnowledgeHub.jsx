import { useState, useEffect } from 'react';
import { FileText, Download, Bookmark, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { knowledgeDocs, knowledgeCategories } from '../mock-data';
import { Modal } from '../components/Modal';
import { cn } from '../utils/cn';

export function KnowledgeHub() {
  const { currentCompany, userRole, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [viewerDoc, setViewerDoc] = useState(null);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = knowledgeDocs
    .filter((d) => !category || d.category === category)
    .filter((d) => !search || d.title.toLowerCase().includes(search.toLowerCase()));

  const toggleBookmark = (id) => {
    setBookmarks((b) => {
      const next = new Set(b);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const featured = knowledgeDocs.slice(0, 4);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter flex gap-6">
      <aside className="w-60 shrink-0">
        <button type="button" onClick={() => setCategory(null)} className={cn('w-full text-left py-2 px-3 rounded-lg text-sm font-medium', !category ? 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)]' : 'text-slate-700 hover:bg-slate-100')}>All Documents</button>
        {knowledgeCategories.map((cat) => (
          <button key={cat.id} type="button" onClick={() => setCategory(cat.name)} className={cn('w-full text-left py-2 px-3 rounded-lg text-sm flex items-center justify-between', category === cat.name ? 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)]' : 'text-slate-700 hover:bg-slate-100')}>
            <span>{cat.icon} {cat.name}</span>
            <span className="text-slate-400 text-xs">{cat.count}</span>
          </button>
        ))}
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl text-slate-900">Knowledge Hub</h1>
          {userRole === 'Admin' && (
            <button type="button" onClick={() => setUploadOpen(true)} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm">Upload Document</button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {featured.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
              <div className="flex items-center gap-2 text-red-600 mb-2"><FileText className="w-5 h-5" /><span className="text-xs font-medium">PDF</span></div>
              <p className="font-medium text-slate-900 line-clamp-2">{doc.title}</p>
              <button type="button" onClick={() => setViewerDoc(doc)} className="mt-2 text-sm text-[var(--brand-primary)] font-medium">Open</button>
            </div>
          ))}
        </div>

        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..." className="w-full max-w-md rounded-lg border border-slate-200 px-4 py-2 mb-4" />
        <p className="text-sm text-slate-500 mb-4">{filtered.length} documents found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
              <div className="flex items-start justify-between">
                <FileText className={cn('w-8 h-8 shrink-0', doc.type === 'pdf' && 'text-red-500', doc.type === 'doc' && 'text-blue-500')} />
                <button type="button" onClick={() => toggleBookmark(doc.id)} className={cn('p-1 rounded', bookmarks.has(doc.id) ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500')}><Bookmark className={cn('w-4 h-4', bookmarks.has(doc.id) && 'fill-current')} /></button>
              </div>
              <p className="font-medium text-slate-900 mt-2 line-clamp-2">{doc.title}</p>
              <span className="text-xs text-slate-500">{doc.category}</span>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <img src={doc.uploadedBy?.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span>{doc.uploadedBy?.name}</span>
                <span>{doc.updated}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Downloaded {doc.downloadCount} times</p>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={() => setViewerDoc(doc)} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"><Eye className="w-4 h-4" /> Preview</button>
                <button type="button" onClick={() => addToast({ type: 'success', message: 'Download started ✓', actorName: null, actorAvatar: null })} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"><Download className="w-4 h-4" /> Download</button>
              </div>
            </div>
          ))}
        </div>

        {bookmarks.size > 0 && (
          <details className="mt-8">
            <summary className="cursor-pointer font-medium text-slate-800">My Bookmarks ({bookmarks.size})</summary>
            <ul className="mt-2 space-y-2">
              {filtered.filter((d) => bookmarks.has(d.id)).map((doc) => (
                <li key={doc.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="font-medium text-slate-800">{doc.title}</span>
                  <button type="button" onClick={() => toggleBookmark(doc.id)} className="text-sm text-slate-500">Remove</button>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <Modal isOpen={!!viewerDoc} onClose={() => setViewerDoc(null)} title={viewerDoc?.title}>
        {viewerDoc && (
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <p className="text-xs text-slate-500">2COMS Group · {viewerDoc.title}</p>
                <p className="text-xs text-slate-500">Version 1.0 · {viewerDoc.updated}</p>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Section 1</h3>
              <p className="text-slate-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">Section 2</h3>
              <p className="text-slate-600 text-sm">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">Section 3</h3>
              <p className="text-slate-600 text-sm">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
            <button type="button" onClick={() => addToast({ type: 'success', message: 'Download started ✓', actorName: null, actorAvatar: null })} className="flex items-center gap-2 text-[var(--brand-primary)] font-medium"><Download className="w-4 h-4" /> Download</button>
          </div>
        )}
      </Modal>

      <Modal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Document">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-500">
            Drag & drop files here or click to browse
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
            <input type="text" className="w-full rounded-lg border border-slate-200 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select className="w-full rounded-lg border border-slate-200 p-2">
              {knowledgeCategories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => { setUploadOpen(false); addToast({ type: 'success', message: 'Upload complete ✓', actorName: null, actorAvatar: null }); }} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium">Upload</button>
        </div>
      </Modal>
    </div>
  );
}
