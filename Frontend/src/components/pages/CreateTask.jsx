import { CalendarDays, Clock9, TextAlignCenter, Type } from "lucide-react";

export const CreateTask = ({ open, setOpen }) => {
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
            />
          </div>

          <div className="w-full p-3.5 rounded bg-[#05243E] text-white flex items-start gap-4">
            <TextAlignCenter className="text-gray-300" />
            <textarea
              placeholder="Description"
              className="outline-none h-68 overflow-y-auto text-lg w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input type="date" className="outline-none p-3.5 rounded bg-[#05243E] text-white" />
              <input type="time" className="outline-none p-3.5 rounded bg-[#05243E] text-white" />
            </div>
            <button
              className="bg-[#0EA5E9] text-white text-xl px-4 py-2 rounded cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
