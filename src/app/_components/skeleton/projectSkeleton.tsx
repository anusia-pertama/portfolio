import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCardSkeleton({ i }: { i: number }) {
  return (
    <Card key={i} className="overflow-hidden bg-card/60">
      <div className="relative">
        <Skeleton className="aspect-video w-full bg-muted" />
        <div className="absolute left-3 top-0">
          <Skeleton className="h-6 w-20 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2 bg-muted-foreground/20" />
        <Skeleton className="h-4 w-28 bg-muted-foreground/20" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full rounded-md bg-muted-foreground/20" />
      </CardContent>
    </Card>
  );
}
