import axios from "axios";

export const auth_api = axios.create({
  baseURL: "https://full-stack-todo-app-3v4h.onrender.com/api/auth",
  withCredentials: true,
});

export const getCurrentUser = () => {
  return auth_api.get("/get-me");
};