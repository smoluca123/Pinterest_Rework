import { sendActiveCodeToEmailAPI, verifyEmailAPI } from '@/apis/userApis';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth, updateUser } from '@/redux/slices/authSlice';
import { setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import { useMutation } from '@tanstack/react-query';

export function useVerifyEmailMutation() {
  const { user } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  const handleVerifyEmail = async (otpCode: string) => {
    try {
      if (!user) throw 'User not found';
      const data = await verifyEmailAPI({
        userId: user.id,
        code: otpCode,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };
  const mutation = useMutation({
    mutationKey: ['auth', 'verifyEmail', user?.id],
    mutationFn: handleVerifyEmail,
    onSuccess: (data) => {
      dispatch(updateUser(data.data || null));
      //   Close dialog
      dispatch(setAuthDialogOpen({ isOpen: false }));
    },
  });
  return mutation;
}

export function useSendVerifyEmailMutation() {
  const { user } = useAppSelector(selectAuth);
  //   const dispatch = useAppDispatch();

  const handleSendVerifyEmail = async () => {
    try {
      if (!user) throw 'User not found';
      const data = await sendActiveCodeToEmailAPI(user.id);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ['auth', 'sendVerifyEmail', user?.id],
    mutationFn: handleSendVerifyEmail,
  });
  return mutation;
}
