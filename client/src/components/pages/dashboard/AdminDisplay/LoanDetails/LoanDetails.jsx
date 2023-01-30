import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const LoanDetails = (props) => {
  const [loanDetails, setLoanData] = useState({});
  useEffect(() => {
    setLoanData(props.LoanDetails);
  }, [props]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      <div className="grid grid-cols-2 gap-5 px-2">
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Loan id:</span>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="number"
              disabled
              // defaultValue={loanDetails.id}
            />
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Status:</span>
          <div className="flex flex-col w-3/5">
            <select
              id="status"
              className={
                selectClasses +
                " dark:border-2 dark:border-primary-color-7 dark:bg-primary-color-9"
              }
              value={loanDetails.status}
              //   onChange={editLoan}
            >
              <option value="In progress">In progress</option>
              <option value="In review">In review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Approx Amount:</span>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="number"
              disabled
              // defaultValue={loanDetails.approx_price}
              {...register("approx_price", {
                required: "Please enter approx amount!",
                min: {
                  value: 0,
                  message: "Approx amount should be greater than 0!",
                },
                max: {
                  value: 1000000000,
                  message: "Approx amount should be less than 1,00,00,00,000!",
                },
              })}
            />
            {errors.approx_price && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.approx_price?.message}
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Deposit:</span>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="number"
              disabled
              // defaultValue={loanDetails.deposit}
              {...register("deposit", {
                required: "Please enter deposit amount!",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Deposit should be greater than 0!",
                },
                validate: () =>
                  Number(getValues("deposit")) <
                  Number(getValues("approx_price")),
                max: {
                  value: 1000000000,
                  message: "Deposit should be less than 1,00,00,00,000!",
                },
              })}
            />
            {errors.deposit && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.deposit?.message}
              </span>
            )}
            {errors.deposit?.type === "validate" && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                Deposit should be less than Approx Amount
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Term:</span>
          <div className="flex flex-col w-3/5">
            <select
              id="term"
              value={loanDetails.term}
              className={selectClasses}
              {...register("term", {
                required: "Please select loan term!",
              })}
            >
              <option disabled value="">
                Select loan term
              </option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
              <option value="9">9 years</option>
              <option value="10">10 years</option>
            </select>
            {errors.term && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.term?.message}
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Balloon:</span>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="number"
              disabled
              // defaultValue={loanDetails.balloon}
              {...register("balloon", {
                min: {
                  value: 0,
                  message: "Balloon should be greater than 0!",
                },
                max: {
                  value: 35,
                  message: "Balloon should be less than 35!",
                },
              })}
            />
            {errors.balloon && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.balloon?.message}
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">User status:</span>
          <div className="flex flex-col w-3/5">
            <select
              value={loanDetails.user_status}
              className={selectClasses}
              {...register("user_status", {
                required: "Please select your work status!",
              })}
            >
              <option value="" disabled>
                Select work status
              </option>
              <option value="Employee">I am an Employee</option>
              <option value="Unemployed">I am an Unemployed</option>
            </select>
            {errors.user_status && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.user_status?.message}
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">User income:</span>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="number"
              disabled
              // defaultValue={loanDetails.user_income}
              {...register("user_income", {
                required: "Please enter your income!",
                min: {
                  value: 10000,
                  message: "Income should be greater than 10000!",
                },
                max: {
                  value: 1000000000,
                  message: "Income should be less than 1,00,00,00,000!",
                },
              })}
            />
            {errors.user_income && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.user_income?.message}
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <span className="font-normal w-1/5">Apply date:</span>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="date"
              // defaultValue={
              //   new Date(loanDetails.createdAt).toISOString().split("T")[0] ||
              //   "yyyy-mm-dd"
              // }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end px-36 gap-4">
        <button
          type="submit"
          className="group font-medium flex items-center justify-center gap-x-2 w-16 hover:font-semibold text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
        >
          Edit
        </button>
        <button
          type="submit"
          className="group font-medium flex items-center justify-start gap-x-2 w-28 text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
        >
          SUBMIT
          <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default LoanDetails;
