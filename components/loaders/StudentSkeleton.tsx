const StudentSkeleton = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="w-full mx-auto">
      

     
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
  

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <div className="h-4 w-24 bg-gray-200 rounded-md mb-3 animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>

      
          <div className="mb-8">
            <div className="h-6 w-40 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
            
          
            <div className="hidden md:grid grid-cols-6 gap-4 mb-3">
              {['Month/Year', 'Amount', 'Status', 'Payment Date', 'Payment Method', 'Transaction ID'].map((header, idx) => (
                <div key={idx} className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>

           
            <div className="space-y-3">
              {[1, 2, 3].map((row) => (
                <div key={row} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                 
                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    
             
                    <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                    
                
                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    
                  
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                    
                 
                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    
                  
                    <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      
          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex space-x-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default StudentSkeleton;