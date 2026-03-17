import { useEffect, useRef } from 'react';
import { X, UserPlus, CheckCircle, RefreshCw, Megaphone, Award, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';

const typeConfig = {
  new_joinee: { label: 'New Joinee', color: 'blue', border: 'border-l-blue-500', icon: UserPlus },
  leave_approved: { label: 'Leave Approved', color: 'amber', border: 'border-l-amber-500', icon: CheckCircle },
  team_transfer: { label: 'Team Transfer', color: 'purple', border: 'border-l-purple-500', icon: RefreshCw },
  announcement: { label: 'Announcement', color: 'green', border: 'border-l-green-500', icon: Megaphone },
  recognition: { label: 'Recognition', color: 'gold', border: 'border-l-amber-400', icon: Award },
  milestone: { label: 'Milestone', color: 'blue', border: 'border-l-blue-500', icon: Flag },
  success: { label: 'Success', color: 'green', border: 'border-l-green-500', icon: CheckCircle },
};

function ToastItem({ toast, onDismiss }) {
  const barRef = useRef(null);
  const config = typeConfig[toast.type] || typeConfig.success;
  const Icon = config.icon;

  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={cn(
        'w-[320px] rounded-xl bg-white border border-[var(--brand-border)] shadow-lg overflow-hidden',
        'border-l-4',
        config.border,
        'animate-[slideIn_300ms_ease-out]'
      )}
      role="alert"
    >
      <div className="p-3 flex items-start gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Icon className="w-4 h-4 shrink-0 text-slate-600" />
          <span className="text-sm font-medium text-slate-700 truncate">{config.label}</span>
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="px-3 pb-3 flex gap-2">
        {toast.actorAvatar && (
          <img
            src={toast.actorAvatar}
            alt=""
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
        )}
        <p className="text-sm text-slate-600 line-clamp-2 flex-1 min-w-0">{toast.message}</p>
      </div>
      <div
        className="h-1 bg-slate-200 overflow-hidden"
        ref={barRef}
      >
        <div
          className={cn(
            'h-full bg-blue-500 toast-progress',
            toast.type === 'recognition' && 'bg-amber-400',
            toast.type === 'leave_approved' && 'bg-amber-500',
            toast.type === 'team_transfer' && 'bg-purple-500',
            toast.type === 'announcement' && 'bg-green-500'
          )}
        />
      </div>
    </div>
  );
}

export function ToastContainer() {
  const { toastQueue, removeToast } = useApp();

  if (toastQueue.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end"
      aria-live="polite"
    >
      {toastQueue.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
}
