import axios from "axios";

export const auth_api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});