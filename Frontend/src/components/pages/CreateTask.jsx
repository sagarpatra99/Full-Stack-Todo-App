import { task_api } from "@/api/task.api";
import { TextAlignCenter, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CreateTask = ({
  t,
  open,
  setOpen,
  refetchTasks,
  task,
  taskId,
  onTaskUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (task && taskId) {
      const due = new Date(task.dueDate);

      setForm({
        title: task.title || "",
        description: task.description || "",
        date: due.toISOString().split("T")[0],
        time: due.toTimeString().slice(0, 5),
      });
    }
  }, [task, taskId]);

  useEffect(() => {
    if (!open && !taskId) {
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
      });
    }
  }, [open, taskId]);

  const handleCreateTask = async () => {
    try {
      if (!form.title || !form.date || !form.time) {
        toast.error("Title, date and time are required");
        return;
      }

      setLoading(true);
      const dueDate = new Date(`${form.date}T${form.time}`);

      if (taskId) {
        const res = await task_api.patch(`/${taskId}`, {
          title: form.title,
          description: form.description,
          dueDate: dueDate,
        });
        onTaskUpdated && onTaskUpdated(res.data.task);
        toast.success("Task updated successfully");
      } else {
        await task_api.post("/", {
          title: form.title,
          description: form.description,
          dueDate: dueDate,
        });
        toast.success("Task created successfully");
      }

      refetchTasks && (await refetchTasks());
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="">
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 bottom-0 w-full sm:w-7xl bg-white text-black rounded-t-3xl z-50 transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3 sm:px-8 sm:py-6 space-y-5">
          <h2 className="text-3xl font-semibold mb-">{t}</h2>
          <div className="w-full p-2.5 sm:p-3.5 rounded bg-[#05243E] text-white flex items-center gap-4">
            <Type className="text-gray-300 h-5 w-5" />
            <input
              type="text"
              placeholder="Task Title"
              className="outline-none sm:text-xl"
              value={form.title}
              onChange={handleChange("title")}
            />
          </div>

          <div className="w-full p-2.5 sm:p-3.5 rounded bg-[#05243E] text-white flex items-start gap-4">
            <TextAlignCenter className="text-gray-300 h-5 w-5" />
            <textarea
              placeholder="Description"
              className="outline-none h-68 overflow-y-auto sm:text-lg w-full"
              value={form.description}
              onChange={handleChange("description")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="date"
                className="outline-none text-xs p-2 sm:p-3.5 rounded bg-[#05243E] text-white"
                value={form.date}
                onChange={handleChange("date")}
              />
              <input
                type="time"
                className="outline-none text-xs p-2 sm:p-3.5 rounded bg-[#05243E] text-white"
                value={form.time}
                onChange={handleChange("time")}
              />
            </div>
            <button
              disabled={loading}
              className="bg-[#0EA5E9] text-white text-xs   sm:text-xl px-4 py-2 rounded cursor-pointer"
              onClick={async () => {
                await handleCreateTask();
                setOpen(false);
              }}
            >
              {loading ? "Saving" : taskId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
