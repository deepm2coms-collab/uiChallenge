import { useState, useEffect } from 'react';
import { ClipboardList, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { surveys as initialSurveys } from '../mock-data';
import { Modal } from '../components/Modal';
import { AIAssist } from '../components/AIAssist';
import { cn } from '../utils/cn';

export function Surveys() {
  const { currentCompany, userRole, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState(initialSurveys);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeTab, setTypeTab] = useState('poll');
  const [expandedId, setExpandedId] = useState(null);
  const [userVotes, setUserVotes] = useState({});
  const [surveyResponses, setSurveyResponses] = useState({});
  const [createOpen, setCreateOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'poll',
    anonymous: false,
    targetTeam: 'all',
    expiresAt: '',
    options: [{ id: 'opt1', text: '' }, { id: 'opt2', text: '' }],
    questions: [{ id: 'q1', text: '', type: 'rating' }],
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = surveys
    .filter((s) => s.company === currentCompany)
    .filter((s) => statusFilter === 'all' || s.status === statusFilter)
    .filter((s) => s.type === typeTab);

  const handleVote = (surveyId, optionId) => {
    setUserVotes((prev) => ({ ...prev, [surveyId]: optionId }));
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === surveyId
          ? {
              ...s,
              options: s.options.map((o) =>
                o.id === optionId ? { ...o, votes: o.votes + 1 } : o
              ),
              totalResponses: s.totalResponses + 1,
            }
          : s
      )
    );
    addToast({ type: 'success', message: 'Vote recorded!', actorName: null, actorAvatar: null });
  };

  const handleSurveySubmit = (surveyId, answers) => {
    setSurveyResponses((prev) => ({ ...prev, [surveyId]: true }));
    addToast({ type: 'success', message: 'Survey submitted ✓', actorName: null, actorAvatar: null });
  };

  const handlePublish = () => {
    if (!newItem.title.trim()) return;
    const created = {
      id: 'new-' + Date.now(),
      type: newItem.type,
      title: newItem.title,
      author: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=current' },
      company: currentCompany,
      status: 'active',
      anonymous: newItem.anonymous,
      createdAt: new Date().toISOString().slice(0, 10),
      expiresAt: newItem.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      targetTeam: newItem.targetTeam === 'all' ? null : newItem.targetTeam,
      ...(newItem.type === 'poll'
        ? {
            options: newItem.options.filter((o) => o.text.trim()).map((o, i) => ({ id: 'o' + i, text: o.text, votes: 0 })),
            totalResponses: 0,
            totalEligible: 85,
          }
        : {
            questions: newItem.questions.filter((q) => q.text.trim()).map((q, i) => ({ id: 'q' + i, text: q.text, type: q.type || 'rating', scale: 5 })),
            totalResponses: 0,
            totalEligible: 85,
            aggregatedResults: {},
          }),
    };
    setSurveys((prev) => [created, ...prev]);
    setCreateOpen(false);
    setNewItem({ title: '', type: 'poll', anonymous: false, targetTeam: 'all', expiresAt: '', options: [{ id: 'opt1', text: '' }, { id: 'opt2', text: '' }], questions: [{ id: 'q1', text: '', type: 'rating' }] });
    addToast({ type: 'success', message: 'Published successfully', actorName: null, actorAvatar: null });
  };

  const canCreate = userRole === 'Admin' || userRole === 'Manager';

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Surveys & Polls</h1>
        <div className="flex items-center gap-2">
          {['Active', 'Closed', 'All'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s.toLowerCase())}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium',
                statusFilter === s.toLowerCase() ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600'
              )}
            >
              {s}
            </button>
          ))}
          {canCreate && (
            <button type="button" onClick={() => setCreateOpen(true)} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90">
              Create
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTypeTab('poll')}
          className={cn('px-4 py-2 rounded-lg text-sm font-medium', typeTab === 'poll' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}
        >
          Polls
        </button>
        <button
          type="button"
          onClick={() => setTypeTab('survey')}
          className={cn('px-4 py-2 rounded-lg text-sm font-medium', typeTab === 'survey' ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}
        >
          Surveys
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[var(--brand-border)] p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <img src={item.author?.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-slate-900">{item.title}</h2>
                <p className="text-sm text-slate-500">{item.author?.name}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600')}>
                    {item.status === 'active' ? 'Active' : 'Closed'}
                  </span>
                  {item.anonymous && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">🔒 Anonymous</span>}
                  {item.targetTeam && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{item.targetTeam}</span>}
                </div>
                <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500"
                    style={{ width: `${(item.totalResponses / item.totalEligible) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Expires {item.expiresAt}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="mt-3 w-full text-sm text-[var(--brand-primary)] font-medium hover:underline"
            >
              {expandedId === item.id ? 'Collapse' : 'View details'}
            </button>

            {expandedId === item.id && item.type === 'poll' && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                {item.status === 'closed' || userVotes[item.id] ? (
                  <div className="space-y-2">
                    {item.options.map((opt) => {
                      const pct = item.totalResponses ? (opt.votes / item.totalResponses) * 100 : 0;
                      return (
                        <div key={opt.id} className={cn('flex items-center gap-2', userVotes[item.id] === opt.id && 'bg-[var(--brand-primary-light)] rounded-lg p-2')}>
                          <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                            <div className="h-full bg-[var(--brand-primary)] rounded transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-sm font-medium w-24">{opt.text}</span>
                          <span className="text-xs text-slate-500">{opt.votes} ({pct.toFixed(0)}%)</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {item.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleVote(item.id, opt.id)}
                        className="w-full text-left px-3 py-2 rounded-lg border border-[var(--brand-border)] hover:bg-slate-50 text-sm font-medium"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {expandedId === item.id && item.type === 'survey' && (
              <SurveyExpanded
                survey={item}
                surveyResponses={surveyResponses}
                onSubmit={handleSurveySubmit}
              />
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <ClipboardList className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="font-medium">No {typeTab}s match your filters.</p>
        </div>
      )}

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Survey or Poll">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <AIAssist context="survey" onInsert={(text) => setNewItem((p) => ({ ...p, title: text }))} />
            </div>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 p-2"
              placeholder="Title"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={newItem.type === 'poll'} onChange={() => setNewItem((p) => ({ ...p, type: 'poll' }))} />
              <span className="text-sm">Poll</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={newItem.type === 'survey'} onChange={() => setNewItem((p) => ({ ...p, type: 'survey' }))} />
              <span className="text-sm">Survey</span>
            </label>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={newItem.anonymous} onChange={(e) => setNewItem((p) => ({ ...p, anonymous: e.target.checked }))} />
            <span className="text-sm">Anonymous</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Team</label>
            <select value={newItem.targetTeam} onChange={(e) => setNewItem((p) => ({ ...p, targetTeam: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2">
              <option value="all">All Teams</option>
              {['HR', 'Tech', 'Delivery', 'Finance', 'Marketing', 'Leadership'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
            <input type="date" value={newItem.expiresAt} onChange={(e) => setNewItem((p) => ({ ...p, expiresAt: e.target.value }))} className="w-full rounded-lg border border-slate-200 p-2" />
          </div>
          {newItem.type === 'poll' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Options (min 2)</label>
              {newItem.options.map((opt, i) => (
                <div key={opt.id} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) =>
                      setNewItem((p) => ({
                        ...p,
                        options: p.options.map((o, j) => (j === i ? { ...o, text: e.target.value } : o)),
                      }))
                    }
                    className="flex-1 rounded-lg border border-slate-200 p-2"
                    placeholder={`Option ${i + 1}`}
                  />
                  {newItem.options.length > 2 && (
                    <button type="button" onClick={() => setNewItem((p) => ({ ...p, options: p.options.filter((_, j) => j !== i) }))} className="text-red-500 px-2">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setNewItem((p) => ({ ...p, options: [...p.options, { id: 'opt' + Date.now(), text: '' }] }))} className="text-sm text-[var(--brand-primary)] font-medium">+ Add option</button>
            </div>
          )}
          {newItem.type === 'survey' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Questions</label>
              {newItem.questions.map((q, i) => (
                <div key={q.id} className="mb-2">
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) =>
                      setNewItem((p) => ({
                        ...p,
                        questions: p.questions.map((qu, j) => (j === i ? { ...qu, text: e.target.value } : qu)),
                      }))
                    }
                    className="w-full rounded-lg border border-slate-200 p-2 mb-1"
                    placeholder="Question text"
                  />
                  <select
                    value={q.type}
                    onChange={(e) =>
                      setNewItem((p) => ({
                        ...p,
                        questions: p.questions.map((qu, j) => (j === i ? { ...qu, type: e.target.value } : qu)),
                      }))
                    }
                    className="text-sm border border-slate-200 rounded px-2 py-1"
                  >
                    <option value="rating">Rating</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              ))}
              <button type="button" onClick={() => setNewItem((p) => ({ ...p, questions: [...p.questions, { id: 'q' + Date.now(), text: '', type: 'rating' }] }))} className="text-sm text-[var(--brand-primary)] font-medium">+ Add question</button>
            </div>
          )}
          <button type="button" onClick={handlePublish} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium text-sm">
            Publish
          </button>
        </div>
      </Modal>
    </div>
  );
}

function SurveyExpanded({ survey, surveyResponses, onSubmit }) {
  const [answers, setAnswers] = useState({});
  const submitted = surveyResponses[survey.id];

  const handleSubmit = () => {
    onSubmit(survey.id, answers);
  };

  if (survey.status === 'closed' || submitted) {
    return (
      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
        {survey.questions?.filter((q) => q.type === 'rating').map((q) => (
          <div key={q.id}>
            <p className="text-sm font-medium text-slate-700">{q.text}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--brand-primary)] rounded-full"
                  style={{ width: `${((survey.aggregatedResults?.[q.id] || 0) / 5) * 100}%` }}
                />
              </div>
              <span className="text-sm font-mono text-slate-600">{survey.aggregatedResults?.[q.id] || 0}/5</span>
            </div>
          </div>
        ))}
        <p className="text-xs text-slate-500">Response rate: {survey.totalResponses} / {survey.totalEligible}</p>
      </div>
    );
  }

  return (
    <form className="mt-4 pt-4 border-t border-slate-100 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {survey.questions?.map((q) => (
        <div key={q.id}>
          <p className="text-sm font-medium text-slate-800 mb-2">{q.text}</p>
          {q.type === 'rating' && (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: n }))}
                  className={cn(
                    'p-2 rounded border transition-colors',
                    answers[q.id] === n ? 'bg-amber-100 border-amber-400 text-amber-800' : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <Star className={cn('w-5 h-5', answers[q.id] >= n && 'fill-amber-400 text-amber-500')} />
                </button>
              ))}
            </div>
          )}
          {q.type === 'text' && (
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 p-2 text-sm min-h-[80px]"
              placeholder="Your response..."
            />
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg text-sm font-medium">
        Submit
      </button>
    </form>
  );
}
