import axios from "axios";
import { API_URL } from "../services/consts";
import { useHistory } from "react-router-dom";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
});

$api.interceptors.response.use(
  (_) => _,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/auth");
    }
  }
);

export { $api };
