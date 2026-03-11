import { auth_api } from "@/api/auth.api";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertDialogBox } from "../common/AlertDialogBox";

export const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth_api.post("/logout");
      setUser(null);
      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 sm:h-30 sm:w-30 text-2xl font-semibold bg-linear-to-r from-blue-400 to-blue-700 rounded-full flex items-center justify-center">
          {user?.fullname?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h5 className="text-lg font-semibold sm:text-3xl">
            {user?.fullname}
          </h5>
          <p className="textsm sm:text-xl opacity-50">{user?.email}</p>
        </div>
      </div>
      <AlertDialogBox
        title="Are you sure you want to logout?"
        desc="You will be logged out of your account and need to login again to
              access your tasks."
        yes="Delete"
        variant="Logout"
        fn={handleLogout}
      >
        <LogOut className="text-red-500 cursor-pointer" />
      </AlertDialogBox>
    </div>
  );
};
