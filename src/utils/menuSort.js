const PAGE_IDS = [
  'dashboard',
  'people',
  'announcements',
  'business',
  'forum',
  'projects',
  'knowledge',
  'calendar',
  'surveys',
  'analytics',
  'campaigns',
  'recognition',
  'leadership',
  'gallery',
];

const TEAM_PRIORITY = {
  HR: ['dashboard', 'people', 'announcements', 'knowledge', 'calendar', 'surveys', 'analytics', 'campaigns', 'recognition', 'leadership', 'business', 'forum', 'projects', 'gallery'],
  Tech: ['dashboard', 'business', 'forum', 'projects', 'knowledge', 'calendar', 'surveys', 'analytics', 'campaigns', 'recognition', 'announcements', 'people', 'leadership', 'gallery'],
  Delivery: ['dashboard', 'projects', 'business', 'forum', 'people', 'announcements', 'knowledge', 'calendar', 'surveys', 'analytics', 'campaigns', 'recognition', 'leadership', 'gallery'],
  Finance: ['dashboard', 'business', 'announcements', 'people', 'knowledge', 'calendar', 'surveys', 'analytics', 'campaigns', 'recognition', 'forum', 'projects', 'leadership', 'gallery'],
  Marketing: ['dashboard', 'announcements', 'recognition', 'forum', 'people', 'business', 'knowledge', 'calendar', 'surveys', 'analytics', 'campaigns', 'leadership', 'projects', 'gallery'],
  Leadership: ['dashboard', 'business', 'people', 'announcements', 'leadership', 'forum', 'projects', 'knowledge', 'calendar', 'surveys', 'analytics', 'campaigns', 'recognition', 'gallery'],
};

export function getSortedMenuItems(team, userRole) {
  const order = TEAM_PRIORITY[team] || TEAM_PRIORITY.HR;
  const all = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'people', label: 'People Directory', icon: 'Users' },
    { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
    { id: 'business', label: 'Business Updates', icon: 'TrendingUp' },
    { id: 'forum', label: 'Forum', icon: 'MessageSquare' },
    { id: 'projects', label: 'Projects & Wins', icon: 'Trophy' },
    { id: 'knowledge', label: 'Knowledge Hub', icon: 'BookOpen' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'surveys', label: 'Surveys & Polls', icon: 'ClipboardList' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'campaigns', label: 'Campaigns', icon: 'Rocket' },
    { id: 'recognition', label: 'Recognition', icon: 'Award' },
    { id: 'leadership', label: 'Leadership', icon: 'Briefcase' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
  ];
  const byId = Object.fromEntries(all.map((item) => [item.id, item]));
  const filtered = order.filter((id) => byId[id]);
  if (userRole !== 'Admin') return filtered.filter((id) => id !== 'campaigns').map((id) => byId[id]);
  return filtered.map((id) => byId[id]);
}
