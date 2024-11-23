import React, { useState, useEffect } from "react";
import {
  getSpecialTasks,
  createSpecialTask,
  updateSpecialTask,
  deleteSpecialTask,
} from "./Api";

function ToDoList() {
  const [tasks, setTasks] = useState({ todo: [], inProcess: [], done: [] });
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetch tasks using the API function and organize them
   */
  const fetchTasks = async () => {
    try {
      const data = await getSpecialTasks();
      const organizedTasks = { todo: [], inProcess: [], done: [] };

      data.forEach((task) => {
        if (task.status === "To Do") organizedTasks.todo.push(task);
        else if (task.status === "In Process")
          organizedTasks.inProcess.push(task);
        else if (task.status === "Done") organizedTasks.done.push(task);
      });

      setTasks(organizedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  /**
   * Add a new task using the API function
   */
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await createSpecialTask({ title: newTask, status: "To Do" });
        setNewTask("");
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  /**
   * Update task status using the API function
   * @param {Object} task - The task object
   * @param {string} newStatus - The new status ("To Do", "In Process", "Done")
   */
  const updateTaskStatus = async (task, newStatus) => {
    try {
      await updateSpecialTask(task.id, {
        title: task.title,
        status: newStatus,
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  /**
   * Delete a task using the API function
   * @param {string} taskId - The ID of the task to delete
   */
  const deleteTask = async (taskId) => {
    try {
      await deleteSpecialTask(taskId);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  /**
   * Render tasks for a specific status
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
