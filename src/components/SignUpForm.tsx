import { signUpAPI } from '@/apis/userApis';
import PasswordInput from '@/components/PasswordInput';
import Steps from '@/components/Steps';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import VerifyEmailForm from '@/components/VerifyEmail/VerifyEmailForm';
import { useToast } from '@/hooks/use-toast';
import { signUpSchema, SignUpValues } from '@/lib/validations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signIn } from '@/redux/slices/authSlice';
import { selectDialog, setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const steps = [
  {
    label: 'Đăng ký',
  },
  {
    label: 'Xác thực email',
  },
];

export default function SignUpForm({
  isShowStep = true,
}: {
  isShowStep?: boolean;
}) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { authDialog } = useAppSelector(selectDialog);
  const { dialogType } = authDialog;

  const dispatch = useAppDispatch();

  const form = useForm<SignUpValues>({
    defaultValues: {
      fullName: '',
      email: '',
      age: 0,
      username: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const handleSignUp = async (credentials: SignUpValues) => {
    setIsLoading(true);
    try {
      const data = await signUpAPI(credentials);

      // Sign up success

      // dispatch sign in action with the new user's credentials
      await dispatch(
        signIn({
          username: data.data.username,
          password: form.getValues().password,
        })
      ).unwrap();
      form.reset();
      toast({
        title: 'Sign up successful',
        duration: 3000,
      });

      setActiveStep(2);

      // open verify email dialog
      dispatch(setAuthDialogOpen({ dialogType: 'verify-email' }));

      // close dialog
      // dispatch(setAuthDialogOpen({ isOpen: false }));
    } catch (error) {
      console.log(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isShowStep && <Steps steps={steps} activeStep={activeStep} />}
      {/* Step 1 */}
      {dialogType === 'signup' && (
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            {error && <Alert variant="error">{error}</Alert>}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Age" type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" />
                  </FormControl>
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
                </FormItem>
              )}
            />

            <Button variant="normal" className="" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Đăng ký
            </Button>
          </form>
        </Form>
      )}

      {/* Step 2 */}
      {dialogType === 'verify-email' && <VerifyEmailForm />}
    </>
  );
}
