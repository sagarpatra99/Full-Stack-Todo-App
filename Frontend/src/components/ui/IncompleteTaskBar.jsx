import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const IncompleteTaskBar = ({ to, head, dueDate }) => {
  return (
    <Link to={to}>
    <div className="flex items-center justify-between bg-white text-black py-2 px-5 rounded-md">
      <div>
        <h4 className="font-semibold text-xl tracking-wider">{head}</h4>
        <p className="text-gray-500 tracking-wider">{dueDate}</p>
      </div>
      <ChevronRight className="text-[#0EA5E9]" size={30} strokeWidth={4} />
    </div>
    </Link>
  );
};
