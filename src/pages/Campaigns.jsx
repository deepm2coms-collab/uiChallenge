import { useState, useEffect } from 'react';
import { Rocket, Lock, Megaphone, ClipboardList, Award, BarChart3, Plus, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { campaigns as initialCampaigns } from '../mock-data';
import { Modal } from '../components/Modal';
import { cn } from '../utils/cn';

const stepIcons = { announcement: Megaphone, survey: ClipboardList, poll: BarChart3, recognition: Award };

export function Campaigns() {
  const { currentCompany, userRole, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', targetAudience: 'All Employees', totalRecipients: 85, steps: [{ day: 1, type: 'announcement', title: '' }, { day: 7, type: 'survey', title: '' }] });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = campaigns.filter((c) => c.company === currentCompany);

  if (userRole !== 'Admin') {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="bg-white rounded-2xl border border-[var(--brand-border)] p-8 shadow-sm text-center max-w-md">
          <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="font-display font-semibold text-xl text-slate-900 mb-2">Campaigns is available for administrators only.</h2>
          <p className="text-slate-600 text-sm">Contact your admin to manage communication campaigns.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const completedSteps = (camp) => camp.steps.filter((s) => s.status === 'sent').length;

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Campaigns</h1>
        <button type="button" onClick={() => setCreateOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((camp) => (
          <div key={camp.id} onClick={() => setSelectedCampaign(camp)} className="bg-white rounded-2xl border border-[var(--brand-border)] shadow-sm p-5 cursor-pointer hover:shadow-md transition-all">
            <h3 className="font-semibold text-slate-900">{camp.name}</h3>
            <div className="flex gap-2 mt-2">
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', camp.status === 'active' && 'bg-green-100 text-green-800', camp.status === 'draft' && 'bg-slate-100 text-slate-600', camp.status === 'completed' && 'bg-blue-100 text-blue-800')}>{camp.status}</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">{camp.targetAudience} · {camp.totalRecipients} recipients</p>
            <p className="text-sm text-slate-600 mt-1">{completedSteps(camp)} of {camp.steps.length} steps completed</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Rocket className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="font-medium">No campaigns yet.</p>
          <button type="button" onClick={() => setCreateOpen(true)} className="mt-4 text-[var(--brand-primary)] font-medium">Create your first campaign</button>
        </div>
      )}

      {selectedCampaign && (
        <Modal isOpen={!!selectedCampaign} onClose={() => setSelectedCampaign(null)} title={selectedCampaign.name} className="max-w-2xl">
          <div className="space-y-4">
            <p className="text-sm text-slate-600">{selectedCampaign.targetAudience} · {selectedCampaign.totalRecipients} recipients</p>
            <div className="relative pl-6 border-l-2 border-slate-200">
              {selectedCampaign.steps.map((step, i) => {
                const Icon = stepIcons[step.type] || Megaphone;
                return (
                  <div key={step.id} className="relative pb-6 last:pb-0">
                    <span className={cn('absolute left-0 -translate-x-[21px] w-4 h-4 rounded-full border-2 border-white', step.status === 'sent' && 'bg-green-500', step.status === 'pending' && 'bg-blue-500', step.status === 'draft' && 'bg-slate-300')} />
                    {step.status === 'sent' && <CheckCircle className="absolute left-0 -translate-x-6 top-0 w-4 h-4 text-green-500" />}
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">Day {step.day} — {step.title}</p>
                        <p className="text-xs text-slate-500 capitalize">{step.type}</p>
                        {(step.sentTo !== undefined && step.status === 'sent') && <p className="text-xs text-slate-600 mt-1">Sent to {step.sentTo} / Opened by {step.opened}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Campaign">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Campaign name</label>
            <input type="text" value={newCampaign.name} onChange={(e) => setNewCampaign((p) => ({ ...p, name: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2" placeholder="e.g. Q2 Engagement" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target audience</label>
            <select value={newCampaign.targetAudience} onChange={(e) => setNewCampaign((p) => ({ ...p, targetAudience: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2">
              <option>All Employees</option>
              <option>New joinees (March)</option>
              <option>Tech Team</option>
              <option>HR Team</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Steps (min 2)</label>
            {newCampaign.steps.map((step, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input type="number" min={1} value={step.day} onChange={(e) => setNewCampaign((p) => ({ ...p, steps: p.steps.map((s, j) => j === i ? { ...s, day: +e.target.value } : s) }))} className="w-16 rounded border border-slate-200 p-2 text-sm" placeholder="Day" />
                <select value={step.type} onChange={(e) => setNewCampaign((p) => ({ ...p, steps: p.steps.map((s, j) => j === i ? { ...s, type: e.target.value } : s) }))} className="rounded border border-slate-200 p-2 text-sm">
                  <option value="announcement">Announcement</option>
                  <option value="survey">Survey</option>
                  <option value="poll">Poll</option>
                  <option value="recognition">Recognition</option>
                </select>
                <input type="text" value={step.title} onChange={(e) => setNewCampaign((p) => ({ ...p, steps: p.steps.map((s, j) => j === i ? { ...s, title: e.target.value } : s) }))} className="flex-1 rounded border border-slate-200 p-2 text-sm" placeholder="Step title" />
                {newCampaign.steps.length > 2 && <button type="button" onClick={() => setNewCampaign((p) => ({ ...p, steps: p.steps.filter((_, j) => j !== i) }))} className="text-red-500 text-sm">✕</button>}
              </div>
            ))}
            <button type="button" onClick={() => setNewCampaign((p) => ({ ...p, steps: [...p.steps, { day: 14, type: 'announcement', title: '' }] }))} className="text-sm text-[var(--brand-primary)] font-medium">+ Add step</button>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setCreateOpen(false); setNewCampaign({ name: '', targetAudience: 'All Employees', totalRecipients: 85, steps: [{ day: 1, type: 'announcement', title: '' }, { day: 7, type: 'survey', title: '' }] }); addToast({ type: 'success', message: 'Campaign saved as draft', actorName: null, actorAvatar: null }); }} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-medium">Save as Draft</button>
            <button type="button" onClick={() => { setCreateOpen(false); addToast({ type: 'success', message: 'Campaign activated', actorName: null, actorAvatar: null }); }} className="flex-1 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium">Activate</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
