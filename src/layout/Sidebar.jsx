import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  TrendingUp,
  MessageSquare,
  Trophy,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  Award,
  Briefcase,
  Image,
  ChevronLeft,
  ChevronRight,
  X,
  Rocket,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getSortedMenuItems } from '../utils/menuSort';
import { cn } from '../utils/cn';

const iconMap = {
  LayoutDashboard,
  Users,
  Megaphone,
  TrendingUp,
  MessageSquare,
  Trophy,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  Award,
  Briefcase,
  Image,
  Rocket,
};

const pageIdToRoute = {
  dashboard: 'dashboard',
  people: 'directory',
  announcements: 'announcements',
  business: 'business',
  forum: 'forum',
  projects: 'business',
  knowledge: 'knowledge',
  calendar: 'calendar',
  surveys: 'surveys',
  analytics: 'analytics',
  campaigns: 'campaigns',
  recognition: 'recognition',
  leadership: 'leadership',
  gallery: 'gallery',
};

export function Sidebar() {
  const {
    currentPage,
    setCurrentPage,
    isSidebarOpen,
    setIsSidebarOpen,
    currentUser,
    currentUserTeam,
    setCurrentUserTeam,
    transferBannerDismissed,
    setTransferBannerDismissed,
    notifications,
    userRole,
  } = useApp();

  const menuItems = getSortedMenuItems(currentUserTeam, userRole);
  const hasTransferBanner = !transferBannerDismissed && notifications.some(
    (n) => n.type === 'team_transfer' && !n.read && n.actor?.name === currentUser?.name
  );

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setMobile(!mq.matches);
    const fn = () => setMobile(!mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const handleNav = (item) => {
    const page = pageIdToRoute[item.id] || item.id;
    setCurrentPage(page);
    if (mobile) setIsSidebarOpen(false);
  };

  if (mobile && !isSidebarOpen) return null;

  return (
    <>
      {mobile && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} aria-hidden />}
      <aside
        className={cn(
          'flex flex-col bg-[var(--sidebar-bg)] text-white shrink-0 transition-all duration-200 z-50',
          mobile ? 'fixed inset-y-0 left-0 w-56 shadow-xl' : isSidebarOpen ? 'w-56' : 'w-16'
        )}
      >
      <div className="p-4 flex items-center justify-between shrink-0">
        {isSidebarOpen || mobile ? (
          <>
            <span className="font-display font-bold text-lg tracking-tight">2COMS One</span>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label={mobile ? 'Close menu' : 'Collapse sidebar'}
            >
              {mobile ? <X className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors mx-auto"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {hasTransferBanner && (isSidebarOpen || mobile) && (
        <div className="mx-3 mb-2 rounded-lg bg-blue-900/40 p-3 text-sm text-white relative">
          <span>🔄 Welcome to {currentUserTeam}! Your menu has been personalized.</span>
          <button
            type="button"
            onClick={() => setTransferBannerDismissed(true)}
            className="absolute top-2 right-2 p-0.5 rounded hover:bg-white/20"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const page = pageIdToRoute[item.id] || item.id;
          const isActive = currentPage === page;
          return (
            <div key={item.id} className="relative group">
              <button
                type="button"
                onClick={() => handleNav(item)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                  (isSidebarOpen || mobile) ? 'justify-start' : 'justify-center px-0',
                  isActive
                    ? 'bg-white/10 text-white border-l-4 border-l-[var(--brand-primary)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-4 border-l-transparent'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {(isSidebarOpen || mobile) && <span className="truncate">{item.label}</span>}
              </button>
              {!isSidebarOpen && !mobile && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[200] whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-700/50">
        <div className={cn('flex items-center gap-3', !isSidebarOpen && !mobile && 'justify-center')}>
          <img
            src={currentUser?.avatar}
            alt=""
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-slate-600"
          />
          {(isSidebarOpen || mobile) && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-slate-400 truncate">{currentUserTeam}</p>
            </div>
          )}
        </div>
        {(isSidebarOpen || mobile) && (
          <button
            type="button"
            onClick={() => setCurrentUserTeam(currentUserTeam === 'HR' ? 'Tech' : 'HR')}
            className="mt-2 w-full text-xs text-slate-400 hover:text-white border border-slate-600 rounded-lg py-1.5 hover:bg-white/5 transition-colors"
          >
            Switch Team View
          </button>
        )}
      </div>
    </aside>
    </>
  );
}
