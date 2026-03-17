import { useState, useEffect, useRef } from 'react';
import { BarChart3, Lock, Users, FileText, Heart, MessageCircle, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyticsData } from '../mock-data';
import { cn } from '../utils/cn';

const deptColor = { HR: 'bg-blue-500', Tech: 'bg-purple-500', Delivery: 'bg-green-500', Finance: 'bg-amber-500', Marketing: 'bg-pink-500', Leadership: 'bg-slate-600' };

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

export function Analytics() {
  const { userRole } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (userRole !== 'Admin') {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="bg-white rounded-2xl border border-[var(--brand-border)] p-8 shadow-sm text-center max-w-md">
          <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="font-display font-semibold text-xl text-slate-900 mb-2">Analytics is available for administrators only.</h2>
          <p className="text-slate-600 text-sm">Contact your admin to access engagement metrics and insights.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const { overview, contentReach, teamEngagement, weeklyTrend, topContent, readReceipts } = analyticsData;
  const maxWeekly = Math.max(...weeklyTrend.flatMap((w) => [w.posts, w.reactions, w.comments]));

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <h1 className="font-display font-bold text-2xl text-slate-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Total Employees', value: overview.totalEmployees, icon: Users },
          { label: 'Active This Week', value: overview.activeThisWeek, icon: Users },
          { label: 'Posts This Month', value: overview.postsThisMonth, icon: FileText },
          { label: 'Reactions', value: overview.reactionsThisMonth, icon: Heart },
          { label: 'Comments', value: overview.commentsThisMonth, icon: MessageCircle },
          { label: 'Events', value: overview.eventsThisMonth, icon: Calendar },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-[var(--brand-border)] p-4 shadow-sm">
            <item.icon className="w-5 h-5 text-slate-400 mb-2" />
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="font-mono text-xl font-semibold text-slate-800 mt-1"><CountUp end={item.value} /></p>
            <p className="text-xs text-green-600 mt-1">↑ trend</p>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">Content Reach</h2>
        <div className="bg-white rounded-2xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {[...contentReach].sort((a, b) => b.reach - a.reach).map((row) => (
              <div key={row.label} className="flex items-center gap-4 p-4">
                <span className="w-32 text-sm font-medium text-slate-700 shrink-0">{row.label}</span>
                <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden max-w-[200px]">
                  <div className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500" style={{ width: `${row.reach}%` }} />
                </div>
                <span className="text-sm text-slate-500 w-16">{row.views} views</span>
                <span className="text-sm text-slate-500 w-14">{row.likes} likes</span>
                <span className="text-sm text-slate-500 w-16">{row.comments} comments</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">Team Engagement</h2>
        <div className="space-y-3">
          {[...teamEngagement].sort((a, b) => b.score - a.score).map((row) => (
            <div key={row.team} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-slate-700 shrink-0">{row.team}</span>
              <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden max-w-md">
                <div className={cn('h-full rounded-lg transition-all duration-500', deptColor[row.team] || 'bg-slate-500')} style={{ width: `${row.score}%` }} />
              </div>
              <span className="font-mono text-sm font-medium text-slate-700 w-12">{row.score}%</span>
              <span className="text-xs text-slate-500">({row.members} members)</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">Weekly Trend</h2>
        <div className="h-[200px] flex items-end gap-2 bg-white rounded-2xl border border-[var(--brand-border)] p-4 shadow-sm">
          {weeklyTrend.map((w) => (
            <div key={w.week} className="flex-1 flex gap-0.5 items-end justify-center" style={{ height: '100%' }}>
              <div className="w-1/3 bg-blue-500 rounded-t min-h-[4px] transition-all" style={{ height: `${(w.posts / maxWeekly) * 100}%` }} title={`Posts: ${w.posts}`} />
              <div className="w-1/3 bg-purple-500 rounded-t min-h-[4px] transition-all" style={{ height: `${(w.reactions / maxWeekly) * 100}%` }} title={`Reactions: ${w.reactions}`} />
              <div className="w-1/3 bg-green-500 rounded-t min-h-[4px] transition-all" style={{ height: `${(w.comments / maxWeekly) * 100}%` }} title={`Comments: ${w.comments}`} />
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-2 justify-center text-sm text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Posts</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500" /> Reactions</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Comments</span>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">Top Content</h2>
        <div className="bg-white rounded-2xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">#</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Title</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Type</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-slate-500">Views</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-slate-500">Reactions</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-slate-500">Read Rate</th>
              </tr>
            </thead>
            <tbody>
              {[...topContent].sort((a, b) => b.views - a.views).map((row, i) => (
                <tr key={row.title} className="border-t border-slate-100">
                  <td className="py-3 px-4 font-mono text-sm text-slate-600">{i + 1}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{row.title}</td>
                  <td className="py-3 px-4"><span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">{row.type}</span></td>
                  <td className="py-3 px-4 text-right font-mono text-sm">{row.views}</td>
                  <td className="py-3 px-4 text-right font-mono text-sm">{row.reactions}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--brand-primary)] rounded-full" style={{ width: `${row.readRate}%` }} />
                      </div>
                      <span className="text-sm text-slate-600">{row.readRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">Read Receipts (Funnel)</h2>
        <div className="space-y-6">
          {readReceipts.map((item) => (
            <div key={item.contentTitle} className="bg-white rounded-2xl border border-[var(--brand-border)] p-4 shadow-sm">
              <p className="font-medium text-slate-800 mb-3">{item.contentTitle}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-xs text-slate-500 shrink-0">Sent</span>
                  <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-slate-500 rounded" style={{ width: '100%' }} />
                  </div>
                  <span className="text-xs font-mono w-12">{item.totalSent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-xs text-slate-500 shrink-0">Opened</span>
                  <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden max-w-[90%]">
                    <div className="h-full bg-blue-500 rounded" style={{ width: `${(item.opened / item.totalSent) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono w-12">{item.opened} ({(item.opened / item.totalSent * 100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-xs text-slate-500 shrink-0">Read fully</span>
                  <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden max-w-[75%]">
                    <div className="h-full bg-[var(--brand-primary)] rounded" style={{ width: `${(item.readFully / item.totalSent) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono w-12">{item.readFully}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-xs text-slate-500 shrink-0">Acknowledged</span>
                  <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden max-w-[60%]">
                    <div className="h-full bg-green-500 rounded" style={{ width: `${(item.acknowledged / item.totalSent) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono w-12">{item.acknowledged}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
