import CountdownButton from '@/components/CountdownButton';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import {
  useSendVerifyEmailMutation,
  useVerifyEmailMutation,
} from '@/components/VerifyEmail/mutations';
import { useToast } from '@/hooks/use-toast';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function VerifyEmailForm() {
  const { toast } = useToast();
  const [otpValue, setOtpValue] = useState('');

  const verifyMutation = useVerifyEmailMutation();

  const sendVerifyEmailMutation = useSendVerifyEmailMutation();
  return (
    <>
      {verifyMutation.isError && (
        <Alert variant="error">{verifyMutation.error.message}</Alert>
      )}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          verifyMutation.mutate(otpValue, {
            onSuccess: (data) => {
              toast({
                title: 'Congratulations!',
                description: data.message,
                duration: 3000,
              });
            },
          });
        }}
      >
        <Label>Mã xác thực</Label>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onChange={(value) => {
            setOtpValue(value);
          }}
          value={otpValue}
        >
          <InputOTPGroup className="!w-full">
            <InputOTPSlot className="flex-1" index={0} />
            <InputOTPSlot className="flex-1" index={1} />
            <InputOTPSlot className="flex-1" index={2} />
            <InputOTPSlot className="flex-1" index={3} />
            <InputOTPSlot className="flex-1" index={4} />
            <InputOTPSlot className="flex-1" index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          variant="normal"
          disabled={verifyMutation.isPending}
          className="mr-2"
        >
          {verifyMutation.isPending && <Loader2 className="animate-spin" />}
          Xác thực
        </Button>
        <CountdownButton
          countdownTime={60}
          reCountWhenClicked
          isCountFirstTime={false}
          variant="outline"
          onClick={() => {
            sendVerifyEmailMutation.mutate();
          }}
        >
          Gửi lại
        </CountdownButton>
      </form>
    </>
  );
}
