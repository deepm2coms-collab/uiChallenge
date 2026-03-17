import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { ToastContainer } from '../components/ToastContainer';

export function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-[var(--surface-raised)] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
