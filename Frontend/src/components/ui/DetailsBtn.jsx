import { cn } from "@/lib/utils";

export const DetailsBtn = ({ icon, text, fn, className }) => {
  const Icon = icon;
  return (
    <div
      onClick={fn}
      className={`bg-[#05243E] w-fit px-6 py-3 sm:px-8 sm:py-3 rounded-md flex flex-col items-center gap-2`}
    >
      <Icon className={cn("rounded-full h-5 w-5", className)} />
      <h5 className="font-semibold text-sm">{text}</h5>
    </div>
  );
};
