import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loanService from "services/loanService";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const statusClass =
  "font-medium text-base after:w-full after:block after:bg-transparent after:h-1 dark:text-primary-color-7 after:transition-all after:duration-300 hover:after:bg-primary-color-1 dark:hover:after:bg-primary-color-10 after:rounded-xl after:mt-1.5";

const LoanList = () => {
  let pageLimit = 5;
  const navigate = useNavigate();
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [loans, setLoans] = useState([]);
  const [role, setrole] = useState();
  const [Loading, setLoading] = useState(true);
  const [length, setlength] = useState();
  const [error, setError] = useState("");
  const [status, setstatus] = useState("In progress");
  useEffect(() => {
    let loadingtime;
    const loanData = new loanService();
    (async () => {
      const { output, error } = await loanData.getLoanbyStatus({
        status: status,
        limit: limit,
        offset: page,
        headerData: localStorage.getItem("token"),
      });
      if (output) {
        loadingtime = setTimeout(() => {
          setLoading(false);
        }, 1000);
        setLoading(true);
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
        setLoading(false);
        setError(error.message);
      }
    })();
    return () => {
      clearTimeout(loadingtime);
    };
  }, [status, limit, page]);

  const filterLoan = (value) => {
    setpage(1);
    setstatus(value);
  };
  const gotoLoan = (loanId) => {
    navigate(`loan/${loanId}`);
  };
  return (
    <div
      id="mainDiv"
      className="px-4 pt-4 pb-0 md:pb:0 lg:p-0 gap-y-3 flex flex-col h-[calc(100%-190px)] md:h-[calc(100%-190px)] lg:flex-row w-full gap-x-6 overflow-y-auto lg:overflow-y-hidden"
    >
      <div className="w-full h-full">
        <div className="h-16 md:h-10 flex m-1 justify-between gap-x-5">
          <div className="h-16 md:h-10 flex my-1 gap-x-5">
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "In progress"}
              onClick={() => filterLoan("In progress")}
            >
              In progress
            </button>
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "In review"}
              onClick={() => filterLoan("In review")}
            >
              In review
            </button>
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "Approved"}
              onClick={() => filterLoan("Approved")}
            >
              Approved
            </button>
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "Rejected"}
              onClick={() => filterLoan("Rejected")}
            >
              Rejected
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className={
                inputClasses + " outline outline-1 outline-primary-color-1"
              }
              placeholder="Search.."
            />
          </div>
        </div>
        <div
          id="loanlist"
          className="flex flex-col mt-4 h-auto lg:h-[calc(100%-60px)] lg:overflow-auto"
        >
          {Loading ? (
            <div className="h-40 w-full flex justify-center items-center mx-auto">
              <LoadingPage />
            </div>
          ) : (
            <>
              {error !== "" ? (
                <div className="text-xl p-4 font-medium text-primary-color-1 dark:text-primary-color-7">
                  No loan application
                </div>
              ) : (
                <div>
                  <table className="w-full overflow-auto">
                    <thead className="uppercase text-lg">
                      <tr>
                        <th>loan_id</th>
                        <th>car_Id</th>
                        <th>user_Id</th>
                        <th>approx_price</th>
                        <th>deposit</th>
                        <th>term</th>
                        <th>balloon</th>
                        <th>user_status</th>
                        <th>user_income</th>
                        <th>agent_Id</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan, index) => {
                        return (
                          <tr
                            onClick={() => gotoLoan(loan.id)}
                            className="text-center hover:bg-primary-color-10"
                            key={index}
                          >
                            <td>
                              <Link
                                state={{ role: role }}
                                key={index}
                                to={`loan/${loan.id}`}
                                className="font-medium"
                              >
                                {loan.id}
                              </Link>
                            </td>
                            {console.log(role)}
                            <td>{loan.carId}</td>
                            <td>{loan.userId}</td>
                            <td>{loan.approx_price}</td>
                            <td>{loan.deposit}</td>
                            <td>{loan.term}</td>
                            <td>{loan.balloon}</td>
                            <td>{loan.user_status}</td>
                            <td>{loan.user_income}</td>
                            <td>{loan.agentId || "NULL"}</td>
                            <td>{loan.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="flex justify-between my-4 px-8 md:px-20 font-semibold text-lg">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      Pages
                      <div>
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
                        defaultValue={limit}
                        onClick={(e) => {
                          setlimit(e.target.value);
                          setpage(1);
                        }}
                        name="pagelimit"
                        id="limit"
                      >
                        <option value="5">5</option>
                        {Array.from(
                          { length: Math.ceil(length) },
                          (_, index) => {
                            if (index + 1 >= pageLimit + 5) {
                              pageLimit += 5;
                              return (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              );
                            }
                            return false;
                          }
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanList;
