import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Sign from "./components/Sign";
import DailyChellenge from "./components/DailyChellenge";
import WeeklyChellenge from "./components/WeeklyChellenge";
import MonthlyChallenge from "./components/MonthlyChallenge";
import AddSpecialDayModal from "./components/AddSpecialDayModal";
import TaskManager from "./components/TaskManager";
import ToDoList from "./components/ToDoList";
import Api from "./components/Api";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/homePage" replace />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/toDoList" element={<ToDoList />} />
        <Route path="/api" element={<Api />} />
        <Route path="/daily" element={<DailyChellenge />} />
        <Route path="/weekly" element={<WeeklyChellenge />} />
        <Route path="/monthly" element={<MonthlyChallenge />} />
        <Route path="/add-special-day" element={<AddSpecialDayModal />} />
        <Route path="/taskManager" element={<TaskManager />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
