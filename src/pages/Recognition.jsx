import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { newJoinees, recognitionFeed, leaderboardThisMonth, badges, employees as employeesList } from '../mock-data';
import { Modal } from '../components/Modal';
import { ConfettiBurst } from '../components/ConfettiBurst';
import { AIAssist } from '../components/AIAssist';
import { cn } from '../utils/cn';

function CountUp({ end, duration = 1000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);
  return value;
}

const badgeColors = { blue: 'bg-blue-100 text-blue-800', green: 'bg-green-100 text-green-800', teal: 'bg-teal-100 text-teal-800', gold: 'bg-amber-100 text-amber-800', purple: 'bg-purple-100 text-purple-800', rose: 'bg-rose-100 text-rose-800' };

export function Recognition() {
  const { currentUser, currentUserTeam, userRole, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(recognitionFeed);
  const [welcomed, setWelcomed] = useState({});
  const [sayHelloOpen, setSayHelloOpen] = useState(null);
  const [helloMessage, setHelloMessage] = useState('');
  const [appreciateOpen, setAppreciateOpen] = useState(false);
  const [appreciateStep, setAppreciateStep] = useState(1);
  const [appreciateRecipient, setAppreciateRecipient] = useState(null);
  const [appreciateBadge, setAppreciateBadge] = useState(null);
  const [appreciateMessage, setAppreciateMessage] = useState('');
  const [confetti, setConfetti] = useState(false);
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [claps, setClaps] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSendHello = () => {
    if (!helloMessage.trim() || !sayHelloOpen) return;
    setWelcomed((w) => ({ ...w, [sayHelloOpen.id]: true }));
    setSayHelloOpen(null);
    setHelloMessage('');
    setConfetti(true);
    addToast({ type: 'recognition', message: `Your welcome message was sent to ${sayHelloOpen.name}!`, actorName: sayHelloOpen.name, actorAvatar: sayHelloOpen.avatar });
  };

  const handlePostAppreciation = () => {
    if (!appreciateRecipient || !appreciateBadge || !appreciateMessage.trim() || appreciateMessage.length < 20) return;
    const newCard = {
      id: 'new-' + Date.now(),
      from: { name: currentUser?.name, avatar: currentUser?.avatar },
      to: appreciateRecipient,
      badge: appreciateBadge.name,
      badgeColor: appreciateBadge.id?.replace('b', '') || 'blue',
      message: appreciateMessage,
      date: 'Just now',
      claps: 0,
      userClapped: false,
      team: currentUserTeam,
      replies: [],
    };
    setFeed((prev) => [newCard, ...prev]);
    setAppreciateOpen(false);
    setAppreciateStep(1);
    setAppreciateRecipient(null);
    setAppreciateBadge(null);
    setAppreciateMessage('');
    setConfetti(true);
    addToast({ type: 'recognition', message: `${appreciateRecipient.name} has been recognized! 🎉`, actorName: appreciateRecipient.name, actorAvatar: appreciateRecipient.avatar });
  };

  const toggleClap = (id) => {
    setClaps((c) => ({ ...c, [id]: !c[id] }));
    setFeed((prev) => prev.map((r) => r.id === id ? { ...r, claps: r.claps + (claps[id] ? -1 : 1), userClapped: !claps[id] } : r));
  };


  if (loading) {
    return (
      <div className="p-6">
        <div className="h-32 bg-slate-200 rounded-2xl animate-pulse mb-8" />
        <div className="h-48 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <ConfettiBurst trigger={confetti} onComplete={() => setConfetti(false)} />

      <div className="relative rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] p-6 text-white mb-8 overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display font-bold text-2xl">Recognition & Celebrations 🎉</h1>
          <button type="button" onClick={() => setAppreciateOpen(true)} className="px-4 py-2 bg-white text-[var(--brand-primary)] rounded-lg font-medium text-sm hover:opacity-90">
            Celebrate Someone +
          </button>
        </div>
        <div className="absolute top-2 left-4 text-2xl opacity-50 animate-[floatUp_4s_ease-in-out_infinite]">🏅</div>
        <div className="absolute top-4 right-20 text-xl opacity-50 animate-[floatUp_4s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>🎊</div>
      </div>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">Welcome to the 2COMS Family! 👋</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {newJoinees.map((nj) => (
            <div key={nj.id} className="min-w-[240px] rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white">
              <img src={nj.avatar} alt="" className="w-18 h-18 rounded-full border-2 border-white object-cover mx-auto mb-2" style={{ width: 72, height: 72 }} />
              <p className="font-semibold text-center">{nj.name}</p>
              <p className="text-sm text-white/80 text-center">{nj.role} · {nj.team}</p>
              <p className="text-xs text-white/70 text-center mt-1">Joined {nj.joinDate}</p>
              {welcomed[nj.id] ? (
                <button type="button" disabled className="mt-3 w-full py-2 rounded-lg bg-green-500 text-white text-sm font-medium">✓ Welcomed!</button>
              ) : sayHelloOpen?.id === nj.id ? (
                <div className="mt-3 space-y-2">
                  <textarea value={helloMessage} onChange={(e) => setHelloMessage(e.target.value)} placeholder="Write a welcome message..." className="w-full rounded-lg p-2 text-slate-800 text-sm min-h-[60px]" />
                  <div className="flex gap-2">
                    <button type="button" onClick={handleSendHello} disabled={!helloMessage.trim()} className="flex-1 py-2 bg-white text-slate-800 rounded-lg text-sm font-medium disabled:opacity-50">Send</button>
                    <button type="button" onClick={() => { setSayHelloOpen(null); setHelloMessage(''); }} className="px-3 py-2 border border-white/50 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setSayHelloOpen(nj)} className="mt-3 w-full py-2 rounded-lg border-2 border-white text-white text-sm font-medium hover:bg-white/20">Say Hello 👋</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">Peer Appreciation Feed <span className="text-green-500 text-sm">• Live</span></h2>
        <div className="space-y-4">
          {feed.map((r) => (
            <div key={r.id} className={cn('bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4', r.team === currentUserTeam && 'border-l-4 border-l-[var(--brand-primary)]')}>
              <div className="flex gap-3">
                <img src={r.from?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-600">From {r.from?.name}</span>
                  <span className={cn('ml-2 text-xs font-medium px-2 py-0.5 rounded', badgeColors[r.badgeColor] || 'bg-slate-100')}>{r.badge}</span>
                  <p className="font-medium text-slate-900 mt-1">To {r.to?.name}</p>
                  <p className="text-slate-600 text-sm mt-1">{r.message}</p>
                  <p className="text-xs text-slate-500 mt-2">{r.date}</p>
                  <div className="flex gap-4 mt-2">
                    <button type="button" onClick={() => toggleClap(r.id)} className={cn('flex items-center gap-1 text-sm', claps[r.id] && 'text-[var(--brand-primary)]')}>👏 {r.claps}</button>
                    <button type="button" onClick={() => setReplyOpen(replyOpen === r.id ? null : r.id)} className="text-sm text-slate-600">Reply ↩</button>
                  </div>
                  {replyOpen === r.id && (
                    <div className="mt-3 flex gap-2">
                      <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 rounded-lg border border-slate-200 p-2 text-sm min-h-[60px]" />
                      <button type="button" onClick={() => { setFeed((prev) => prev.map((x) => x.id === r.id ? { ...x, replies: [...(x.replies || []), { author: 'You', text: replyText }] } : x)); setReplyOpen(null); setReplyText(''); }} className="px-3 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm">Post Reply</button>
                    </div>
                  )}
                </div>
                <img src={r.to?.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">Points Leaderboard</h2>
        <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Name</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardThisMonth.map((entry, i) => (
                <tr key={entry.name} className={cn('border-t border-slate-100', entry.name === currentUser?.name && 'bg-[var(--brand-primary-light)]')}>
                  <td className="py-3 px-4 font-mono">{i + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={entry.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span>{entry.name} {entry.name === currentUser?.name && '<– You'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono"><CountUp end={entry.points} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="mt-2 text-sm text-slate-500 hover:text-slate-700">How Points Work?</button>
      </section>

      <section>
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">Achievement Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 text-center hover:shadow-md transition-all cursor-pointer" title={b.earnedBy?.join(', ')}>
              <div className={cn('w-12 h-12 rounded-full mx-auto flex items-center justify-center text-xl', badgeColors[b.color] || 'bg-slate-100')}>{b.icon}</div>
              <p className="font-medium text-slate-800 mt-2">{b.name}</p>
              <p className="text-xs text-slate-500">{b.count} earned</p>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={appreciateOpen} onClose={() => { setAppreciateOpen(false); setAppreciateStep(1); setAppreciateRecipient(null); setAppreciateBadge(null); setAppreciateMessage(''); }} title="Appreciate Someone">
        <div className="space-y-4">
          {appreciateStep === 1 && (
            <>
              <p className="text-sm text-slate-600">Who are you celebrating?</p>
              <input type="text" placeholder="Search employees..." className="w-full rounded-lg border border-slate-200 p-2" />
              <div className="max-h-40 overflow-y-auto space-y-1">
                {employeesList.slice(0, 5).map((e) => (
                  <button key={e.id} type="button" onClick={() => { setAppreciateRecipient({ name: e.name, avatar: e.avatar }); setAppreciateStep(2); }} className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-left">
                    <img src={e.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span>{e.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {appreciateStep === 2 && (
            <>
              <p className="text-sm text-slate-600">Choose a badge</p>
              <div className="grid grid-cols-3 gap-2">
                {badges.map((b) => (
                  <button key={b.id} type="button" onClick={() => { setAppreciateBadge(b); setAppreciateStep(3); }} className={cn('p-3 rounded-lg border text-center', appreciateBadge?.id === b.id ? 'border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]' : 'border-slate-200')}>
                    <span className="text-xl">{b.icon}</span>
                    <p className="text-xs font-medium mt-1">{b.name}</p>
                  </button>
                ))}
              </div>
            </>
          )}
          {appreciateStep === 3 && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Write your message (min 20 chars)</p>
                <AIAssist context="recognition" onInsert={setAppreciateMessage} />
              </div>
              <textarea value={appreciateMessage} onChange={(e) => setAppreciateMessage(e.target.value)} placeholder="Tell them what made this moment special..." className="w-full rounded-lg border border-slate-200 p-2 min-h-[100px]" />
              <p className="text-xs text-slate-500">{appreciateMessage.length} / 300</p>
              {appreciateRecipient && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500">Preview</p>
                  <p className="text-sm mt-1">You → {appreciateRecipient.name}: {appreciateMessage || '...'}</p>
                </div>
              )}
              <button type="button" onClick={handlePostAppreciation} disabled={!appreciateRecipient || !appreciateBadge || appreciateMessage.length < 20} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium disabled:opacity-50">Post Appreciation</button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
