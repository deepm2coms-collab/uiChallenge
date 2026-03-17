import { useState, useEffect } from 'react';
import { Heart, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { galleryItems } from '../mock-data';
import { cn } from '../utils/cn';

export function Gallery() {
  const { currentCompany, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [companyTab, setCompanyTab] = useState('All');
  const [sort, setSort] = useState('newest');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = galleryItems
    .filter((g) => (companyTab === 'All' || g.company === currentCompany) && (category === 'All' || g.category === category))
    .sort((a, b) => (sort === 'newest' ? 0 : (b.likes || 0) - (a.likes || 0)));

  const toggleLike = (id) => {
    setLikes((l) => ({ ...l, [id]: !l[id] }));
  };

  const getLikeCount = (item) => (item.likes || 0) + (likes[item.id] ? 1 : 0);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="columns-2 md:columns-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-xl animate-pulse mb-4 break-inside-avoid" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Gallery</h1>
        <div className="flex flex-wrap gap-2">
          {['All', 'Events', 'Culture', 'Milestones', 'CSR', 'Leadership'].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={cn('px-3 py-1.5 rounded-lg text-sm', category === c ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{c}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setCompanyTab('All')} className={cn('px-3 py-1.5 rounded-lg text-sm', companyTab === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-100')}>All</button>
          <button type="button" onClick={() => setCompanyTab('2coms')} className={cn('px-3 py-1.5 rounded-lg text-sm', companyTab === '2coms' ? 'bg-slate-800 text-white' : 'bg-slate-100')}>2COMS</button>
          <button type="button" onClick={() => setCompanyTab('jobs-academy')} className={cn('px-3 py-1.5 rounded-lg text-sm', companyTab === 'jobs-academy' ? 'bg-slate-800 text-white' : 'bg-slate-100')}>Jobs Academy</button>
          <button type="button" onClick={() => setCompanyTab('tempus')} className={cn('px-3 py-1.5 rounded-lg text-sm', companyTab === 'tempus' ? 'bg-slate-800 text-white' : 'bg-slate-100')}>Tempus</button>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm">
          <option value="newest">Newest First</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {filtered.map((item, index) => (
          <div key={item.id} className="break-inside-avoid mb-4 rounded-xl overflow-hidden border border-[var(--brand-border)] shadow-sm group cursor-pointer" onClick={() => setLightboxIndex(index)}>
            <div className="relative aspect-[4/3] bg-slate-200">
              {item.type === 'video' ? (
                <img src={item.thumbnail || item.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              )}
              {item.type === 'video' && <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-white text-xs rounded">▶ VIDEO</span>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-white font-medium truncate">{item.title}</p>
                <span className="text-white/80 text-xs">{item.category}</span>
                <div className="flex items-center justify-between mt-2">
                  <button type="button" onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} className={cn('flex items-center gap-1 text-white', likes[item.id] && 'text-red-400')}><Heart className={cn('w-4 h-4', likes[item.id] && 'fill-current')} /> {getLikeCount(item)}</button>
                  {item.type !== 'video' && <button type="button" onClick={(e) => { e.stopPropagation(); addToast({ type: 'success', message: 'Download started', actorName: null, actorAvatar: null }); }} className="text-white"><Download className="w-4 h-4" /></button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="font-medium">No items in this category.</p>
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && setLightboxIndex(null)}>
          <button type="button" onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"><X className="w-6 h-6" /></button>
          {lightboxIndex > 0 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft className="w-8 h-8" /></button>
          )}
          {lightboxIndex < filtered.length - 1 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight className="w-8 h-8" /></button>
          )}
          <div className="max-w-5xl max-h-[85vh] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            {filtered[lightboxIndex]?.type === 'video' ? (
              <iframe title="Video" src={filtered[lightboxIndex].url} className="w-full aspect-video rounded-lg" />
            ) : (
              <img src={filtered[lightboxIndex]?.url} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white">
            <span className="font-medium">{filtered[lightboxIndex]?.title}</span>
            <span className="text-sm opacity-80">{filtered[lightboxIndex]?.category}</span>
            <button type="button" onClick={() => toggleLike(filtered[lightboxIndex]?.id)} className={cn('flex items-center gap-1', likes[filtered[lightboxIndex]?.id] && 'text-red-400')}><Heart className={cn('w-5 h-5', likes[filtered[lightboxIndex]?.id] && 'fill-current')} /> {getLikeCount(filtered[lightboxIndex] || {})}</button>
          </div>
        </div>
      )}
    </div>
  );
}
