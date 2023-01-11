import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [Navbar, setNavbar] = useState({
    navbar: "-right-full",
    span1: "",
    span2: "",
    span3: "",
  });
  const toggleNav = () => {
    let open = {
      navbar: "right-0",
      span1: "after:rotate-45 after:mt-5",
      span2: "opacity-0",
      span3: "after:-rotate-45 after:-mt-5",
    };
    let close = {
      navbar: "-right-full",
      span1: "",
      span2: "",
      span3: "",
    };
    setNavbar(Navbar.navbar === "-right-full" ? open : close);
  };
  return (
    <div>
      <div>
        <div className="fixed top-5 right-8 max-w-screen-sm md:top-8 md:right-16 p-2 z-50">
          <button onClick={toggleNav}>
            <div className="flex flex-col">
              <span
                className={
                  Navbar.span1 +
                  " transition-all after:duration-500 after:w-9 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:block group-hover:"
                }
              ></span>
              <span
                className={
                  Navbar.span2 +
                  " transition-all after:duration-500 after:w-5 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:block"
                }
              ></span>
              <span
                className={
                  Navbar.span3 +
                  " transition-all after:duration-500 after:w-9 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:block"
                }
              ></span>
            </div>
          </button>
        </div>
      </div>
      <div
        className={
          Navbar.navbar +
          " fixed w-screen md:w-2/5 transition-all duration-700 bg-primary-color-3 text-primary-color-4 dark:bg-primary-color-6 dark:text-primary-color-5 z-10 top-0"
        }
      >
        <div className="flex flex-col justify-center items-center gap-y-6 h-screen uppercase">
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Get Overview
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Services
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Partners
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              About
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-4 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1">
            <Link to={"/"} className="text-2xl">
              Contact US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
