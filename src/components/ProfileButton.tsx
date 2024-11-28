import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/UserAvatar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logOut, selectAuth } from '@/redux/slices/authSlice';
import { LogOut } from 'lucide-react';

export default function ProfileButton() {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    window.location.reload(); // Refresh the page to update the user state after logout
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          username={user?.username || ''}
          userAvatarUrl={user?.avatar || ''}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2" side="bottom" sideOffset={10}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center justify-center">
            <UserAvatar
              username={user?.username || ''}
              userAvatarUrl={user?.avatar || ''}
            />
            <div className="">
              <h3>{user?.full_name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/*  */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tùy chọn khác</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer text-primary"
            onClick={handleLogout}
          >
            <button>Đăng xuất</button>
            <LogOut className="ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
