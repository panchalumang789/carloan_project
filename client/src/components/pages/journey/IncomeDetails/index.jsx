import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FormTitle, inputClasses } from "../extra/Widget";
import customerService from "services/customerServices";
// import useProgress from "useProgress";

const IncomeDetails = () => {
  // const { setProgress } = useProgress();
  // setProgress("80%");
  let incomeService = new customerService();
  const [additional_income, setadditional_income] = useState(true);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [called, setCalled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const incomeDetails = async (data) => {
    if (called) return;
    setCalled(true);
    let loanId = cookie.get("loanDetail");
    try {
      const addIncome = await incomeService.addIncome({
        details: { ...data, ...loanId },
        headerData: localStorage.getItem("token"),
      });
      console.log(addIncome);
      setTimeout(() => {
        navigate("/journey/expensesDetail");
      }, 2500);
      const functionThatReturnPromise = () =>
        new Promise((resolve) => setTimeout(resolve, 1500));
      toast.promise(
        functionThatReturnPromise,
        {
          pending: "Storing Additional Incomes",
          success: `${addIncome.message}`,
          error: "Something is wrong !",
        },
        { position: "top-center" }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        position: "top-center",
      });
    }
  };
  const additionalIncome = (e) => {
    e.target.value === "true"
      ? setadditional_income(true)
      : setadditional_income(false);
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7"
    >
      <ToastContainer />
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
            className="flex flex-col gap-y-8"
          >
            <FormTitle formTitle={"Additional Income"} />
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
            {additional_income ? (
              <>
                <div className="flex text-md flex-col">
                  <label htmlFor="rental_income">
                    Rental income per month (after tax)
                  </label>
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    id="rental_income"
                    type="number"
                    defaultValue="0"
                    placeholder="Enter rental income"
                    className={inputClasses + " pl-10"}
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
                <div className="flex text-md flex-col">
                  <label htmlFor="investment_income">
                    Investment income per month (after tax)
                  </label>
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    id="investment_income"
                    type="number"
                    defaultValue="0"
                    placeholder="Enter investment income"
                    className={inputClasses + " pl-10"}
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
                <div className="flex text-md flex-col">
                  <label htmlFor="salary_sacrifice">
                    Salary sacrifice per month (after tax)
                  </label>
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    id="salary_sacrifice"
                    type="number"
                    defaultValue="0"
                    placeholder="Enter salary sacrifice"
                    className={inputClasses + " pl-10"}
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
                <div className="flex text-md flex-col">
                  <label htmlFor="centralink_benifit">
                    Centralink benifit per month (after tax)
                  </label>
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    id="centralink_benifit"
                    type="number"
                    defaultValue="0"
                    placeholder="Enter centralink income"
                    className={inputClasses + " pl-10"}
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
                <div className="flex text-md flex-col">
                  <label htmlFor="foreign_income">
                    Foreign income per month (after tax)
                  </label>
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    id="foreign_income"
                    type="number"
                    defaultValue="0"
                    placeholder="Enter foreign income"
                    className={inputClasses + " pl-10"}
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
              </>
            ) : (
              <div></div>
            )}

            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-5"
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

const index = () => {
  return (
    <div>
      <IncomeDetails />
    </div>
  );
};

export default index;
