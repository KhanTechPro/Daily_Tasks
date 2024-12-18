import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { createTask } from "./Api";

const BASE_URL = "https://todoapi.pythonanywhere.com/api";

const TaskManager = () => {
  const { accessToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    if (accessToken) fetchTasks();
  }, [accessToken]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else if (response.status === 401) {
        console.error("Unauthorized. Please check your access token.");
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty");
      return;
    }
    try {
      const response = await createTask({
        title: newTask,
        status: "To Do"
      })

      if (response.status === 200) {
        console.log(response.data)
        const task = response.data;
        setTasks([...tasks, task]);
        setNewTask("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, status: updatedTask.status } : task
          )
        );
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
