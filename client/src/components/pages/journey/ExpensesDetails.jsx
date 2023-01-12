import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const ExpensesDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const expensesDetails = (data) => {
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
              strings: "Please provide your monthly expenses.",
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(expensesDetails)}
            className="flex flex-col gap-y-3"
          >
            <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
              Expenses
            </p>
            <div className="flex text-md flex-col">
              <label htmlFor="vehicle_running_cost" className="px-1">
                Moter vehicle running costs
              </label>
              <input
                id="vehicle_running_cost"
                type="number"
                placeholder="Enter vehicle running cost                                              ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("vehicle_running_cost", { required: true })}
              />
              {errors.vehicle_running_cost && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="travel" className="px-1">
                Travel
              </label>
              <input
                id="travel"
                type="number"
                placeholder="Enter travel cost                                                                  ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("travel", { required: true })}
              />
              {errors.travel && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="utilities" className="px-1">
                Utilities
              </label>
              <input
                id="utilities"
                type="number"
                placeholder="Enter utilities cost                                                              ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("utilities", { required: true })}
              />
              {errors.utilities && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="insurances" className="px-1">
                Insurances
              </label>
              <input
                id="insurances"
                type="number"
                placeholder="Enter insurances amount                                                ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("insurances", { required: true })}
              />
              {errors.insurances && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="telephone_internet" className="px-1">
                Telephone and Internet
              </label>
              <input
                id="telephone_internet"
                type="number"
                placeholder="Enter telephone and internet charges                      ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("telephone_internet", { required: true })}
              />
              {errors.telephone_internet && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="entertainment" className="px-1">
                Entertainment
              </label>
              <input
                id="entertainment"
                type="number"
                placeholder="Enter entertainment cost                                               ₹"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("entertainment", { required: true })}
              />
              {errors.entertainment && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="w-full flex justify-around">
              <Link
                to={"/journey/incomeDetail"}
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

export default ExpensesDetails;
