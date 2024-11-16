// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Sign from "./components/Sign";
import Navbar from "./components/Navbar";
import { UserProvider, useUser } from "./components/UserContext"; // Correct import
import DailyChallenge from "./components/DailyChellenge"; // Fixed typo (Chellenge -> Challenge)

function App() {
  const { user } = useUser(); // Get user from context

  return (
    <UserProvider>
      <Route index path="/hero" element={<Hero />} />
      <Navbar
        username={user ? user.username : "John Doe"}
        email={user ? user.email : "johndoe@example.com"}
      />
      <Routes>
        {/* Redirect to Daily Challenge if authenticated, else go to Sign */}
        <Route
          path="/"
          element={user ? <Navigate to="/daily" /> : <Navigate to="/sign" />}
        />
        <Route
          path="/sign"
          element={user ? <Navigate to="/daily" /> : <Sign />}
        />
        <Route
          path="/daily"
          element={user ? <DailyChallenge /> : <Navigate to="/sign" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/daily" element={<DailyChallenge />} />

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
