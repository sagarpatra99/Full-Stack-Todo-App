import { task_api } from "@/api/task.api";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Clock,
  Edit,
  Pin,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../common/Loading";
import { formatTaskDay, formatTaskTime } from "@/utils/formatDate";

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

  if (!task) return <Loading />;

  return (
    <div className="min-h-screen relative w-full px-40 py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <div className="flex items-center gap-6 bg-purple-500s mb-10">
        {/* <Link to="/setting"> */}
        <ChevronLeft
          size={50}
          className="pt-1 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
        {/* </Link> */}
        <h4 className="tracking-wider text-4xl">Tasks Details</h4>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl tracking-wide">{task.title}</h2>
          <Link to="">
            <Edit className="pt-1" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <CalendarDays size={20} />
          <span>{formatTaskDay(task.dueDate)}</span>
          <span>|</span>
          <Clock size={20} />
          <span>{formatTaskTime(task.dueDate)}</span>
        </div>
      </div>
      <div className="h-0.5 bg-gray-400 opacity-50 my-6"></div>
      <p className="text-xl max-h-80 overflow-y-auto">{task.description}</p>
      <div className="flex items-center justify-center gap-16 absolute bottom-10 translate-x-[90%]">
        <div className="bg-[#05243E] w-fit px-8 py-3 rounded-md flex flex-col items-center gap-2">
          <Check className="bg-green-500 rounded-full" />
          <h5 className="font-semibold">Done</h5>
        </div>
        <div className="bg-[#05243E] w-fit px-8 py-3 rounded-md flex flex-col items-center gap-2">
          <Trash2 className="text-red-500 rounded-full" />
          <h5 className="font-semibold">Delete</h5>
        </div>
        <div className="bg-[#05243E] w-fit px-8 py-3 rounded-md flex flex-col items-center gap-2">
          <Pin className="text-amber-500 rounded-full rotate-45" />
          <h5 className="font-semibold">Pin</h5>
        </div>
      </div>
    </div>
  );
};
