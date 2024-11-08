import React, { useState } from "react";
import AddSpecialDayModal from "./AddSpecialDayModal";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="px-6 my-2 mx-2 border border-[#5200ff]">
      <h1 className="text-2xl font-bold mb-4 text-[#5200ff]">Task Manager</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-[#5200ff] text-white rounded p-2"
      >
        + Add Special Day
      </button>

      {modalOpen && (
        <AddSpecialDayModal 
          onClose={() => setModalOpen(false)} 
          onSave={handleSaveTask} // Ensure this is correctly passed
        />
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold ">Saved Tasks:</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.month} {task.day}: {task.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;