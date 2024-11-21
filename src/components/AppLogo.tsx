import { Link } from 'react-router-dom';
import Logo from '@/assets/pinterest-logo.svg';
import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AppLogo({ className }: PropsWithClassName) {
  return (
    <Link to="/" className={cn('size-10 block', className)}>
      <img src={Logo} className="size-full" alt="Logo" />
    </Link>
  );
}
