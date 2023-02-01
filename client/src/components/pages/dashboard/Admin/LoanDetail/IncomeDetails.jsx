import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  errorToast,
  inputClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import loanService from "services/loanService";
import { ToastContainer } from "react-toastify";

const IncomeDetails = (props) => {
  const updateService = new loanService();
  const [incomeDetails, setIncomeData] = useState({});
  const [Editing, setEditing] = useState(false);
  const [additional_income, setadditional_income] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setIncomeData(props.IncomeDetails);
    setValue("userId", props.IncomeDetails.userId);
    setValue("loanId", props.IncomeDetails.loanId);
    setValue("rental_income", props.IncomeDetails.rental_income);
    setValue("investment_income", props.IncomeDetails.investment_income);
    setValue("salary_sacrifice", props.IncomeDetails.salary_sacrifice);
    setValue("centralink_benifit", props.IncomeDetails.centralink_benifit);
    setValue("foreign_income", props.IncomeDetails.foreign_income);
  }, [props, setValue]);

  const additionalIncome = (e) => {
    e.target.value === "true"
      ? setadditional_income(true)
      : setadditional_income(false);
  };

  const submitIncomeData = async (data) => {
    if (data.additional_income === "false") {
      data.centralink_benifit = 0;
      data.foreign_income = 0;
      data.investment_income = 0;
      data.rental_income = 0;
      data.salary_sacrifice = 0;
    }
    const { output, error } = await updateService.updateIncome({
      incomeId: props.IncomeDetails.id,
      bodyData: data,
      headerData: localStorage.getItem("token"),
    });
    if (!output) {
      errorToast(error.message);
      errorToast(error.data.message);
    } else {
      successToast(output.message);
      props.UpdateLoan();
      setEditing(false);
    }
  };

  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 md:h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-2 md:p-4">
      <form
        onSubmit={handleSubmit(submitIncomeData)}
        className="flex flex-col gap-5"
      >
        <ToastContainer />
        <div className="grid md:grid-cols-2 gap-5 px-2">
          <input type="hidden" {...register("userId")} />
          <input type="hidden" {...register("loanId")} />
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Additional Income :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="flex gap-x-5">
                <div>
                  <input
                    type="radio"
                    name="income"
                    className="form-radio checked:bg-primary-color-1 checked:text-primary-color-1 "
                    id="yes"
                    value={true}
                    disabled={!Editing}
                    defaultChecked={incomeDetails.additional_income}
                    onClick={additionalIncome}
                    {...register("additional_income", {
                      required: true,
                    })}
                  />
                  <label htmlFor="yes" className="px-2">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="income"
                    id="no"
                    className="form-radio checked:bg-primary-color-1 checked:text-primary-color-1 "
                    value={false}
                    disabled={!Editing}
                    defaultChecked={!incomeDetails.additional_income}
                    onClick={additionalIncome}
                    {...register("additional_income", {
                      required: true,
                    })}
                  />
                  <label htmlFor="no" className="px-2">
                    No
                  </label>
                </div>
              </div>
              {errors.additional_income && (
                <span className="text-red-500 px-1 text-sm">
                  Please select you have any additional income or no?
                </span>
              )}
            </div>
          </div>
          {additional_income ? (
            <>
              <div className="font-medium text-xl flex gap-x-2 items-center">
                <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
                  Rental income per month (after tax) :
                </label>
                <div className="flex flex-col w-1/2 md:w-3/5">
                  <div className="relative input-group-prepend">
                    <span
                      className="ml-4 my-2 absolute text-lg"
                      id="basic-addon2"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    className={
                      inputClasses +
                      " disabled:bg-white/40 disabled:hover:cursor-not-allowed pl-10"
                    }
                    type="number"
                    disabled={!Editing}
                    autoFocus
                    autoComplete="off"
                    {...register("rental_income", {
                      min: {
                        value: 0,
                        message: "Rental income should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message:
                          "Rental income should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.rental_income && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.rental_income?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="font-medium text-xl flex gap-x-2 items-center">
                <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
                  {" "}
                  Investment income per month (after tax) :
                </label>
                <div className="flex flex-col w-1/2 md:w-3/5">
                  <div className="relative input-group-prepend">
                    <span
                      className="ml-4 my-2 absolute text-lg"
                      id="basic-addon2"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    className={
                      inputClasses +
                      " disabled:bg-white/40 disabled:hover:cursor-not-allowed pl-10"
                    }
                    type="number"
                    disabled={!Editing}
                    autoComplete="off"
                    {...register("investment_income", {
                      min: {
                        value: 0,
                        message: "Investment income should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message:
                          "Investment income should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.investment_income && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.investment_income?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="font-medium text-xl flex gap-x-2 items-center">
                <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
                  Salary sacrifice per month (after tax) :
                </label>
                <div className="flex flex-col w-1/2 md:w-3/5">
                  <div className="relative input-group-prepend">
                    <span
                      className="ml-4 my-2 absolute text-lg"
                      id="basic-addon2"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    className={
                      inputClasses +
                      " disabled:bg-white/40 disabled:hover:cursor-not-allowed pl-10"
                    }
                    type="number"
                    disabled={!Editing}
                    autoComplete="off"
                    {...register("salary_sacrifice", {
                      min: {
                        value: 0,
                        message: "Salary sacrifice should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message:
                          "Salary sacrifice should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.salary_sacrifice && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.salary_sacrifice?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="font-medium text-xl flex gap-x-2 items-center">
                <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
                  Centralink benifit per month (after tax) :
                </label>
                <div className="flex flex-col w-1/2 md:w-3/5">
                  <div className="relative input-group-prepend">
                    <span
                      className="ml-4 my-2 absolute text-lg"
                      id="basic-addon2"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    className={
                      inputClasses +
                      " disabled:bg-white/40 disabled:hover:cursor-not-allowed pl-10"
                    }
                    type="number"
                    disabled={!Editing}
                    autoComplete="off"
                    {...register("centralink_benifit", {
                      min: {
                        value: 0,
                        message: "Centralink income should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message:
                          "Centralink income should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.centralink_benifit && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.centralink_benifit?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="font-medium text-xl flex gap-x-2 items-center">
                <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
                  Foreign income per month (after tax) :
                </label>
                <div className="flex flex-col w-1/2 md:w-3/5">
                  <div className="relative input-group-prepend">
                    <span
                      className="ml-4 my-2 absolute text-lg"
                      id="basic-addon2"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    className={
                      inputClasses +
                      " disabled:bg-white/40 disabled:hover:cursor-not-allowed pl-10"
                    }
                    type="number"
                    disabled={!Editing}
                    // defaultValue={incomeDetails.foreign_income}
                    autoComplete="off"
                    {...register("foreign_income", {
                      min: {
                        value: 0,
                        message: "Foreign income should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message:
                          "Foreign income should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.foreign_income && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.foreign_income?.message}
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full flex justify-end px-36 gap-4">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="group font-medium flex items-center justify-center gap-x-2 w-16 hover:font-semibold text-center p-2 border border-primary-color-1 bg-primary-color-7 hover:bg-white dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
          >
            Edit
          </button>
          <button
            type="submit"
            disabled={!Editing}
            className="group font-medium flex items-center justify-start gap-x-2 w-28 text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 bg-primary-color-7 hover:bg-white dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3 disabled:bg-white/40 disabled:hover:cursor-not-allowed"
          >
            SUBMIT
            <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeDetails;
