import axios from "axios";

export const nextServer = axios.create({
  baseURL: "https://09-auth-eight-mu.vercel.app/api",
  withCredentials: true,
});
