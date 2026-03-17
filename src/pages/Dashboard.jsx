import { useState, useEffect, useRef } from 'react';
import { Play, X, Heart, MessageCircle, ThumbsUp, Lightbulb, Share2, Send, Share } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  leadershipMessages,
  announcements as initialAnnouncements,
  activityTickerItems,
  stats,
  teamMembers,
  leaderboardThisMonth,
  leaderboardAllTime,
  events,
  employees,
  surveys,
} from '../mock-data';
import { Modal } from '../components/Modal';
import { SkeletonCard, SkeletonLines } from '../components/SkeletonCard';
import { cn } from '../utils/cn';

const deptColor = { HR: 'bg-blue-100 text-blue-800', Tech: 'bg-purple-100 text-purple-800', Delivery: 'bg-green-100 text-green-800', Finance: 'bg-amber-100 text-amber-800', Marketing: 'bg-pink-100 text-pink-800', Leadership: 'bg-slate-100 text-slate-800' };

function CountUp({ end, duration = 1200 }) {
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
  return <span className="font-mono text-2xl font-semibold text-slate-800">{value}</span>;
}

export function Dashboard() {
  const { currentUser, currentUserTeam, userRole, setCurrentPage, currentCompany, addToast, setDirectoryTeamFilter } = useApp();
  const [loading, setLoading] = useState(true);
  const [leadershipExpanded, setLeadershipExpanded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [reactionMsg, setReactionMsg] = useState(null);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('month');
  const [eventRsvps, setEventRsvps] = useState({});
  const [quickPollVote, setQuickPollVote] = useState(null);
  const [feedItems, setFeedItems] = useState([]);
  const [feedLikes, setFeedLikes] = useState({});
  const [feedCommentOpen, setFeedCommentOpen] = useState(null);
  const [feedCommentText, setFeedCommentText] = useState('');
  const [postComposerOpen, setPostComposerOpen] = useState(false);
  const [postComposerText, setPostComposerText] = useState('');
  const [adminApprovalOpen, setAdminApprovalOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([
    { id: 'pu1', name: 'Ravi Kumar', email: 'ravi.k@2coms.com', department: 'Tech' },
    { id: 'pu2', name: 'Sonali Patel', email: 'sonali.p@2coms.com', department: 'HR' },
    { id: 'pu3', name: 'Karthik Reddy', email: 'karthik.r@2coms.com', department: 'Delivery' },
  ]);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: 'c1', author: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul', text: 'Thanks for sharing!', time: '1 hour ago' },
    { id: 'c2', author: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha', text: 'Looking forward to it.', time: '45 min ago' },
    { id: 'c3', author: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita', text: 'Will there be a recording?', time: '30 min ago' },
  ]);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const firstName = currentUser?.name?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const leadership = leadershipMessages[0];
  const s = userRole === 'Admin' ? stats.company : stats.team;
  const filteredAnnouncements = announcements.filter((a) => a.company === currentCompany).slice(0, 4);
  const filteredTicker = activityTickerItems.filter((a) => a.company === currentCompany);
  const baseFeedItems = filteredTicker.slice(0, 5).map((a) => ({ id: a.id, text: a.text, time: a.time, actor: a.actor, company: a.company }));
  const displayFeed = [...feedItems, ...baseFeedItems].slice(0, 5);
  const leaderboard = leaderboardPeriod === 'month' ? leaderboardThisMonth : leaderboardAllTime;

  const handlePostUpdate = () => {
    if (!postComposerText.trim()) return;
    setFeedItems((prev) => [{ id: 'post-' + Date.now(), text: postComposerText.trim(), time: 'Just now', actor: { name: currentUser?.name, avatar: currentUser?.avatar }, company: currentCompany }, ...prev]);
    setPostComposerText('');
    setPostComposerOpen(false);
  };
  const upcomingEvents = events.filter((e) => e.company === currentCompany).slice(0, 3);
  const activePoll = surveys.find((s) => s.type === 'poll' && s.status === 'active' && s.company === currentCompany);
  const teamList = teamMembers[currentUserTeam] || [];
  const rsvpState = (eid) => eventRsvps[eid] || 'rsvp';

  const toggleLike = (id, e) => {
    e?.stopPropagation?.();
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likeCount: a.liked ? a.likeCount - 1 : a.likeCount + 1, liked: !a.liked } : a))
    );
  };

  const setReaction = (msgId, reaction) => {
    setReactionMsg((prev) => {
      const next = { ...prev };
      const current = next[msgId];
      if (current === reaction) {
        delete next[msgId];
        return next;
      }
      next[msgId] = reaction;
      return next;
    });
  };

  const handlePostComment = () => {
    if (!commentText.trim() || !selectedAnnouncement) return;
    setComments((prev) => [{ id: 'new', author: 'You', avatar: currentUser?.avatar, text: commentText.trim(), time: 'Just now' }, ...prev]);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText('https://2coms.one/announcements/5');
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-24 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-12 bg-slate-200 rounded-xl animate-pulse max-w-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonCard className="h-64 col-span-2" />
          <div className="space-y-4">
            <SkeletonCard className="h-32" />
            <SkeletonCard className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--brand-primary-light)_0%,_transparent_50%)] pointer-events-none" />
        <div className="relative">
          <h1 className="font-display font-bold text-2xl text-slate-900">
            {greeting}, {firstName} 👋
          </h1>
          <p className="text-slate-600 mt-1">
            {currentUserTeam} Team · {userRole} · {today}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white border border-[var(--brand-border)] shadow-sm p-4">
        <h3 className="font-display font-semibold text-slate-900 mb-3">Activity Feed</h3>
        <div className="bg-slate-50 rounded-xl p-3 mb-4 flex items-start gap-3">
          <img src={currentUser?.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
          {!postComposerOpen ? (
            <button type="button" onClick={() => setPostComposerOpen(true)} className="flex-1 text-left text-sm text-slate-500 py-2">Share an update, idea, or shout-out...</button>
          ) : (
            <div className="flex-1">
              <textarea value={postComposerText} onChange={(e) => setPostComposerText(e.target.value)} placeholder="Share an update..." className="w-full rounded-lg border border-slate-200 p-2 text-sm min-h-[80px] resize-none" autoFocus />
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={handlePostUpdate} disabled={!postComposerText.trim()} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium disabled:opacity-50">Post</button>
                <button type="button" onClick={() => { setPostComposerOpen(false); setPostComposerText(''); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {displayFeed.map((item) => (
            <div key={item.id} className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              <div className="flex gap-3">
                <img src={item.actor?.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{item.actor?.name}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                  <p className="text-sm text-slate-700 mt-1">{item.text}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button type="button" onClick={() => setFeedLikes((l) => ({ ...l, [item.id]: !l[item.id] }))} className={cn('flex items-center gap-1 text-sm', feedLikes[item.id] ? 'text-[var(--brand-primary)]' : 'text-slate-500')}>👍 Like {(feedLikes[item.id] ? 1 : 0)}</button>
                    <button type="button" onClick={() => setFeedCommentOpen(feedCommentOpen === item.id ? null : item.id)} className="flex items-center gap-1 text-sm text-slate-500">💬 Comment</button>
                    <button type="button" onClick={() => { navigator.clipboard?.writeText('https://2coms.one/activity'); addToast({ type: 'success', message: 'Copied!', actorName: null, actorAvatar: null }); }} className="flex items-center gap-1 text-sm text-slate-500"><Share className="w-4 h-4" /> Share</button>
                  </div>
                  {feedCommentOpen === item.id && (
                    <div className="mt-2 flex gap-2">
                      <input type="text" value={feedCommentText} onChange={(e) => setFeedCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                      <button type="button" onClick={() => { setFeedCommentOpen(null); setFeedCommentText(''); }} className="px-3 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm">Post</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setCurrentPage('dashboard')} className="mt-3 text-sm text-[var(--brand-primary)] font-medium hover:underline">View all activity →</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
            {!videoPlaying ? (
              <div className="relative aspect-video bg-slate-200 group">
                <img src={leadership?.videoThumb} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                >
                  <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-[var(--brand-primary)] ml-1" fill="currentColor" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="relative aspect-video bg-black">
                <iframe
                  title="Leadership video"
                  src={`https://www.youtube.com/embed/${leadership?.videoId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay"
                />
                <button
                  type="button"
                  onClick={() => setVideoPlaying(false)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="p-4">
              <span className="text-xs font-medium text-slate-500">{leadership?.category} · {leadership?.date}</span>
              <h2 className="font-display font-semibold text-lg mt-1">{leadership?.title}</h2>
              <p className="text-slate-600 text-sm mt-2 line-clamp-3">{leadership?.content}</p>
              <button
                type="button"
                onClick={() => setLeadershipExpanded((e) => !e)}
                className="text-[var(--brand-primary)] font-medium text-sm mt-2 hover:underline"
              >
                {leadershipExpanded ? 'Collapse ↑' : 'Read Full Message →'}
              </button>
              {leadershipExpanded && (
                <p className="text-slate-600 text-sm mt-2">{leadership?.content}</p>
              )}
              <div className="flex gap-2 mt-4">
                {['👏 Applaud', '❤️ Like', '💡 Insightful'].map((label, i) => {
                  const key = ['applaud', 'like', 'insightful'][i];
                  const count = leadership?.reactions?.[key] ?? 0;
                  const active = reactionMsg?.lm1 === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setReaction('lm1', key)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm border transition-all active:scale-95',
                        active ? 'bg-[var(--brand-primary-light)] border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      {label} {count + (active ? 1 : 0)}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <img src={leadership?.author?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-slate-800">{leadership?.author?.name}</p>
                  <p className="text-xs text-slate-500">{leadership?.author?.role} · {leadership?.author?.company}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-slate-900">
                Latest Announcements
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 ml-2 animate-pulse" />
              </h2>
              <button type="button" onClick={() => setCurrentPage('announcements')} className="text-[var(--brand-primary)] font-medium text-sm hover:underline">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredAnnouncements.map((a, i) => (
                <div
                  key={a.id}
                  className={cn(
                    'bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer',
                    'opacity-0 animate-[pageEnter_0.2s_ease-out_forwards]'
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => setSelectedAnnouncement(a)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded', deptColor[a.department] || 'bg-slate-100')}>{a.department}</span>
                    {a.pinned && <span className="text-amber-500 text-xs">📌 Pinned</span>}
                  </div>
                  <h3 className="font-medium text-slate-900 mt-2 line-clamp-1">{a.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{a.excerpt}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-slate-500">{a.author?.name} · {a.date}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={(e) => toggleLike(a.id, e)} className="flex items-center gap-1 text-slate-500 hover:text-red-500">
                        <Heart className={cn('w-4 h-4', a.liked && 'fill-red-500 text-red-500')} />
                        <span className="text-xs">{a.likeCount}</span>
                      </button>
                      <span className="flex items-center gap-1 text-slate-500 text-xs">
                        <MessageCircle className="w-4 h-4" />{a.commentCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Active Projects', value: s.activeProjects, icon: '📋' },
              { label: 'Milestones Hit', value: s.milestonesHit, icon: '🎯' },
              { label: 'New Joinees This Month', value: s.newJoineesMonth, icon: '👋' },
              { label: 'Your Engagement Points', value: s.engagementPoints, icon: '⭐' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-2xl font-mono font-semibold text-slate-800 mt-1"><CountUp end={item.value} /></p>
                <p className="text-xs text-green-600 mt-1">↑ trend</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
            <h3 className="font-display font-semibold text-slate-900">{currentUserTeam} Team</h3>
            <p className="text-sm text-slate-500">{teamList.length} members</p>
            <div className="flex -space-x-2 mt-3">
              {teamList.slice(0, 4).map((name, i) => (
                <img
                  key={name}
                  src={employees.find((e) => e.name === name)?.avatar || `https://i.pravatar.cc/150?u=${i}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
              {teamList.length > 4 && (
                <span className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">+{teamList.length - 4}</span>
              )}
            </div>
            <button type="button" onClick={() => { setDirectoryTeamFilter(currentUserTeam); setCurrentPage('directory'); }} className="text-[var(--brand-primary)] font-medium text-sm mt-3 hover:underline">
              View Full Team →
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-slate-900">Leaderboard</h3>
              <div className="flex rounded-lg overflow-hidden border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLeaderboardPeriod('month')}
                  className={cn('px-3 py-1.5 text-sm', leaderboardPeriod === 'month' ? 'bg-[var(--brand-primary)] text-white' : 'bg-white text-slate-600')}
                >
                  This Month
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardPeriod('all')}
                  className={cn('px-3 py-1.5 text-sm', leaderboardPeriod === 'all' ? 'bg-[var(--brand-primary)] text-white' : 'bg-white text-slate-600')}
                >
                  All Time
                </button>
              </div>
            </div>
            <ul className="space-y-2">
              {leaderboard.map((entry, i) => (
                <li key={entry.name} className={cn('flex items-center gap-3 p-2 rounded-lg', entry.name === currentUser?.name && 'bg-blue-50')}>
                  <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium', i === 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600')}>{i + 1}</span>
                  <img src={entry.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{entry.name}</p>
                    <p className="text-xs text-slate-500">{entry.badge}</p>
                  </div>
                  <span className="font-mono text-sm font-medium text-slate-700"><CountUp end={entry.points} /></span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setCurrentPage('recognition')} className="text-[var(--brand-primary)] font-medium text-sm mt-3 hover:underline">
              View Full Rankings →
            </button>
          </div>

          {userRole === 'Admin' && (
            <div className="bg-white rounded-xl border-l-4 border-red-500 border border-[var(--brand-border)] shadow-sm p-4">
              <h3 className="font-display font-semibold text-slate-900 flex items-center gap-2">
                <span className="text-red-500">Moderation Queue</span>
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>3 Flagged Forum Posts</span>
                  <button type="button" onClick={() => setCurrentPage('forum')} className="text-[var(--brand-primary)] font-medium">Review</button>
                </div>
                <div className="flex justify-between">
                  <span>12 Pending New Users</span>
                  <button type="button" onClick={() => setAdminApprovalOpen(true)} className="text-[var(--brand-primary)] font-medium">Approve</button>
                </div>
                <div className="flex justify-between">
                  <span>2 Reports on Announcements</span>
                  <button type="button" onClick={() => setCurrentPage('announcements')} className="text-[var(--brand-primary)] font-medium">Review</button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-slate-900">Upcoming Events</h3>
              <button type="button" onClick={() => setCurrentPage('calendar')} className="text-[var(--brand-primary)] font-medium text-sm">View All →</button>
            </div>
            <ul className="space-y-3">
              {upcomingEvents.map((ev) => (
                <li key={ev.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex flex-col items-center justify-center shrink-0 hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
                    <span className="text-xs font-medium">{new Date(ev.date).toLocaleDateString('en-GB', { month: 'short' })}</span>
                    <span className="text-lg font-mono font-semibold leading-tight">{new Date(ev.date).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{ev.title}</p>
                    <p className="text-xs text-slate-500">{ev.time} · {ev.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEventRsvps((p) => ({ ...p, [ev.id]: p[ev.id] === 'rsvp' ? 'going' : p[ev.id] === 'going' ? 'cant' : 'rsvp' }))}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium border active:scale-95',
                      rsvpState(ev.id) === 'going' && 'bg-green-500 text-white border-green-500',
                      rsvpState(ev.id) === 'cant' && 'bg-red-500 text-white border-red-500',
                      rsvpState(ev.id) === 'rsvp' && 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                    )}
                  >
                    {rsvpState(ev.id) === 'going' ? '✓ Going' : rsvpState(ev.id) === 'cant' ? "Can't Go" : 'RSVP'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {activePoll && (
            <div className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 mt-6">
              <h3 className="font-display font-semibold text-slate-900 mb-2">Quick Poll</h3>
              <p className="text-sm text-slate-700 mb-3">{activePoll.title}</p>
              {!quickPollVote ? (
                <>
                  <div className="space-y-2">
                    {activePoll.options.map((opt) => (
                      <button key={opt.id} type="button" onClick={() => { setQuickPollVote(opt.id); addToast({ type: 'success', message: 'Vote recorded!', actorName: null, actorAvatar: null }); }} className="w-full text-left px-3 py-2 rounded-lg border border-[var(--brand-border)] hover:bg-slate-50 text-sm font-medium">
                        {opt.text}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{activePoll.totalResponses} responses</p>
                </>
              ) : (
                <div className="space-y-2">
                  {activePoll.options.map((opt) => {
                    const total = activePoll.totalResponses + 1;
                    const votes = opt.id === quickPollVote ? opt.votes + 1 : opt.votes;
                    const pct = total ? (votes / total) * 100 : 0;
                    return (
                      <div key={opt.id} className={cn('flex items-center gap-2', opt.id === quickPollVote && 'bg-[var(--brand-primary-light)] rounded-lg p-2')}>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-sm w-32 truncate">{opt.text}</span>
                        <span className="text-xs font-mono text-slate-500">{pct.toFixed(0)}%</span>
                      </div>
                    );
                  })}
                  <p className="text-xs text-slate-500 mt-2">{activePoll.totalResponses + 1} responses</p>
                </div>
              )}
              <button type="button" onClick={() => setCurrentPage('surveys')} className="mt-3 text-sm text-[var(--brand-primary)] font-medium hover:underline">View all surveys →</button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!selectedAnnouncement} onClose={() => setSelectedAnnouncement(null)} title={selectedAnnouncement?.title} className="max-w-lg">
        {selectedAnnouncement && (
          <div className="space-y-4">
            <p className="text-slate-600 text-sm whitespace-pre-wrap">{selectedAnnouncement.body}</p>
            <div className="flex items-center gap-2">
              <img src={selectedAnnouncement.author?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium text-slate-800">{selectedAnnouncement.author?.name}</p>
                <p className="text-xs text-slate-500">{selectedAnnouncement.date}</p>
              </div>
              <span className={cn('ml-2 text-xs font-medium px-2 py-0.5 rounded', deptColor[selectedAnnouncement.department])}>{selectedAnnouncement.department}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedAnnouncement.tags?.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2">
              {['👏 Applaud', '❤️ Like', '💡 Insightful'].map((l, i) => (
                <button key={i} type="button" className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">{l}</button>
              ))}
            </div>
            <button type="button" onClick={handleShare} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800">
              <Share2 className="w-4 h-4" />
              {shareCopied ? 'Link copied!' : 'Share'}
            </button>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm font-medium text-slate-700 mb-2">Comments</p>
              {comments.map((c) => (
                <div key={c.id} className="flex gap-2 mb-3">
                  <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{c.author}</p>
                    <p className="text-sm text-slate-600">{c.text}</p>
                    <p className="text-xs text-slate-400">{c.time}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 min-h-[80px] rounded-lg border border-slate-200 p-2 text-sm resize-y"
                />
                <button type="button" onClick={handlePostComment} disabled={!commentText.trim()} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={adminApprovalOpen} onClose={() => setAdminApprovalOpen(false)} title="Pending User Approvals">
        <div className="space-y-4">
          {pendingUsers.length === 0 ? (
            <p className="text-slate-600 text-center py-4">All approvals cleared ✓</p>
          ) : (
            pendingUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <p className="font-medium text-slate-800">{u.name}</p>
                  <p className="text-sm text-slate-500">{u.email} · {u.department}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setPendingUsers((p) => p.filter((x) => x.id !== u.id)); addToast({ type: 'success', message: 'User approved', actorName: null, actorAvatar: null }); }} className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm">Approve</button>
                  <button type="button" onClick={() => { setPendingUsers((p) => p.filter((x) => x.id !== u.id)); addToast({ type: 'success', message: 'User rejected', actorName: null, actorAvatar: null }); }} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
