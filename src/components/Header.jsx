import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="max-w-[1024px] mx-auto p-4 flex flex-row justify-between items-center border-b-2">
        <Link to={"/"}>
          <h1>🎯 Daily Tasks</h1>
        </Link>
        <Link
          to={"./Sign"}
          className="bg-black text-white px-8 py-1 rounded-md font-Kanit"
        >
          Sign-in
        </Link>
      </div>
    </>
  );
};

export default Header;
