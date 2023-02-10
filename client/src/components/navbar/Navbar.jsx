import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const LinkClasses =
  "text-2xl w-3/4 py-3 text-center after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-5 after:rounded-3xl after:w-0 hover:after:w-full after:transition-all after:duration-700 after:mt-1.5";

const Navbar = () => {
  const cookie = new Cookies();
  const location = useLocation();
  const [LoggedIn, setLoggedIn] = useState("");
  const [Navbar, setNavbar] = useState({
    navbar: "-right-full",
    span1: "",
    span2: "",
    span3: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn("true");
    } else {
      setLoggedIn("");
    }
  }, [location.pathname]);

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
  const logout = () => {
    setLoggedIn("");
    localStorage.removeItem("token");
    cookie.remove("contactNo");
    cookie.remove("carDetails");
    cookie.remove("leadDetails");
    cookie.remove("customerData");
    cookie.remove("customerDetail");
    cookie.remove("loanDetail");
  };
  return (
    <div>
      <div>
        <div className="fixed left-1/2 -translate-x-1/2 max-w-screen-2xl h-16 w-full z-30 flex justify-center px-4 md:px-16">
          <div className="flex w-full">
            <div className="font-medium overflow-hidden h-16 text-primary-color-1 dark:text-primary-color-7 flex justify-center items-center top-2 left-0">
              <Link to={"/"} className="flex items-center hover:cursor-pointer">
                <div className="flex flex-col items-end">
                  <p className="text-2xl leading-6 tracking-wider">C</p>
                  <p className="text-2xl leading-6 tracking-wider">LO</p>
                </div>
                <p className="text-6xl">A</p>
                <div className="flex flex-col">
                  <p className="text-2xl leading-6 tracking-wider">R</p>
                  <p className="text-2xl leading-6 tracking-wider">NS</p>
                </div>
              </Link>
            </div>
          </div>
          {LoggedIn !== "" ? (
            <div className="hidden md:flex items-center p-1.5 mx-5 font-medium text-primary-color-6 dark:text-primary-color-7 my-2 rounded-md border-2 border-primary-color-1 dark:border-primary-color-5 hover:bg-primary-color-9/80 hover:text-primary-color-7 dark:hover:bg-primary-color-7 dark:hover:text-primary-color-4">
              <Link to={"/"} onClick={logout} className="text-xl ">
                LOGOUT
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center p-1.5 mx-5 font-medium text-primary-color-6 dark:text-primary-color-7 my-2 rounded-md border-2 border-primary-color-1 dark:border-primary-color-5 hover:bg-primary-color-9/80 hover:text-primary-color-7 dark:hover:bg-primary-color-7 dark:hover:text-primary-color-4">
              <Link to={"/login"} className="text-xl ">
                LOGIN
              </Link>
            </div>
          )}
          <button onClick={toggleNav}>
            <div className="flex flex-col">
              <span
                className={
                  Navbar.span1 +
                  " transition-all after:duration-500 after:w-9 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-5 after:block"
                }
              ></span>
              <span
                className={
                  Navbar.span2 +
                  " transition-all after:duration-500 after:w-5 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-5 after:block"
                }
              ></span>
              <span
                className={
                  Navbar.span3 +
                  " transition-all after:duration-500 after:w-9 after:my-1 after:rounded-xl after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-5 after:block"
                }
              ></span>
            </div>
          </button>
        </div>
      </div>
      <div
        className={
          Navbar.navbar +
          " fixed font-medium w-screen md:w-1/3 transition-all duration-500 bg-navbar-primary-color-1 text-primary-color-4 dark:bg-primary-color-9 dark:text-primary-color-7 z-20 top-0"
        }
      >
        <div className="flex flex-col justify-center items-center gap-y-5 h-screen uppercase">
          {LoggedIn !== "" && (
            <Link to={"/dashboard"} onClick={toggleNav} className={LinkClasses}>
              Dashboard
            </Link>
          )}
          <Link to={"/"} onClick={toggleNav} className={LinkClasses}>
            Services
          </Link>
          <Link to={"/"} onClick={toggleNav} className={LinkClasses}>
            Partners
          </Link>
          <Link to={"/"} onClick={toggleNav} className={LinkClasses}>
            About
          </Link>
          <Link to={"/"} onClick={toggleNav} className={LinkClasses}>
            Contact US
          </Link>
          <Link to={"/review-test"} onClick={toggleNav} className={LinkClasses}>
            Coding Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
