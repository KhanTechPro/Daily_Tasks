import React, { useState, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Register() {
  const userRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password: pwd }),
      });

      if (response.ok) {
        // Redirect to the OTP verification page after successful registration
        navigate("/verify-otp");
      } else {
        setErrMsg("Registration error. Please try again.");
      }
    } catch (error) {
      setErrMsg("Network error! Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1024px] md:w-[550px] md:h-[500px] mx-auto relative md:top-[100px] p-10 m-6 border-2 rounded-md">
        <h2 className="md:text-3xl font-regular">Sign up</h2>
        <p className="py-2">
          Nice to meet you! Enter your details to register.
        </p>
        {errMsg && (
          <p ref={errRef} className="text-red-500">
            {errMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col relative top-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            className="border-2 p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            maxLength={255}
          />

          <label htmlFor="email" className="mt-8">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
          />

          <label htmlFor="password" className="mt-8">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 p-1"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            minLength={1}
          />

          <div className="flex items-center justify-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
            >
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
