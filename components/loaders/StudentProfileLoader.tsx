"use client";

export default function StudentProfileLoader() {
  return (
    <div className="w-full border rounded-xl p-6 bg-white relative">

      {/* Pencil Button Skeleton */}
      <div className="absolute top-4 right-6">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-40 h-5 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="w-60 h-4 bg-gray-200 rounded mb-6 animate-pulse"></div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-40 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-40 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-52 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-44 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-28 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Update Password Button Skeleton */}
      <div className="mt-6">
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

    </div>
  );
}
