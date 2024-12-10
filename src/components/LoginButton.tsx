import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/redux/hooks';
import { setAuthDialogOpen } from '@/redux/slices/dialogSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IProps extends ButtonProps {
  tooltipContent?: string;
}

export default function LoginButton({
  disabled,
  children,
  className,
  tooltipContent,
  ...props
}: IProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setAuthDialogOpen({ isOpen: true, dialogType: 'signin' }));
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              className={cn('', className)}
              {...props}
              onClick={() => handleClick()}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent || 'Vui lòng đăng nhập'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
