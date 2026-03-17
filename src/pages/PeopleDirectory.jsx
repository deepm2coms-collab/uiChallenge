import { useState, useEffect } from 'react';
import { Mail, User, GitBranch } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { employees, orgChart } from '../mock-data';
import { Modal } from '../components/Modal';
import { cn } from '../utils/cn';

const teamColor = { HR: 'bg-blue-100 text-blue-800', Tech: 'bg-purple-100 text-purple-800', Delivery: 'bg-green-100 text-green-800', Finance: 'bg-amber-100 text-amber-800', Marketing: 'bg-pink-100 text-pink-800', Leadership: 'bg-slate-100 text-slate-800' };

function OrgChartTree({ node, orgExpanded, setOrgExpanded, teamColor, onProfileOpen }) {
  const hasReports = node.reports && node.reports.length > 0;
  const isExpanded = orgExpanded[node.id];

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => hasReports && setOrgExpanded((e) => ({ ...e, [node.id]: !e[node.id] }))}
        className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 hover:shadow-md transition-all text-left min-w-[180px] cursor-pointer"
      >
        <img src={node.avatar} alt="" className="w-10 h-10 rounded-full object-cover mx-auto mb-2" />
        <p className="font-semibold text-slate-900 text-center text-sm">{node.name}</p>
        <p className="text-xs text-slate-500 text-center">{node.role}</p>
        <span className={cn('inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded mx-auto text-center', teamColor[node.team])}>{node.team}</span>
        {hasReports && <span className="block text-center text-xs text-slate-400 mt-1">{isExpanded ? '▼ Collapse' : '▶ Expand'}</span>}
      </button>
      {hasReports && isExpanded && (
        <>
          <div className="w-0.5 h-4 bg-[var(--brand-border)]" />
          <div className="flex border-t border-[var(--brand-border)] pt-4 gap-8" style={{ borderTopWidth: 2 }}>
            {node.reports.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-[var(--brand-border)]" />
                <OrgChartTree node={child} orgExpanded={orgExpanded} setOrgExpanded={setOrgExpanded} teamColor={teamColor} onProfileOpen={onProfileOpen} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function PeopleDirectory() {
  const { currentCompany, clientPoolIsolation, setClientPoolIsolation, directoryTeamFilter, addToast, setCurrentPage } = useApp();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState(directoryTeamFilter || 'All');
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [newJoineesOnly, setNewJoineesOnly] = useState(false);
  const [view, setView] = useState('grid');
  const [profileOpen, setProfileOpen] = useState(null);
  const [orgExpanded, setOrgExpanded] = useState({ [orgChart.id]: true, u1: true, u2: true, u3: true, u4: false, u5: true });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = employees
    .filter((e) => e.company === currentCompany)
    .filter((e) => !clientPoolIsolation || ['HR', 'Tech', 'Leadership'].includes(e.team))
    .filter((e) => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.role?.toLowerCase().includes(search.toLowerCase()) || e.team?.toLowerCase().includes(search.toLowerCase()) || e.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase())))
    .filter((e) => teamFilter === 'All' || e.team === teamFilter)
    .filter((e) => !skillsFilter.length || skillsFilter.some((s) => e.skills?.includes(s)))
    .filter((e) => !newJoineesOnly || (e.joinDate && new Date(e.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)));

  const skillsOptions = ['React', 'Java', 'Python', 'HR', 'Finance', 'Marketing', 'Cloud', 'Management'];

  const copyEmail = (email) => {
    navigator.clipboard?.writeText(email);
    addToast({ type: 'success', message: 'Email copied!', actorName: null, actorAvatar: null });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      {clientPoolIsolation && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
          <span className="text-sm text-red-800">🔒 Client Pool Isolation Active — showing core team members only.</span>
          <button type="button" onClick={() => setClientPoolIsolation(false)} className="text-red-600 font-medium text-sm">✕</button>
        </div>
      )}

      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">People Directory</h1>
        <p className="text-slate-600 mt-1">Connect with colleagues across the 2COMS ecosystem.</p>
        <div className="flex gap-4 mt-2 text-sm font-mono text-slate-500">
          <span>{filtered.length} employees</span>
          <span>{new Set(filtered.map((e) => e.team)).size} teams</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, role, skills, team..." className="flex-1 min-w-[200px] rounded-lg border border-slate-200 px-4 py-2" />
        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="rounded-lg border border-slate-200 px-4 py-2">
          <option value="All">All Teams</option>
          {['HR', 'Tech', 'Delivery', 'Finance', 'Marketing', 'Leadership'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={newJoineesOnly} onChange={(e) => setNewJoineesOnly(e.target.checked)} />
          <span className="text-sm text-slate-700">New Joinees Only</span>
        </label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setView('grid')} className={cn('px-3 py-2 rounded-lg text-sm', view === 'grid' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100')}>Grid</button>
          <button type="button" onClick={() => setView('list')} className={cn('px-3 py-2 rounded-lg text-sm', view === 'list' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100')}>List</button>
          <button type="button" onClick={() => setView('orgchart')} className={cn('px-3 py-2 rounded-lg text-sm flex items-center gap-1', view === 'orgchart' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100')}><GitBranch className="w-4 h-4" /> Org Chart</button>
        </div>
      </div>

      {view === 'orgchart' && (
        <div className="overflow-x-auto py-6">
          <OrgChartTree node={orgChart} orgExpanded={orgExpanded} setOrgExpanded={setOrgExpanded} teamColor={teamColor} onProfileOpen={setProfileOpen} />
        </div>
      )}

      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp) => (
            <div key={emp.id} className="bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md transition-all group">
              <div className="relative">
                <img src={emp.avatar} alt="" className="w-16 h-16 rounded-full object-cover mx-auto" />
                {emp.online && <span className="absolute bottom-0 right-1/2 translate-x-6 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />}
              </div>
              <p className="font-semibold text-slate-900 text-center mt-2">{emp.name}</p>
              <p className="text-sm text-slate-500 text-center">{emp.role}</p>
              <span className={cn('inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded mx-auto text-center', teamColor[emp.team])}>{emp.team}</span>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {emp.skills?.slice(0, 2).map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{s}</span>
                ))}
                {emp.skills?.length > 2 && <span className="text-xs text-slate-400">+{emp.skills.length - 2}</span>}
              </div>
              {emp.joinDate && new Date(emp.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && <span className="inline-block mt-1 text-xs font-medium text-amber-600">NEW</span>}
              {emp.previousTeam && <span className="inline-block mt-1 text-xs text-amber-600">↗ from {emp.previousTeam}</span>}
              <div className="flex justify-center gap-2 mt-3">
                <button type="button" onClick={() => copyEmail(emp.email)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" title="Copy email"><Mail className="w-4 h-4" /></button>
                <button type="button" onClick={() => setProfileOpen(emp)} className="text-sm text-[var(--brand-primary)] font-medium">View Profile →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'list' && (
        <div className="bg-white rounded-xl border border-[var(--brand-border)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Team</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Skills</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Join Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className={cn('border-t border-slate-100', i % 2 === 1 && 'bg-slate-50/50')}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={emp.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-medium text-slate-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{emp.role}</td>
                  <td className="py-3 px-4"><span className={cn('text-xs font-medium px-2 py-0.5 rounded', teamColor[emp.team])}>{emp.team}</span></td>
                  <td className="py-3 px-4 text-sm text-slate-600">{emp.skills?.slice(0, 2).join(', ')}</td>
                  <td className="py-3 px-4 text-sm text-slate-500">{emp.joinDate}</td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" onClick={() => copyEmail(emp.email)} className="text-slate-500 hover:text-slate-700 p-1">📧</button>
                    <button type="button" onClick={() => setProfileOpen(emp)} className="text-[var(--brand-primary)] text-sm font-medium ml-2">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <User className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="font-medium">No employees match your filters.</p>
          <button type="button" onClick={() => { setSearch(''); setTeamFilter('All'); setNewJoineesOnly(false); }} className="mt-2 text-[var(--brand-primary)] font-medium">Clear filters</button>
        </div>
      )}

      <Modal isOpen={!!profileOpen} onClose={() => setProfileOpen(null)} title={profileOpen?.name} className="max-w-2xl">
        {profileOpen && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={profileOpen.avatar} alt="" className="w-22 h-22 rounded-full object-cover border-4 border-white shadow" style={{ width: 88, height: 88 }} />
              <div>
                <p className="font-display font-semibold text-xl text-slate-900">{profileOpen.name}</p>
                <p className="text-slate-600">{profileOpen.role}</p>
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded', teamColor[profileOpen.team])}>{profileOpen.team}</span>
                <p className="text-sm text-slate-500 mt-1">{profileOpen.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Email</p>
                <p className="text-slate-800">{profileOpen.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Phone</p>
                <p className="text-slate-800">{profileOpen.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Manager</p>
                <p className="text-slate-800">{profileOpen.manager || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Join Date</p>
                <p className="text-slate-800">{profileOpen.joinDate}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Bio</p>
              <p className="text-slate-700 text-sm">{profileOpen.bio}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profileOpen.skills?.map((s) => (
                  <span key={s} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-sm">{s}</span>
                ))}
              </div>
            </div>
            {profileOpen.previousTeam && (
              <p className="text-sm text-slate-600">Team history: {profileOpen.previousTeam} → {profileOpen.team}</p>
            )}
            <button type="button" onClick={() => { setCurrentPage('recognition'); setProfileOpen(null); }} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm">Send Recognition</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
