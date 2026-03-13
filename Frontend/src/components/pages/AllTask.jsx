import { Plus, Search } from "lucide-react";
import { TaskBar } from "../ui/TaskBar";
import { useState } from "react";
import { CreateTask } from "./CreateTask";
import { formatDate } from "@/utils/formatDate";
import { useHomeData } from "@/hooks/useHomeData";
import { H4 } from "../common/H4";
import { Navbar } from "../ui/Navbar";
import { TaskBarShimmer } from "../shimmer/TaskBarShimmer";

export const AllTask = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { allTasks, refetchTasks, loading } = useHomeData();

  const filteredTasks = allTasks.filter((task) => {
    const matchStatus =
      selectedStatus === "all" || task.status === selectedStatus;

    const matchSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <>
      <div
        className={`min-h-screen relative w-full px-4 sm:px-16 lg:px-32 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white ${
          open ? "blur-[2px]" : ""
        }`}
      >
        {/* Top Controls */}
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center sm:justify-between mb-4">

          {/* Search */}
          <div className="bg-[#103462] w-full sm:w-fit py-2 px-3 sm:px-4 rounded-md flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by task title..."
              className="outline-none w-full sm:w-64 lg:w-80 text-sm bg-transparent placeholder:text-[#8597AF]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="text-[#8597AF] h-5 w-5 shrink-0" />
          </div>

          {/* Filter */}
          <div className="py-2 px-3 sm:px-4 w-full sm:w-32 rounded-md bg-[#103462]">
            <select
              className="w-full outline-none bg-transparent text-[#8597AF] font-semibold cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </nav>

        <H4 h="Tasks List" className={"pb-2"} />

        {/* Task List */}
        <div className="max-h-[60vh] sm:max-h-[65vh] overflow-y-auto flex flex-col gap-4 sm:gap-6 pr-1">
          {loading ? (
            <>
              <TaskBarShimmer showIcon />
              <TaskBarShimmer />
              <TaskBarShimmer showIcon />
              <TaskBarShimmer />
            </>
          ) : filteredTasks.length === 0 ? (
            <h2 className="text-sm sm:text-lg text-gray-200">
              No tasks found
            </h2>
          ) : (
            filteredTasks.map((task) => {
              return (
                <TaskBar
                  key={task._id}
                  to={`/task/${task._id}`}
                  head={task.title}
                  dueDate={formatDate(task.dueDate)}
                  status={task.status}
                />
              );
            })
          )}
        </div>

        {/* Floating Add Button */}
        <div className="fixed right-6 bottom-24 sm:right-12 sm:bottom-20">
          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:scale-105 transition"
          >
            <Plus className="bg-[#63D9F3] rounded-full h-11 w-11 p-2 shadow-lg" />
          </button>
        </div>
      </div>

      <CreateTask
        t="Create Task"
        open={open}
        setOpen={setOpen}
        refetchTasks={refetchTasks}
      />

      <Navbar />
    </>
  );
};