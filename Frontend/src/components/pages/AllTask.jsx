import { Plus, Search } from "lucide-react";
import { TaskBar } from "../ui/TaskBar";
import { useState } from "react";
import { CreateTask } from "./CreateTask";
// import { task_api } from "@/api/task.api";
import { formatDate } from "@/utils/formatDate";
import { useHomeData } from "@/hooks/useHomeData";

export const AllTask = () => {
  const [open, setOpen] = useState(false);
  // const [allTasks, setAllTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { allTasks, refetchTasks } = useHomeData();
  // useEffect(() => {}, [allTasks]);

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
        className={`min-h-screen relative w-full px-40 py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white ${open ? "blur-[2px]" : ""}`}
      >
        <nav className="flex items-center justify-between">
          <div className="bg-[#103462] w-fit py-2 px-4 rounded-md flex items-center">
            <input
              type="text"
              placeholder="Search by task title..."
              className="outline-none w-72"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="text-[#8597AF]" />
          </div>
          <div className="py-2 pl-4 rounded-md bg-[#103462]">
            <select
              name=""
              id=""
              className="mr-3 outline-none text-[#8597AF] font-semibold cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </nav>
        <h4 className="tracking-wider text-4xl py-8">Tasks Lists</h4>
        <div className="flex flex-col gap-6">
          {filteredTasks.length === 0 ? (
            <h2>No tasks found</h2>
          ) : (
            filteredTasks.map((task) => {
              return (
                <TaskBar
                  key={task._id}
                  to="/details"
                  head={task.title}
                  dueDate={formatDate(task.dueDate)}
                  status={task.status}
                />
              );
            })
          )}
        </div>
        <div className="fixed right-20 bottom-20">
          <button onClick={() => setOpen(true)} className="cursor-pointer">
            <Plus size={60} className="bg-[#63D9F3] rounded-full p-1" />
          </button>
        </div>
      </div>
      <CreateTask open={open} setOpen={setOpen} refetchTasks={refetchTasks} />
    </>
  );
};
