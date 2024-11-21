import { Button, ButtonProps } from '@/components/ui/button';
import { addPadToNumber } from '@/lib/utils';
import { MouseEvent, PropsWithChildren, useEffect, useState } from 'react';

interface IProps extends PropsWithChildren, Omit<ButtonProps, 'type'> {
  countdownTime: number;
  reCountWhenClicked?: boolean;
  isCountFirstTime?: boolean;
}

export default function CountdownButton({
  children,
  countdownTime,
  onClick,
  reCountWhenClicked,
  isCountFirstTime = true,
  ...props
}: IProps) {
  const [countdown, setCountdown] = useState(
    isCountFirstTime ? countdownTime : 0
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Before the onClick event, check if the button is disabled

    if (!onClick) return;
    onClick(e);

    // After the onClick event, disable the button for a short duration
    // Reset the countdown when the button is clicked
    reCountWhenClicked && setCountdown(countdownTime);
  };

  useEffect(() => {
    if (countdownTime <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTime]);

  return (
    <Button
      disabled={countdown > 0}
      {...props}
      onClick={handleClick}
      type="button"
    >
      {countdown ? addPadToNumber(countdown, 2) : children}
    </Button>
  );
}
