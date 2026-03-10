import { cn } from "@/lib/utils";

export const DetailsBtn = ({ icon, text, fn, className }) => {
  const Icon = icon;
  return (
    <div
      onClick={fn}
      className={`bg-[#05243E] w-20 px-6 py-3 sm:px-8 sm:py-3 rounded-md flex flex-col items-center gap-2`}
    >
      <Icon className={cn("rounded-full h-4 w-4", className)} />
      <h5 className="font-semibold text-xs">{text}</h5>
    </div>
  );
};
