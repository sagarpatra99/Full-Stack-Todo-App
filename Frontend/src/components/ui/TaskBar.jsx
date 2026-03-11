import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const TaskBar = ({ to, head, dueDate, status }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between bg-white text-black py-1.5 px-3.5 sm:py-2 sm:px-5 rounded-md">
        <div className="flex items-center gap-4">
          {status == "completed" && (
            <Check className="bg-green-500 rounded-full h-6 w-6 sm:h-8 sm:w-8 p-1 text-white" />
          )}
          <div>
            <h4 className="font-semibold text-sm sm:text-xl tracking-wider">
              {head.length > 10 ? head.slice(0, 30) + "..." : head}
            </h4>
            <p className="text-gray-500 text-xs sm:tracking-wider">{dueDate}</p>
          </div>
        </div>
        <ChevronRight className="text-[#0EA5E9] h-5" strokeWidth={4} />
      </div>
    </Link>
  );
};
