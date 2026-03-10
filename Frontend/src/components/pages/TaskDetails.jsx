import { task_api } from "@/api/task.api";
import { CalendarDays, Check, Clock, Edit, Pin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../common/Loading";
import { formatTaskDay, formatTaskTime } from "@/utils/formatDate";
import { DetailsBtn } from "../ui/DetailsBtn";
import { H4 } from "../common/H4";
import { TitleBar } from "../ui/TitleBar";

export const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await task_api.get(`/${taskId}`);
      setTask(res.data.task);
    };

    fetchTask();
  }, [taskId]);

  const handleDeleteTask = async () => {
    await task_api.delete(`/${taskId}`);
    navigate(-1);
  };

  if (!task) return <Loading />;

  return (
    <div className="min-h-screen relative w-full px-6 sm:px-40 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <TitleBar t="Tasks Details" />
      <div className="space-y-2">
        <div className="flex items-center gap-4 mt-4">
          <H4 h={task.title} className="pb-0" />
          <Link to="">
            <Edit className="pt-1" />
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-sm">
          <CalendarDays className="h-4.5 w-4.5" />
          <span>{formatTaskDay(task.dueDate)}</span>
          <span>|</span>
          <Clock className="h-4.5 w-4.5" />
          <span>{formatTaskTime(task.dueDate)}</span>
        </div>
      </div>
      <div className="h-0.5 bg-gray-400 opacity-50 my-6"></div>
      <p className="sm:text-xl max-h-80 overflow-y-auto">{task.description}</p>
      <div className="flex items-center justify-center gap-6 sm:gap-16 absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2">
        {task.status === "pending" && (
          <DetailsBtn icon={Check} text="Done" className="bg-green-500" />
        )}
        <DetailsBtn
          icon={Trash2}
          text={"Delete"}
          className={"text-red-500"}
          fn={handleDeleteTask}
        />
        <DetailsBtn
          icon={Pin}
          text={"Pin"}
          className="text-amber-500 rotate-45"
          fn={handleDeleteTask}
        />
      </div>
    </div>
  );
};
