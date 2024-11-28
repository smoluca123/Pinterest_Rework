import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';

interface IProps extends PropsWithChildren, PropsWithClassName {
  onBottomReached: () => void;
  isShowInViewElement?: boolean;
  rootMargin?: string;
}

export default function InfiniteScrollContainer({
  children,
  className,
  onBottomReached,
  rootMargin = '200px',
  isShowInViewElement = true,
}: IProps) {
  const [ref] = useInView({
    rootMargin: rootMargin,
    onChange: (inView) => {
      if (inView) {
        console.log(inView);
        // Trigger your infinite scroll logic here
        onBottomReached();
      }
    },
  });

  return (
    <div className={cn('', className)}>
      {children}
      {isShowInViewElement && <div className="mt-[200px]" ref={ref}></div>}
    </div>
  );
}
