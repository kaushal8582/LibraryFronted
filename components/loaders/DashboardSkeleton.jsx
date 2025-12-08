import React from 'react';

const  DashboardSkeleton = ()=> {
  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-pulse">
   



      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
          </div>
        ))}
      </div>

      {/* Divider Skeleton */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Overview Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="h-48 bg-gray-200 rounded-lg mb-4">
              {/* Chart bars skeleton */}
              <div className="flex items-end h-full p-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex-1 mx-1">
                    <div className="bg-gray-300 rounded-t-lg" style={{ height: `${20 + i * 10}%` }}></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Month labels skeleton */}
            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-3 bg-gray-300 rounded w-12"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Payments Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-gray-300 rounded w-40 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default DashboardSkeleton;