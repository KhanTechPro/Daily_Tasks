import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Sign from "./components/Sign";
import Navbar from "./components/Navbar";
import { UserProvider, useUser } from "./components/UserContext"; // UserProvider and useUser
import DailyChallenge from "./components/DailyChellenge";

function App() {
  return (
    // Wrap the entire app with UserProvider
    <UserProvider>
      <NavbarWrapper /> {/* Navbar depends on user */}
      <Routes>
        {/* Default route to /hero */}
        <Route path="/" element={<Navigate to="/hero" />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/daily"
          element={<PrivateRoute element={<DailyChallenge />} />}
        />
        <Route path="/sign" element={<PublicRoute element={<Sign />} />} />
      </Routes>
    </UserProvider>
  );
}

// Wrap Navbar with useUser to handle user info
const NavbarWrapper = () => {
  const { user } = useUser();
  return (
    <Navbar
      username={user ? user.username : "John Doe"}
      email={user ? user.email : "johndoe@example.com"}
    />
  );
};

// Helper Component: For private routes (only for logged-in users)
const PrivateRoute = ({ element }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/sign" />;
};

// Helper Component: For public routes (redirect if logged in)
const PublicRoute = ({ element }) => {
  const { user } = useUser();
  return user ? <Navigate to="/daily" /> : element;
};

export default App;
