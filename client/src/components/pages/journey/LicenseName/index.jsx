import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FormTitle, Navigator, inputClasses } from "../extra/Widget";
// import useProgress from "useProgress";

const LicenseName = () => {
  // const { setProgress } = useProgress();
  // setProgress("60%");
  const cookie = new Cookies();
  const navigate = useNavigate();
  let cookieData;
  if (
    cookie.get("customerDetail") &&
    cookie.get("customerDetail").licenseFirstName
  ) {
    cookieData = cookie.get("customerDetail") || "";
  } else {
    cookieData = cookie.get("customerData") || "";
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      licenseFirstName: cookieData.licenseFirstName,
      licenseLastName: cookieData.licenseLastName,
      licenseIssueDate: cookieData.licenseIssueDate,
    },
  });

  const licenseDetail = (data) => {
    let customerCookie = cookie.get("customerDetail");
    cookie.remove("customerDetail");
    cookie.set(
      "customerDetail",
      { ...customerCookie, ...data },
      { maxAge: 3600 }
    );
    navigate("/journey/licenseDetail");
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
                First name in driver's license
                <span className="text-red-500">*</span>
              </label>
              <input
                id="license_first_name"
                type="text"
                autoFocus
                placeholder="Peter"
                className={inputClasses}
                autoComplete="off"
                {...register("licenseFirstName", {
                  required: "Please enter license holder's firstname!",
                  minLength: {
                    value: 2,
                    message: "Firstname should be atleast 2 characters long!",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "Firstname should be less than 20 characters length!",
                  },
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
                Last name in driver's license{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="license_last_name"
                type="text"
                placeholder="Parker"
                className={inputClasses}
                autoComplete="off"
                {...register("licenseLastName", {
                  required: "Please enter license holder's lastname!",
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
              {errors.licenseLastName && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenseLastName?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="issue_date" className="px-1">
                License issue date <span className="text-red-500">*</span>
              </label>
              <input
                id="issue_date"
                type="date"
                min={"1980-01-01"}
                max={new Date().toISOString().split("T")[0]}
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

const index = () => {
  return (
    <div>
      <LicenseName />
    </div>
  );
};

export default index;
