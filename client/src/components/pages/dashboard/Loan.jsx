import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import loanService from "services/loanService";
import { toast, ToastContainer } from "react-toastify";
import { CounterUp, selectClasses } from "../journey/extra/Widget";
import Swal from "sweetalert2";
import IncomeDetails from "./Loan/IncomeDetail/index";
import ExpensesDetails from "./Loan/ExpensesDetail/index";
window.Swal = Swal;

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

const Loan = () => {
  const location = useLocation();
  const state = location.state;
  console.log(state);
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

  return (
    <>
      {error !== "" ? (
        <div className="text-2xl font-medium text-primary-color-6 dark:text-primary-color-5">
          {error.message}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row px-2 md:px-0 w-full gap-x-6 gap-y-2 overflow-auto md:overflow-hidden h-[calc(100%-190px)] md:h-[calc(100%-190px)]">
          <ToastContainer />
          <div className="w-full md:w-5/6 border-2 border-primary-color-1 dark:border-primary-color-5 lg:w-1/4 p-3">
            <div>
              <p className="text-lg font-medium">Customer Summary</p>
              <div className="p-2 md:p-5 text-sm">
                <div>
                  <span>Name: </span>
                  <span className="font-semibold text-base mx-auto">
                    {loanDetails.userDetails
                      ? loanDetails.userDetails.firstName +
                        " " +
                        loanDetails.userDetails.lastName
                      : "Invalid"}
                  </span>
                </div>
                <div>
                  <span>Contact no: </span>
                  <span className="font-semibold text-base mx-auto">
                    {loanDetails.userDetails
                      ? loanDetails.userDetails.contactNo
                      : "Invalid"}
                  </span>
                </div>
                <div>
                  <span>Email: </span>
                  <span className="font-semibold text-base mx-auto">
                    {loanDetails.userDetails
                      ? loanDetails.userDetails.email
                      : "Invalid"}
                  </span>
                </div>
                <div>
                  <span>Income: </span>
                  <span className="font-semibold text-base mx-auto">
                    &#x20B9; {loanDetails.user_income}
                  </span>
                </div>
                <div>
                  <span>Work status: </span>
                  <span className="font-semibold text-base mx-auto">
                    {loanDetails.user_status}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg font-medium">Loan Summary</p>
              <div className="p-2 md:p-5 text-sm">
                <div>
                  <span>Loan id: </span>
                  <span className="font-semibold text-base">
                    {loanDetails.id}
                  </span>
                </div>
                <div>
                  <span>Applied on: </span>
                  <span className="font-semibold text-base">
                    {new Date(loanDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span>Last update on: </span>
                  <span className="font-semibold text-base">
                    {new Date(loanDetails.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/6 lg:w-3/4 flex flex-col gap-y-3 h-full md:overflow-y-auto">
            <div className="flex justify-between px-1">
              <Link
                to={"/dashboard"}
                className="group font-medium flex items-center justify-end gap-x-2 w-32 text-center p-3 border-2 bg-white/30 border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-7"
              >
                <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left"></em>
                All loans
              </Link>
              {state === "Admin" && (
                <div>
                  <label htmlFor="status" className="px-2">
                    Status
                  </label>
                  <select
                    id="status"
                    className={
                      selectClasses +
                      " my-0.5 dark:border-2 dark:border-primary-color-7 dark:bg-primary-color-9"
                    }
                    value={status}
                    onChange={editLoan}
                  >
                    <option value="In progress">In progress</option>
                    <option value="In review">In review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
            <div className="border-t-2 border-primary-color-1 dark:border-primary-color-5 px-4 py-2">
              <p className="font-medium text-xl pt-1">Loan Details</p>
              <div className="flex flex-col md:flex-row gap-x-6 py-2">
                <div className="flex items-center gap-x-1">
                  <span>Approx amount: </span>
                  <span className="flex gap-x-1 font-medium text-lg">
                    &#x20B9;
                    <CounterUp num={loanDetails.approx_price} />
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <span>Deposit: </span>
                  <span className="flex gap-x-1 font-medium text-lg">
                    &#x20B9;
                    <CounterUp num={loanDetails.deposit} />
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <span>Term: </span>
                  <span className="flex gap-x-1 font-medium text-lg">
                    <CounterUp num={loanDetails.term} />
                    {loanDetails.term > 1 ? "years" : "year"}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <span>Balloon: </span>
                  <span className="flex gap-x-1 font-medium text-lg">
                    <CounterUp num={loanDetails.balloon} /> &#x25;
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-full h-32 border-t-2 border-primary-color-1 dark:border-primary-color-5 px-2">
                <p className="font-medium text-xl pt-1">Car Details</p>
                <div className="py-2">
                  <div>
                    <span>Maker: </span>
                    <span className="font-medium text-base">
                      {loanDetails.carDetails
                        ? loanDetails.carDetails.make
                        : "Invalid"}
                    </span>
                  </div>
                  <div>
                    <span>Model: </span>
                    <span className="font-medium text-base">
                      {loanDetails.carDetails
                        ? loanDetails.carDetails.model
                        : "Invalid"}
                    </span>
                  </div>
                  <div>
                    <span>Mode-type: </span>
                    <span className="font-medium text-base">
                      {loanDetails.carDetails
                        ? loanDetails.carDetails.model_type
                        : "Invalid"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-32">
                {/* <img src={loanDetails.carDetails.image} alt="car preview image" /> */}
                <input
                  className="h-24 md:h-36 pb-1 mix-blend-multiply"
                  type="image"
                  src={
                    loanDetails.carDetails
                      ? loanDetails.carDetails.image
                      : "Invalid"
                  }
                  alt="car preview image"
                />
              </div>
            </div>
            <IncomeDetails incomeDetails={incomeDetails} />
            <ExpensesDetails expensesDetails={expensesDetails} />
            {state !== "Admin" && (
              <div className="flex justify-around lg:justify-between items-center border-2 max-w-screen-sm w-full mx-auto px-3 border-primary-color-1 dark:border-primary-color-7 rounded-md">
                <p className="font-medium text-xl pt-1">Upload Document</p>
                <Link
                  id="new_loan"
                  to={"/journey/documents"}
                  className="font-semibold text-lg text-primary-color-4 dark:text-primary-color-7 py-2 pr-3 border-primary-color-1 dark:border-primary-color-7"
                >
                  <span className=" pr-0.5 fa-solid fa-plus"></span>
                  <span> Add</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Loan;
