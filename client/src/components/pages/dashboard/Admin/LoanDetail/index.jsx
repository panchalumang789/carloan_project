import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loanService from "services/loanService";
import Swal from "sweetalert2";
import LoanDetails from "./LoanDetails";
import UserDetails from "./UserDetails";
import CarDetails from "./CarDetails";
import IncomeDetails from "./IncomeDetails";
import ExpensesDetails from "./ExpensesDetails";
import { errorToast } from "components/pages/journey/extra/Widget";
import { ToastContainer } from "react-toastify";
window.Swal = Swal;

const statusClass =
  "font-medium text-base after:w-full after:block after:bg-transparent after:h-1 dark:text-primary-color-7 after:transition-all after:duration-300 hover:after:bg-primary-color-1 dark:hover:after:bg-primary-color-10 after:rounded-xl after:mt-1.5";

const LoanDetail = (props) => {
  const [Details, setDetails] = useState("loanDetails");
  const [loanDetails, setLoanData] = useState({});
  const [error, setError] = useState("");
  const [fetchData, setFetchData] = useState(true);
  let { loanId } = useParams();

  useEffect(() => {
    const loanServices = new loanService();
    if (fetchData) {
      try {
        (async () => {
          const { output, error } = await loanServices.getLoanbyId({
            path: `loan/${loanId}`,
            headerData: localStorage.getItem("token"),
          });

          if (error) {
            setError(error.data);
          } else {
            setLoanData(output);
          }
        })();
      } catch (error) {
        errorToast(error.data.message);
      } finally {
        setFetchData(false);
      }
    }
    return () => {};
  }, [loanId, fetchData]);

  const detailType = (detail) => {
    setDetails(detail);
  };

  return (
    <>
      {error !== "" ? (
        <div className="text-2xl font-medium text-primary-color-6 dark:text-primary-color-5">
          {error.message}
        </div>
      ) : (
        <div className="flex flex-col px-2 md:px-0 w-full gap-x-6 gap-y-2 overflow-x-hidden overflow-auto md:overflow-hidden h-[calc(100%-210px)] md:h-[calc(100%-190px)]">
          <ToastContainer />
          <div className="flex items-center justify-between">
            <div className="h-16 md:h-10 flex my-1 gap-x-5">
              <button
                className={
                  statusClass + " aria-pressed:after:bg-primary-color-1"
                }
                aria-pressed={Details === "loanDetails"}
                onClick={() => detailType("loanDetails")}
              >
                Loan-Details
              </button>
              <button
                className={
                  statusClass + " aria-pressed:after:bg-primary-color-1"
                }
                aria-pressed={Details === "userDetails"}
                onClick={() => detailType("userDetails")}
              >
                User-Details
              </button>
              <button
                className={
                  statusClass + " aria-pressed:after:bg-primary-color-1"
                }
                aria-pressed={Details === "carDetails"}
                onClick={() => detailType("carDetails")}
              >
                Car-Details
              </button>
              <button
                className={
                  statusClass + " aria-pressed:after:bg-primary-color-1"
                }
                aria-pressed={Details === "incomeDetails"}
                onClick={() => detailType("incomeDetails")}
              >
                Income-Details
              </button>
              <button
                className={
                  statusClass + " aria-pressed:after:bg-primary-color-1"
                }
                aria-pressed={Details === "expenseDetails"}
                onClick={() => detailType("expenseDetails")}
              >
                Expenses-Details
              </button>
            </div>
            <Link
              to={"/dashboard"}
              className="group font-medium flex items-center justify-end gap-x-2 w-32 text-center px-3 py-2 border-2 bg-white/30 border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-7"
            >
              <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left"></em>
              All loans
            </Link>
          </div>
          {Details === "loanDetails" && (
            <LoanDetails
              role={props.role}
              LoanDetails={loanDetails}
              UpdateLoan={() => setFetchData(true)}
            />
          )}
          {Details === "userDetails" && (
            <UserDetails
              role={props.role}
              UserDetails={loanDetails.user}
              UserId={loanDetails.userId}
              UpdateLoan={() => setFetchData(true)}
            />
          )}
          {Details === "carDetails" && (
            <CarDetails
              role={props.role}
              CarDetails={loanDetails.car}
              CarId={loanDetails.carId}
              LoanId={loanDetails.id}
              UpdateLoan={() => setFetchData(true)}
            />
          )}
          {Details === "incomeDetails" && (
            <IncomeDetails
              role={props.role}
              IncomeDetails={loanDetails.incomes[0]}
              UpdateLoan={() => setFetchData(true)}
            />
          )}
          {Details === "expenseDetails" && (
            <ExpensesDetails
              role={props.role}
              ExpensesDetails={loanDetails.expenses[0]}
              UpdateLoan={() => setFetchData(true)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LoanDetail;
