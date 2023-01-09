import React, { useState } from "react";
import { Link } from "react-router-dom";

import hamburgerIcon from "../../assest/images/hamburgerIcon.svg";
import crossIcon from "../../assest/images/crossIcon.svg";

const Navbar = () => {
  const [Navbar, setNavbar] = useState({
    navbar: "-right-full",
    icon: hamburgerIcon,
  });
  const toggleNav = () => {
    let open = { navbar: "right-0", icon: crossIcon };
    let close = { navbar: "-right-full", icon: hamburgerIcon };
    setNavbar(Navbar.navbar === "-right-full" ? open : close);
  };
  return (
    <>
      <div>
        <div className="fixed top-8 right-16 p-2">
          <button onClick={toggleNav}>
            <div className="flex flex-col">
              <span className="after:w-9 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-2 after:block "></span>
              <span className="after:w-5 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-2 after:block "></span>
              <span className="after:w-9 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-2 after:block "></span>
            </div>
            {/* <img src={Navbar.icon} alt="navIcon" className="h-10 w-10" /> */}
          </button>
        </div>
      </div>
      <div
        className={
          Navbar.navbar +
          " fixed w-2/5 transition-all duration-700 bg-primary-color-5 text-primary-color-4 dark:bg-primary-color-1 dark:text-primary-color-5 -z-10"
        }
      >
        <div className="flex flex-col justify-center items-center gap-y-6 h-screen">
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Hello
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Hello
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Hello
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5">
            <Link to={"/"} className="text-2xl">
              Hello
            </Link>
          </div>
          <div className="w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-4 dark:after:bg-primary-color-3 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1">
            <Link to={"/"} className="text-2xl">
              Hello
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
