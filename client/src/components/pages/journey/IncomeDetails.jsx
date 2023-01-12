import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const IncomeDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const incomeDetails = (data) => {
    console.log(data);
  };
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
        transition: { duration: 0.3 },
      }}
      className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <Typewriter
            options={{
              strings: "Do you earn any additional income.",
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(incomeDetails)}
            className="flex flex-col gap-y-4"
          >
            <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
              Additional Income
            </p>
            <div className="flex text-md flex-col">
              <div className="flex gap-x-4">
                <label>Additional Income</label>
                <div>
                  <label htmlFor="yes" className="px-2">
                    Yes
                  </label>
                  <input
                    type="radio"
                    name="income"
                    id="yes"
                    value="yes"
                    {...register("additional_income", { required: true })}
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
                    value="no"
                    {...register("additional_income", { required: true })}
                  />
                </div>
              </div>
              {errors.additional_income && (
                <span className="text-red-500 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="rental_income">
                Rental income per month (after tax)
              </label>
              <input
                id="rental_income"
                type="number"
                placeholder="Rental income                                                                       ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("rental_income", { required: true })}
              />
              {errors.rental_income && (
                <span className="text-red-500 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="investment_income">
                Investment income per month (after tax)
              </label>
              <input
                id="investment_income"
                type="number"
                placeholder="Enter investment income                                                ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("investment_income", { required: true })}
              />
              {errors.investment_income && (
                <span className="text-red-500 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="salary_sacrifice">
                Salary sacrifice per month (after tax)
              </label>
              <input
                id="salary_sacrifice"
                type="number"
                placeholder="Salary sacrifice                                                                     ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("salary_sacrifice", { required: true })}
              />
              {errors.salary_sacrifice && (
                <span className="text-red-500 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="centralink_benifit">
                Centralink benifit per month (after tax)
              </label>
              <input
                id="centralink_benifit"
                type="number"
                placeholder="Enter centralink income                                                   ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("centralink_benifit", { required: true })}
              />
              {errors.centralink_benifit && (
                <span className="text-red-500 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="foreign_income">
                Foreign income per month (after tax)
              </label>
              <input
                id="foreign_income"
                type="number"
                placeholder="Enter foreign income                                                         ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("foreign_income", { required: true })}
              />
              {errors.foreign_income && (
                <span className="text-red-500 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="w-full flex justify-around">
              <Link
                to={"/journey/licenseDetail"}
                className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
              >
                <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left "></em>{" "}
                Back
              </Link>
              <button
                type="submit"
                className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
              >
                Next
                <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default IncomeDetails;
