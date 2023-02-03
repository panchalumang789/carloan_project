import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  errorToast,
  inputClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import loanService from "services/loanService";
import { ToastContainer } from "react-toastify";

const ExpensesDetails = (props) => {
  const updateService = new loanService();
  const [Editing, setEditing] = useState(false);
  const [expensesDetails, setExpensesDetails] = useState({});
  const [Submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setExpensesDetails(props.ExpensesDetails);
    setValue(
      "vehicle_running_cost",
      props.ExpensesDetails.vehicle_running_cost
    );
    setValue("userId", props.ExpensesDetails.userId);
    setValue("loanId", props.ExpensesDetails.loanId);
    setValue("travel_cost", props.ExpensesDetails.travel_cost);
    setValue("utilities_cost", props.ExpensesDetails.utilities_cost);
    setValue("insurance", props.ExpensesDetails.insurance);
    setValue("tel_internet", props.ExpensesDetails.tel_internet);
    setValue("entertainment", props.ExpensesDetails.entertainment);
  }, [props, setValue]);

  useEffect(() => {
    let change = false;
    const preData = watch();
    Object.keys(preData).forEach((i) => {
      if (preData[i] !== expensesDetails[i]) {
        change = true;
      }
    });
    if (change) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
    // eslint-disable-next-line
  }, [watch()]);

  const submitExpensesData = async (data) => {
    const { output, error } = await updateService.updateExpenses({
      expensesId: props.ExpensesDetails.id,
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
        onSubmit={handleSubmit(submitExpensesData)}
        className="flex flex-col gap-5"
      >
        <ToastContainer />
        <div className="grid md:grid-cols-2 gap-5 px-2">
          <input type="hidden" {...register("userId")} />
          <input type="hidden" {...register("loanId")} />
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Moter vehicle running costs :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span className="ml-4 my-2 absolute text-lg" id="basic-addon2">
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
                {...register("vehicle_running_cost", {
                  valueAsNumber: true,
                  required: "Vehicle running cost should be greater than 0!",
                  min: {
                    value: 0,
                    message: "Vehicle running cost should be greater than 0!",
                  },
                  max: {
                    value: 1000000000,
                    message:
                      "Vehicle running cost should be less than 1,00,00,00,000!",
                  },
                })}
              />
              {errors.vehicle_running_cost && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.vehicle_running_cost?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Travel :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span className="ml-4 my-2 absolute text-lg" id="basic-addon2">
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
                {...register("travel_cost", {
                  valueAsNumber: true,
                  required: "Travel cost should be greater than 0!",
                  min: {
                    value: 0,
                    message: "Travel cost should be greater than 0!",
                  },
                  max: {
                    value: 1000000000,
                    message: "Travel cost should be less than 1,00,00,00,000!",
                  },
                })}
              />
              {errors.travel_cost && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.travel_cost?.message}
                </span>
              )}
              {errors.travel_cost && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.travel_cost?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Utilities :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span className="ml-4 my-2 absolute text-lg" id="basic-addon2">
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
                {...register("utilities_cost", {
                  valueAsNumber: true,
                  required: "Utilities cost should be greater than 0!",
                  min: {
                    value: 0,
                    message: "Utilities cost should be greater than 0!",
                  },
                  max: {
                    value: 1000000000,
                    message:
                      "Utilities cost should be less than 1,00,00,00,000!",
                  },
                })}
              />
              {errors.utilities_cost && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.utilities_cost?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Insurances :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span className="ml-4 my-2 absolute text-lg" id="basic-addon2">
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
                {...register("insurance", {
                  valueAsNumber: true,
                  required: "Insurance cost should be greater than 0!",
                  min: {
                    value: 0,
                    message: "Insurance cost should be greater than 0!",
                  },
                  max: {
                    value: 1000000000,
                    message:
                      "Insurance cost should be less than 1,00,00,00,000!",
                  },
                })}
              />
              {errors.insurance && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.insurance?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Telephone and Internet :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span className="ml-4 my-2 absolute text-lg" id="basic-addon2">
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
                {...register("tel_internet", {
                  valueAsNumber: true,
                  required:
                    "Telephone and Internet cost should be greater than 0!",
                  min: {
                    value: 0,
                    message:
                      "Telephone and Internet cost should be greater than 0!",
                  },
                  max: {
                    value: 1000000000,
                    message:
                      "Telephone and Internet cost should be less than 1,00,00,00,000!",
                  },
                })}
              />
              {errors.tel_internet && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.tel_internet?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal text-sm md:text-lg w-1/3 md:w-1/4">
              Entertainment :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span className="ml-4 my-2 absolute text-lg" id="basic-addon2">
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
                {...register("entertainment", {
                  valueAsNumber: true,
                  required: "Entertainment cost should be greater than 0!",
                  min: {
                    value: 0,
                    message: "Entertainment cost should be greater than 0!",
                  },
                  max: {
                    value: 1000000000,
                    message:
                      "Entertainment cost should be less than 1,00,00,00,000!",
                  },
                })}
              />
              {errors.entertainment && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.entertainment?.message}
                </span>
              )}
            </div>
          </div>
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
            disabled={!Submitting}
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

export default ExpensesDetails;
