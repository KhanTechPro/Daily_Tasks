import axios from "axios";

// Base URL of the API
const BASE_URL = "https://todoapi.pythonanywhere.com/api/:splat";

// Set up an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to include the JWT token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken"); // Store token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export reusable API functions
export const getTasks = async (filter) => {
  const response = await api.get(`/tasks/`, { params: { filter } });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post(`/tasks/`, taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks-id/${id}/`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks-id/${id}/`);
};

export const getSpecialTasks = async () => {
  const response = await api.get(`/special-tasks/`);
  return response.data;
};

export const createSpecialTask = async (taskData) => {
  const response = await api.post(`/special-tasks/`, taskData);
  return response.data;
};

export const updateSpecialTask = async (id, taskData) => {
  const response = await api.put(`/special-tasks-id/${id}/`, taskData);
  return response.data;
};

export const deleteSpecialTask = async (id) => {
  await api.delete(`/special-tasks-id/${id}/`);
};
