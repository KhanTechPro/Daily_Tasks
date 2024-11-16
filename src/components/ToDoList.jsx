import React, { useState, useEffect } from "react";

// Replace ACCESS_TOKEN with your actual JWT token
const ACCESS_TOKEN = "your_access_token_here";

function ToDoList() {
  const [tasks, setTasks] = useState({ todo: [], inProcess: [], done: [] });
  const [newTask, setNewTask] = useState("");

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetch all tasks from the API and organize them by status
   */
  const fetchTasks = async () => {
    try {
      const response = await fetch("/special-tasks/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const organizedTasks = { todo: [], inProcess: [], done: [] };

        // Organize tasks based on their status
        data.forEach((task) => {
          if (task.status === "To Do") organizedTasks.todo.push(task);
          else if (task.status === "In Process")
            organizedTasks.inProcess.push(task);
          else if (task.status === "Done") organizedTasks.done.push(task);
        });

        setTasks(organizedTasks);
      } else {
        console.error("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  /**
   * Add a new task to the "To Do" list
   */
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch("/special-tasks/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ title: newTask, status: "To Do" }),
        });

        if (response.status === 201) {
          setNewTask("");
          fetchTasks(); // Refresh the task list
        } else {
          console.error("Failed to add task.");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  /**
   * Update the status of a task
   * @param {Object} task - The task object
   * @param {string} newStatus - The new status ("To Do", "In Process", "Done")
   */
  const updateTaskStatus = async (task, newStatus) => {
    try {
      const response = await fetch(`/special-tasks-id/${task.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ title: task.title, status: newStatus }),
      });

      if (response.ok) {
        fetchTasks(); // Refresh the task list
      } else {
        console.error("Failed to update task status.");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  /**
   * Delete a task
   * @param {string} taskId - The ID of the task to delete
   */
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/special-tasks-id/${taskId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (response.status === 204) {
        fetchTasks(); // Refresh the task list
      } else {
        console.error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  /**
   * Render tasks with options to move or delete
   */
  const renderTasks = (tasks, status) =>
    tasks.map((task) => (
      <div
        key={task.id}
        className="flex justify-between items-center p-2 border-b border-gray-300"
      >
        <span>{task.title}</span>
        <div className="flex space-x-2">
          {status !== "To Do" && (
            <button
              onClick={() => updateTaskStatus(task, "To Do")}
              className="text-sm text-blue-500 hover:underline"
            >
              Move to To Do
            </button>
          )}
          {status !== "In Process" && (
            <button
              onClick={() => updateTaskStatus(task, "In Process")}
              className="text-sm text-blue-500 hover:underline"
            >
              Move to In Process
            </button>
          )}
          {status !== "Done" && (
            <button
              onClick={() => updateTaskStatus(task, "Done")}
              className="text-sm text-blue-500 hover:underline"
            >
              Move to Done
            </button>
          )}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-[#5200ff] mb-6">To-Do List</h1>

      <div className="flex space-x-4 w-full max-w-5xl">
        {/* To Do List */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">To Do</h2>
          <div className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-[#5200ff]"
            />
            <button
              onClick={addTask}
              className="mt-2 w-full bg-[#5200ff] text-white px-4 py-2 rounded-lg hover:bg-[#4200cc]"
            >
              Add Task
            </button>
          </div>
          {renderTasks(tasks.todo, "To Do")}
        </div>

        {/* In Process List */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            In Process
          </h2>
          {renderTasks(tasks.inProcess, "In Process")}
        </div>

        {/* Done List */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Done</h2>
          {renderTasks(tasks.done, "Done")}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
