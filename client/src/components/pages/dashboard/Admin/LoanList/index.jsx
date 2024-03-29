import React, { useEffect, useState } from "react";
import loanService from "services/loanService";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import Table from "../../Table";
import Graph from "../Graph";

const statusClass =
  "font-medium text-base after:w-full after:block after:bg-transparent after:h-1 dark:text-primary-color-7 after:transition-all after:duration-300 hover:after:bg-primary-color-1 dark:hover:after:bg-primary-color-10 after:rounded-xl after:mt-1.5";

const LoanList = (props) => {
  let pageLimit = 5;
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [loans, setLoans] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [length, setlength] = useState();
  const [error, setError] = useState("");
  const [status, setstatus] = useState("In progress");
  const [graph, setgraph] = useState("hidden");
  const [tableKeys, setTableKeys] = useState([]);
  const [graphData, setGraphData] = useState([]);

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
        setGraphData(output.loanCount);
        document.getElementById("loanlist").scrollTo(0, 0);
        document.getElementById("mainDiv").scrollTo(0, 0);
        window.scrollTo(0, 0);
        setError("");
        setlength(output.length);
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

  useEffect(() => {
    if (loans.length > 0) {
      const filteredKeys = Object.keys(loans[0]).filter(
        (key) => key !== "createdAt" && key !== "updatedAt"
      );
      setTableKeys(filteredKeys);
    }
    return () => {};
  }, [loans]);

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
              onClick={() => {
                filterLoan("In progress");
                // setlimit(5);
                // setpage(1);
              }}
            >
              In progress
            </button>
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "In review"}
              onClick={() => {
                filterLoan("In review");
                // setlimit(5);
                // setpage(1);
              }}
            >
              In review
            </button>
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "Approved"}
              onClick={() => {
                filterLoan("Approved");
                // setlimit(5);
                // setpage(1);
              }}
            >
              Approved
            </button>
            <button
              className={
                statusClass +
                " aria-pressed:after:bg-primary-color-1 dark:aria-pressed:after:bg-primary-color-10"
              }
              aria-pressed={status === "Rejected"}
              onClick={() => {
                filterLoan("Rejected");
                // setlimit(5);
                // setpage(1);
              }}
            >
              Rejected
            </button>
          </div>
          <button
            className="font-medium border-2 rounded-md hover:bg-white dark:hover:bg-primary-color-9 border-primary-color-1 dark:border-primary-color-5 py-2 px-3"
            onClick={() => setgraph("visible")}
          >
            Loan Summary
          </button>
        </div>
        <div
          id="loanlist"
          className="flex col-span-10 flex-col mt-4 h-auto lg:h-[calc(100%-60px)] lg:overflow-auto"
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
                  <Table tableKeys={tableKeys} tableData={loans} />
                  <Graph
                    display={graph}
                    visible={setgraph}
                    chartID="LoanSummary"
                    graphData={graphData}
                  />
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
                        className=" w-20 py-1 outline-2 outline outline-primary-color-1 bg-white p-2 rounded-md dark:bg-primary-color-9 dark:text-primary-color-7 text-primary-color-1 font-medium dark:outline-primary-color-7"
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
