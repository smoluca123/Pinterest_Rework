import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }: PropsWithChildren) {
  const { user } = useAppSelector(selectAuth);

  const { pathname } = useLocation();

  if (!user) return <Navigate to={`/auth/signin?page=${pathname}`} replace />; // If user is not authenticated, redirect to login page

  return <>{children || <Outlet />}</>;
}
