import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Sign from "./components/Sign";
import UserProfileToday from "./components/UserProfileToday";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <Navbar username="John Doe" email="johndoe@example.com" />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/daily" /> : <Navigate to="/sign" />
          }
        />

        <Route path="register" element={<Register />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="sign" element={<Sign />} />
        <Route path="user-context" element={<UserProvider />} />
        <Route path="/daily" element={<div />} />
        <Route path="/weekly" element={<div />} />
        <Route path="/monthly" element={<div />} />
        <Route path="/add-special-day" element={<div />} />

        <Route
          path="UserProfileToday"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserProfileToday />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
