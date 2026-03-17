import { X, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { resolveNotification } from '../utils/notifications';
import { cn } from '../utils/cn';

const typeBorder = {
  new_joinee: 'border-l-blue-500',
  leave_approved: 'border-l-amber-500',
  team_transfer: 'border-l-purple-500',
  announcement: 'border-l-green-500',
  recognition: 'border-l-amber-400',
  milestone: 'border-l-blue-500',
};

export function NotificationDrawer({ isOpen, onClose }) {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    userRole,
    setCurrentPage,
    currentUserTeam,
  } = useApp();

  const visible = notifications.filter((n) => {
    const r = resolveNotification(n, currentUserTeam, userRole);
    return r.visible;
  });

  const handleClick = (n) => {
    markNotificationRead(n.id);
    setCurrentPage(n.linkedPage || 'dashboard');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-[120] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 h-full w-[360px] max-w-[100vw] bg-white shadow-2xl z-[130] flex flex-col"
        style={{ animation: 'slideInRight 0.2s ease-out' }}
        role="dialog"
        aria-label="Notifications"
      >
        <div className="p-4 border-b border-[var(--brand-border)] flex items-center justify-between shrink-0">
          <h2 className="font-display font-semibold text-slate-900">Notifications</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-sm text-[var(--brand-primary)] hover:underline"
            >
              Mark All Read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {userRole === 'Admin' && (
          <div className="p-4 border-b border-[var(--brand-border)] bg-red-50/50">
            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Admin Alerts
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>3 Flagged Forum Posts</span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('forum');
                    onClose();
                  }}
                  className="text-[var(--brand-primary)] font-medium hover:underline"
                >
                  Review
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>12 Pending New Users</span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('dashboard');
                    onClose();
                  }}
                  className="text-[var(--brand-primary)] font-medium hover:underline"
                >
                  Approve
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>2 Reports on Announcements</span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('announcements');
                    onClose();
                  }}
                  className="text-[var(--brand-primary)] font-medium hover:underline"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {visible.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">No notifications</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {visible.map((n) => {
                const r = resolveNotification(n, currentUserTeam, userRole);
                if (!r.visible) return null;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => handleClick(n)}
                      className={cn(
                        'w-full text-left p-4 flex gap-3 hover:bg-slate-50 transition-colors',
                        !n.read && 'bg-blue-50/60'
                      )}
                    >
                      <div className={cn('w-1 shrink-0 rounded-full', typeBorder[n.type] || 'bg-slate-300')} />
                      <img
                        src={n.actor?.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-800 line-clamp-2">{r.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{n.timestamp}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" aria-hidden />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
