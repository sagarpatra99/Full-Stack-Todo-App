import { Plus } from "lucide-react";
import { Profile } from "../ui/Profile";
import { Link } from "react-router-dom";
import { CompletedTaskBar } from "../ui/CompletedTaskBar";
import { IncompleteTaskBar } from "../ui/IncompleteTaskBar";
import { formatDate } from "@/utils/formatDate";
import { useHomeData } from "@/hooks/useHomeData";
import { Loading } from "../common/Loading";
import { H4 } from "../common/H4";

export const Home = () => {
  const { user, pendingTasks, completedTasks, loading } = useHomeData();

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen w-full px-6 sm:px-40 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <Profile user={user} />
      <div className="space-y-6">
        <div>
          <H4 h="Group Tasks" />
          <div className="">
            <Link to={"/alltask"}>
              <div className="py-6 sm:py-10 px-4 sm:px-8 rounded-md flex items-center gap-2 sm:gap-4 bg-[#0a3058] w-fit text-gray-200">
                <Plus /> <span className="sm:text-2xl">Add Task</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <H4 h={"Incomplete Tasks"} />
            <Link to={"/alltask"} className="hover:text-blue-500 pb-4 text-sm">
              View All
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {pendingTasks.length === 0 ? (
              <h2 className="text-sm sm:text-lg">No Pending Tasks Founds</h2>
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
        <div>
          <H4 h="Completed Tasks" />
          <div className="flex flex-col gap-6">
            {completedTasks.length === 0 ? (
              <h2 className="text-sm sm:text-lg">No Completed Tasks Found</h2>
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
    </div>
  );
};
