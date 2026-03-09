import { getCurrentUser } from "@/api/auth.api";
import { fetchAllTasks } from "@/api/task.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useHomeData = () => {
  const [user, setUser] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetchTasks = async () => {
    const allTasksRes = await fetchAllTasks();
    const tasks = allTasksRes.data.tasks;

    setAllTasks(tasks);
    const pendingTasks = tasks.filter((t) => t.status === "pending");
    const completedTasks = tasks.filter((t) => t.status === "completed");
    setPendingTasks(pendingTasks);
    setCompletedTasks(completedTasks);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const userRes = await getCurrentUser();
        setUser(userRes.data.user);

        await refetchTasks();
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return {
    user,
    allTasks,
    pendingTasks,
    completedTasks,
    loading,
    refetchTasks,
  };
};
