import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1024px] mx-auto p-4 flex flex-col justify-center items-center text-center relative md:top-[120px] top-[100px]">
        <h1 className="md:text-6xl text-4xl font-medium py-4">Daily Tasks</h1>
        <p className="md:text-xl text-md">
          After a stroke, it can take time to figure out how to do the tasks
          that make up daily life. Here are some tips. Find useful services and
          connect with others living with heart disease or stroke.
        </p>
        <Link
          to={"./register"}
          className="bg-black text-white px-10 py-2 rounded-md font-Kanit relative top-4"
        >
          Get-started
        </Link>
      </div>
    </>
  );
};

export default Hero;
