import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loanService from "services/loanService";
import LoadingPage from "components/pages/journey/extra/LoadingPage";

const statusClass =
  "font-medium text-base after:w-full hover:after:block after:h-0.5 after:bg-primary-color-1 dark:text-primary-color-7 dark:after:bg-primary-color-7 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5";

const UserLoan = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(true);
  const [status, setstatus] = useState("In progress");
  console.log(loans);
  let { id } = useParams();
  useEffect(() => {
    let loadingtime;
    const loanData = new loanService();
    (async () => {
      const { output, error } = await loanData.getLoanbyUserId({
        status: status,
        userId: id,
        headerData: localStorage.getItem("token"),
      });
      if (error) {
        setLoading(false);
        setError(error.message);
      } else {
        loadingtime = setTimeout(() => {
          setLoading(false);
        }, 700);
        setLoading(true);
        setError("");
        setLoans(output);
      }
    })();
    return () => {
      clearTimeout(loadingtime);
    };
  }, [id, status]);

  const filterLoan = (value) => {
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
          <Link
            to={"/dashboard/user"}
            className="group font-medium flex items-center justify-end ml-auto gap-x-2 w-24 text-center p-3 border-2 border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md  dark:border-primary-color-3"
          >
            <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left "></em>
            Back
          </Link>
        </div>

        <div
          id="loanlist"
          className="flex flex-col h-full lg:h-[calc(100%-48px)] lg:overflow-y-auto border-2 border-primary-color-1 dark:border-primary-color-7 rounded-md"
        >
          {Loading ? (
            <div className="h-full w-full flex justify-center items-center mx-auto">
              <LoadingPage />
            </div>
          ) : (
            <>
              {error !== "" ? (
                <div className="text-xl p-4 font-medium text-primary-color-1 dark:text-primary-color-7">
                  No loan application
                </div>
              ) : (
                <>
                  {loans.map((loan, index) => {
                    return (
                      <Link
                        state={"Admin"}
                        key={index}
                        style={{ "hover:boxShadow": "0px 0px 10px 20px" }}
                        to={`/dashboard/loan/${loan.id}`}
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
                              <span className="font-semibold">
                                {loan.status}
                              </span>
                            </p>
                          </div>
                          <div className="pt-2 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-3 mx-4">
                            <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                              <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-money-bill-1"></span>
                              <span className="uppercase text-sm md:text-md xl:text-base">
                                Approx amount:-
                              </span>
                              <span className="font-semibold text-sm md:text-lg xl:text-xl mx-auto">
                                &#x20B9; {loan.approx_price}
                              </span>
                            </div>
                            <div className="flex items-center p-2 flex-col h-28 md:h-32 bg-white/10 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-3xl">
                              <span className="text-base md:text-lg lg:text-3xl mr-auto p-1.5 fa-solid fa-sack-dollar"></span>
                              <span className="uppercase text-sm md:text-md xl:text-base">
                                Deposit:-
                              </span>
                              <span className="font-semibold text-sm md:text-lg xl:text-xl mx-auto">
                                &#x20B9; {loan.deposit}
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
                                {loan.term > 1
                                  ? `${loan.term} years`
                                  : `${loan.term} year`}
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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLoan;
