import { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

const SUGGESTIONS = {
  announcement: "We're excited to share an important update with the team. This initiative reflects our commitment to continuous improvement and employee well-being. Please review the details below and share your feedback.",
  recognition: "Your dedication and hard work have not gone unnoticed. This recognition is a testament to the positive impact you bring to the team every day. Keep up the outstanding work!",
  survey: "We value your feedback and want to ensure every voice is heard. This quick survey will help us understand your experience and identify areas for improvement.",
  forum: "I'd like to start a discussion on this topic and hear diverse perspectives from the team. What are your thoughts and experiences?",
};

export function AIAssist({ context, onInsert, buttonLabel = 'AI Assist' }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, [open]);

  const generate = () => {
    setLoading(true);
    setSuggestion(null);
    setTimeout(() => {
      setSuggestion(SUGGESTIONS[context] || SUGGESTIONS.announcement);
      setLoading(false);
    }, 1500);
  };

  const handleInsert = () => {
    if (suggestion) onInsert(suggestion);
    setOpen(false);
    setSuggestion(null);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium"
      >
        <Sparkles className="w-4 h-4" />
        {buttonLabel}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-80 bg-white rounded-xl border border-[var(--brand-border)] shadow-lg p-3 z-50">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to write..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm mb-2"
          />
          <button type="button" onClick={generate} disabled={loading} className="w-full py-2 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium disabled:opacity-50">
            {loading ? 'Generating...' : 'Generate'}
          </button>
          {loading && <div className="mt-2 h-1 bg-slate-100 rounded overflow-hidden"><div className="h-full w-1/2 bg-[var(--brand-primary)] rounded animate-pulse" style={{ width: '50%' }} /></div>}
          {suggestion && !loading && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Suggestion:</p>
              <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-2 mb-2 line-clamp-4">{suggestion}</p>
              <div className="flex gap-2">
                <button type="button" onClick={handleInsert} className="flex-1 py-1.5 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium">Insert</button>
                <button type="button" onClick={generate} disabled={loading} className="py-1.5 px-3 rounded-lg border border-slate-200 text-sm">Regenerate</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
