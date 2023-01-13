import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FormTitle, Navigator, inputClasses } from "./extra/Widget";
import customerService from "services/customerServices";

const IncomeDetails = () => {
  let incomeService = new customerService();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const incomeDetails = async (data) => {
    console.log(data);
    let loanId = cookie.get("loanDetail");
    try {
      const addIncome = incomeService.addIncome({
        path: "income",
        details: { ...data, ...loanId },
      });
      setTimeout(() => {
        navigate("/journey/expensesDetail");
      }, 4000);
      const functionThatReturnPromise = () =>
        new Promise((resolve) => setTimeout(resolve, 3000));
      toast.promise(functionThatReturnPromise, {
        pending: "Storing Additional Incomes",
        success: `${addIncome.message}`,
        error: "Something is wrong !",
      });
    } catch (error) {
      toast.error(error.message, {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
                    value="yes"
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
                    value="no"
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
            <div className="flex text-md flex-col">
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg " id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="rental_income"
                type="number"
                placeholder="Enter rental income"
                className={inputClasses + " pl-10"}
                {...register("rental_income", {
                  required: "Please enter rental income!",
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
                <span className="text-red-500 px-1 text-sm">
                  {errors.rental_income?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg " id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="investment_income"
                type="number"
                placeholder="Enter investment income"
                className={inputClasses + " pl-10"}
                {...register("investment_income", {
                  required: "Please enter investment income!",
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
                <span className="text-red-500 px-1 text-sm">
                  {errors.investment_income?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg " id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="salary_sacrifice"
                type="number"
                placeholder="Enter salary sacrifice"
                className={inputClasses + " pl-10"}
                {...register("salary_sacrifice", {
                  required: "Please enter salary sacrifice!",
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
                <span className="text-red-500 px-1 text-sm">
                  {errors.salary_sacrifice?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg " id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="centralink_benifit"
                type="number"
                placeholder="Enter centralink income"
                className={inputClasses + " pl-10"}
                {...register("centralink_benifit", {
                  required: "Please enter centralink income!",
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
                <span className="text-red-500 px-1 text-sm">
                  {errors.centralink_benifit?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg " id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="foreign_income"
                type="number"
                placeholder="Enter foreign income"
                className={inputClasses + " pl-10"}
                {...register("foreign_income", {
                  required: "Please enter foreign income!",
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
                <span className="text-red-500 px-1 text-sm">
                  {errors.foreign_income?.message}
                </span>
              )}
            </div>
            <Navigator prevForm={"/journey/licenseDetail"} />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default IncomeDetails;
