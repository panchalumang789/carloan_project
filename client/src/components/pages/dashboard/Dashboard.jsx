import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import loanService from "services/loanService";
import Cookies from "universal-cookie";
import Footer from "../Footer";

const Dashboard = () => {
  const cookie = new Cookies();
  const [user, setUser] = useState([]);
  const [Widget, setWidget] = useState("hidden");
  cookie.remove("contactNo");
  cookie.remove("carDetails");
  cookie.remove("leadDetails");
  cookie.remove("customerData");
  cookie.remove("customerDetail");
  cookie.remove("loanDetail");
  useEffect(() => {
    const gerLoans = new loanService();
    (async () => {
      const getLoan = await gerLoans.getLoan({
        headerData: localStorage.getItem("token"),
      });
      setUser(getLoan.user);
    })();

    return () => {};
  }, []);

  const openWidget = () => {
    setWidget(Widget === "hidden" ? "flex" : "hidden");
  };
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-1 dark:text-primary-color-7">
        <div className="flex gap-y-14 max-w-screen-2xl mx-auto overflow-y-hidden h-full">
          <div className="flex relative top-14 w-full px-2 lg:px-8 flex-col">
            <div className="flex justify-between text-base md:text-xl p-4 border-t-2 border-primary-color-1 dark:border-primary-color-7 mt-4 w-full">
              <div>
                Welcome
                <span className="font-medium uppercase px-1">{user.name}</span>
              </div>
              <div className="px-3 flex items-center">
                <span className="text-base text-primary-color-1 dark:text-primary-color-7 fa-solid fa-phone"></span>
                <span className="text-base font-medium ml-1 mr-3">
                  {user.contactNo}
                </span>
                <span
                  onClick={openWidget}
                  className="fa-solid fa-ellipsis cursor-pointer"
                ></span>
                <div className={Widget + " relative right-[167px] -top-2"}>
                  <div className="fixed text-sm font-medium flex flex-col bg-primary-color-7 dark:bg-primary-color-9 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-lg px-3 py-1 z-10">
                    <Link
                      id="new_loan"
                      to={"/journey"}
                      onClick={openWidget}
                      className="py-2 pr-3 border-b-2 border-primary-color-1 dark:border-primary-color-7 hover:text-primary-color-4 dark:hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-base pr-1 fa-solid fa-plus"></span>
                      <span> New</span>
                    </Link>
                    <Link
                      id="view_profile"
                      to={"/"}
                      onClick={openWidget}
                      className="py-2 pr-3 border-b-2 border-primary-color-1 dark:border-primary-color-7 hover:text-primary-color-4 dark:hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-base pr-1 fa-solid fa-user"></span>
                      <span> View Profile</span>
                    </Link>
                    <Link
                      id="logout"
                      to={"/"}
                      onClick={logout}
                      className="py-2 pr-3 hover:text-primary-color-4 dark:hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <em className="text-base pr-1 fa-solid fa-right-from-bracket"></em>
                      <span> Logout</span>
                    </Link>
                    {user.role === "Admin" && (
                      <>
                        <Link
                          to={"/dashboard"}
                          id="viewLoans"
                          onClick={openWidget}
                          className="py-2 pr-3 border-t-2 border-primary-color-1 dark:border-primary-color-7 hover:text-primary-color-4 dark:hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <em className="text-base pr-1 fa-solid fa-rectangle-list"></em>
                          <span> All Loans</span>
                        </Link>
                        <Link
                          to={"/dashboard/user"}
                          id="viewLoans"
                          onClick={openWidget}
                          className="py-2 pr-3 border-t-2 border-primary-color-1 dark:border-primary-color-7 hover:text-primary-color-4 dark:hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <em className="text-base pr-1 fa-solid fa-users"></em>
                          <span> All Users</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
