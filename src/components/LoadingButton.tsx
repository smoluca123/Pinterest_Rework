import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface IProps extends ButtonProps {
  isLoading: boolean;
}

export default function LoadingButton({
  isLoading,
  disabled,
  children,
  className,
  ...props
}: IProps) {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      {isLoading && <Loader2 className="size-5 animate-spin" />}
      {children}
    </Button>
  );
}
