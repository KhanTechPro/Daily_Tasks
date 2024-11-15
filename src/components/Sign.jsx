import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the UserContext
import Header from "./Header";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/accounts/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json(); // Fetch user data
        setUser(userData); // Set user data in context
        localStorage.setItem("authToken", userData.token); // Store token
        navigate("/tasks"); // Redirect on successful login
      } else {
        const data = await response.json();
        setErrMsg(
          data.email
            ? data.email[0]
            : data.password
            ? data.password[0]
            : "Sign-in error."
        );
      }
    } catch (error) {
      setErrMsg("Network error! Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[1024px] md:w-[550px] md:h-[320px] mx-auto relative md:top-[100px] p-10 m-6 border-2 rounded-md">
        <h2 className="md:text-3xl font-regular">Sign in</h2>
        <p className="py-2">Nice to meet you! Enter your email to login.</p>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col relative top-4">
          <label htmlFor="email" className="mt-4">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
            >
              Sign-in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sign;
