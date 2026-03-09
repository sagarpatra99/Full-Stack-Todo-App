import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const TaskBar = ({ to, head, dueDate, status }) => {
  return (
    <Link to={to}>
    <div className="flex items-center justify-between bg-white text-black py-1.5 px-3.5 sm:py-2 sm:px-5 rounded-md">
      <div className="flex items-center gap-4">
          {status=="completed" && <Check size={20} className="bg-green-500 rounded-full h-8 w-8 p-1 text-white"/>}
          <div>
            <h4 className="font-semibold sm:text-xl tracking-wider">{head}</h4>
            <p className="text-gray-500 sm:tracking-wider">{dueDate}</p>
          </div>
        </div>
      <ChevronRight className="text-[#0EA5E9]" size={30} strokeWidth={4} />
    </div>
    </Link>
  );
};
