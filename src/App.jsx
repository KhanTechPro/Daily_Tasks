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
    <UserProvider>
      <Navbar username="John Doe" email="johndoe@example.com" />
      <Routes>
        {/* Redirect to /sign if not authenticated, otherwise to /daily */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/daily" /> : <Navigate to="/sign" />
          }
        />

        <Route path="/sign" element={<Sign />} />

        {/* Only allow access to /daily if authenticated */}
        <Route
          path="/daily"
          element={
            isAuthenticated ? <DailyChallenge /> : <Navigate to="/sign" />
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

        {/* Protected route example for UserProfileToday */}
        <Route
          path="/UserProfileToday"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserProfileToday />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
