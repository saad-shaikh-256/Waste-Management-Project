import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse flex flex-col h-full">
      {/* Header: Type and Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>

      {/* Big Quantity Text */}
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>

      {/* Location */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-auto pt-4 flex justify-end gap-2">
        <div className="h-9 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
