import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logOut, selectAuth } from '@/redux/slices/authSlice';
import { LogIn, LogOut, MonitorCog, Settings, UserPlus } from 'lucide-react';
import { useWindowSize } from '@uidotdev/usehooks';
import {
  AuthDialogTypeString,
  setAuthDialogOpen,
} from '@/redux/slices/dialogSlice';
import { useTheme } from '@/components/ThemeProvider';

export default function SettingsButton() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { width } = useWindowSize();
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

  const handleLogOut = () => {
    dispatch(logOut());
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2">
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={width && width > 768 ? 'right' : 'top'}
        sideOffset={20}
        className="p-2"
      >
        {/* Theme */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-3"
          >
            <MonitorCog />
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Accounts */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          {!isAuthenticated && (
            <>
              <DropdownMenuItem>
                <Button
                  className="w-full "
                  onClick={() => handleOpenAuthDialog('signup')}
                >
                  <UserPlus />
                  Đăng ký
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-full"
                  onClick={() => handleOpenAuthDialog('signin')}
                  variant={theme === 'dark' ? 'normal' : 'outline'}
                >
                  <LogIn />
                  Đăng nhập
                </Button>
              </DropdownMenuItem>
            </>
          )}
          {isAuthenticated && (
            <DropdownMenuItem>
              <Button onClick={handleLogOut}>
                <LogOut />
                Đăng xuất
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
