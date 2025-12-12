import { Skeleton } from "./ui/skeleton";

export function ProjectCardSkeleton() {
  return (
    <li className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
       {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        {/* Description */}
        <div className="flex-col flex gap-1 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        </div>

      <div className="flex flex-col gap-3 mt-4">
        {/* Image */}
      <Skeleton className="h-40 w-full rounded-lg" />

        {/* Buttons row */}
        <div className="flex gap-3 mt-2 justify-between">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </li>
  );
}
