import { useState, useEffect, useRef } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { leadershipMessages, monthlyMeetOutcomes, podcasts } from '../mock-data';
import { Modal } from '../components/Modal';
import { cn } from '../utils/cn';

export function Leadership() {
  const { currentCompany, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('Mar');
  const [playingId, setPlayingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [responsesOpen, setResponsesOpen] = useState(null);
  const [reactions, setReactions] = useState({});
  const [podcastPlaying, setPodcastPlaying] = useState(null);
  const [podcastProgress, setPodcastProgress] = useState(0);
  const podcastIntervalRef = useRef(null);

  useEffect(() => {
    if (!podcastPlaying) {
      if (podcastIntervalRef.current) clearInterval(podcastIntervalRef.current);
      setPodcastProgress(0);
      return;
    }
    setPodcastProgress(0);
    podcastIntervalRef.current = setInterval(() => {
      setPodcastProgress((p) => {
        if (p >= 100) { clearInterval(podcastIntervalRef.current); return 100; }
        return p + 1;
      });
    }, 100);
    return () => { if (podcastIntervalRef.current) clearInterval(podcastIntervalRef.current); };
  }, [podcastPlaying]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const podcastList = podcasts.filter((p) => p.company === currentCompany);
  const messages = leadershipMessages.filter((m) => m.company === currentCompany || !m.company).filter((m) => m.month === selectedMonth);

  const setReaction = (id, key) => {
    setReactions((prev) => ({ ...prev, [id]: prev[id] === key ? null : key }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-48 bg-slate-200 rounded-2xl animate-pulse mb-6" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="relative rounded-2xl overflow-hidden h-48 mb-8">
        <img src={leadershipMessages[0]?.videoThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h1 className="font-display font-bold text-2xl">Leadership Desk</h1>
          <p className="text-white/90 mt-1">Hear directly from our leaders on vision, strategy, and culture.</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4">
        {months.map((m) => (
          <button key={m} type="button" onClick={() => setSelectedMonth(m)} className={cn('px-4 py-2 rounded-full text-sm font-medium shrink-0', selectedMonth === m ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{m}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {messages.length === 0 ? (
          <p className="text-slate-500 col-span-2">No messages for this month.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
              <div className="relative aspect-video bg-slate-200">
                {playingId === msg.id ? (
                  <>
                    <iframe title="Video" src={`https://www.youtube.com/embed/${msg.videoId}?autoplay=1`} className="absolute inset-0 w-full h-full" allow="autoplay" />
                    <button type="button" onClick={() => setPlayingId(null)} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white"><X className="w-5 h-5" /></button>
                  </>
                ) : (
                  <button type="button" onClick={() => setPlayingId(msg.id)} className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30">
                    <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center"><Play className="w-6 h-6 text-[var(--brand-primary)] ml-1" fill="currentColor" /></span>
                  </button>
                )}
                <img src={msg.videoThumb} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img src={msg.author?.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-slate-900">{msg.author?.name}</p>
                    <p className="text-sm text-slate-500">{msg.author?.role} · {msg.author?.company}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">{msg.category}</span>
                </div>
                <h2 className="font-display font-semibold text-lg mt-3 line-clamp-2">{msg.title}</h2>
                <p className="text-slate-600 text-sm mt-2 line-clamp-4">{msg.content}</p>
                <button type="button" onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)} className="text-[var(--brand-primary)] font-medium text-sm mt-2">Read Full Message →</button>
                {expandedId === msg.id && <p className="text-slate-600 text-sm mt-2">{msg.content}</p>}
                <div className="flex gap-2 mt-4">
                  {['applaud', 'like', 'insightful'].map((key) => (
                    <button key={key} type="button" onClick={() => setReaction(msg.id, key)} className={cn('px-3 py-1.5 rounded-lg text-sm border', reactions[msg.id] === key ? 'bg-[var(--brand-primary-light)] border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'border-slate-200')}>
                      {key} {(msg.reactions?.[key] || 0) + (reactions[msg.id] === key ? 1 : 0)}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setResponsesOpen(msg.id)} className="mt-3 text-sm text-slate-600">Responses ({msg.responsesCount})</button>
              </div>
            </div>
          ))
        )}
      </div>

      <section>
        <h2 className="font-display font-semibold text-xl text-slate-900 mb-4">Monthly Recap — What Leadership Discussed</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {monthlyMeetOutcomes.map((recap) => (
            <div key={recap.month + recap.year} className="min-w-[280px] bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
              <h3 className="font-medium text-slate-900">{recap.month} {recap.year}</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                {recap.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
              <button type="button" onClick={() => addToast({ type: 'success', message: 'Preparing PDF...', actorName: null, actorAvatar: null })} className="mt-4 text-sm text-[var(--brand-primary)] font-medium">Download Minutes (PDF)</button>
            </div>
          ))}
        </div>
      </section>

      {podcastList.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display font-semibold text-xl text-slate-900 mb-4">Leadership Podcasts 🎧</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {podcastList.map((pod) => (
              <div key={pod.id} className="min-w-[200px] bg-white rounded-xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
                <img src={pod.coverUrl} alt="" className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="font-semibold text-slate-900 text-sm line-clamp-2">{pod.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{pod.host} · {pod.duration}</p>
                  <p className="text-xs text-slate-400">{pod.plays} plays</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (podcastPlaying === pod.id) {
                          setPodcastPlaying(null);
                        } else {
                          setPodcastPlaying(pod.id);
                          addToast({ type: 'success', message: `Now playing: ${pod.title}`, actorName: null, actorAvatar: null });
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center shrink-0"
                    >
                      {podcastPlaying === pod.id ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
                    </button>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-300" style={{ width: `${podcastPlaying === pod.id ? podcastProgress : 0}%` }} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{podcastPlaying === pod.id ? `${Math.round(podcastProgress * 0.12)} min / ${pod.duration}` : '0:00 / ' + pod.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Modal isOpen={!!responsesOpen} onClose={() => setResponsesOpen(null)} title="Responses">
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">Employee replies will appear here.</p>
          <textarea placeholder="Write a reply..." className="w-full rounded-lg border border-slate-200 p-2 text-sm min-h-[80px]" />
          <button type="button" className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm">Post Reply</button>
        </div>
      </Modal>
    </div>
  );
}
