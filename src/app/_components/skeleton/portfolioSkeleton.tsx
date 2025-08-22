import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioSkeletonCard() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60">
      {/* Image placeholder */}
      <div className="relative w-full aspect-[16/9] ">
        <Skeleton className="h-full w-full bg-muted" />
      </div>

      {/* Meta Info placeholder */}
      <div className="absolute inset-x-0 bottom-0 p-4 space-y-2">
        <Skeleton className="h-4 w-24 bg-muted-foreground/20" /> {/* date */}
        <Skeleton className="h-5 w-40 bg-muted-foreground/20" /> {/* title */}
        <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />{" "}
        {/* description */}
        <Skeleton className="h-3 w-32 bg-muted-foreground/20" /> {/* client */}
      </div>
    </div>
  );
}
