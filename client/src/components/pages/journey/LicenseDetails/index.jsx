import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useProgress from "useProgress";
import {
  FormTitle,
  Navigator,
  inputClasses,
  selectClasses,
  errorToast,
} from "../extra/Widget";

const LicenseDetails = () => {
  const { setProgress } = useProgress();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const userService = new customerService();
  let cookieData =
    cookie.get("customerData") || cookie.get("customerDetail") || "";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      licenceNumber: cookieData.licenceNumber,
      licenceExpireDate: cookieData.licenceExpireDate,
      licenceType: cookieData.licenceType,
      licenceIssueState: cookieData.licenceIssueState,
    },
  });

  useEffect(() => {
    setProgress(70);
    if (cookieData.licenceIssueState) {
      setValue("licenceIssueState", cookieData.licenceIssueState);
    }
    //eslint-disable-next-line
  }, [cookieData]);

  const [States, setStates] = useState([]);
  const getStates = async () => {
    const result = await userService.getState();
    setStates(result);
  };
  useEffect(() => {
    getStates();
    return () => {};
    //eslint-disable-next-line
  }, []);

  const licenseDetail = async (data) => {
    let customerCookie = cookie.get("customerDetail");
    let contactNo = cookie.get("contactNo");
    let loanId = cookie.get("loanDetail");

    try {
      if (localStorage.getItem("token") || cookie.get("")) {
        let userId = cookieData.id;
        const { output, error } = await userService.updateUser({
          path: `user/${userId}`,
          details: { ...customerCookie, ...data, ...contactNo },
        });
        if (!output) {
          errorToast(error.data.message);
        } else {
          localStorage.setItem("token", output.token);
          cookie.remove("contactNo");
          cookie.remove("customerDetail");
          cookie.remove("customerData");
          setTimeout(() => {
            navigate("/journey/incomeDetail");
          }, 3000);
          const functionThatReturnPromise = () =>
            new Promise((resolve) => setTimeout(resolve, 2000));
          toast.promise(
            functionThatReturnPromise,
            {
              pending: "Updating User",
              success: "Profile updated successfully.",
              error: "Something is wrong !",
            },
            { position: "top-center" }
          );
        }
      } else {
        const { output, error } = await userService.registerUser({
          details: { ...customerCookie, ...data, ...contactNo },
          headerData: { ...loanId },
        });
        if (!output) {
          errorToast(error.data.message);
        } else {
          cookie.remove("customerDetail");
          setTimeout(() => {
            navigate("/journey/incomeDetail");
          }, 3000);

          const functionThatReturnPromise = () =>
            new Promise((resolve) => setTimeout(resolve, 2000));
          toast.promise(
            functionThatReturnPromise,
            {
              pending: "Registering User",
              success: `${output.message}`,
              error: "Something is wrong !",
            },
            { position: "top-center" }
          );
          localStorage.setItem("token", output.token);
          cookie.remove("contactNo");
          cookie.remove("customerDetail");
        }
      }
    } catch (error) {
      errorToast(error.message);
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7"
    >
      <ToastContainer />
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
          className="w-5/6 lg:w-1/2 md:px-24"
        >
          <div className="flex flex-col gap-y-5 rounded-xl p-8 shadow-wrapper">
            <FormTitle formTitle={"License details"} />
            <div className="flex text-md flex-col">
              <label htmlFor="license_number" className="px-1">
                Number <span className="text-red-500">*</span>
              </label>
              <input
                id="license_number"
                type="text"
                autoFocus
                placeholder="ABCDE1234567890"
                className={inputClasses}
                autoComplete="off"
                {...register("licenceNumber", {
                  required: "Please enter license number!",
                  minLength: {
                    value: 15,
                    message: "License number length should be 15!",
                  },
                  maxLength: {
                    value: 15,
                    message: "License number length should be 15!",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]{15}$/,
                    message: "Please entre valid license number",
                  },
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
                Expiry <span className="text-red-500">*</span>
              </label>
              <input
                id="license_expiry"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className={inputClasses}
                {...register("licenceExpireDate", {
                  required: "Please select license expiry date!",
                })}
              />
              {errors.licenceExpireDate && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenceExpireDate?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="license_type" className="px-1">
                License type <span className="text-red-500">*</span>
              </label>
              <select
                name="license_type"
                id="license_type"
                defaultValue=""
                className={selectClasses}
                {...register("licenceType", {
                  required: "Please select your license-type!",
                })}
              >
                <option value="" disabled>
                  Select license-type
                </option>
                <option value="LMV-NT">LMV-NT</option>
                <option value="HPMV">HPMV</option>
                <option value="HGMV">HGMV</option>
              </select>
              {errors.licenceType && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.licenceType?.message}
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="issue_state" className="px-1">
                Issue state <span className="text-red-500">*</span>
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
                  Select state
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

const index = () => {
  return (
    <div>
      <LicenseDetails />
    </div>
  );
};

export default index;
