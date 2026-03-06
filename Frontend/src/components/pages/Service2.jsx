import { ArrowLeft, ArrowRight } from "lucide-react";
import service2Img from "../../assets/service2.png";
import { Link, useLocation } from "react-router-dom";

export const Service2 = () => {
  const params = useLocation();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1251A6] to-[#062949] flex items-center flex-col justify-between py-25 text-white">
      <img src={service2Img} alt="" />
      <p className="text-lg">
        Make a full schedule for the whole week and stay organized and
        productive all days
      </p>
      <div className="flex items-center gap-20">
        <Link to={"/service1"}>
          <div className="bg-white p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
            <ArrowLeft size={30} className="text-[#08315A]" />
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service1" ? "w-8" : "w-5"}`}
          ></div>
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service2" ? "w-8" : "w-5"}`}
          ></div>
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service3" ? "w-8" : "w-5"}`}
          ></div>
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service4" ? "w-8" : "w-5"}`}
          ></div>
        </div>
        <Link to={"/service3"}>
          <div className="bg-white p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
            <ArrowRight size={30} className="text-[#08315A]" />
          </div>
        </Link>
      </div>
    </div>
  );
};
