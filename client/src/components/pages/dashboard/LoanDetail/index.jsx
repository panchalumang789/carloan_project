import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import loanService from "services/loanService";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import LoanDetails from "./LoanDetails";
import UserDetails from "./UserDetails";
import CarDetails from "./CarDetails";
import IncomeDetails from "./IncomeDetails";
import ExpensesDetails from "./ExpensesDetails";
window.Swal = Swal;

const statusClass =
  "font-medium text-base after:w-full after:block after:bg-transparent after:h-1 dark:text-primary-color-7 after:transition-all after:duration-300 hover:after:bg-primary-color-1 dark:hover:after:bg-primary-color-10 after:rounded-xl after:mt-1.5";

const sendMail = async (loanStatus, loanId) => {
  if (loanStatus === "Approved") {
    const mailService = new loanService();
    const { output, error } = await mailService.sendMail({
      loanId: loanId,
    });
    if (!output) {
      toast.error(error.data.message, {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        position: "top-center",
      });
    } else {
      if (output.mailstatus) {
        toast.success(output.mailstatus, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          position: "top-center",
        });
      }
    }
  }
};

const LoanDetail = () => {
  const location = useLocation();
  const { state } = location;
  console.log(location);
  const [Details, setDetails] = useState("loanDetails");
  const [loanDetails, setLoanData] = useState({});
  const [error, setError] = useState("");
  const [status, setstatus] = useState("");
  const [incomeDetails, setIncomeData] = useState({});
  const [expensesDetails, setExpensesData] = useState({});
  let { loanId } = useParams();

  useEffect(() => {
    const loanServices = new loanService();
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
          setIncomeData(output.incomes[0]);
          setExpensesData(output.expenses[0]);
        }
      })();
    } catch (error) {
      toast.error(error.data.message, {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        position: "top-center",
      });
    }
    return () => {};
  }, [loanId]);

  useEffect(() => {
    setstatus(loanDetails.status);
  }, [loanDetails]);

  let loanid = useParams("id");
  const editLoan = (e) => {
    const loanServices = new loanService();
    setstatus(e.target.value);
    Swal.fire({
      title: "Do you want to change loan status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonColor: "#EB5757",
      confirmButtonColor: "#41aa76",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          const { output, error } = await loanServices.updateLoan({
            loanId: loanid.loanId,
            body: { status: e.target.value },
            headerData: localStorage.getItem("token"),
          });
          if (!output) {
            toast.error(error.data.message, {
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              position: "top-center",
            });
          } else {
            sendMail(e.target.value, loanid.loanId);
            toast.success(output.message, {
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              position: "top-center",
            });
          }
        })();
      }
    });
  };

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
        <div className="flex flex-col px-2 md:px-0 w-full gap-x-6 gap-y-2 overflow-auto md:overflow-hidden h-[calc(100%-190px)] md:h-[calc(100%-190px)]">
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
            <LoanDetails LoanDetails={loanDetails} />
          )}
          {Details === "userDetails" && (
            <UserDetails UserDetails={loanDetails.userDetails} />
          )}
          {Details === "carDetails" && (
            <CarDetails CarDetails={loanDetails.carDetails} />
          )}
          {Details === "incomeDetails" && (
            <IncomeDetails IncomeDetails={loanDetails.incomes} />
          )}
          {Details === "expenseDetails" && (
            <ExpensesDetails ExpensesDetails={loanDetails.expenses} />
          )}
        </div>
      )}
    </>
  );
};

export default LoanDetail;
