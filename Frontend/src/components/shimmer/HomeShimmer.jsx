export const HomeShimmer = () => {
  return (
    <div className="min-h-screen w-full px-6 sm:px-40 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] animate-pulses">
      {/* Profile Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-500 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-500 rounded"></div>
            <div className="h-3 w-20 bg-gray-500 rounded"></div>
          </div>
        </div>
        <div className="h-8 w-6 bg-gray-500 rounded"></div>
      </div>

      {/* Group Tasks Section */}
      <div className="space-y-3 sm:space-y-6">
        <div>
          <div className="h-5 w-40 bg-gray-500 rounded mb-4"></div>

          <div className="py-6 sm:py-10 px-8 rounded-md bg-[#0a3058] w-40">
            <div className="h-4 w-24 bg-gray-500 rounded"></div>
          </div>
        </div>

        {/* Incomplete Tasks */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-40 bg-gray-500 rounded"></div>
            <div className="h-4 w-16 bg-gray-500 rounded"></div>
          </div>

          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#0a3058] p-4 rounded"
              >
                <div className="h-4 w-40 bg-gray-500 rounded"></div>
                <div className="h-3 w-20 bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <div className="h-5 w-40 bg-gray-500 rounded mb-4"></div>

          <div className="flex flex-col gap-4">
            {[1].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#0a3058] p-4 rounded"
              >
                <div className="h-4 w-40 bg-gray-500 rounded"></div>
                <div className="h-3 w-20 bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar Skeleton */}
      <div className="fixed bottom-0 left-0 w-full flex justify-between pb-4 px-10">
        <div className="h-8 w-6 bg-gray-500 rounded"></div>
        <div className="h-8 w-6 bg-gray-500 rounded"></div>
        <div className="h-8 w-6 bg-gray-500 rounded"></div>
        <div className="h-8 w-6 bg-gray-500 rounded"></div>
      </div>
    </div>
  );
};
