import AppLogo from '@/components/AppLogo';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectDialog, setAuthDialogOpen } from '@/redux/slices/dialogSlice';

export default function AuthDialog() {
  const { authDialog } = useAppSelector(selectDialog);
  const dispatch = useAppDispatch();
  const { isOpen, dialogType } = authDialog;

  const isSignIn = dialogType === 'signin';
  const isSignUp = dialogType === 'signup';

  const titleSignIn = 'Chào mừng quay trở lại! Painterest';
  const titleSignUp = 'Chào mừng bạn đến với Painterest!';

  const handleChangeDialog = (isOpen?: boolean) => {
    dispatch(setAuthDialogOpen({ isOpen }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeDialog}>
      <DialogContent>
        <DialogHeader>
          <AppLogo className="mx-auto" />
          <DialogTitle className="text-center">
            {isSignIn ? titleSignIn : titleSignUp}
          </DialogTitle>
        </DialogHeader>

        {/* Dialog content */}
        {isSignIn && <SignInForm />}
        {isSignUp && <SignUpForm />}

        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
