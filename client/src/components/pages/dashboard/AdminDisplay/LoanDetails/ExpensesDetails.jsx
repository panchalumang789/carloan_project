import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const ExpensesDetails = (props) => {
  const [expensesDetails, setExpensesData] = useState({});
  useEffect(() => {
    setExpensesData(props.ExpensesDetails);
  }, [props]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      <div className="grid grid-cols-2 gap-5 px-2">
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <label className="font-normal w-1/5">
            Moter vehicle running costs :
          </label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={expensesDetails.rental_income}
              autoComplete="off"
              {...register("vehicle_running_cost", {
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
          <label className="font-normal w-1/5">Travel :</label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={expensesDetails.rental_income}
              autoComplete="off"
              {...register("travel_cost", {
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
            {errors.licenceNumber && (
              <span className="text-red-500 pt-1 px-1 text-sm">
                {errors.licenceNumber?.message}
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
          <label className="font-normal w-1/5">Utilities :</label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={expensesDetails.rental_income}
              autoComplete="off"
              {...register("utilities_cost", {
                required: "Utilities cost should be greater than 0!",
                min: {
                  value: 0,
                  message: "Utilities cost should be greater than 0!",
                },
                max: {
                  value: 1000000000,
                  message: "Utilities cost should be less than 1,00,00,00,000!",
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
          <label className="font-normal w-1/5">Insurances :</label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={expensesDetails.rental_income}
              autoComplete="off"
              {...register("insurance", {
                required: "Insurance cost should be greater than 0!",
                min: {
                  value: 0,
                  message: "Insurance cost should be greater than 0!",
                },
                max: {
                  value: 1000000000,
                  message: "Insurance cost should be less than 1,00,00,00,000!",
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
          <label className="font-normal w-1/5">Telephone and Internet :</label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={expensesDetails.rental_income}
              autoComplete="off"
              {...register("tel_internet", {
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
          <label className="font-normal w-1/5">Entertainment :</label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={expensesDetails.rental_income}
              autoComplete="off"
              {...register("entertainment", {
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

export default ExpensesDetails;
