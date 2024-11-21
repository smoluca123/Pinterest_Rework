import AppLogo from '@/components/AppLogo';
import Navbar from '@/components/Navbar';
import SettingsButton from '@/components/Sidebar/SettingsButton';

export default function Sidebar() {
  return (
    <div className="h-fit md:h-dvh border-t-1 md:border-r-1 sticky md:top-0  bottom-0 left-0 z-10 p-4 bg-white dark:bg-sidebar/50">
      <div className="flex md:flex-col items-center h-full">
        {/* Header */}
        <div className="md:mb-10">
          <AppLogo />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <Navbar />
        </div>

        {/* Footer */}
        <SettingsButton />
      </div>
    </div>
  );
}
