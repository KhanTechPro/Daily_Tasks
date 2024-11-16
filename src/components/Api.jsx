import axios from "axios";

// Base URL of the API
const BASE_URL = "https://todoapi.pythonanywhere.com/api";

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
}, (error) => {
  return Promise.reject(error);
});

// Reusable API functions

export const getTasks = async (filter) => {
  try {
    const response = await api.get(`/tasks/`, { params: { filter } });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post(`/tasks/`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}/`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}/`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const getSpecialTasks = async () => {
  try {
    const response = await api.get(`/special-tasks/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching special tasks:", error);
    throw error;
  }
};

export const createSpecialTask = async (taskData) => {
  try {
    const response = await api.post(`/special-tasks/`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating special task:", error);
    throw error;
  }
};

export const updateSpecialTask = async (id, taskData) => {
  try {
    const response = await api.put(`/special-tasks/${id}/`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating special task:", error);
    throw error;
  }
};

export const deleteSpecialTask = async (id) => {
  try {
    await api.delete(`/special-tasks/${id}/`);
  } catch (error) {
    console.error("Error deleting special task:", error);
    throw error;
  }
};
