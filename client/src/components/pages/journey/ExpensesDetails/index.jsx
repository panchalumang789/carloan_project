import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FormTitle, Navigator, inputClasses } from "../extra/Widget";
import customerService from "services/customerServices";

const ExpensesDetails = () => {
  let expensesService = new customerService();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const expensesDetails = async (data) => {
    let loanId = cookie.get("loanDetail");
    try {
      const addExpenses = await expensesService.addExpenses({
        path: "expenses",
        details: { ...data, ...loanId },
        headerData: localStorage.getItem("token"),
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
      const functionThatReturnPromise = () =>
        new Promise((resolve) => setTimeout(resolve, 3000));
      toast.promise(functionThatReturnPromise, {
        pending: "Storing Monthly Expenses",
        success: `${addExpenses.message}`,
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      <ToastContainer />
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
            <FormTitle formTitle={"Expenses"} />
            <div className="flex text-md flex-col">
              <label htmlFor="vehicle_running_cost" className="px-1">
                Moter vehicle running costs
              </label>
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg " id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="vehicle_running_cost"
                type="number"
                autoFocus
                defaultValue="0"
                placeholder="Enter vehicle running cost"
                className={inputClasses + " pl-10"}
                {...register("vehicle_running_cost", {
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
            <div className="flex text-md flex-col">
              <label htmlFor="travel" className="px-1">
                Travel
              </label>
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg" id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="travel"
                type="number"
                defaultValue="0"
                placeholder="Enter travel cost"
                className={inputClasses + " pl-10"}
                {...register("travel_cost", {
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
            <div className="flex text-md flex-col">
              <label htmlFor="utilities" className="px-1">
                Utilities
              </label>
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg" id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="utilities"
                type="number"
                defaultValue="0"
                placeholder="Enter utilities cost"
                className={inputClasses + " pl-10"}
                {...register("utilities_cost", {
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
            <div className="flex text-md flex-col">
              <label htmlFor="insurances" className="px-1">
                Insurances
              </label>
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg" id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="insurances"
                type="number"
                defaultValue="0"
                placeholder="Enter insurances amount"
                className={inputClasses + " pl-10"}
                {...register("insurance", {
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
            <div className="flex text-md flex-col">
              <label htmlFor="telephone_internet" className="px-1">
                Telephone and Internet
              </label>
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg" id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="telephone_internet"
                type="number"
                defaultValue="0"
                placeholder="Enter telephone and internet charges"
                className={inputClasses + " pl-10"}
                {...register("tel_internet", {
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
            <div className="flex text-md flex-col">
              <label htmlFor="entertainment" className="px-1">
                Entertainment
              </label>
              <div className="input-group-prepend">
                <span className="ml-4 my-1.5 fixed text-lg" id="basic-addon1">
                  &#x20B9;
                </span>
              </div>
              <input
                id="entertainment"
                type="number"
                defaultValue="0"
                placeholder="Enter entertainment cost"
                className={inputClasses + " pl-10"}
                {...register("entertainment", {
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
            <Navigator prevForm={"/journey/incomeDetail"} />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

const index = () => {
  return (
    <div>
      <ExpensesDetails />
    </div>
  );
};

export default index;