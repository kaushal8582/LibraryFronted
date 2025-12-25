import { BookOpen } from "lucide-react";

// Main Logo Component - Professional Library Theme
export const LibTrackLogo1 = () => (
  <div className="flex items-center space-x-3 select-none cursor-pointer group">
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <BookOpen className="w-7 h-7 text-white" strokeWidth={2.5} />
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        LibTrack
      </span>
      <span className="text-xs text-gray-500 font-medium -mt-1">Library Management</span>
    </div>
  </div>
);

// Compact Logo Variant
export const LibTrackLogo2 = () => (
  <div className="flex items-center space-x-3 select-none">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
      <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LibTrack</span>
  </div>
);

// Icon Only Variant
export const LibTrackLogo3 = () => (
  <div className="flex items-center space-x-3 select-none">
    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
      <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
    </div>
    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LibTrack</span>
  </div>
);

// Minimal Variant
export const LibTrackLogo4 = () => (
  <div className="flex items-center space-x-3 select-none">
    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
      <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">LibTrack</span>
  </div>
);

// Logo Icon Only (for loaders and small spaces)
export const LibTrackLogoIcon = ({ size = 40, className = "" }: { size?: number; className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div 
      className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
      style={{ width: size, height: size }}
    >
      <BookOpen className="text-white" style={{ width: size * 0.6, height: size * 0.6 }} strokeWidth={2.5} />
    </div>
  </div>
);