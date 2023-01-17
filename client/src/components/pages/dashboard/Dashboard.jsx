import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import loanService from "services/loanService";
import Footer from "../Footer";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const gerLoans = new loanService();
    (async () => {
      const getLoan = await gerLoans.getLoan({
        path: "loans",
        headerData: localStorage.getItem("token"),
      });
      setUser(getLoan.user);
    })();

    return () => {};
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7">
        <div className="flex gap-y-14 max-w-screen-2xl mx-auto">
          <div className="flex flex-col h-[calc(100vh-56px)] w-full">
            <div className="text-2xl p-4 z-20">
              Welcome <span className="font-medium uppercase">{user.name}</span>
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
