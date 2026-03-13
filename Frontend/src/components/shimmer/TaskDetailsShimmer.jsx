export const TaskDetailsShimmer = () => {
  return (
    <div className="min-h-screen w-full px-4 sm:px-16 lg:px-32 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white animate-pulse">

      {/* Title */}
      <div className="h-8 w-48 bg-gray-400/40 rounded mb-6"></div>

      {/* Task Title */}
      <div className="space-y-3 mt-4">
        <div className="h-7 w-64 bg-gray-400/40 rounded"></div>

        {/* Date + Time */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-28 bg-gray-400/40 rounded"></div>
          <div className="h-4 w-2 bg-gray-400/40 rounded"></div>
          <div className="h-4 w-28 bg-gray-400/40 rounded"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-0.5 bg-gray-400/30 my-6"></div>

      {/* Description lines */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-400/40 rounded"></div>
        <div className="h-4 w-11/12 bg-gray-400/40 rounded"></div>
        <div className="h-4 w-10/12 bg-gray-400/40 rounded"></div>
        <div className="h-4 w-9/12 bg-gray-400/40 rounded"></div>
        <div className="h-4 w-8/12 bg-gray-400/40 rounded"></div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-12">
        <div className="h-10 w-24 bg-gray-400/40 rounded"></div>
        <div className="h-10 w-24 bg-gray-400/40 rounded"></div>
        <div className="h-10 w-24 bg-gray-400/40 rounded"></div>
      </div>
    </div>
  );
};