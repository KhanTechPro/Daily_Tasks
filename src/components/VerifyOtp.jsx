import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/accounts/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": "your-csrf-token-here", // Add your CSRF token if needed
        },
        body: JSON.stringify({ email, otp_code: otpCode }),
      });

      if (response.ok) {
        navigate("/sign"); // Redirect to a welcome or home page after verification
      } else {
        const data = await response.json();
        setErrMsg(
          data.email
            ? data.email[0]
            : data.otp_code
            ? data.otp_code[0]
            : "Verification failed."
        );
      }
    } catch (error) {
      setErrMsg("Network error! Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1024px] md:w-[550px] md:h-[500px] mx-auto relative md:top-[100px] p-10 m-6 border-2 rounded-md">
        <h2 className="md:text-3xl font-regular">Verify OTP</h2>
        <p className="py-2">
          Enter the OTP sent to your email to complete registration.
        </p>
        {errMsg && <p className="text-red-500">{errMsg}</p>}

        <form onSubmit={handleVerify} className="flex flex-col relative top-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="otpCode" className="mt-8">
            OTP Code
          </label>
          <input
            type="text"
            id="otpCode"
            className="border-2 p-1"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            required
          />

          <div className="flex items-center justify-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
