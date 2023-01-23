import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";
import { FormTitle, inputClasses, selectClasses } from "../extra/Widget";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
// import useProgress from "useProgress";

const CustomerDetails = () => {
  // const { setProgress } = useProgress();
  // setProgress("50%");
  const userService = new customerService();
  const navigate = useNavigate();
  const [States, setStates] = useState([]);
  const cookie = new Cookies();

  useEffect(() => {
    (async () => {
      const result = await userService.getState({ data: { url: "states" } });
      setStates(result);
    })();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        const findUser = await userService.verifyToken({
          headerData: localStorage.getItem("token"),
        });
        const preData = cookie.get("customerDetail");
        cookie.set("customerData", findUser, { maxAge: 3600 });
        setValue("prefix", preData ? preData.prefix : findUser.prefix);
        setValue("firstName", preData ? preData.firstName : findUser.firstName);
        setValue("lastName", preData ? preData.lastName : findUser.lastName);
        setValue("email", preData ? preData.email : findUser.email);
        setValue("state", preData ? preData.state : findUser.state);
      })();
    }
    if (cookie.get("contactNo")) {
      (async () => {
        const result = await userService.findUserbyContact({
          details: cookie.get("contactNo"),
        });
        const preData = cookie.get("customerDetail");
        cookie.set("customerData", result, { maxAge: 3600 });
        setValue("prefix", preData ? preData.prefix : result.prefix);
        setValue("firstName", preData ? preData.firstName : result.firstName);
        setValue("lastName", preData ? preData.lastName : result.lastName);
        setValue("email", preData ? preData.email : result.email);
        setValue("state", preData ? preData.state : result.state);
      })();
    }

    return () => {};
    //eslint-disable-next-line
  }, []);

  const cookieData = [cookie.get("customerDetail") || ""];

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      prefix: cookieData.prefix,
      firstName: cookieData.firstName,
      lastName: cookieData.lastName,
      email: cookieData.email,
      state: cookieData.state,
    },
  });
  const getCustomerDetails = (data) => {
    let cookieData = cookie.get("customerDetail");
    cookie.set("customerDetail", { ...cookieData, ...data }, { maxAge: 3600 });
    navigate("/journey/licenseName");
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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <Typewriter
            options={{
              strings: "Perfect! You have been verified :) ",
              autoStart: true,
              loop: false,
              delay: 60,
            }}
          />
          <p>
            Simply fill in your details while we prepare your best loan matches.
          </p>
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <div className="flex flex-col gap-y-5">
            <FormTitle formTitle={"Details"} />
            <form
              onSubmit={handleSubmit(getCustomerDetails)}
              className="flex flex-col gap-y-5"
            >
              <div className="flex gap-x-2 w-full">
                <div className="w-1/4">
                  <label htmlFor="prefix" className="px-1">
                    Prefix <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="prefix"
                    id="prefix"
                    autoFocus
                    defaultValue={""}
                    autoComplete="off"
                    className={selectClasses + " w-full h-10"}
                    {...register("prefix", {
                      required: "Please select prefix!",
                    })}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                  {errors.prefix && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.prefix?.message}
                    </span>
                  )}
                </div>
                <div className="w-3/4">
                  <label htmlFor="firstname" className="px-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    placeholder="Peter"
                    autoComplete="off"
                    className={inputClasses + " w-full"}
                    {...register("firstName", {
                      required: "Please enter firstname!",
                      minLength: {
                        value: 2,
                        message:
                          "Firstname should be atleast 2 characters long!",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Firstname should be less than 20 characters length!",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.firstName?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex text-md flex-col">
                <label htmlFor="lastname" className="px-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Parker"
                  autoComplete="off"
                  className={inputClasses}
                  {...register("lastName", {
                    required: "Please enter lastname!",
                    minLength: {
                      value: 2,
                      message: "Lastname should be atleast 2 characters long!",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Lastname should be less than 20 characters length!",
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.lastName?.message}
                  </span>
                )}
              </div>
              <div className="flex text-md flex-col">
                <label htmlFor="email" className="px-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="peter123@gmail.com"
                  autoComplete="off"
                  className={inputClasses}
                  {...register("email", {
                    required: "Please enter you email id!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter valid email id!",
                    },
                  })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.email?.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="flex text-md flex-col">
                <label htmlFor="state" className="px-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  defaultValue={""}
                  className={selectClasses}
                  {...register("state", { required: "Please select state!" })}
                >
                  <option value="" disabled>
                    State
                  </option>
                  {States.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
                {errors.state && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.state?.message}
                  </span>
                )}
              </div>
              <div className="w-full flex justify-end">
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
      </div>
    </motion.div>
  );
};

const index = () => {
  return (
    <div>
      <CustomerDetails />
    </div>
  );
};

export default index;
