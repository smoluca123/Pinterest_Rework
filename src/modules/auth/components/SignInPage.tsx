import SignInForm from '@/components/SignInForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectDialog, setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const {
    authDialog: { dialogType, isOpen },
  } = useAppSelector(selectDialog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthDialogOpen({ isOpen: false, dialogType: 'signin' }));
  }, [dialogType, isOpen, dispatch]);
  return (
    <div className="p-8 rounded-lg border-1 border-border min-w-[30rem] space-y-4">
      <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
      <SignInForm />
      <Link to="/auth/signup" className="block">
        <p className="mx-auto font-medium cursor-pointer hover:underline w-fit">
          Chưa tham gia Pinterest? Đăng ký
        </p>
      </Link>
    </div>
  );
}
