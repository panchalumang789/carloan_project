import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import {
  FormTitle,
  Navigator,
  inputClasses,
  selectClasses,
} from "./extra/Widget";

const WorkDetails = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [workDetail] = useState(cookie.get("leadDetails"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all", defaultValues: workDetail });

  const WorkDetails = (data) => {
    let leadCookie = cookie.get("leadDetails");
    cookie.set("leadDetails", { ...leadCookie, ...data });
    navigate("/journey/loginDetail");
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
              strings: "What is your work situation?",
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(WorkDetails)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-6">
              <FormTitle formTitle={"Work Details"} />
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col">
                  <label htmlFor="user_status" className="px-1">
                    Status
                  </label>
                  <select
                    name="user_status"
                    id="user_status"
                    autoFocus
                    defaultValue={""}
                    className={selectClasses}
                    {...register("user_status", {
                      required: "Please select your work status!",
                    })}
                  >
                    <option value="" disabled>
                      Select work status
                    </option>
                    <option value="Employee">I am an Employee</option>
                    <option value="Unemployed">I am an Unemployed</option>
                  </select>
                  {errors.user_status && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.user_status?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="user_income" className="px-1">
                    Income
                  </label>
                  <input
                    type="number"
                    id="user_income"
                    placeholder="Enter your income"
                    className={inputClasses}
                    {...register("user_income", {
                      required: "Please enter your income!",
                      min: {
                        value: 10000,
                        message: "Income should be greater than 10000!",
                      },
                    })}
                  />
                  {errors.user_income?.type === "required" && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.user_income?.message}
                    </span>
                  )}
                  {errors.user_income?.type === "min" && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.user_income?.message}
                    </span>
                  )}
                </div>
              </div>
              <Navigator prevForm={"/journey/carDetail"} />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkDetails;
