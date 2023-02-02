import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import {
  errorToast,
  FormTitle,
  inputClasses,
  selectClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import { ToastContainer } from "react-toastify";

const UserDetails = (props) => {
  const updateService = new customerService();
  const [userDetails, setUserData] = useState({});
  const [Editing, setEditing] = useState(false);
  const [States, setStates] = useState([]);
  const [Submitting, setSubmitting] = useState(false);

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
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setUserData(props.UserDetails);
    setValue("prefix", props.UserDetails.prefix);
    setValue(
      "medicalcardImage",
      props.UserDetails.medicalcardImage || "user2medical1.jpf"
    );
    setValue(
      "licenceFrontImage",
      props.UserDetails.licenceFrontImage || "user2front1.jpf"
    );
    setValue(
      "licenceBackImage",
      props.UserDetails.licenceBackImage || "user2back1.jpf"
    );
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
    let change = false;
    const preData = watch();
    Object.keys(preData).forEach((i) => {
      if (preData[i] !== userDetails[i]) {
        change = true;
      }
    });
    if (change) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
    // eslint-disable-next-line
  }, [watch()]);

  useEffect(() => {
    setValue("state", props.UserDetails.state);
    setValue("licenceIssueState", props.UserDetails.licenceIssueState);
    if (userDetails.licenseIssueDate) {
      setValue("licenseIssueDate", userDetails.licenseIssueDate.split("T")[0]);
    }
    if (userDetails.licenceExpireDate) {
      setValue(
        "licenceExpireDate",
        userDetails.licenceExpireDate.split("T")[0]
      );
    }
  }, [
    States,
    setValue,
    userDetails,
    props.UserDetails.state,
    props.UserDetails.licenceIssueState,
    userDetails.licenseIssueDate,
    userDetails.licenceExpireDate,
  ]);

  const submitCustomerData = async (data) => {
    const { output, error } = await updateService.updateUser({
      path: `user/${props.UserId}`,
      details: data,
      headerData: localStorage.getItem("token"),
    });
    if (!output) {
      errorToast(error.data.message);
    } else {
      successToast(output.message);
      props.UpdateLoan();
      setEditing(false);
    }
  };

  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 md:h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 px-4">
      <form
        onSubmit={handleSubmit(submitCustomerData)}
        className="flex flex-col gap-5"
      >
        <ToastContainer />
        <div className="my-3 w-fit">
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
            <label htmlFor="prefix" className="font-normal w-1/3 md:w-1/5">
              Prefix :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="prefix"
                className={selectClasses}
                disabled={!Editing}
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
            <label htmlFor="state" className="font-normal w-1/3 md:w-1/5">
              State :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="state"
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
            <label htmlFor="licenseType" className="font-normal w-1/3 md:w-1/5">
              Type :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="licenseType"
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
            <label
              htmlFor="licenseFirstname"
              className="font-normal w-1/3 md:w-1/5"
            >
              Firstname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseFirstname"
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
            <label
              htmlFor="licenseLastname"
              className="font-normal w-1/3 md:w-1/5"
            >
              Lastname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <input
                id="licenseLastname"
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
                type="date"
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
                type="date"
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
            <label
              htmlFor="licenseIssueState"
              className="font-normal w-1/3 md:w-1/5"
            >
              Issue State :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <select
                id="licenseIssueState"
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
            disabled={!Submitting}
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
