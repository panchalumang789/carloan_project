import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const IncomeDetails = (props) => {
  const [incomeDetails, setIncomeData] = useState({});
  const [additional_income, setadditional_income] = useState(true);
  useEffect(() => {
    setIncomeData(props.IncomeDetails);
  }, [props]);

  const additionalIncome = (e) => {
    e.target.value === "true"
      ? setadditional_income(true)
      : setadditional_income(false);
  };

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
      {JSON.stringify(incomeDetails)}
      <div className="grid grid-cols-2 gap-5 px-2">
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <label className="font-normal text-base w-1/5">Additional Income :</label>
          <div className="flex flex-col w-3/5">
            <div className="flex gap-x-5">
              <div>
                <label htmlFor="yes" className="px-2">
                  Yes
                </label>
                <input
                  type="radio"
                  name="income"
                  id="yes"
                  autoFocus
                  value={true}
                  onClick={additionalIncome}
                  {...register("additional_income", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label htmlFor="no" className="px-2">
                  No
                </label>
                <input
                  type="radio"
                  name="income"
                  id="no"
                  value={false}
                  onClick={additionalIncome}
                  {...register("additional_income", {
                    required: true,
                  })}
                />
              </div>
            </div>
            {errors.additional_income && (
              <span className="text-red-500 px-1 text-sm">
                Please select you have any additional income or no?
              </span>
            )}
          </div>
        </div>
        <div className="font-medium text-xl flex gap-x-2 items-center">
          <label className="font-normal text-base w-1/5">
            Rental income per month (after tax) :
          </label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={incomeDetails.rental_income}
              autoComplete="off"
              {...register("rental_income", {
                min: {
                  value: 0,
                  message: "Rental income should be greater than 0!",
                },
                max: {
                  value: 1000000000,
                  message: "Rental income should be less than 1,00,00,00,000!",
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
          <label className="font-normal text-base w-1/5">
            {" "}
            Investment income per month (after tax) :
          </label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={incomeDetails.investment_income}
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
          <label className="font-normal text-base w-1/5">
            Salary sacrifice per month (after tax) :
          </label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={incomeDetails.salary_sacrifice}
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
          <label className="font-normal text-base w-1/5">
            Centralink benifit per month (after tax) :
          </label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={incomeDetails.centralink_benifit}
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
          <label className="font-normal text-base w-1/5">
            Foreign income per month (after tax) :
          </label>
          <div className="flex flex-col w-3/5">
            <input
              className={inputClasses}
              type="text"
              disabled
              // defaultValue={incomeDetails.foreign_income}
              autoComplete="off"
              {...register("foreign_income", {
                min: {
                  value: 0,
                  message: "Foreign income should be greater than 0!",
                },
                max: {
                  value: 1000000000,
                  message: "Foreign income should be less than 1,00,00,00,000!",
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

export default IncomeDetails;
