import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./UserContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser(); // Get user data from context

  const handleAddSpecialDayClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-4 bg-white border border-[#5200ff] md:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black flex items-center space-x-2">
            <span>Daily Tasks</span>
            <span>🎯</span>
          </h1>
        </div>
        <div>
          <img
            src="/user-icon.png"
            alt="User Icon"
            className="w-10 h-10 rounded-full border-2 border-[#5200ff]"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex h-[calc(100vh-64px)] border-b border-[#5200ff]">
        <div className="w-1/4 border border-[#5200ff] hidden md:block">
          <aside className="h-full">
            <div className="flex items-center p-4 border-b border-[#5200ff]">
              <img
                src="https://via.placeholder.com/80"
                alt="User"
                className="w-20 h-20 rounded-md border-2 border-[#5200ff]"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">
                  {user?.username || "Guest"}
                </h2>
                <p className="text-gray-500">
                  {user?.email || "Please sign in"}
                </p>
              </div>
            </div>
            <nav className="flex flex-col text-xl cursor-pointer divide-y divide-[#5200ff]">
              <NavLink
                to="/daily"
                className={({ isActive }) =>
                  isActive ? "bg-[#5200ff] text-white py-2 px-4" : "py-2 px-4"
                }
              >
                Today's Challenge
              </NavLink>
              <NavLink
                to="/weekly"
                className={({ isActive }) =>
                  isActive ? "bg-[#5200ff] text-white py-2 px-4" : "py-2 px-4"
                }
              >
                Weekly Challenge
              </NavLink>
              <NavLink
                to="/monthly"
                className={({ isActive }) =>
                  isActive ? "bg-[#5200ff] text-white py-2 px-4" : "py-2 px-4"
                }
              >
                Monthly Challenge
              </NavLink>
              <NavLink
                to="/add-special-day"
                className={({ isActive }) =>
                  isActive ? "bg-[#5200ff] text-white py-2 px-4" : "py-2 px-4"
                }
                onClick={handleAddSpecialDayClick}
              >
                + add special day
              </NavLink>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
