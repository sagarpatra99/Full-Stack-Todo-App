import { Plus } from "lucide-react";
import { Profile } from "../ui/Profile";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen w-full px-40 py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <Profile />
      <div>
        <h4 className="tracking-wider text-4xl">Group Tasks</h4>
        <div className="py-6">
          <Link to={"/alltask"}>
            <div className="py-10 px-8 rounded-md flex items-center gap-4 bg-[#0a3058] w-fit text-gray-200">
              <Plus size={30} /> <span className="text-2xl">Add Task</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
