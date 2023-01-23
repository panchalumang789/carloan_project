import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loanService from "services/loanService";

const statusClass =
  "font-medium text-base after:w-full hover:after:block after:h-0.5 after:bg-primary-color-1 dark:text-primary-color-7 dark:after:bg-primary-color-7 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [role, setrole] = useState();
  const [status, setstatus] = useState("In progress");
  useEffect(() => {
    const gerLoans = new loanService();
    (async () => {
      const getLoan = await gerLoans.getLoan({
        headerData: localStorage.getItem("token"),
      });
      if (getLoan.user && getLoan.user.role === "Admin") {
        setrole(getLoan.user.role);
      }
      let temp = [];
      getLoan.loan.map((loan) => {
        if (loan.status === status) {
          return temp.push(loan);
        } else return false;
      });
      setLoans(temp);
    })();

    return () => {};
  }, [status]);

  const filterLoan = (value) => {
    setstatus(value);
  };
  return (
    <div className="px-4 pt-4 pb-0 md:pb:0 lg:p-0 gap-y-3 flex flex-col h-[calc(100vh-190px)] lg:flex-row w-full gap-x-6">
      <div className="w-full border-2 border-primary-color-1 dark:border-primary-color-7 rounded-md lg:w-1/5 p-3 text-primary-color-1 dark:text-primary-color-7">
        <p className="text-xl">Get loan options</p>
        <ul className="list-disc text-sm py-2 mx-3">
          <li>Compare 30+ matched lenders in 60 seconds.</li>
          <li>Same day approved with 95% approved rate.</li>
        </ul>
      </div>
      <div className="w-full lg:w-4/5 h-full ">
        <div className="h-10 flex my-1 gap-x-5">
          <button
            className={statusClass + " aria-pressed:after:block"}
            aria-pressed={status === "In progress"}
            onClick={(e) => filterLoan("In progress")}
          >
            In progress
          </button>
          <button
            className={statusClass + " aria-pressed:after:block"}
            aria-pressed={status === "In review"}
            onClick={(e) => filterLoan("In review")}
          >
            In review
          </button>
          <button
            className={statusClass + " aria-pressed:after:block"}
            aria-pressed={status === "Approved"}
            onClick={(e) => filterLoan("Approved")}
          >
            Approved
          </button>
          <button
            className={statusClass + " aria-pressed:after:block"}
            aria-pressed={status === "Rejected"}
            onClick={(e) => filterLoan("Rejected")}
          >
            Rejected
          </button>
        </div>
        <div className="flex flex-col h-[calc(100%-172px)] lg:h-[calc(100%-48px)] overflow-y-auto border-2 border-primary-color-1 dark:border-primary-color-7 rounded-md">
          {loans.map((loan, index) => {
            return (
              <Link
                state={role}
                key={index}
                to={`loan/${loan.id}`}
                className="w-full hover:cursor-pointer transition-all duration-500 text-primary-color-1 border-b-2 dark:text-primary-color-7 px-3 py-4 border-primary-color-1 dark:border-primary-color-7 hover:shadow-2xl shadow-primary-color-4"
              >
                <div className="p-2">
                  <div className="flex justify-between">
                    <p className="font-medium pl-6">
                      Application id :
                      <span className="font-semibold">{loan.id}</span>
                    </p>
                    <p className="font-medium pl-6">
                      Status :
                      <span className="font-semibold">{loan.status}</span>
                    </p>
                  </div>
                  <div className="pt-2 grid grid-col-3 md:grid-cols-5 lg:grid-cols-5 gap-x-6 mx-4">
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-money-bill-1"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Approx amount:-
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-xl mx-auto">
                        {loan.approx_price} &#x20B9;
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-sack-dollar"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Deposit:-
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-xl mx-auto">
                        {loan.deposit} &#x20B9;
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fas">
                        &#xf201;
                      </span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Term:-
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-xl mx-auto">
                        {loan.term} years
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-hand-holding-dollar"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Balloon:-
                      </span>
                      <span className="font-semibold text-base md:text-lg xl:text-xl mx-auto">
                        {loan.balloon} %
                      </span>
                    </div>
                    <div className="flex items-center p-2 flex-col h-32 bg-white/25 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                      <span className="text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-calendar-days"></span>
                      <span className="uppercase text-sm md:text-md xl:text-base">
                        Applied on:-
                      </span>
                      <span className="font-semibold text-base md:text-base xl:text-xl mx-auto">
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
