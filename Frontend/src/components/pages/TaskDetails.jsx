import { task_api } from "@/api/task.api";
import { CalendarDays, Check, Clock, Edit, Pin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../common/Loading";
import { formatTaskDay, formatTaskTime } from "@/utils/formatDate";
import { DetailsBtn } from "../ui/DetailsBtn";
import { H4 } from "../common/H4";
import { TitleBar } from "../ui/TitleBar";
import { toast } from "sonner";
import { CreateTask } from "./CreateTask";
import { AlertDialogBox } from "../common/AlertDialogBox";

export const TaskDetails = () => {
  const [open, setOpen] = useState(false);
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
    toast.success("Task deleted successfully!");
    navigate(-1);
  };

  const handleCompleteTask = async () => {
    try {
      const res = await task_api.patch(`/${taskId}`, {
        status: "completed",
      });

      setTask(res.data.task);
      toast.success("Task completed successfully!");
    } catch (error) {
      toast.error("Failed to update task");
      console.error("Failed to update task", error);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTask(updatedTask);
  };

  if (!task) return <Loading />;

  return (
    <>
      <div
        className={`min-h-screen relative w-full px-4 sm:px-16 lg:px-32 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white ${
          open ? "blur-[2px]" : ""
        }`}
      >
        <TitleBar t="Tasks Details" />

        <div className="space-y-2 mt-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <H4 h={task.title} className="pb-0" />

            <Edit
              className="pt-1 cursor-pointer hover:scale-110 transition"
              onClick={() => setOpen(true)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-200">
            <CalendarDays className="h-4 w-4" />
            <span>{formatTaskDay(task.dueDate)}</span>

            <span>|</span>

            <Clock className="h-4 w-4" />
            <span>{formatTaskTime(task.dueDate)}</span>
          </div>
        </div>

        <div className="h-0.5 bg-gray-400 opacity-50 my-6"></div>

        <p className="text-sm sm:text-lg lg:text-xl max-h-[40vh] sm:max-h-[50vh] overflow-y-auto pr-1">
          {task.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 mt-10 sm:mt-16">

          {task.status === "pending" && (
            <AlertDialogBox
              title="Mark task as completed?"
              desc="Mark task as completed?"
              yes="Confirm"
              fn={handleCompleteTask}
            >
              <DetailsBtn
                icon={Check}
                text="Done"
                className="bg-green-500"
              />
            </AlertDialogBox>
          )}

          <AlertDialogBox
            title="Delete this task?"
            desc="This action cannot be undone."
            yes="Delete"
            variant="danger"
            fn={handleDeleteTask}
          >
            <DetailsBtn
              icon={Trash2}
              text={"Delete"}
              className={"text-red-500"}
            />
          </AlertDialogBox>

          <AlertDialogBox
            title="Pin this task?"
            desc="This task will appear at the top of your task list."
            yes="Coming soon"
          >
            <DetailsBtn
              icon={Pin}
              text={"Pin"}
              className="text-amber-500 rotate-45"
            />
          </AlertDialogBox>

        </div>
      </div>

      <CreateTask
        t="Update Task"
        open={open}
        setOpen={setOpen}
        task={task}
        taskId={taskId}
        onTaskUpdated={handleTaskUpdate}
      />
    </>
  );
};