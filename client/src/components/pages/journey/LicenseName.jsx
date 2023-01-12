import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import FormTitle from "./extra/FormTitle";
import { Navigator } from "./extra/Navigator";

const InputField = (data, type, placeholder, registerField) => {
  console.log(data);
  const { register } = useForm({ model: "all" });
  return (
    <input
      id={data.id}
      type={data.type}
      placeholder={data.placeholder}
      className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
      {...register("license_first_name", { required: true })}
    />
  );
};

const LicenseName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const licenseDetail = () => {};
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
              <InputField
                id="license_first_name"
                type="text"
                placeholder="License FirstName"
                {...register("license_first_name", { required: true })}
              />
              {/* <input
                id="license_first_name"
                type="text"
                placeholder="License FirstName"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("license_first_name", { required: true })}
              /> */}
              {errors.license_first_name && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
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
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("license_last_name", { required: true })}
              />
              {errors.license_last_name && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="flex text-md flex-col">
              <label htmlFor="birth_date" className="px-1">
                Date of birth
              </label>
              <input
                id="birth_date"
                type="date"
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6"
                {...register("birth_date", { required: true })}
              />
              {errors.birth_date && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  This field is required.
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
