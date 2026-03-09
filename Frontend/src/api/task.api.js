import axios from "axios";

export const task_api = axios.create({
  baseURL: "https://full-stack-todo-app-3v4h.onrender.com/api/task",
  withCredentials: true,
});

export const getTasksByStatus = (status) => {
  return task_api.get("", {
    params: { status },
  });
};

export const fetchAllTasks = async () => {
  const res = await task_api.get("/");
  return res;
};