import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";

const LicenseDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const userService = new customerService();

  const [States, setStates] = useState([]);
  const getStates = async () => {
    const result = await userService.getState({ data: { url: "states" } });
    setStates(result);
  };
  useEffect(() => {
    getStates();
    return () => {};
  });

  const licenseDetail = (data) => {
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
              strings: "Great! I need your driving license details.",
              autoStart: true,
              loop: false,
              delay: 60,
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit(licenseDetail)}
          className="w-5/6 lg:w-1/2 md:px-28"
        >
          <div className="flex flex-col gap-y-5">
            <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
              License details
            </p>
            <div className="flex text-md flex-col">
              <label htmlFor="license_number" className="px-1">
                Number
              </label>
              <input
                id="license_number"
                type="number"
                placeholder="License Number"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("license_number", { required: true })}
              />
              {errors.license_number && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="license_expiry" className="px-1">
                Expiry
              </label>
              <input
                id="license_expiry"
                type="date"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("license_expiry", { required: true })}
              />
              {errors.license_expiry && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="license_type" className="px-1">
                License type
              </label>
              <select
                name="license_type"
                id="license_type"
                defaultValue=""
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 text-primary-color-6 font-medium"
                {...register("license_type", { required: true })}
              >
                <option value="" disabled>
                  Select License-Type
                </option>
                <option value="LMV">LMV</option>
              </select>
              {errors.license_type && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="issue_state" className="px-1">
                Issue state
              </label>
              <select
                id="issue_state"
                name="issue_state"
                defaultValue=""
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 text-primary-color-6 font-medium"
                {...register("issue_state", { required: true })}
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
              {errors.issue_state && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="w-full flex justify-around">
              <Link
                to={"/journey/licenseName"}
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
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LicenseDetails;
