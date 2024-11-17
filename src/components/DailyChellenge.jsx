import React, { useState, useEffect } from "react";
import toDoList from "./ToDoList";

function DailyChellenge() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data (e.g., API request)
    const timeout = setTimeout(() => setLoading(false), 1000); // Mock delay
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:flex-row p-4">
      {/* Header Section */}
      <div className="flex lg:space-x-0 lg:flex-row justify-center items-center bg-[#5200ff] h-14">
        <div className="text-white text-2xl">Today {formattedDate}</div>
      </div>

      {/* Task List */}
      <toDoList date={formattedDate} />
    </div>
  );
}

export default DailyChellenge;
