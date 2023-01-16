import { motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loanService from "services/loanService";
import Footer from "./Footer";

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    const gerLoans = new loanService();
    (async () => {
      const getLoan = await gerLoans.getLoan({
        path: "loans",
        headerData: localStorage.getItem("token"),
      });
      setLoans(getLoan);
    })();

    return () => {};
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7">
        <div className="flex gap-y-14 max-w-screen-2xl h-[calc(100vh-125px)] mx-auto">
          <div className="flex flex-col h-full w-full">
            <div className="h-20 p-7">Hello</div>
            <div className="flex h-full w-full">
              <div className="w-5/6 lg:w-1/4">Dashboard</div>
              <div className="w-5/6 lg:w-3/4 h-full overflow-y-auto">
                <div className="flex flex-col gap-y-3">
                  {loans.map((loan, index) => {
                    return (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, x: "-25%" }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        className="w-full hover:cursor-pointer bg-primary-color-3 rounded-md"
                      >
                        <Link to={`/loan/${loan.id}`}>
                          <p>Approx amount:- {loan.approx_price}</p>
                          <p>Deposit:- {loan.deposit}</p>
                          <p>Term:- {loan.term}</p>
                          <p>Ballon:- {loan.ballon}</p>
                          <p>
                            Applied on:-{" "}
                            {new Date(loan.createdAt).toLocaleDateString()}
                          </p>
                        </Link>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
