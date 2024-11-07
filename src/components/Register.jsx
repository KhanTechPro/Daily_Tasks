import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Register() {
  const userRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Check if passwords match
  useEffect(() => {
    setValidMatch(pwd === matchPwd);
    if (errMsg) setErrMsg(""); // Clear error message on field changes
  }, [pwd, matchPwd, errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validMatch) {
      setErrMsg("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/accounts/signin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pwd }),
      });

      if (response.ok) {
        navigate("/signin");
      } else if (response.status === 401) {
        setErrMsg("Unauthorized. Please check your credentials.");
      } else {
        setErrMsg("Registration failed. Try again.");
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
          <label htmlFor="email" className="mt-8">
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={userRef}
            className="border-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />

          <label htmlFor="confirm_password" className="mt-8">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="border-2 p-1"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
          />
          {!validMatch && matchPwd && (
            <p className="text-red-500">Passwords must match.</p>
          )}

          <div className="flex items-center justify-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
              disabled={!validMatch}
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
