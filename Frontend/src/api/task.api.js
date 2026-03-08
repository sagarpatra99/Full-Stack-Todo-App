import axios from "axios";

export const task_api = axios.create({
  baseURL: "http://localhost:3000/api/task",
  withCredentials: true,
});