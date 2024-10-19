import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Sign from "./components/Sign";
import UserProfileToday from "./components/UserProfileToday";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign" element={<Sign />} />
        <Route path="register" element={<Register />} />
        <Route path="UserProfileToday" element={<UserProfileToday/>} />
      </Routes>
    </>
  );
}

export default App;
