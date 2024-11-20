import AuthDialog from '@/components/AuthDialog';
import Header from '@/components/Header';
import AppSidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row min-h-dvh">
        <AppSidebar />
        <div className="flex-1 w-full px-2">
          <Header />
          {/* <div className="h-[200vh]"></div> */}
          {children || <Outlet />}
          <AuthDialog />
          <Toaster />
        </div>
      </div>
    </div>
  );
}
