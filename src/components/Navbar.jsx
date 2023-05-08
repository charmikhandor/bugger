import React from "react";
import { Link } from "react-router-dom";
export default function Navbarcomp() {
  return (
    <nav
      className={`px-5 text-light-text w-full py-3 fixed top-0 backdrop-opacity-30  bg-dark-background/30`}
    >
      <div className="flex justify-between">
        <div className="px-8">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Bugger
          </Link>
        </div>
        <div className="flex space-x-10 hover:text-white hover:text-[17px]">
          <div className="">
            <Link
              to="/login"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Login
            </Link>
          </div>
          <div className="flex hover:text-white hover:text-[17px]">
            <Link
              to="/signup"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
