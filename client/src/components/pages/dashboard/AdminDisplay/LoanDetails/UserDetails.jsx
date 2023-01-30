import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import {
  FormTitle,
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const UserDetails = (props) => {
  const [userDetails, setUserData] = useState({});
  const [Editing, setEditing] = useState(false);
  const [States, setStates] = useState([]);
  const [IssueDate, setIssueDate] = useState("");
  const [ExpireDate, setExpireDate] = useState("");

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
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setUserData(props.UserDetails);
    setValue("firstName", props.UserDetails.firstName);
    setValue("lastName", props.UserDetails.lastName);
    setValue("email", props.UserDetails.email);
    setValue("contactNo", props.UserDetails.contactNo);
    setValue("licenceNumber", props.UserDetails.licenceNumber);
    setValue("licenceType", props.UserDetails.licenceType);
    setValue("licenseFirstName", props.UserDetails.licenseFirstName);
    setValue("licenseLastName", props.UserDetails.licenseLastName);
  }, [props, setValue]);

  useEffect(() => {
    setValue("state", props.UserDetails.state);
    setValue("licenceIssueState", props.UserDetails.licenceIssueState);
    if (userDetails.licenseIssueDate) {
      setIssueDate(
        new Date(userDetails.licenseIssueDate).toISOString().split("T")[0]
      );
    }
    console.log(userDetails);
    if (userDetails.licenceExpireDate) {
      setExpireDate(
        new Date(userDetails.licenceExpireDate).toISOString().split("T")[0]
      );
    }
  }, [
    States,
    setValue,
    userDetails,
    props.UserDetails.state,
    props.UserDetails.licenceIssueState,
  ]);

  const submitCustomerData = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      <form
        onSubmit={handleSubmit(submitCustomerData)}
        className="flex flex-col gap-5"
      >
        <div className="my-3 w-fit">
          <FormTitle formTitle={"Personal Details"} />
        </div>
        <div className="grid grid-cols-2 gap-5 px-2">
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal w-1/5">Firstname :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Lastname :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                disabled={!Editing}
                autoComplete="off"
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
            <label className="font-normal w-1/5">Email :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                disabled={!Editing}
                autoComplete="off"
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
            <label className="font-normal w-1/5">Contact No :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="number"
                disabled={!Editing}
                autoComplete="off"
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
            <label className="font-normal w-1/5">State :</label>
            <div className="flex flex-col w-3/5">
              <select
                id="term"
                className={selectClasses}
                disabled={!Editing}
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
        <div className="my-3 w-fit">
          <FormTitle formTitle={"License Details"} />
        </div>
        <div className="grid grid-cols-2 gap-5 px-2">
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label className="font-normal w-1/5">Number :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Type :</label>
            <div className="flex flex-col w-3/5">
              <select
                id="term"
                className={selectClasses}
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Firstname :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Lastname :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="text"
                autoComplete="off"
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Issue Date :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="date"
                defaultValue={IssueDate}
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Expiry Date :</label>
            <div className="flex flex-col w-3/5">
              <input
                className={
                  inputClasses +
                  " disabled:bg-white/40 disabled:hover:cursor-not-allowed"
                }
                type="date"
                defaultValue={ExpireDate}
                disabled={!Editing}
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
            <label className="font-normal w-1/5">Issue State :</label>
            <div className="flex flex-col w-3/5">
              <select
                id="term"
                className={selectClasses}
                disabled={!Editing}
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
            type="button"
            onClick={() => setEditing(true)}
            className="group font-medium flex items-center justify-center gap-x-2 w-16 hover:font-semibold text-center p-2 border border-primary-color-1 bg-primary-color-7 hover:bg-white dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
          >
            Edit
          </button>
          <button
            type="submit"
            disabled={!Editing}
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

export default UserDetails;
