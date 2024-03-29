import axios from "axios";

export const api = axios.create({ baseURL: import.meta.env.VITE_DATABASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((config) => {
  if (config.status === 401) {
    localStorage.removeItem("");
    window.location.reload();
  }

  return config;
});
