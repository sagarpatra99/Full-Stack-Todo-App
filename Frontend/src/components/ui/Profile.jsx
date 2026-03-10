import { auth_api } from "@/api/auth.api";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Profile = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth_api.post("/logout");
      console.log("logout successfully");
      
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 sm:h-30 sm:w-30 text-2xl font-semibold bg-linear-to-r from-blue-400 to-blue-700 rounded-full flex items-center justify-center">
          {user?.fullname?.charAt(0)}
        </div>
        <div>
          <h5 className="text-lg font-semibold sm:text-3xl">
            {user?.fullname}
          </h5>
          <p className="textsm sm:text-xl opacity-50">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <LogOut className="text-red-500" onClick={handleLogout} />
      </div>
    </div>
  );
};
