import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { PropsWithChildren } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export default function AuthPage({ children }: PropsWithChildren) {
  const { user } = useAppSelector(selectAuth);

  const [search] = useSearchParams();

  const redirectTo = search.get('page') || '/';

  if (user) return <Navigate to={redirectTo} replace />;
  return (
    <div className="grid min-h-dvh bg-background place-items-center">
      {children || <Outlet />}
    </div>
  );
}
