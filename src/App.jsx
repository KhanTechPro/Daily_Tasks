import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Sign from "./components/Sign";
import Navbar from "./components/Navbar";
import { UserProvider } from "./components/UserContext";
import DailyChellenge from "./components/DailyChellenge";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <UserProvider>
      <Navbar username="John Doe" email="johndoe@example.com" />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/daily" /> : <Navigate to="/Sign" />
          }
        />

        <Route path="/sign" element={<Sign />} />

        <Route
          path="/daily"
          element={
            isAuthenticated ? <DailyChellenge /> : <Navigate to="/Sign" />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/user-context" element={<UserProvider />} />

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
