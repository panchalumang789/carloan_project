import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import {
  DateInput,
  errorToast,
  FormTitle,
  Input,
  PrependInput,
  selectClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import { ToastContainer } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  contactNo: yup
    .string()
    .required("Please enter you contact no!")
    .min(10, "Please enter valid contact no!")
    .max(10, "Please enter valid contact no!"),
  firstName: yup
    .string()
    .required("Please enter Firstname!")
    .min(2, "Firstname should be atleast 2 characters long!")
    .max(20, "Firstname should be less than 20 characters length!"),
  lastName: yup
    .string()
    .required("Please enter Lastname!")
    .min(2, "Lastname should be atleast 2 characters long!")
    .max(20, "Lastname should be less than 20 characters length!"),
  email: yup
    .string()
    .required("Please enter you email id!")
    .email("Please enter valid email id!"),
  licenceNumber: yup
    .string("Please enter license number!")
    .min(15, "License number length should be 15!")
    .max(15, "License number length should be 15!")
    .matches(/^[A-Za-z0-9]{15}$/, "Please entre valid license number!"),
  licenseFirstName: yup
    .string()
    .required("Please enter license holder's firstname!")
    .min(2, "Firstname should be atleast 2 characters long!")
    .max(20, "Firstname should be less than 20 characters length!"),
  licenseLastName: yup
    .string()
    .required("Please enter license holder's lastname!")
    .min(2, "Lastname should be atleast 2 characters long!")
    .max(20, "Lastname should be less than 20 characters length!"),
  licenseIssueDate: yup.date().required("Please select license issue date!"),
  licenceExpireDate: yup
    .string()
    .required("Please select license expiry date!"),
});

const Profile = () => {
  const updateService = new customerService();
  const location = useLocation();
  const contactNo = location.state;
  const [userDetails, setUserData] = useState({});
  const [States, setStates] = useState([]);
  const [Editing, setEditing] = useState(false);

  useEffect(() => {
    const userService = new customerService();
    (async () => {
      const result = await userService.getState();
      setStates(result);
    })();

    (async () => {
      const userDetails = await userService.findUserbyContact({
        details: contactNo,
      });
      if (userDetails.status === 404) {
        errorToast(userDetails.data.message);
        console.log(userDetails);
      } else {
        setUserData(userDetails);
      }
    })();
  }, [contactNo, location]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setUserData(userDetails);
    setValue("prefix", userDetails.prefix);
    setValue(
      "medicalcardImage",
      userDetails.medicalcardImage || `medicalcardImage${userDetails.id}.jpg`
    );
    setValue(
      "licenceFrontImage",
      userDetails.licenceFrontImage || `licenceFrontImage${userDetails.id}.jpg`
    );
    setValue(
      "licenceBackImage",
      userDetails.licenceBackImage || `licenceBackImage${userDetails.id}.jpg`
    );
    setValue("firstName", userDetails.firstName);
    setValue("lastName", userDetails.lastName);
    setValue("email", userDetails.email);
    setValue("contactNo", userDetails.contactNo);
    setValue("licenceNumber", userDetails.licenceNumber);
    setValue("licenceType", userDetails.licenceType);
    setValue("licenseFirstName", userDetails.licenseFirstName);
    setValue("licenseLastName", userDetails.licenseLastName);
    if (userDetails.licenseIssueDate) {
      setValue("licenseIssueDate", userDetails.licenseIssueDate.split("T")[0]);
    }
    if (userDetails.licenceExpireDate) {
      setValue(
        "licenceExpireDate",
        userDetails.licenceExpireDate.split("T")[0]
      );
    }
  }, [userDetails, setValue]);

  useEffect(() => {
    setValue("state", userDetails.state);
    setValue("licenceIssueState", userDetails.licenceIssueState);
  }, [States, setValue, userDetails]);

  const submitCustomerData = async (data) => {
    const { output, error } = await updateService.updateUser({
      path: `user/${userDetails.id}`,
      details: data,
      headerData: localStorage.getItem("token"),
    });
    if (!output) {
      errorToast(error.data.message);
    } else {
      localStorage.setItem("token", output.token);
      successToast(output.message);
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
              <PrependInput
                prependClass="fa fa-phone"
                id="contactNo"
                type="number"
                disabled={!Editing}
                register={register("contactNo")}
                error={errors.contactNo}
              />
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
                  " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                }
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
              <Input
                id="firstName"
                type="text"
                disabled={!Editing}
                register={register("firstName")}
                error={errors.firstName}
              />
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="lastName" className="font-normal w-1/3 md:w-1/5">
              Lastname :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <Input
                id="lastName"
                type="text"
                disabled={!Editing}
                register={register("lastName")}
                error={errors.lastName}
              />
            </div>
          </div>
          <div className="font-medium text-xl flex gap-x-2 items-center">
            <label htmlFor="email" className="font-normal w-1/3 md:w-1/5">
              Email :
            </label>
            <div className="flex flex-col w-1/2 md:w-3/5">
              <Input
                id="email"
                type="text"
                disabled={!Editing}
                register={register("email")}
                error={errors.email}
              />
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
                  " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                }
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
              <Input
                id="licenseNumber"
                type="text"
                disabled={!Editing}
                register={register("licenceNumber")}
                error={errors.licenceNumber}
              />
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
                  " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                }
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
              <Input
                id="licenseFirstname"
                type="text"
                disabled={!Editing}
                register={register("licenseFirstName")}
                error={errors.licenseFirstName}
              />
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
              <Input
                id="licenseLastname"
                type="text"
                disabled={!Editing}
                register={register("licenseLastName")}
                error={errors.licenseLastName}
              />
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
              <DateInput
                id="licenseIssueDate"
                max={new Date().toISOString().split("T")[0]}
                disabled={!Editing}
                register={register("licenseIssueDate")}
                error={errors.licenseIssueDate}
              />
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
              <DateInput
                min={new Date().toISOString().split("T")[0]}
                id="licenseExpiryDate"
                disabled={!Editing}
                register={register("licenceExpireDate")}
                error={errors.licenceExpireDate}
              />
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
                  " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                }
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
          <Link
            to={"/dashboard"}
            className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center py-2 px-3 border border-primary-color-1 bg-primary-color-7 dark:bg-primary-color-9 rounded-md dark:border-2 dark:border-primary-color-3"
          >
            <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left "></em>
            Back
          </Link>
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
            className="group font-medium flex items-center justify-start gap-x-2 w-28 text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 bg-primary-color-7 hover:bg-white dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3 disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
          >
            SUBMIT
            <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
