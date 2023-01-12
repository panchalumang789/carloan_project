import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";
import {
  FormTitle,
  Navigator,
  inputClasses,
  selectClasses,
} from "./extra/Widget";

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
            <FormTitle formTitle={"License details"} />
            <div className="flex text-md flex-col">
              <label htmlFor="license_number" className="px-1">
                Number
              </label>
              <input
                id="license_number"
                type="number"
                autoFocus
                placeholder="License Number"
                className={inputClasses}
                {...register("licenceNumber", {
                  required: "Please enter license number!",
                })}
              />
              {errors.licenceNumber && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenceNumber?.message}
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
                className={inputClasses}
                {...register("licenceType", {
                  required: "Please select license expiry date!",
                })}
              />
              {errors.licenceType && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenceType?.message}
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
                className={selectClasses}
                {...register("licenceExpireDate", {
                  required: "Please select your license type!",
                })}
              >
                <option value="" disabled>
                  Select License-Type
                </option>
                <option value="LMV">LMV</option>
              </select>
              {errors.licenceExpireDate && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenceExpireDate?.message}
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
                className={selectClasses}
                {...register("licenceIssueState", {
                  required: "Please select license issue state!",
                })}
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
              {errors.licenceIssueState && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenceIssueState?.message}
                </span>
              )}
            </div>
            <Navigator prevForm={"/journey/licenseName"} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LicenseDetails;
