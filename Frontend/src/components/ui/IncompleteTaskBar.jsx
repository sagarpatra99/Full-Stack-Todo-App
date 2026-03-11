import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const IncompleteTaskBar = ({ to, head, dueDate }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between bg-white text-black py-1.5 px-3.5 sm:py-2 sm:px-5 rounded-md">
        <div>
          <h4 className="font-semibold text-sm sm:text-xl tracking-wider">
            {head.length > 10 ? head.slice(0, 20) + "..." : head}
          </h4>
          <p className="text-gray-500 text-xs sm:tracking-wider">{dueDate}</p>
        </div>
        <ChevronRight className="text-[#0EA5E9] h-5" strokeWidth={4} />
      </div>
    </Link>
  );
};
