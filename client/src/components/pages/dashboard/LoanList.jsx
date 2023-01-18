import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loanService from "services/loanService";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    const gerLoans = new loanService();
    (async () => {
      const getLoan = await gerLoans.getLoan({
        path: "loans",
        headerData: localStorage.getItem("token"),
      });
      setLoans(getLoan.loan);
    })();

    return () => {};
  }, []);
  return (
    <div className="p-4 lg:p-0 gap-y-3 flex h-[calc(100vh-122px)] flex-col lg:flex-row w-full gap-x-6">
      <div className="w-full border-2 border-primary-color-1 rounded-md lg:w-1/5 p-3 text-primary-color-1 dark:text-primary-color-7">
        <Link
          to={"/journey"}
          className="font-medium flex items-center justify-end gap-x-2 w-44 text-center p-3 mt-2 mb-4 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 bg-white/30 dark:border-primary-color-3 hover:bg-primary-color-3 hover:text-primary-color-7 transition-all duration-500"
        >
          <em className="text-xl fa-solid fa-plus"></em>
          Apply new loan
        </Link>
        <p className="text-xl">Get loan options</p>
        <ul className="list-disc text-sm py-2 mx-3">
          <li>Compare 30+ matched lenders in 60 seconds.</li>
          <li>Same day approved with 95% approved rate.</li>
        </ul>
      </div>
      <div className="w-full lg:w-4/5 h-full overflow-y-auto">
        <div className="flex flex-col gap-y-3">
          {loans.map((loan, index) => {
            return (
              <Link
                key={index}
                to={`loan/${loan.id}`}
                className="w-full hover:cursor-pointer rounded-md transition-all duration-500 text-primary-color-1 border-2 dark:text-primary-color-7 p-3 border-primary-color-1 dark:border-primary-color-7 hover:shadow-2xl dark:shadow-primary-color-6 shadow-primary-color-1"
              >
                <div className="p-2">
                  <p className="font-medium pl-6">
                    Application id :
                    <span className="font-semibold">{loan.id}</span>
                  </p>
                  <div className="pt-2 grid grid-col-3 md:grid-cols-5 lg:grid-cols-5 gap-x-6 mx-4">
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-money-bill-1"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Approx amount:-{" "}
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-2xl mx-auto">
                        {loan.approx_price} &#x20B9;
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-sack-dollar"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Deposit:-{" "}
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-2xl mx-auto">
                        {loan.deposit} &#x20B9;
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fas">
                        &#xf201;
                      </span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Term:-{" "}
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-2xl mx-auto">
                        {loan.term} years
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-hand-holding-dollar"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Balloon:-{" "}
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-2xl mx-auto">
                        {loan.balloon} %
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-calendar-days"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Applied on:-{" "}
                      </span>
                      <span className="font-semibold text-base md:text-base xl:text-2xl mx-auto">
                        {new Date(loan.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoanList;
