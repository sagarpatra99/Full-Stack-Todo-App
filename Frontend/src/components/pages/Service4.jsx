import { ArrowLeft, Check } from "lucide-react";
import service4Img from "../../assets/service4.png";
import { Link, useLocation } from "react-router-dom";

export const Service4 = () => {
  const params = useLocation();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1251A6] to-[#062949] flex items-center flex-col gap-6 sm:gap-20 justify-center sm:justify-between py-25 text-white">
      <img src={service4Img} alt="" className="h-50" />
      <p className="text-center text-sm sm:text-lg px-10">You informations are secure with us</p>
      <div className="flex items-center gap-6 sm:gap-20 mt-12">
        <Link to={"/service3"}>
          <div className="bg-white p-3 sm:p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
            <ArrowLeft className="text-[#08315A] h-5 w-5" />
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service1" ? "w-5 sm:w-8" : "w-3 sm:w-5"}`}
          ></div>
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service2" ? "w-5 sm:w-8" : "w-3 sm:w-5"}`}
          ></div>
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service3" ? "w-5 sm:w-8" : "w-3 sm:w-5"}`}
          ></div>
          <div
            className={`h-1 bg-white rounded-full ${params.pathname === "/service4" ? "w-5 sm:w-8" : "w-3 sm:w-5"}`}
          ></div>
        </div>
        <Link to={"/signup"}>
          <div className="bg-white p-3 sm:p-4 rounded-full cursor-pointer shadow-2xl hover:shadow-lg duration-300 shadow-gray-200">
            <Check className="text-[#08315A] h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};
