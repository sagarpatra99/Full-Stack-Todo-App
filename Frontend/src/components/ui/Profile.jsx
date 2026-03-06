import { Bell } from "lucide-react";
import profileImg from "../../assets/profileImg.jpg";

export const Profile = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={profileImg} alt="" className="h-30 w-30 rounded-full object-cover" />
        <div>
          <h5 className="text-3xl">Oussama Chahidi</h5>
          <p className="text-xl opacity-50">oussamachahidi@gmail.com</p>
        </div>
      </div>
      <Bell size={40} fill="white" />
    </div>
  );
};
