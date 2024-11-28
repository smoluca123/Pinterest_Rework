import SearchBox from '@/components/Header/SearchBox';
import ProfileButton from '@/components/ProfileButton';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import {
  AuthDialogTypeString,
  setAuthDialogOpen,
} from '@/redux/slices/dialogSlice';
import { LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleOpenAuthDialog = (
    dialogType: AuthDialogTypeString = 'signin'
  ) => {
    dispatch(
      setAuthDialogOpen({
        isOpen: true,
        dialogType,
      })
    );
  };

  return (
    <div className="sticky top-0 z-10 py-4 bg-background">
      <div className="flex items-center justify-between gap-4">
        {/* Search Box */}
        <SearchBox />

        {/* Profile */}
        {isAuthenticated && <ProfileButton />}

        {/* Login / Signup Button */}
        {!isAuthenticated && (
          <div className="space-x-2">
            <Button onClick={() => handleOpenAuthDialog('signup')}>
              <span className="hidden md:block">Đăng ký</span>
              <UserPlus className="block md:hidden" />
            </Button>
            <Button
              className=""
              variant={theme === 'dark' ? 'normal' : 'outline'}
              onClick={() => handleOpenAuthDialog('signin')}
            >
              <span className="hidden md:block">Đăng nhập</span>
              <LogIn className="block md:hidden" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
