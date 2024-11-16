// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Sign from "./components/Sign";
import Navbar from "./components/Navbar";
import { UserProvider, useUser } from "./components/UserContext";
import DailyChallenge from "./components/DailyChellenge";

function App() {
  const { user } = useUser(); // Get user from context

  return (
    <UserProvider>
      <Navbar
        username={user ? user.username : "John Doe"}
        email={user ? user.email : "johndoe@example.com"}
      />
      <Routes>
        {/* Default to /hero if no specific route is provided */}
        <Route path="/" element={<Navigate to="/hero" />} />
        <Route path="/hero" element={<Hero />} />

        {/* Other routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/weekly" element={<div>Weekly Page</div>} />
        <Route path="/monthly" element={<div>Monthly Page</div>} />
        <Route
          path="/add-special-day"
          element={<div>Add Special Day Page</div>}
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
