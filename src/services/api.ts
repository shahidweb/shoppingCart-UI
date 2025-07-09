import axios from "axios";
// import { RootState } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
