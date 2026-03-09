import axios from "axios";

export const task_api = axios.create({
  baseURL: "http://localhost:3000/api/task",
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