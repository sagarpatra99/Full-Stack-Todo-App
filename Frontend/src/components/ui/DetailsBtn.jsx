import { cn } from "@/lib/utils";

export const DetailsBtn = ({ icon, text, className, fn, ...props }) => {
  const Icon = icon;
  return (
    <div
      onClick={fn}
      {...props}
      className={`bg-[#05243E] w-20 px-6 py-3 sm:px-8 sm:py-3 rounded-md flex flex-col items-center gap-2 cursor-pointer`}
    >
      <Icon className={cn("rounded-full h-4 w-4", className)} />
      <h5 className="font-semibold text-xs">{text}</h5>
    </div>
  );
};
