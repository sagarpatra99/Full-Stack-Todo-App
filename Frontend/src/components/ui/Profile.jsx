import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
// import profileImg from "../../assets/profileImg.jpg";

export const Profile = ({user}) => {
  
  return (
    <div className="w-full flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 sm:h-30 sm:w-30 bg-white rounded-full flex items-center justify-center">
        <img src={user?.profileImg} alt="" className="h-8 w-8 sm:h-24 sm:w-24 object-cover" />
        </div>
        <div>
          <h5 className="text-lg font-semibold sm:text-3xl">{user?.fullName}</h5>
          <p className="textsm sm:text-xl opacity-50">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
      {/* <Bell size={40} fill="white" /> */}
      <Link to={"/setting"}>
        <Settings className="cursor-pointer" />
      </Link>
      </div>
    </div>
  );
};
