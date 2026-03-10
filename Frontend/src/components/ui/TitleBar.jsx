import { ChevronLeft } from "lucide-react";
import { H4 } from "../common/H4";
import { useNavigate } from "react-router-dom";

export const TitleBar = ({ t }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center sm:gap-6 bg-purple-500s sm:mb-10">
      <div onClick={() => navigate(-1)} className="translate-x-2">
        <ChevronLeft className="h-6 w-6 pt- sm:pt-1" />
      </div>
      <div className="text-center w-full">
        <div className="text-3xl">{t}</div>
      </div>
    </div>
  );
};
