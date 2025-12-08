import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'image' | "table";
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'card',
  count = 1,
  className = '',
}) => {

  const CardSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden p-6 animate-pulse">
      <div className='space-y-4'>
           <div className=" h-48 bg-gray-300 rounded-xl"/>


           <div className='w-full flex items-center justify-between flex-wrap gap-4'> 
            <div className=" h-4 w-44 bg-gray-200 mx-w-[158px] rounded"></div>
            <div className=" h-4 w-26 bg-gray-200 rounded mx-w-[158px]"></div>
           </div>
            <div className=" h-4 max-sm:hidden w-32 bg-gray-300 rounded mx-w-[158px]"></div>

      
      </div>

            <div className=" h-10 w-full my-4 bg-gray-200 rounded-xl mx-w-[158px]"></div>

   
 
      

    </div>
  );

  const TextSkeleton = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
  );


  const ImageSkeleton = () => (
    <div className="bg-gray-300 animate-pulse rounded-lg aspect-video"></div>
  );

  
 const TableSkeleton = () => (

      <div className="h-8 bg-gray-300 rounded w-full animate-pulse"></div>
      

  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'text':
        return <TextSkeleton />;
      case 'image':
        return <ImageSkeleton />;
      case 'table':
        return <TableSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>{renderSkeleton()}</div>
        ))}
      </div>
    );
  }

  return renderSkeleton();
};

export default SkeletonLoader;