import { Plus } from "lucide-react";
import { Profile } from "../ui/Profile";
import { Link } from "react-router-dom";
import { CompletedTaskBar } from "../ui/CompletedTaskBar";
import { IncompleteTaskBar } from "../ui/IncompleteTaskBar";
import { formatDate } from "@/utils/formatDate";
import { useHomeData } from "@/hooks/useHomeData";
import { H4 } from "../common/H4";
import { Navbar } from "../ui/Navbar";
import { HomeShimmer } from "../shimmer/HomeShimmer";

export const Home = () => {
  const { user, setUser, pendingTasks, completedTasks, loading } = useHomeData();

  if (loading) return <HomeShimmer />;

  return (
    <div className="min-h-screen w-full px-4 sm:px-16 lg:px-32 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">

      <Profile user={user} setUser={setUser} />

      <div className="space-y-6 sm:space-y-8">

        {/* Group Task Section */}
        <div>
          <H4 h="Group Tasks" className="pb-2" />

          <Link to={"/alltask"}>
            <div className="py-4 sm:py-6 px-4 sm:px-8 rounded-md flex items-center gap-2 sm:gap-4 bg-[#0a3058] w-fit text-gray-200 hover:bg-[#0c3c6f] transition cursor-pointer">
              <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-base sm:text-xl lg:text-2xl">
                Create Group
              </span>
            </div>
          </Link>
        </div>

        {/* Incomplete Tasks */}
        <div>
          <H4 h={"Incomplete Tasks"} className="pb-2" />

          <div className="flex flex-col gap-3 sm:gap-5 max-h-30 sm:max-h-40 overflow-y-auto pr-1">
            {pendingTasks.length === 0 ? (
              <h2 className="text-sm sm:text-lg text-gray-200">
                No Pending Tasks Found
              </h2>
            ) : (
              pendingTasks.map((pendingTask) => {
                return (
                  <IncompleteTaskBar
                    key={pendingTask._id}
                    to={`/task/${pendingTask._id}`}
                    head={pendingTask.title}
                    dueDate={formatDate(pendingTask.dueDate)}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <H4 h="Completed Tasks" className={"pb-2"} />

          <div className="flex flex-col gap-3 sm:gap-5 max-h-30 sm:max-h-40 overflow-y-auto pr-1">
            {completedTasks.length === 0 ? (
              <h2 className="text-sm sm:text-lg text-gray-200">
                No Completed Tasks Found
              </h2>
            ) : (
              completedTasks.map((completedTask) => {
                return (
                  <CompletedTaskBar
                    key={completedTask._id}
                    to={`/task/${completedTask._id}`}
                    head={completedTask.title}
                    dueDate={formatDate(completedTask.dueDate)}
                  />
                );
              })
            )}
          </div>
        </div>

      </div>

      <Navbar />
    </div>
  );
};