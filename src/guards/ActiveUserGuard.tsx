import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ActiveUserGuard({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const { user } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) return;

    if (!user.is_active) {
      dispatch(setAuthDialogOpen({ isOpen: true, dialogType: 'verify-email' })); // Open inactive account dialog)
    }
  }, [pathname]);

  return <div>{children}</div>;
}
