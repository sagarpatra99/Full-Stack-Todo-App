export const TaskBarShimmer = ({showIcon}) => {
  return (
    <div className="flex items-center justify-between bg-white py-2.5 px-3.5 sm:py-2 sm:px-5 rounded-md animate-pulse">
      
      <div className="flex items-center gap-4">
        
       {showIcon && (
          <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-300 rounded-full"></div>
        )}

        {/* text placeholder */}
        <div className="space-y-2">
          <div className="h-3 sm:h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-2 sm:h-3 w-20 bg-gray-200 rounded"></div>
        </div>

      </div>

      {/* chevron placeholder */}
      <div className="h-4 w-4 bg-gray-300 rounded"></div>
    </div>
  );
};  