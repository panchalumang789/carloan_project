import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loanService from "services/loanService";
import { selectClasses } from "../journey/extra/Widget";

const statusClass =
  "font-medium text-base after:w-full hover:after:block after:h-0.5 after:bg-primary-color-1 dark:text-primary-color-7 dark:after:bg-primary-color-7 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5";

const LoanList = () => {
  let pageLimit = 5;
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [loans, setLoans] = useState([]);
  const [role, setrole] = useState();
  const [length, setlength] = useState();
  const [error, setError] = useState("");
  const [status, setstatus] = useState("In progress");
  useEffect(() => {
    const loanData = new loanService();
    (async () => {
      const { output, error } = await loanData.getLoanbyStatus({
        status: status,
        limit: limit,
        offset: page,
        headerData: localStorage.getItem("token"),
      });
      if (output) {
        document.getElementById("loanlist").scrollTo(0, 0);
        document.getElementById("mainDiv").scrollTo(0, 0);
        window.scrollTo(0, 0);
        setError("");
        setlength(output.length);
        if (output.user && output.user.role === "Admin") {
          setrole(output.user.role);
        }
        let temp = [];
        output.loan.map((loan) => {
          if (loan.status === status) {
            return temp.push(loan);
          } else return false;
        });
        setLoans(temp);
      } else {
        setError(error.message);
      }
    })();
    return () => {};
  }, [status, limit, page]);

  const filterLoan = (value) => {
    setpage(1);
    setstatus(value);
  };
  return (
    <div
      id="mainDiv"
      className="px-4 pt-4 pb-0 md:pb:0 lg:p-0 gap-y-3 flex flex-col h-[calc(100%-210px)] md:h-[calc(100%-190px)] lg:flex-row w-full gap-x-6 overflow-y-auto lg:overflow-y-hidden"
    >
      <div className="w-full border-2 border-primary-color-1 dark:border-primary-color-7 rounded-md lg:w-1/5 p-3 text-primary-color-1 dark:text-primary-color-7">
        <p className="text-xl">Get loan options</p>
        <ul className="list-disc text-sm py-2 mx-3">
          <li>Compare 30+ matched lenders in 60 seconds.</li>
          <li>Same day approved with 95% approved rate.</li>
        </ul>
      </div>
      <div className="w-full lg:w-4/5 h-full">
        <div className="h-16 md:h-10 flex my-1 gap-x-5">
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
        <div
          id="loanlist"
          className="flex flex-col h-auto lg:h-[calc(100%-48px)] lg:overflow-y-auto border-2 border-primary-color-1 dark:border-primary-color-7 rounded-md"
        >
          {error !== "" ? (
            <div className="text-xl p-4 font-medium text-primary-color-1 dark:text-primary-color-7">
              No loan application
            </div>
          ) : (
            <>
              {loans.map((loan, index) => {
                return (
                  <Link
                    state={role}
                    key={index}
                    style={{ "hover:box-shadow": "0px 0px 10px 20px" }}
                    to={`loan/${loan.id}`}
                    className="w-full hover:cursor-pointer transition-all duration-500 text-primary-color-1 border-b-2 dark:text-primary-color-7 md:px-3 py-2 md:py-4 border-primary-color-1 dark:border-primary-color-7 hover:shadow-2xl shadow-primary-color-4"
                  >
                    <div className="p-2">
                      <div className="flex justify-between">
                        <p className="font-medium">
                          Application id :
                          <span className="font-semibold">{loan.id}</span>
                        </p>
                        <p className="font-medium">
                          Status :
                          <span className="font-semibold">{loan.status}</span>
                        </p>
                      </div>
                      <div className="pt-2 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-3 mx-4">
                        <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                          <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-money-bill-1"></span>
                          <span className="uppercase text-sm md:text-md xl:text-base">
                            Approx amount:-
                          </span>
                          <span className="font-semibold text-sm md:text-lg xl:text-xl mx-auto">
                            {loan.approx_price} &#x20B9;
                          </span>
                        </div>
                        <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                          <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-sack-dollar"></span>
                          <span className="uppercase text-sm md:text-md xl:text-base">
                            Deposit:-
                          </span>
                          <span className="font-semibold text-sm md:text-lg xl:text-xl mx-auto">
                            {loan.deposit} &#x20B9;
                          </span>
                        </div>
                        <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                          <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fas">
                            &#xf201;
                          </span>
                          <span className="uppercase text-sm md:text-md xl:text-base">
                            Term:-
                          </span>
                          <span className="font-semibold text-sm md:text-lg xl:text-xl mx-auto">
                            {loan.term} years
                          </span>
                        </div>
                        <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                          <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-hand-holding-dollar"></span>
                          <span className="uppercase text-sm md:text-md xl:text-base">
                            Balloon:-
                          </span>
                          <span className="font-semibold text-sm md:text-lg xl:text-xl mx-auto">
                            {loan.balloon} %
                          </span>
                        </div>
                        <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                          <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-calendar-days"></span>
                          <span className="uppercase text-sm md:text-md xl:text-base">
                            Applied on:-
                          </span>
                          <span className="font-semibold text-sm md:text-base xl:text-xl mx-auto">
                            {new Date(loan.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="flex justify-between py-4 px-8 md:px-20 font-semibold text-lg">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  Pages
                  <div className="">
                    {Array.from(
                      { length: Math.ceil(length / limit) },
                      (_, index) => (
                        <button
                          key={index}
                          className=" text-primary-color-1 dark:text-primary-color-5 aria-pressed:text-primary-color-4 aria-pressed:text-2xl dark:aria-pressed:text-primary-color-7 aria-pressed:scale-105 px-2 cursor-pointer"
                          aria-pressed={page === index + 1}
                          onClick={() => setpage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <span className="text-base font-medium">Limit</span>
                  <select
                    className={
                      selectClasses +
                      " w-20 py-1 outline-2 outline outline-primary-color-1 dark:outline-primary-color-5"
                    }
                    onClick={(e) => {
                      setlimit(e.target.value);
                      setpage(1);
                    }}
                    name="pagelimit"
                    id="limit"
                  >
                    <option value="5">5</option>
                    {Array.from({ length: Math.ceil(length) }, (_, index) => {
                      if (index + 1 >= pageLimit + 5) {
                        pageLimit += 5;
                        return (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        );
                      }
                      return false;
                    })}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanList;
