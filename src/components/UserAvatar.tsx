import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_USER_AVATAR_URL } from '@/lib/constant';
import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';

interface IProps extends PropsWithClassName {
  username: string;
  userAvatarUrl: string;
}

export default function UserAvatar({
  username,
  userAvatarUrl,
  className,
}: IProps) {
  return (
    <Avatar className={cn('', className)}>
      <AvatarFallback>{username}</AvatarFallback>
      <AvatarImage src={userAvatarUrl || DEFAULT_USER_AVATAR_URL} />
    </Avatar>
  );
}
