import { Plus } from "lucide-react";
import { Profile } from "../ui/Profile";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth_api } from "@/api/auth.api";
import { useEffect, useState } from "react";
import { CompletedTaskBar } from "../ui/CompletedTaskBar";
import { IncompleteTaskBar } from "../ui/IncompleteTaskBar";
import { task_api } from "@/api/task.api";
import { formatDate } from "@/utils/formatDate";

export const Home = () => {
  const [user, setUser] = useState(null);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    const getMe = async () => {
      try {
        const res_get = await auth_api.get("/get-me");
        setUser(res_get.data.user);
        const res_pending = await task_api.get("", {
          params: { status: "pending" },
        });
        setPendingTasks(res_pending.data.tasks);
        const res_completed = await task_api.get("", {
          params: { status: "completed" },
        });
        setCompletedTasks(res_completed.data.tasks);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    getMe();
  }, []);
  return (
    <div className="min-h-screen w-full px-40 py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <Profile user={user} />
      <div className="space-y-6">
        <div>
          <h4 className="tracking-wider text-4xl pb-6">Group Tasks</h4>
          <div className="py-">
            <Link to={"/alltask"}>
              <div className="py-10 px-8 rounded-md flex items-center gap-4 bg-[#0a3058] w-fit text-gray-200">
                <Plus size={30} /> <span className="text-2xl">Add Task</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <h4 className="tracking-wider text-4xl pb-6">Incomplete Tasks</h4>
            <Link to={"/alltask"} className="hover:text-blue-500 pb-4">
              View All Tasks
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {pendingTasks.length === 0 ? (
              <h2 className="text-lg">No Pending Tasks Founds</h2>
            ) : (
              pendingTasks.map((pendingTask) => {
                return (
                  <IncompleteTaskBar
                    key={pendingTask._id}
                    to="/details"
                    head={pendingTask.title}
                    dueDate={formatDate(pendingTask.dueDate)}
                  />
                );
              })
            )}
          </div>
        </div>
        <div>
          <h4 className="tracking-wider text-4xl pb-6">Completed Tasks</h4>
          <div className="flex flex-col gap-6">
            {completedTasks.length === 0 ? (
              <h2 className="text-lg">No Completed Tasks Founds</h2>
            ) : (
              completedTasks.map((completedTask) => {
                return (
                  <CompletedTaskBar
                    key={completedTask._id}
                    to="/details"
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
