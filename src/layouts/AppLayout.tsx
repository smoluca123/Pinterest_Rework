import AuthDialog from '@/components/AuthDialog';
import Header from '@/components/Header';
import AppSidebar from '@/components/Sidebar';
import TailwindIndicator from '@/components/TailwindIndicator';
import { Toaster } from '@/components/ui/toaster';
import ActiveUserGuard from '@/guards/ActiveUserGuard';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <ActiveUserGuard>
      <div className="flex flex-col-reverse md:flex-row min-h-dvh">
        <AppSidebar />
        <div className="flex-1 w-full px-4">
          <Header />
          {/* <div className="h-[200vh]"></div> */}
          {children || <Outlet />}
          <AuthDialog />
          <Toaster />
        </div>
      </div>
      <TailwindIndicator />
    </ActiveUserGuard>
  );
}
