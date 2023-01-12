import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typewriter from "typewriter-effect";
import { FormTitle, inputClasses, selectClasses } from "./extra/Widget";
import Cookies from "universal-cookie";

const CustomerDetails = () => {
  const userService = new customerService();
  const cookie = new Cookies();
  const [States, setStates] = useState([]);

  // const [customerData, setCustomerData] = useState({});
  const getUser = async () => {
    const result = await userService.findUserbyContact({
      path: `user/mobile/${cookie.get("contactNo").mobile}`,
    });
    console.log(result);
    setValue("prefix", result.prefix);
    setValue("firstName", result.firstName);
    setValue("lastName", result.lastName);
    setValue("email", result.email);
    setValue("state", result.state);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    model: "all",
  });
  const getCustomerDetails = (data) => {
    cookie.set("customerDetail", data);
    console.log(data);
  };

  useMemo(() => {
    const getStates = async () => {
      const result = await userService.getState({ data: { url: "states" } });
      setStates(result);
    };
    getStates();
    getUser();
    return () => {};
    //eslint-disable-next-line
  }, []);

  return (
    <>
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
                strings: "Perfect! You have been verified :) ",
                autoStart: true,
                loop: false,
                delay: 60,
              }}
            />
            <p>
              Simply fill in your details while we prepare your best loan
              matches.
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
                      Prefix
                    </label>
                    <select
                      name="prefix"
                      id="prefix"
                      autoFocus
                      defaultValue={""}
                      className={selectClasses + " w-full h-10"}
                      {...register("prefix", {
                        required: "Please select prefix!",
                      })}
                    >
                      <option value="" disabled>
                        Select Prefix
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
                      First name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      placeholder="FirstName"
                      className={inputClasses + " w-full"}
                      {...register("firstName", {
                        required: "Please enter firstname!",
                        pattern: "",
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
                    Last name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    placeholder="LastName"
                    className={inputClasses}
                    {...register("lastName", {
                      required: "Please enter lastname!",
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
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                    className={inputClasses}
                    {...register("email", {
                      required: "E-Mail is required!",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address!",
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
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    defaultValue={""}
                    className={selectClasses}
                    {...register("state", { required: "Please select state!" })}
                  >
                    <option value="" disabled>
                      Select State
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
    </>
  );
};

export default CustomerDetails;
