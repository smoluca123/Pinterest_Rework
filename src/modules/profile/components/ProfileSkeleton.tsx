import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="py-4">
      <div className="mx-auto w-fit overflow-hidden rounded-full">
        <Skeleton className="mx-auto size-40 bg-foreground/20" />
      </div>

      <div className="text-cente5 mt-4 grid place-items-center gap-y-2">
        <Skeleton className="h-10 w-28 bg-foreground/20" />
        <Skeleton className="h-6 w-20 bg-foreground/20" />
        <Skeleton className="h-6 w-24 bg-foreground/20" />
        <Skeleton className="h-9 w-28 bg-foreground/20" />

        <div className="mx-auto w-fit"></div>
      </div>
    </div>
  );
}
