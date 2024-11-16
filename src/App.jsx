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
  return (
    <UserProvider>
      <NavbarWrapper />
      <Routes>
        {/* Default route to /hero */}
        <Route path="/" element={<Navigate to="/hero" />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/sign" element={<PublicRoute element={<Sign />} />} />
        <Route
          path="/daily"
          element={<PrivateRoute element={<DailyChallenge />} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </UserProvider>
  );
}

const NavbarWrapper = () => {
  const { user } = useUser();
  return (
    <Navbar
      username={user ? user.username : "John Doe"}
      email={user ? user.email : "johndoe@example.com"}
    />
  );
};

// PrivateRoute: For pages only accessible to logged-in users
const PrivateRoute = ({ element }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/sign" />;
};

// PublicRoute: Redirect logged-in users away from public pages
const PublicRoute = ({ element }) => {
  const { user } = useUser();
  return user ? <Navigate to="/daily" /> : element;
};

export default App;
