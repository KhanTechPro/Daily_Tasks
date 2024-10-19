import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Sign = () => {
  return (
    <>
      <Header />

      <div className="max-w-[1024px] md:w-[550px] md:h-[320px]  mx-auto relative md:top-[100px] p-10 m-6 border-2 rounded-md">
        <h2 className="md:text-3xl font-regular">Sign up</h2>
        <p className="py-2">Nice to meet you! Enter your email to login.</p>
        <form action="" className="flex flex-col relative top-4">
          <label htmlFor="email" className="mt-4">
            Your Email
          </label>
          <input type="email" id="email" className="border-2 p-1" />

          <div className="flex items-center justify-center my-8">
            <Link
              to={"/userProfileToday"}
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
            >
              Sign-up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sign;
