import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
// import profileImg from "../../assets/profileImg.jpg";

export const Profile = ({user}) => {
  
  return (
    <div className="w-full flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <div className="h-30 w-30 bg-white rounded-full flex items-center justify-center">
        <img src={user?.profileImg} alt="" className=" h-24 w-24 object-cover" />
        </div>
        <div>
          <h5 className="text-3xl">{user?.fullName}</h5>
          <p className="text-xl opacity-50">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
      {/* <Bell size={40} fill="white" /> */}
      <Link to={"/setting"}>
        <Settings size={40} className="cursor-pointer" />
      </Link>
      </div>
    </div>
  );
};
