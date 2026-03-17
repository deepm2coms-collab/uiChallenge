import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { announcements as initialAnnouncements } from '../mock-data';
import { Modal } from '../components/Modal';
import { AIAssist } from '../components/AIAssist';
import { cn } from '../utils/cn';

const deptColor = { HR: 'bg-blue-100 text-blue-800', Tech: 'bg-purple-100 text-purple-800', Delivery: 'bg-green-100 text-green-800', Finance: 'bg-amber-100 text-amber-800', Marketing: 'bg-pink-100 text-pink-800', Leadership: 'bg-slate-100 text-slate-800' };
const VIEWS = ['grid', 'list', 'timeline'];
const defaultNewPost = { title: '', body: '', department: 'HR', tags: [], pinned: false, scheduleLater: false, scheduledFor: '', targetTeams: ['all'], targetCompany: 'all', priority: 'normal', requireReadReceipt: false };

export function Announcements() {
  const { currentCompany, userRole, addToast, currentUserTeam } = useApp();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [filters, setFilters] = useState({ departments: ['All'], tags: [], dateRange: 'all', pinnedOnly: false });
  const [view, setView] = useState('grid');
  const [selected, setSelected] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newPost, setNewPost] = useState(defaultNewPost);
  const [createError, setCreateError] = useState({});
  const [discardConfirm, setDiscardConfirm] = useState(false);
  const [listTab, setListTab] = useState('all');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = announcements
    .filter((a) => a.company === currentCompany)
    .filter((a) => {
      if (listTab === 'scheduled') return (a.status === 'scheduled');
      if (a.status === 'scheduled') return false;
      const targetTeams = a.targetTeams ?? ['all'];
      const targetCompany = a.targetCompany ?? 'all';
      if (userRole !== 'Admin') {
        if (targetCompany !== 'all' && targetCompany !== currentCompany) return false;
        if (targetTeams[0] !== 'all' && !targetTeams.includes(currentUserTeam)) return false;
      }
      if (filters.departments.includes('All')) {}
      else if (!filters.departments.includes(a.department)) return false;
      if (filters.tags.length && !filters.tags.some((t) => a.tags?.includes(t))) return false;
      if (filters.pinnedOnly && !a.pinned) return false;
      return true;
    });

  const toggleDept = (d) => {
    if (d === 'All') setFilters((f) => ({ ...f, departments: ['All'] }));
    else setFilters((f) => ({
      ...f,
      departments: f.departments.includes(d) ? f.departments.filter((x) => x !== d) : f.departments.filter((x) => x !== 'All').concat(d),
    }));
  };

  const toggleTag = (t) => {
    setFilters((f) => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : [...f.tags, t] }));
  };

  const toggleLike = (id, e) => {
    e?.stopPropagation?.();
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, likeCount: a.liked ? a.likeCount - 1 : a.likeCount + 1, liked: !a.liked } : a)));
  };

  const handlePost = () => {
    const err = {};
    if (!newPost.title.trim()) err.title = 'Title is required';
    if (!newPost.body.trim()) err.body = 'Body is required';
    setCreateError(err);
    if (Object.keys(err).length) return;
    const created = {
      id: 'new-' + Date.now(),
      title: newPost.title,
      body: newPost.body,
      excerpt: newPost.body.slice(0, 120) + (newPost.body.length > 120 ? '...' : ''),
      author: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=current' },
      date: newPost.scheduleLater ? newPost.scheduledFor.slice(0, 10) : new Date().toISOString().slice(0, 10),
      pinned: newPost.pinned,
      tags: newPost.tags,
      department: newPost.department,
      likeCount: 0,
      commentCount: 0,
      liked: false,
      company: currentCompany,
      status: newPost.scheduleLater ? 'scheduled' : 'published',
      scheduledFor: newPost.scheduleLater ? newPost.scheduledFor : null,
      targetTeams: newPost.targetTeams,
      targetCompany: newPost.targetCompany,
      priority: newPost.priority,
      requireReadReceipt: newPost.priority === 'critical' || newPost.requireReadReceipt,
    };
    setAnnouncements((prev) => [created, ...prev]);
    setCreateOpen(false);
    setNewPost(defaultNewPost);
    setCreateError({});
    addToast({ type: 'success', message: newPost.scheduleLater ? 'Announcement scheduled' : 'Announcement posted successfully', actorName: null, actorAvatar: null });
  };

  const canCreate = userRole === 'Admin' || userRole === 'Manager';
  const tagOptions = ['Benefits', 'Policy', 'Wins', 'Events', 'Culture', 'Learning', 'Compliance', 'CSR'];

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-[220px] shrink-0 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Filters</h3>
            <button type="button" onClick={() => setFilters({ departments: ['All'], tags: [], dateRange: 'all', pinnedOnly: false })} className="text-sm text-[var(--brand-primary)]">Clear All</button>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Department</p>
            {['All', 'HR', 'Tech', 'Delivery', 'Finance', 'Marketing', 'Leadership'].map((d) => (
              <label key={d} className="flex items-center gap-2 py-1 cursor-pointer">
                <input type="checkbox" checked={filters.departments.includes(d)} onChange={() => toggleDept(d)} className="rounded" />
                <span className="text-sm text-slate-700">{d}</span>
              </label>
            ))}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Tags</p>
            <div className="flex flex-wrap gap-1">
              {tagOptions.map((t) => (
                <button key={t} type="button" onClick={() => toggleTag(t)} className={cn('px-2 py-1 rounded text-xs', filters.tags.includes(t) ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Date</p>
            {['This Week', 'This Month', 'All Time'].map((r) => (
              <label key={r} className="flex items-center gap-2 py-1 cursor-pointer">
                <input type="radio" name="dateRange" checked={filters.dateRange === r.toLowerCase().replace(' ', '_')} onChange={() => setFilters((f) => ({ ...f, dateRange: r.toLowerCase().replace(' ', '_') }))} />
                <span className="text-sm text-slate-700">{r}</span>
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={filters.pinnedOnly} onChange={(e) => setFilters((f) => ({ ...f, pinnedOnly: e.target.checked }))} />
            <span className="text-sm text-slate-700">Show Pinned Only</span>
          </label>
        </aside>

        <div className="flex-1 min-w-0">
          {canCreate && (
            <div className="flex gap-2 mb-4">
              <button type="button" onClick={() => setListTab('all')} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium', listTab === 'all' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>All</button>
              <button type="button" onClick={() => setListTab('scheduled')} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium', listTab === 'scheduled' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>Scheduled</button>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="font-display font-bold text-2xl text-slate-900">Announcements</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{filtered.length} Posts</span>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                {VIEWS.map((v) => (
                  <button key={v} type="button" onClick={() => setView(v)} className={cn('px-3 py-2 text-sm capitalize', view === v ? 'bg-[var(--brand-primary)] text-white' : 'bg-white text-slate-600')}>{v}</button>
                ))}
              </div>
              {canCreate && (
                <button type="button" onClick={() => setCreateOpen(true)} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90">
                  New Announcement
                </button>
              )}
            </div>
          </div>

          {view === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a, i) => (
                <div key={a.id} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer" style={{ animationDelay: `${i * 50}ms` }} onClick={() => a.status !== 'scheduled' && setSelected(a)}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded', deptColor[a.department])}>{a.department}</span>
                    {a.pinned && <span className="text-amber-500 text-xs">📌</span>}
                    {(a.targetTeams?.[0] !== 'all' || a.targetCompany !== 'all') && <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-600">Targeted</span>}
                    {a.priority === 'important' && <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">Important</span>}
                    {a.priority === 'critical' && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-800">Critical</span>}
                    {a.status === 'scheduled' && <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1"><Clock className="w-3 h-3" /> {a.scheduledFor ? new Date(a.scheduledFor).toLocaleString() : 'Scheduled'}</span>}
                  </div>
                  <h3 className="font-medium text-slate-900 mt-2 line-clamp-1">{a.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-3">{a.excerpt}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-slate-500">{a.author?.name} · {a.date}</span>
                    {a.status === 'scheduled' && canCreate && (
                      <div className="flex gap-2">
                        <button type="button" onClick={(e) => { e.stopPropagation(); }} className="text-xs text-slate-500">Edit</button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setAnnouncements((prev) => prev.filter((x) => x.id !== a.id)); addToast({ type: 'success', message: 'Scheduled announcement cancelled', actorName: null, actorAvatar: null }); }} className="text-xs text-red-600">Cancel</button>
                      </div>
                    )}
                    {a.status !== 'scheduled' && (
                      <>
                        <button type="button" onClick={(e) => toggleLike(a.id, e)} className="flex items-center gap-1 text-slate-500"><Heart className={cn('w-4 h-4', a.liked && 'fill-red-500')} /><span className="text-xs">{a.likeCount}</span></button>
                        <span className="flex items-center gap-1 text-xs text-slate-500"><MessageCircle className="w-4 h-4" />{a.commentCount}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'list' && (
            <div className="space-y-1">
              {filtered.map((a) => (
                <div key={a.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => setSelected(a)}>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded shrink-0', deptColor[a.department])}>{a.department}</span>
                  {a.pinned && <span className="text-amber-500">★</span>}
                  <span className="font-medium text-slate-900 flex-1 truncate">{a.title}</span>
                  <span className="text-sm text-slate-500 shrink-0">{a.author?.name}</span>
                  <span className="text-sm text-slate-500 shrink-0">{a.date}</span>
                  <span className="text-xs shrink-0">{a.likeCount} 💙</span>
                  <span className="text-xs shrink-0">{a.commentCount} 💬</span>
                  <button type="button" onClick={() => setSelected(a)} className="text-[var(--brand-primary)] text-sm shrink-0">Read →</button>
                </div>
              ))}
            </div>
          )}

          {view === 'timeline' && (
            <div className="relative pl-8 border-l-2 border-slate-200">
              {filtered.map((a) => (
                <div key={a.id} className="relative mb-6">
                  <span className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white" />
                  {a.pinned && <span className="absolute -left-6 top-0 text-amber-500">★</span>}
                  <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 ml-2 cursor-pointer hover:shadow-md" onClick={() => setSelected(a)}>
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded', deptColor[a.department])}>{a.department}</span>
                    <h3 className="font-medium text-slate-900 mt-2">{a.title}</h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{a.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="font-medium">No announcements match your filters.</p>
              <p className="text-sm mt-1">Try adjusting the filter options.</p>
              <button type="button" onClick={() => setFilters({ departments: ['All'], tags: [], dateRange: 'all', pinnedOnly: false })} className="mt-4 text-[var(--brand-primary)] font-medium">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div className="space-y-4">
            <p className="text-slate-600 text-sm whitespace-pre-wrap">{selected.body}</p>
            <div className="flex items-center gap-2">
              <img src={selected.author?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium text-slate-800">{selected.author?.name}</p>
                <p className="text-xs text-slate-500">{selected.date}</p>
              </div>
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded', deptColor[selected.department])}>{selected.department}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.tags?.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={createOpen} onClose={() => { if (newPost.title || newPost.body) setDiscardConfirm(true); else setCreateOpen(false); }} title="Create Announcement">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input type="text" value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} className={cn('w-full rounded-lg border p-2', createError.title ? 'border-red-500' : 'border-slate-200')} placeholder="Announcement title" />
            {createError.title && <p className="text-xs text-red-500 mt-1">Title is required</p>}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Body *</label>
              <AIAssist context="announcement" onInsert={(text) => setNewPost((p) => ({ ...p, body: text }))} />
            </div>
            <textarea value={newPost.body} onChange={(e) => setNewPost((p) => ({ ...p, body: e.target.value }))} rows={4} className={cn('w-full rounded-lg border p-2', createError.body ? 'border-red-500' : 'border-slate-200')} placeholder="Content" />
            <p className="text-xs text-slate-500 mt-1">{newPost.body.length} / 2000</p>
            {createError.body && <p className="text-xs text-red-500">Body is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select value={newPost.department} onChange={(e) => setNewPost((p) => ({ ...p, department: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2">
              {['HR', 'Tech', 'Delivery', 'Finance', 'Marketing', 'Leadership'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-1">
              {tagOptions.map((t) => (
                <button key={t} type="button" onClick={() => setNewPost((p) => ({ ...p, tags: p.tags.includes(t) ? p.tags.filter((x) => x !== t) : [...p.tags, t] }))} className={cn('px-2 py-1 rounded text-xs', newPost.tags.includes(t) ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{t}</button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={newPost.scheduleLater} onChange={(e) => setNewPost((p) => ({ ...p, scheduleLater: e.target.checked }))} />
            <span className="text-sm text-slate-700">Schedule for later</span>
          </label>
          {newPost.scheduleLater && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Publish date & time</label>
              <input type="datetime-local" value={newPost.scheduledFor} onChange={(e) => setNewPost((p) => ({ ...p, scheduledFor: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
            <label className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={newPost.targetTeams.includes('all')} onChange={() => setNewPost((p) => ({ ...p, targetTeams: ['all'] }))} />
              <span className="text-sm">All Employees</span>
            </label>
            {['HR', 'Tech', 'Delivery', 'Finance', 'Marketing', 'Leadership'].map((t) => (
              <label key={t} className="flex items-center gap-2 py-1 cursor-pointer">
                <input type="checkbox" checked={newPost.targetTeams.includes(t)} onChange={() => setNewPost((p) => ({ ...p, targetTeams: p.targetTeams.includes('all') ? [t] : p.targetTeams.includes(t) ? p.targetTeams.filter((x) => x !== t) : [...p.targetTeams, t] }))} />
                <span className="text-sm">{t}</span>
              </label>
            ))}
            <label className="block text-xs font-medium text-slate-500 mt-2 mb-1">Company</label>
            <select value={newPost.targetCompany} onChange={(e) => setNewPost((p) => ({ ...p, targetCompany: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2 text-sm">
              <option value="all">All Companies</option>
              <option value="2coms">2COMS Consulting</option>
              <option value="jobs-academy">Jobs Academy</option>
              <option value="tempus">Tempus IT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <div className="flex gap-4">
              {['normal', 'important', 'critical'].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="priority" checked={newPost.priority === p} onChange={() => setNewPost((prev) => ({ ...prev, priority: p, requireReadReceipt: p === 'critical' }))} />
                  <span className="text-sm capitalize">{p}</span>
                </label>
              ))}
            </div>
            {newPost.priority === 'critical' && (
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input type="checkbox" checked={newPost.requireReadReceipt} onChange={(e) => setNewPost((p) => ({ ...p, requireReadReceipt: e.target.checked }))} />
                <span className="text-sm text-slate-700">Require Read Receipt — Employees must acknowledge this announcement.</span>
              </label>
            )}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={newPost.pinned} onChange={(e) => setNewPost((p) => ({ ...p, pinned: e.target.checked }))} />
            <span className="text-sm text-slate-700">Pin this announcement to top</span>
          </label>
          {discardConfirm && (
            <p className="text-sm text-amber-700">Discard changes? <button type="button" onClick={() => { setDiscardConfirm(false); setCreateOpen(false); setNewPost(defaultNewPost); }} className="font-medium underline">Yes, discard</button></p>
          )}
          <div className="flex gap-2">
            <button type="button" onClick={handlePost} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm">Post Announcement</button>
            <button type="button" onClick={() => setCreateOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
