
import { cn } from "../../utils/Helper";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}

export function SkeletonFlightCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Airline Logo & Name */}
        <div className="flex items-center gap-4 w-full md:w-1/4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* Flight Details (Route) */}
        <div className="flex bg-gray-50 rounded-lg p-3 md:p-4 w-full md:w-2/4 justify-between items-center">
          <div className="text-center">
             <Skeleton className="h-6 w-12 mx-auto mb-1" />
             <Skeleton className="h-3 w-8 mx-auto" />
          </div>

          <div className="flex-1 px-4 flex flex-col items-center">
             <Skeleton className="h-3 w-16 mb-2" />
             <div className="w-full h-[2px] bg-gray-200 relative"></div>
             <Skeleton className="h-3 w-12 mt-2" />
          </div>

          <div className="text-center">
             <Skeleton className="h-6 w-12 mx-auto mb-1" />
             <Skeleton className="h-3 w-8 mx-auto" />
          </div>
        </div>

        {/* Price & Action */}
        <div className="text-right w-full md:w-1/4 pl-0 md:pl-6 border-l-0 md:border-l border-gray-100">
           <Skeleton className="h-3 w-12 ml-auto mb-1" />
           <Skeleton className="h-8 w-24 ml-auto mb-3" />
           <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton };
