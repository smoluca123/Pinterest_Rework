import { cn } from '@/lib/utils';

interface IProps {
  steps: {
    label: string;
  }[];
  activeStep?: number;
}

export default function Steps({ steps, activeStep = 1 }: IProps) {
  const activeClasses =
    'before:!bg-primary after:!bg-primary after:!text-white';
  return (
    <ul className="steps">
      {steps.map((step, i) => {
        return (
          <li
            key={step.label}
            className={cn(
              'step after:!bg-secondary after:!border-1 before:!bg-secondary before:!border-1 dark:before:border-none after:border-none',
              {
                [activeClasses]: i < activeStep,
              }
            )}
          >
            {step.label}
          </li>
        );
      })}
    </ul>
  );
}
