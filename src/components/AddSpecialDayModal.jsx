import React, { useState } from "react";

function AddSpecialDayModal({ onClose, onSave }) {
  const [month, setMonth] = useState("January");
  const [day, setDay] = useState(1);
  const [task, setTask] = useState("");

  const handleSave = () => {
    if (task.trim() !== "") {
      const newTask = { month, day, task }; // Create task object
      onSave(newTask); // Call onSave with the new task
      setTask(""); // Clear task input
      setMonth("January"); // Reset month to default
      setDay(1); // Reset day to default
    } else {
      alert("Please enter a task."); // Alert if no task is entered
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold text-black mb-4">Add Special Day</h2>
        
        <div className="form-group mb-4">
          <label className="block text-[#5200ff] mb-1"></label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-[#5200ff] rounded-md p-2 text-[#5200ff] focus:outline-none focus:ring-2 focus:ring-[#5200ff]"
          >
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
       </div>

        <div className="form-group mb-4">
          <label className="block text-[#5200ff] mb-1"></label>
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border border-[#5200ff] rounded-md p-2 text-[#5200ff] focus:outline-none focus:ring-2 focus:ring-[#5200ff]"
          />
        </div>
        

        <div className="form-group mb-4">
          <label className="block text-[#5200ff] mb-1">Task</label>
          <textarea
            placeholder="+ add task ..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-[#5200ff] rounded-md p-2 text-[#5200ff] focus:outline-none focus:ring-2 focus:ring-[#5200ff] h-24"
          />
        </div>

        <button
          className="save-task-btn bg-[#5200ff] text-white font-bold rounded-md p-2 hover:bg-[#4400cc] transition duration-300 mr-2"
          onClick={handleSave}
        >
          Add task
        </button>
        <button
          className="close-modal-btn border border-[#5200ff] text-[#5200ff] font-bold rounded-md p-2 hover:bg-[#5200ff] hover:text-white transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddSpecialDayModal;