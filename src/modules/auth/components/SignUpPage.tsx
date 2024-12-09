import SignUpForm from '@/components/SignUpForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectDialog, setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const {
    authDialog: { dialogType, isOpen },
  } = useAppSelector(selectDialog);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthDialogOpen({ isOpen: false, dialogType: 'signup' }));
  }, [dialogType, isOpen, dispatch]);
  return (
    <div className="p-8 rounded-lg border-1 border-border min-w-[30rem] space-y-4">
      <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
      <SignUpForm isShowStep={false} />
      <Link to="/auth/signin" className="block">
        <p className="mx-auto font-medium cursor-pointer hover:underline w-fit">
          Đã tham gia Pinterest? Đăng nhập
        </p>
      </Link>
    </div>
  );
}
