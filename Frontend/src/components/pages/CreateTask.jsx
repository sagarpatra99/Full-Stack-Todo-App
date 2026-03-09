import { task_api } from "@/api/task.api";
import { TextAlignCenter, Type } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateTask = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dueDate = new Date(`${date}T${time}`);

  const handleCreateTask = async () => {
    try {
      await task_api.post("/", { title, description, dueDate });
      toast.success("Task created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error.message || error);
    }
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
        className={`fixed left-1/2 -translate-x-1/2 bottom-0 w-7xl bg-white text-black rounded-t-3xl z-50 transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-8 py-6 space-y-5">
          <h2 className="text-3xl font-semibold mb-">Create Task</h2>
          <div className="w-full p-3.5 rounded bg-[#05243E] text-white flex items-center gap-4">
            <Type className="text-gray-300" />
            <input
              type="text"
              placeholder="Task Title"
              className="outline-none text-xl"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full p-3.5 rounded bg-[#05243E] text-white flex items-start gap-4">
            <TextAlignCenter className="text-gray-300" />
            <textarea
              placeholder="Description"
              className="outline-none h-68 overflow-y-auto text-lg w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="date"
                className="outline-none p-3.5 rounded bg-[#05243E] text-white"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                className="outline-none p-3.5 rounded bg-[#05243E] text-white"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <button
              className="bg-[#0EA5E9] text-white text-xl px-4 py-2 rounded cursor-pointer"
              onClick={async () => {
                await handleCreateTask();
                setOpen(false);
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
