import { cn } from "@/lib/utils";

export const LoadingSpinner = ({className}) => {
  return (
    <div className={cn(`flex items-center justify-center w-full px-40 py-10 gap-5`, className)}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>

      {/* <p className="text-gray-400 text-sm tracking-wide">{text}</p> */}
    </div>
  );
};
