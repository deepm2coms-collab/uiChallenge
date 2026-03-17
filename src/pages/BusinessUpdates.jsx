import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { businessUpdates, projectWins, companies } from '../mock-data';
import { cn } from '../utils/cn';

function CountUp({ end, duration = 800 }) {
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

export function BusinessUpdates() {
  const { currentCompany, clientPoolIsolation } = useApp();
  const [loading, setLoading] = useState(true);
  const [companyTab, setCompanyTab] = useState('all');
  const [period, setPeriod] = useState('Q2');
  const [chartType, setChartType] = useState('bars');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const kpis = [
    { label: 'Revenue Target', value: '87%', sub: '↑ 4% vs Q1' },
    { label: 'Headcount Growth', value: '+23' },
    { label: 'Projects Delivered', value: '14' },
    { label: 'Client Satisfaction', value: '4.7/5' },
  ];

  const verticals = businessUpdates.filter((v) => companyTab === 'all' || v.company === currentCompany);
  const wins = projectWins.filter((w) => companyTab === 'all' || w.company === currentCompany);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 bg-slate-200 rounded animate-pulse w-64 mb-6" />
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-4 border-b border-slate-200">
          {['All', ...companies.map((c) => c.name)].map((label) => (
            <button key={label} type="button" onClick={() => setCompanyTab(label === 'All' ? 'all' : companies.find((x) => x.name === label)?.id)} className={cn('pb-2 px-1 text-sm font-medium', (companyTab === 'all' && label === 'All') || (companyTab !== 'all' && companies.find((x) => x.name === label)?.id === companyTab) ? 'border-b-2 border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'text-slate-600')}>{label === 'All' ? 'All' : companies.find((c) => c.name === label)?.name?.split(' ')[0] || label}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Annual'].map((p) => (
            <button key={p} type="button" onClick={() => setPeriod(p)} className={cn('px-3 py-1.5 rounded-lg text-sm', period === p ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
            <p className="text-xs text-slate-500">{k.label}</p>
            <p className="font-mono text-2xl font-semibold text-slate-800 mt-1"><CountUp end={k.label === 'Revenue Target' ? 87 : k.label === 'Headcount Growth' ? 23 : k.label === 'Projects Delivered' ? 14 : 4.7} />{k.label === 'Revenue Target' ? '%' : k.label === 'Headcount Growth' ? '' : k.label === 'Client Satisfaction' ? '/5' : ''}</p>
            {k.sub && <p className="text-xs text-green-600 mt-1">{k.sub}</p>}
          </div>
        ))}
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-slate-900">Vertical Performance — {companyTab === 'all' ? 'All' : companies.find((c) => c.id === companyTab)?.name}</h2>
          <button type="button" onClick={() => setChartType(chartType === 'bars' ? 'bubbles' : 'bars')} className="text-sm text-[var(--brand-primary)] font-medium">Toggle Chart Type</button>
        </div>
        {chartType === 'bars' ? (
          <div className="space-y-3">
            {verticals.slice(0, 6).map((v, i) => (
              <div key={v.vertical + v.company} className="flex items-center gap-4">
                <span className="w-24 shrink-0 text-sm font-medium text-slate-700">{v.vertical}</span>
                <div className="flex-1 h-8 bg-slate-100 rounded overflow-hidden">
                  <div className="h-full bg-[var(--brand-primary)] rounded transition-all duration-800" style={{ width: `${v.value}%` }} />
                </div>
                <span className="w-12 text-right font-mono text-sm">{v.value}%</span>
                <span className={cn('text-sm', v.trend === 'up' ? 'text-green-600' : v.trend === 'down' ? 'text-red-600' : 'text-slate-500')}>{v.trend === 'up' ? '↑' : v.trend === 'down' ? '↓' : '→'}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {verticals.slice(0, 6).map((v) => (
              <div key={v.vertical} className="flex flex-col items-center">
                <div className="rounded-full bg-[var(--brand-primary)] opacity-80" style={{ width: Math.max(40, v.value * 1.5), height: Math.max(40, v.value * 1.5) }} />
                <span className="text-sm font-medium text-slate-700 mt-2">{v.vertical}</span>
                <span className="font-mono text-xs text-slate-500">{v.value}%</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">Recent Project Wins 🏆</h2>
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          {wins.map((w) => (
            <div key={w.id} className={cn('break-inside-avoid bg-white rounded-xl border shadow-sm p-4', w.major && 'border-t-4 border-t-amber-400')}>
              <h3 className="font-semibold text-slate-900">{clientPoolIsolation ? 'Client Project (Confidential)' : w.name}</h3>
              {!clientPoolIsolation && <span className="text-xs text-slate-500">{w.company} · {w.team}</span>}
              <p className="font-mono text-lg text-[var(--brand-primary)] font-semibold mt-2">{w.impact}</p>
              <p className="text-sm text-slate-600 mt-1">{w.description}</p>
              <p className="text-xs text-slate-500 mt-2">{w.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">Our Presence Across India</h2>
        <div className="relative h-64 bg-slate-100 rounded-xl flex items-center justify-center">
          <svg viewBox="0 0 400 500" className="w-full h-full max-w-md opacity-30">
            <path fill="currentColor" d="M200 50 L250 80 L280 120 L270 180 L250 220 L220 250 L200 280 L180 320 L150 350 L120 380 L100 420 L120 450 L180 460 L250 440 L320 400 L350 350 L380 280 L400 200 L390 120 L360 80 L300 60 Z" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center gap-8">
            {['Kolkata', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'].map((city, i) => (
              <div key={city} className="relative group">
                <span className="w-3 h-3 rounded-full bg-[var(--brand-primary)] animate-ping absolute inset-0 opacity-75" />
                <span className="relative w-3 h-3 rounded-full bg-[var(--brand-primary)] block" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {city} · 5 projects · 12 employees
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
