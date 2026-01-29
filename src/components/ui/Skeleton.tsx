import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg ${className}`}
        />
      ))}
    </>
  );
};

export const SkeletonFlightCard: React.FC = () => {
  return (
    <div className="border border-gray-100 rounded-xl p-6 mb-4 space-y-6 bg-white">
      {/* Airline + Stops */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-48 h-4 rounded-lg" />
        </div>
        <Skeleton className="w-24 h-6 rounded-lg" />
      </div>

      {/* Route Line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-8 rounded-lg" />
            <Skeleton className="w-40 h-6 rounded-lg" />
            <Skeleton className="w-24 h-8 rounded-lg" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>

      {/* Layover info */}
      <Skeleton className="w-full h-16 rounded-lg" />
    </div>
  );
};

export const SkeletonFilterPanel: React.FC = () => {
  return (
    <div className="border border-gray-100 rounded-xl p-6 space-y-6 bg-white">
      {/* Header */}
      <Skeleton className="w-28 h-7 rounded-lg" />

      {/* Price section */}
      <div className="space-y-3">
        <Skeleton className="w-16 h-4 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Stops section */}
      <div className="space-y-3">
        <Skeleton className="w-16 h-4 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-6 rounded-lg" />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Airlines section */}
      <div className="space-y-3">
        <Skeleton className="w-20 h-4 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-6 rounded-lg" />
        ))}
      </div>
    </div>
  );
};
