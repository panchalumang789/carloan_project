import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import useProgress from "useProgress";
import {
  FormTitle,
  Navigator,
  inputClasses,
  selectClasses,
} from "../extra/Widget";

const WorkDetails = () => {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(20);
  }, [setProgress]);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [workDetail] = useState(cookie.get("leadDetails"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues: workDetail });

  const WorkDetails = (data) => {
    let leadCookie = cookie.get("leadDetails");
    cookie.remove("leadDetails");
    cookie.set("leadDetails", { ...leadCookie, ...data }, { maxAge: 3600 });
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7"
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
        <div className="w-5/6 lg:w-1/2 md:px-20">
          <form
            onSubmit={handleSubmit(WorkDetails)}
            className="flex justify-center flex-col mx-auto rounded-xl p-8 shadow-wrapper"
          >
            <div className="flex flex-col gap-y-6">
              <FormTitle formTitle={"Work Details"} />
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col">
                  <label htmlFor="user_status" className="px-1">
                    Work status <span className="text-red-500">*</span>
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
                    Monthly income <span className="text-red-500">*</span>
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
                    type="number"
                    id="user_income"
                    placeholder="00000"
                    className={inputClasses + " pl-10"}
                    {...register("user_income", {
                      required: "Please enter your income!",
                      min: {
                        value: 0,
                        message: "Income should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message: "Income should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.user_income && (
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

const index = () => {
  return (
    <div>
      <WorkDetails />
    </div>
  );
};

export default index;
