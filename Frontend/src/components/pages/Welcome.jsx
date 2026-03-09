import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#1251A6] to-[#062949] flex items-center flex-col gap-20 justify-center sm:justify-between py-25 text-white">
      <div className="flex items-center flex-col justify-center gap-6">
        <div className="bg-white p-4 rounded-full">
          <Check size={80} className="text-[#0B3E79]" />
        </div>
        <h2 className="headingFont text-4xl">DO IT</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <Link to={"/service1"}>
          <div className="bg-white p-4 rounded-full cursor-pointer shadow-lg shadow-gray-200">
            <ArrowRight size={30} className="text-[#08315A]" />
          </div>
        </Link>
        <div className="text-xl">v 1.0.0</div>
      </div>
    </div>
  );
};
