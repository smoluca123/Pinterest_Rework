import { Skeleton } from '@/components/ui/skeleton';

export const randomHeight = () => Math.floor(Math.random() * 200) + 200; // Generate a random height between 200 and 400

export default function PinSkeleton({
  height = randomHeight(),
}: {
  height?: number;
}) {
  return (
    <div className="w-full">
      <Skeleton
        style={{
          height,
        }}
        className="w-full bg-foreground/10"
      />
    </div>
  );
}
