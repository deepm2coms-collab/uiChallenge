import { Search, Bell, ChevronDown, User, Globe, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { companies } from '../mock-data';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { CommandPalette } from '../components/CommandPalette';
import { cn } from '../utils/cn';

export function TopNav() {
  const {
    currentUser,
    currentCompany,
    setCurrentCompany,
    userRole,
    setUserRole,
    currentUserTeam,
    setCurrentUserTeam,
    unreadCount,
    setClientPoolIsolation,
    clientPoolIsolation,
    addToast,
    language,
    setLanguage,
    setIsSidebarOpen,
  } = useApp();
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setMobile(!mq.matches);
    const fn = () => setMobile(!mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const roles = ['Admin', 'Manager', 'Employee'];
  const teams = ['HR', 'Tech', 'Delivery', 'Finance', 'Marketing', 'Leadership'];

  return (
    <>
      <header className="h-14 border-b border-[var(--brand-border)] bg-white flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4 flex-1 min-w-0 max-w-3xl">
          {mobile && (
            <button type="button" onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 shrink-0 md:hidden" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          )}
          <div
            className={cn(
              'flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 transition-all max-w-[480px]',
              searchFocused && 'ring-2 ring-[var(--brand-primary)] ring-offset-1 bg-white'
            )}
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onClick={() => setCommandOpen(true)}
              className="flex-1 min-w-0 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
              readOnly
            />
            <kbd className="hidden sm:inline text-xs text-slate-400 border border-slate-200 rounded px-1.5">⌘K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button type="button" onClick={() => setLanguageOpen((o) => !o)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Language">
              <Globe className="w-5 h-5" />
            </button>
            {languageOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLanguageOpen(false)} aria-hidden="true" />
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-[var(--brand-border)] shadow-lg py-2 z-20">
                  <p className="px-4 py-1 text-xs font-medium text-slate-500 uppercase">Language</p>
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी (Hindi)' },
                    { code: 'bn', label: 'বাংলা (Bengali)' },
                    { code: 'ta', label: 'தமிழ் (Tamil)' },
                  ].map((opt) => (
                    <button key={opt.code} type="button" onClick={() => { setLanguage(opt.code); setLanguageOpen(false); if (opt.code !== 'en') addToast({ type: 'success', message: `Translation is a preview feature. Content will be shown in ${opt.label.split(' ')[0]} where available.`, actorName: null, actorAvatar: null }); }} className={cn('w-full text-left px-4 py-2 text-sm hover:bg-slate-50', language === opt.code && 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)]')}>{opt.label}</button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCompanyOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 text-sm font-medium"
            >
              <span className={cn('w-2 h-2 rounded-full', companies.find((c) => c.id === currentCompany)?.dot || 'bg-blue-500')} />
              {companies.find((c) => c.id === currentCompany)?.name?.split(' ')[0] || '2COMS'}
              <ChevronDown className="w-4 h-4" />
            </button>
            {companyOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setCompanyOpen(false)} aria-hidden="true" />
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-[var(--brand-border)] shadow-lg py-1 z-20">
                  {companies.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCurrentCompany(c.id);
                        setCompanyOpen(false);
                        setTimeout(() => setCompanyOpen(false), 1000);
                      }}
                      className={cn(
                        'w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-slate-50',
                        currentCompany === c.id && 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)]'
                      )}
                    >
                      <span className={cn('w-2 h-2 rounded-full', c.dot)} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setNotificationOpen(true)}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-lg hover:bg-slate-100"
            >
              <img src={currentUser?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-800">{currentUser?.name}</p>
                <p className="text-xs text-slate-500">{userRole}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} aria-hidden="true" />
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl border border-[var(--brand-border)] shadow-lg py-2 z-20">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-medium text-slate-900">{currentUser?.name}</p>
                    <p className="text-sm text-slate-500">{currentUser?.role} · {currentUserTeam}</p>
                  </div>
                  <div className="py-2">
                    <p className="px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Switch Role</p>
                    {roles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setUserRole(r);
                          addToast({ type: 'success', message: `Now viewing as ${r} 👁`, actorName: null, actorAvatar: null });
                          setProfileOpen(false);
                        }}
                        className={cn('w-full px-4 py-2 text-left text-sm hover:bg-slate-50', userRole === r && 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)]')}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="py-2 border-t border-slate-100">
                    <p className="px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Switch Team</p>
                    {teams.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setCurrentUserTeam(t);
                          setProfileOpen(false);
                        }}
                        className={cn('w-full px-4 py-2 text-left text-sm hover:bg-slate-50', currentUserTeam === t && 'bg-[var(--brand-primary-light)] text-[var(--brand-primary)]')}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-2">
                    <label className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={clientPoolIsolation}
                        onChange={(e) => setClientPoolIsolation(e.target.checked)}
                        className="rounded border-slate-300"
                      />
                      Client pool isolation
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <NotificationDrawer isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
