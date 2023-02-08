import {
  errorToast,
  FormTitle,
  inputClasses,
  selectClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import customerService from "services/customerServices";

const AddAgent = () => {
  const [States, setStates] = useState([]);

  useEffect(() => {
    const userService = new customerService();
    (async () => {
      const result = await userService.getState();
      setStates(result);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const addAgent = new customerService();
  const AddAgentData = async (data) => {
    const { output, error } = await addAgent.registerAgent({
      bodyData: data,
    });
    if (!output) {
      errorToast(error.data.message);
    } else {
      successToast(output.message);
    }
  };
  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-[calc(100%-210px)]  overflow-auto md:h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 px-4">
      <form
        onSubmit={handleSubmit(AddAgentData)}
        className="flex flex-col gap-3"
      >
        <ToastContainer />
        <div className="mt-2 w-fit">
          <FormTitle formTitle={"Personal Details"} />
        </div>
        <div className="grid md:grid-cols-2 gap-5 px-2">
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="contactNo" className="font-normal w-1/3 md:w-1/5">
              Contact No :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <div className="relative input-group-prepend">
                <span
                  className="ml-4 my-3.5 absolute text-lg fa fa-phone"
                  id="basic-addon2"
                ></span>
              </div>
              <input
                id="contactNo"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed pl-10"
                }
                type="number"
                autoComplete="off"
                placeholder="9876543210"
                {...register("contactNo", {
                  required: "Please enter you contact no!",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter valid contact no!",
                  },
                })}
              />
              {errors.contactNo?.type === "required" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.contactNo?.message}
                </span>
              )}
              {errors.contactNo?.type === "pattern" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.contactNo?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="prefix" className="font-normal w-1/3 md:w-1/5">
              Prefix :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="prefix"
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                defaultValue=""
                {...register("prefix", { required: "Please select prefix!" })}
              >
                <option value="" disabled>
                  Select prefix
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="firstName" className="font-normal w-1/3 md:w-1/5">
              Firstname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="firstName"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                placeholder="Agent Firstname"
                autoComplete="off"
                {...register("firstName", {
                  required: "Please enter firstname!",
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
              {errors.firstName && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="lastName" className="font-normal w-1/3 md:w-1/5">
              Lastname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="lastName"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                autoComplete="off"
                placeholder="Agent Lastname"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="email" className="font-normal w-1/3 md:w-1/5">
              Email :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="email"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                autoComplete="off"
                placeholder="Agent Email"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="state" className="font-normal w-1/3 md:w-1/5">
              State :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="state"
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                defaultValue=""
                {...register("state", { required: "Please select state!" })}
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
              {errors.state && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.state?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 w-fit">
          <FormTitle formTitle={"License Details"} />
        </div>
        <div className="grid md:grid-cols-2 gap-5 px-2">
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label
              htmlFor="licenseNumber"
              className="font-normal w-1/3 md:w-1/5"
            >
              Number :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseNumber"
                placeholder="Agent License-Number"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="licenseType" className="font-normal w-1/3 md:w-1/5">
              Type :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="licenseType"
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                defaultValue=""
                autoComplete="off"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label
              htmlFor="licenseFirstname"
              className="font-normal w-1/3 md:w-1/5"
            >
              Firstname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseFirstname"
                placeholder="Agent License-Firstname"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label
              htmlFor="licenseLastname"
              className="font-normal w-1/3 md:w-1/5"
            >
              Lastname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseLastname"
                placeholder="Agent License-Lastname"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label
              htmlFor="licenseIssueDate"
              className="font-normal w-1/3 md:w-1/5"
            >
              Issue Date :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseIssueDate"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                max={new Date().toISOString().split("T")[0]}
                type="date"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label
              htmlFor="licenseExpiryDate"
              className="font-normal w-1/3 md:w-1/5"
            >
              Expiry Date :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseExpiryDate"
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                min={new Date().toISOString().split("T")[0]}
                type="date"
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
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label
              htmlFor="licenseIssueState"
              className="font-normal w-1/3 md:w-1/5"
            >
              Issue State :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="licenseIssueState"
                className={
                  selectClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                defaultValue=""
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
          </div>
        </div>
        <div className="w-full flex justify-end px-36 gap-4">
          <button
            type="submit"
            className="group font-medium flex items-center justify-start gap-x-2 w-28 text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 bg-primary-color-7 hover:bg-white dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3 disabled:bg-white/40 disabled:hover:cursor-not-allowed"
          >
            SUBMIT
            <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgent;
