import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { FormTitle, Navigator, inputClasses } from "./extra/Widget";

const LicenseName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
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
          <p>Perfect! </p>
          <p>
            I need to grab some personal info so we can run a soft credit check.
          </p>
          <p>Don't worry, it won't impact your credit score.</p>
          <Typewriter
            options={{
              strings: "Best loan is waiting for you...",
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit(licenseDetail)}
          className="w-5/6 lg:w-1/2 md:px-28"
        >
          <div className="flex flex-col gap-y-5">
            <FormTitle formTitle={"Personal Details"} />
            <div className="flex text-md flex-col">
              <label htmlFor="license_first_name" className="px-1">
                First name in driver's licenses
              </label>
              <input
                id="license_first_name"
                type="text"
                autoFocus
                placeholder="License FirstName"
                className={inputClasses}
                {...register("licenseFirstName", {
                  required: "Please enter license firstname!",
                })}
              />
              {errors.licenseFirstName && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenseFirstName?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="license_last_name" className="px-1">
                Last name in driver's licenses
              </label>
              <input
                id="license_last_name"
                type="text"
                placeholder="License LastName"
                className={inputClasses}
                {...register("licenseLastName", {
                  required: "Please enter license lastname!",
                })}
              />
              {errors.licenseLastName && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenseLastName?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="issue_date" className="px-1">
                License issue date
              </label>
              <input
                id="issue_date"
                type="date"
                className={inputClasses}
                {...register("licenseIssueDate", {
                  required: "Please select license issue date!",
                })}
              />
              {errors.licenseIssueDate && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenseIssueDate?.message}
                </span>
              )}
            </div>
            <Navigator prevForm={"/journey/customerDetail"} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LicenseName;
