import { AppProvider, useApp } from './context/AppContext';
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Announcements } from './pages/Announcements';
import { Leadership } from './pages/Leadership';
import { BusinessUpdates } from './pages/BusinessUpdates';
import { Recognition } from './pages/Recognition';
import { EngagementCalendar } from './pages/EngagementCalendar';
import { PeopleDirectory } from './pages/PeopleDirectory';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { Gallery } from './pages/Gallery';
import { Forum } from './pages/Forum';
import { Surveys } from './pages/Surveys';
import { Analytics } from './pages/Analytics';
import { Campaigns } from './pages/Campaigns';

const PAGE_MAP = {
  dashboard: Dashboard,
  announcements: Announcements,
  leadership: Leadership,
  business: BusinessUpdates,
  recognition: Recognition,
  calendar: EngagementCalendar,
  surveys: Surveys,
  analytics: Analytics,
  campaigns: Campaigns,
  directory: PeopleDirectory,
  knowledge: KnowledgeHub,
  gallery: Gallery,
  forum: Forum,
};

function AppContent() {
  const { currentPage } = useApp();
  const Page = PAGE_MAP[currentPage] || Dashboard;
  return (
    <MainLayout>
      <Page key={currentPage} />
    </MainLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
