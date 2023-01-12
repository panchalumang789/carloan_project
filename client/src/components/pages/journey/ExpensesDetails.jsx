import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { FormTitle, Navigator, inputClasses } from "./extra/Widget";

const ExpensesDetails = () => {
  const { register, handleSubmit } = useForm({ model: "all" });
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
                placeholder="Enter vehicle running cost"
                className={inputClasses + " pl-10"}
                {...register("vehicle_running_cost")}
              />
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
                placeholder="Enter travel cost"
                className={inputClasses + " pl-10"}
                {...register("travel_cost")}
              />
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
                placeholder="Enter utilities cost"
                className={inputClasses + " pl-10"}
                {...register("utilities_cost")}
              />
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
                placeholder="Enter insurances amount"
                className={inputClasses + " pl-10"}
                {...register("insurance")}
              />
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
                placeholder="Enter telephone and internet charges"
                className={inputClasses + " pl-10"}
                {...register("tel_internet")}
              />
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
                placeholder="Enter entertainment cost"
                className={inputClasses + " pl-10"}
                {...register("entertainment")}
              />
            </div>
            <Navigator prevForm={"/journey/incomeDetail"} />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpensesDetails;
