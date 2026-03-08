import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CompletedTaskBar = ({ to, head, para }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between bg-white text-black py-2 px-5 rounded-md">
        <div className="flex items-center gap-4">
          <Check size={20} className="bg-green-500 rounded-full h-8 w-8 p-1 text-white"/>
          <div>
            <h4 className="font-semibold text-xl tracking-wider">{head}</h4>
            <p className="text-gray-500 tracking-wider">{para}</p>
          </div>
        </div>
        <ChevronRight className="text-[#0EA5E9]" size={30} strokeWidth={4} />
      </div>
    </Link>
  );
};
