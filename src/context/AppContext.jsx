import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  notificationsData,
  companies,
  users,
} from '../mock-data';
import { resolveNotification } from '../utils/notifications';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentCompany, setCurrentCompanyState] = useState('2coms');
  const [userRole, setUserRole] = useState('Employee');
  const [currentUserTeam, setCurrentUserTeam] = useState('HR');
  const [currentUser] = useState(users[0]); // Priya as default
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [clientPoolIsolation, setClientPoolIsolation] = useState(false);
  const [transferBannerDismissed, setTransferBannerDismissed] = useState(false);
  const [directoryTeamFilter, setDirectoryTeamFilter] = useState(null);
  const [language, setLanguage] = useState('en');

  const [notifications, setNotifications] = useState(() =>
    notificationsData.map((n) => ({ ...n, read: n.read }))
  );

  const [toastQueue, setToastQueue] = useState([]);
  const toastIdRef = { current: 0 };

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addToast = useCallback((toast) => {
    const id = `toast-${++toastIdRef.current}`;
    const entry = { ...toast, id };
    setToastQueue((prev) => {
      const next = [...prev, entry].slice(-4);
      return next;
    });
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToastQueue((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setCurrentCompany = useCallback((companyId) => {
    setCurrentCompanyState(companyId);
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      addToast({
        type: 'success',
        message: `Switched to ${company.name} ✓`,
        actorName: null,
        actorAvatar: null,
      });
    }
  }, [addToast]);

  const visibleNotifications = notifications.filter((n) => {
    const resolved = resolveNotification(n, currentUserTeam, userRole);
    return resolved.visible;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Demo toasts on mount: 2s, 5s, 9s
  useEffect(() => {
    const t1 = setTimeout(() => {
      const isHR = currentUserTeam === 'HR';
      addToast({
        type: 'new_joinee',
        message: isHR
          ? 'Swarup Banerjee has joined as HR Executive'
          : 'A new member has joined the HR team.',
        actorName: 'Swarup Banerjee',
        actorAvatar: 'https://i.pravatar.cc/150?u=swarup',
      });
    }, 2000);
    const t2 = setTimeout(() => {
      const isTech = currentUserTeam === 'Tech';
      addToast({
        type: 'leave_approved',
        message: isTech
          ? 'Your leave request for March 20–22 has been approved.'
          : 'A leave request was approved in the Tech team.',
        actorName: 'Rahul Verma',
        actorAvatar: 'https://i.pravatar.cc/150?u=rahul',
      });
    }, 5000);
    const t3 = setTimeout(() => {
      addToast({
        type: 'recognition',
        message: 'Sneha Rao just received an Innovator badge 🏅',
        actorName: 'Sneha Rao',
        actorAvatar: 'https://i.pravatar.cc/150?u=sneha',
      });
    }, 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [addToast]); // run once on mount; currentUserTeam at mount time is used for first toast

  const value = {
    currentCompany,
    setCurrentCompany,
    userRole,
    setUserRole,
    currentUserTeam,
    setCurrentUserTeam,
    currentUser,
    currentPage,
    setCurrentPage,
    isSidebarOpen,
    setIsSidebarOpen,
    clientPoolIsolation,
    setClientPoolIsolation,
    transferBannerDismissed,
    setTransferBannerDismissed,
    directoryTeamFilter,
    setDirectoryTeamFilter,
    language,
    setLanguage,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    visibleNotifications,
    unreadCount,
    toastQueue,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
