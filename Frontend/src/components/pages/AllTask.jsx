import { Plus, Search } from "lucide-react";
import { TaskBar } from "../ui/TaskBar";
import { useState } from "react";
import { CreateTask } from "./CreateTask";
import { formatDate } from "@/utils/formatDate";
import { useHomeData } from "@/hooks/useHomeData";
import { H4 } from "../common/H4";
import { Navbar } from "../ui/Navbar";
import { Loading } from "../common/Loading";
import { LoadingSpinner } from "../common/LoadingSpinner";

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
        className={`min-h-screen relative w-full px-6 sm:px-40 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white ${open ? "blur-[2px]" : ""}`}
      >
        <nav className="flex items-center justify-between mb-4 sm:mb-0">
          <div className="bg-[#103462] w-fit py-2 px-4 rounded-md flex items-center">
            <input
              type="text"
              placeholder="Search by task title..."
              className="outline-none w-40 sm:w-72 text-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="text-[#8597AF] h-5 w-5" />
          </div>
          <div className="py-1.5 sm:py-2 px-2 sm:pl-4 w-20 rounded-md bg-[#103462]">
            <select
              name=""
              id=""
              className="mr-3 w-full outline-none text-[#8597AF] font-semibold cursor-pointer"
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
        <div className="max-h-110 overflow-y-auto flex flex-col gap-6">
          {loading ? <LoadingSpinner className="mt-25" /> : filteredTasks.length === 0 ? (
            <h2 className="text-sm sm:text-lg">No tasks found</h2>
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
        <div className="fixed right-10 bottom-20 sm:right-20 sm:bottom-20">
          <button onClick={() => setOpen(true)} className="cursor-pointer">
            <Plus className="bg-[#63D9F3] rounded-full h-10 w-10 p-1" />
          </button>
        </div>
      </div>
      <CreateTask open={open} setOpen={setOpen} refetchTasks={refetchTasks} />
      <Navbar />
    </>
  );
};
