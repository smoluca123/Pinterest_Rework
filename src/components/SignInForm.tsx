import PasswordInput from '@/components/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema, SignInValues } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth, signIn } from '@/redux/slices/authSlice';
import { Alert } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import { Loader2 } from 'lucide-react';

export default function SignInForm() {
  const { toast } = useToast();
  const { error, isLoading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const form = useForm<SignInValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
  });

  const handleSignIn = async (credentials: SignInValues) => {
    try {
      await dispatch(signIn(credentials)).unwrap();
      // Sign in success
      toast({
        title: 'Sign in successful 👋',
        duration: 3000,
      });

      // close dialog
      dispatch(
        setAuthDialogOpen({
          isOpen: false,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
        {/* Error message */}
        {error.message && <Alert variant="error">{error.message}</Alert>}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* <Input {...field} placeholder="Password" type="password" /> */}
                <PasswordInput {...field} placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="normal" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Đăng nhập
        </Button>
      </form>
      <p
        className="mx-auto font-medium cursor-pointer hover:underline w-fit"
        onClick={() => {
          dispatch(setAuthDialogOpen({ isOpen: true, dialogType: 'signup' }));
        }}
      >
        Chưa tham gia Pinterest? Đăng ký
      </p>
    </Form>
  );
}
