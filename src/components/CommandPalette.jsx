import { useEffect, useMemo, useState } from 'react';
import { Search, User, FileText, MessageSquare, BookOpen, Layout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { employees, announcements, knowledgeDocs, forumTopics } from '../mock-data';
import { cn } from '../utils/cn';

const sectionIcons = {
  People: User,
  Announcements: FileText,
  Documents: BookOpen,
  'Forum Posts': MessageSquare,
  Pages: Layout,
};

export function CommandPalette({ isOpen, onClose }) {
  const { setCurrentPage, currentCompany } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { People: [], Announcements: [], Documents: [], 'Forum Posts': [], Pages: [] };
    const q = query.toLowerCase();
    const people = employees
      .filter((e) => e.company === currentCompany && (e.name.toLowerCase().includes(q) || e.role?.toLowerCase().includes(q) || e.team?.toLowerCase().includes(q)))
      .slice(0, 5);
    const ann = announcements
      .filter((a) => a.company === currentCompany && a.title.toLowerCase().includes(q))
      .slice(0, 3);
    const docs = knowledgeDocs
      .filter((d) => d.title.toLowerCase().includes(q))
      .slice(0, 3);
    const forum = forumTopics
      .filter((f) => f.company === currentCompany && (f.title.toLowerCase().includes(q) || f.tags?.some((t) => t.toLowerCase().includes(q))))
      .slice(0, 3);
    const pages = [
      { id: 'dashboard', title: 'Dashboard', subtitle: 'Home' },
      { id: 'announcements', title: 'Announcements', subtitle: 'Communications' },
      { id: 'directory', title: 'People Directory', subtitle: 'Find colleagues' },
      { id: 'knowledge', title: 'Knowledge Hub', subtitle: 'Documents' },
      { id: 'forum', title: 'Forum', subtitle: 'Discussions' },
      { id: 'recognition', title: 'Recognition', subtitle: 'Celebrations' },
      { id: 'calendar', title: 'Calendar', subtitle: 'Events' },
    ].filter((p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q));
    return { People: people, Announcements: ann, Documents: docs, 'Forum Posts': forum, Pages: pages };
  }, [query, currentCompany]);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  const handleSelect = (type, item) => {
    if (type === 'People') {
      setCurrentPage('directory');
      // Could open profile modal via context
      onClose();
    } else if (type === 'Announcements') {
      setCurrentPage('announcements');
      onClose();
    } else if (type === 'Documents') {
      setCurrentPage('knowledge');
      onClose();
    } else if (type === 'Forum Posts') {
      setCurrentPage('forum');
      onClose();
    } else if (type === 'Pages' && item?.id) {
      setCurrentPage(item.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  const hasAny = Object.values(results).some((arr) => arr.length > 0) || !query.trim();

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-[modalEnter_0.2s_ease-out]">
        <div className="flex items-center gap-2 p-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, announcements, documents..."
            className="flex-1 outline-none text-slate-800 placeholder-slate-400"
            autoFocus
          />
          <kbd className="hidden sm:inline text-xs text-slate-400 border border-slate-200 rounded px-1.5">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {!query.trim() ? (
            <div className="px-4 py-6 text-slate-500 text-sm text-center">Type to search...</div>
          ) : !hasAny ? (
            <div className="px-4 py-6 text-slate-500 text-sm text-center">No results found.</div>
          ) : (
            <>
              {results.People.length > 0 && (
                <Section title="People" items={results.People} onSelect={(item) => handleSelect('People', item)} icon={User} subtitleKey="role" />
              )}
              {results.Announcements.length > 0 && (
                <Section title="Announcements" items={results.Announcements} onSelect={(item) => handleSelect('Announcements', item)} icon={FileText} subtitleKey="department" />
              )}
              {results.Documents.length > 0 && (
                <Section title="Documents" items={results.Documents} onSelect={(item) => handleSelect('Documents', item)} icon={BookOpen} subtitleKey="category" />
              )}
              {results['Forum Posts'].length > 0 && (
                <Section title="Forum Posts" items={results['Forum Posts']} onSelect={(item) => handleSelect('Forum Posts', item)} icon={MessageSquare} subtitleKey="channel" />
              )}
              {results.Pages.length > 0 && (
                <Section title="Pages" items={results.Pages} onSelect={(item) => handleSelect('Pages', item)} icon={Layout} subtitleKey="subtitle" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, onSelect, icon: Icon, subtitleKey }) {
  return (
    <div className="px-2 pb-2">
      <div className="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</div>
      {items.map((item) => (
        <button
          key={item.id || item.name}
          type="button"
          onClick={() => onSelect(item)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
        >
          <Icon className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-slate-900 truncate">{item.title || item.name}</div>
            {item[subtitleKey] && (
              <div className="text-xs text-slate-500 truncate">{item[subtitleKey]}</div>
            )}
          </div>
          {item.avatar && (
            <img src={item.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
}
