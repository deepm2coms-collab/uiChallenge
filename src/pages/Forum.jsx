import { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Flag, MoreVertical, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { forumTopics, forumChannels } from '../mock-data';
import { Modal } from '../components/Modal';
import { AIAssist } from '../components/AIAssist';
import { cn } from '../utils/cn';

export function Forum() {
  const { currentCompany, userRole, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState('general');
  const [sort, setSort] = useState('recent');
  const [threadOpen, setThreadOpen] = useState(null);
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [newThreadBody, setNewThreadBody] = useState('');
  const [upvotes, setUpvotes] = useState({});
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = forumTopics
    .filter((t) => t.company === currentCompany && t.channel === channel)
    .sort((a, b) => (sort === 'recent' ? 0 : (b.upvotes || 0) - (a.upvotes || 0)));

  const toggleUpvote = (id) => {
    setUpvotes((u) => ({ ...u, [id]: !u[id] }));
  };

  const getUpvotes = (t) => (t.upvotes || 0) + (upvotes[t.id] ? 1 : 0);

  const handlePostReply = () => {
    if (!replyText.trim() || !threadOpen) return;
    setReplies((r) => ({ ...r, [threadOpen.id]: [...(r[threadOpen.id] || []), { author: 'You', text: replyText, time: 'Just now' }] }));
    setReplyText('');
    addToast({ type: 'success', message: 'Reply posted ✓', actorName: null, actorAvatar: null });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="flex gap-6">
          <div className="w-48 h-64 bg-slate-200 rounded-xl animate-pulse" />
          <div className="flex-1 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter flex gap-6">
      <aside className="w-[180px] shrink-0 space-y-1">
        {forumChannels.map((ch) => (
          <button key={ch.id} type="button" onClick={() => setChannel(ch.id)} className={cn('w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between', channel === ch.id ? 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-medium' : 'text-slate-700 hover:bg-slate-100')}>
            <span>#{ch.name}</span>
            {ch.unread && <span className="w-2 h-2 rounded-full bg-blue-500" />}
          </button>
        ))}
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {['Recent', 'Top Voted', 'Trending'].map((s) => (
              <button key={s} type="button" onClick={() => setSort(s.toLowerCase().replace(' ', '_'))} className={cn('px-3 py-2 rounded-lg text-sm', sort === s.toLowerCase().replace(' ', '_') ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{s}</button>
            ))}
          </div>
          <button type="button" onClick={() => setNewThreadOpen(true)} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm">Create New Thread</button>
        </div>

        <div className="space-y-3">
          {filtered.map((thread) => (
            <div key={thread.id} className={cn('bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4', thread.flagged && 'opacity-75 border-red-200')}>
              <div className="flex items-start gap-3">
                <img src={thread.author?.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-slate-900">{thread.author?.name}</span>
                    <span className="text-xs text-slate-500">{thread.time}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">#{thread.channel}</span>
                    {thread.tags?.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{tag}</span>
                    ))}
                    {thread.trending && <span className="text-xs text-amber-600">🔥 Trending</span>}
                    {thread.sticky && <span className="text-xs text-slate-500">📌 Pinned</span>}
                    {thread.flagged && <span className="text-xs text-red-600">Under Review</span>}
                  </div>
                  <button type="button" onClick={() => setThreadOpen(thread)} className="block text-left mt-1 font-medium text-slate-900 hover:text-[var(--brand-primary)]">{thread.title}</button>
                  <div className="flex items-center gap-4 mt-2">
                    <button type="button" onClick={() => toggleUpvote(thread.id)} className={cn('flex items-center gap-1 text-sm', upvotes[thread.id] && 'text-[var(--brand-primary)]')}><ThumbsUp className={cn('w-4 h-4', upvotes[thread.id] && 'fill-current')} /> {getUpvotes(thread)}</button>
                    <span className="flex items-center gap-1 text-sm text-slate-500"><MessageSquare className="w-4 h-4" /> {thread.replies}</span>
                  </div>
                </div>
                {userRole === 'Admin' && (
                  <button type="button" className="p-1 rounded hover:bg-slate-100 text-slate-500"><MoreVertical className="w-4 h-4" /></button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="font-medium">No threads in this channel.</p>
          </div>
        )}
      </div>

      <div className="w-64 shrink-0 hidden lg:block">
        <div className="bg-white rounded-xl border border-[var(--brand-border)] p-4">
          <h3 className="font-medium text-slate-900 mb-2">Trending This Week</h3>
          {filtered.filter((t) => t.trending).slice(0, 3).map((t) => (
            <button key={t.id} type="button" onClick={() => setThreadOpen(t)} className="block w-full text-left py-2 text-sm text-slate-700 hover:text-[var(--brand-primary)] truncate">{t.title}</button>
          ))}
        </div>
      </div>

      {threadOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="w-full max-w-[65%] bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-display font-semibold text-lg">{threadOpen.title}</h2>
              <button type="button" onClick={() => setThreadOpen(null)} className="p-2 rounded-lg hover:bg-slate-100">✕</button>
            </div>
            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <img src={threadOpen.author?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-slate-900">{threadOpen.author?.name}</p>
                  <p className="text-sm text-slate-600">{threadOpen.body}</p>
                  <p className="text-xs text-slate-500 mt-1">{threadOpen.time} · #{threadOpen.channel}</p>
                  <button type="button" onClick={() => toggleUpvote(threadOpen.id)} className="mt-2 flex items-center gap-1 text-sm"><ThumbsUp className={cn('w-4 h-4', upvotes[threadOpen.id] && 'fill-current')} /> {getUpvotes(threadOpen)}</button>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Replies</p>
                {(replies[threadOpen.id] || []).map((r, i) => (
                  <div key={i} className="flex gap-2 py-2">
                    <span className="font-medium text-slate-800">{r.author}</span>
                    <span className="text-slate-600">{r.text}</span>
                    <span className="text-xs text-slate-400">{r.time}</span>
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a thoughtful reply..." className="flex-1 min-h-[80px] rounded-lg border border-slate-200 p-2 text-sm" />
                  <button type="button" onClick={handlePostReply} disabled={!replyText.trim()} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2"><Send className="w-4 h-4" /> Reply</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setThreadOpen(null)} aria-hidden />
        </div>
      )}

      <Modal isOpen={newThreadOpen} onClose={() => setNewThreadOpen(false)} title="New Thread">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input type="text" className="w-full rounded-lg border border-slate-200 p-2" placeholder="Thread title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Channel</label>
            <select className="w-full rounded-lg border border-slate-200 p-2">
              {forumChannels.map((ch) => (
                <option key={ch.id} value={ch.id}>#{ch.name}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <AIAssist context="forum" onInsert={setNewThreadBody} />
            </div>
            <textarea value={newThreadBody} onChange={(e) => setNewThreadBody(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 min-h-[100px]" placeholder="What's on your mind?" />
          </div>
          <button type="button" onClick={() => { setNewThreadOpen(false); addToast({ type: 'success', message: 'Thread posted ✓', actorName: null, actorAvatar: null }); }} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium">Post Thread</button>
        </div>
      </Modal>
    </div>
  );
}
