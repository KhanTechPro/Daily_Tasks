import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useUser } from "./UserContext"; // Context for global user state

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for submit
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from context

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setErrMsg("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/accounts/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User Data:", userData);

        if (userData.access) {
          localStorage.setItem("authToken", userData.access);
        }
        if (userData.refresh) {
          localStorage.setItem("refreshToken", userData.refresh);
        }

        setUser({
          email: userData.email,
          token: userData.access,
        });

        navigate("/navbar");
      } else {
        const data = await response.json();
        setErrMsg(
          data?.detail || "Sign-in error. Please check your credentials."
        );
      }
    } catch (error) {
      setErrMsg("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[1024px] md:w-[550px] mx-auto p-10 border-2 rounded-md">
        <h2 className="md:text-3xl">Sign in</h2>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 mt-6"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Sign;
