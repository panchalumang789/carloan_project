import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Typewriter from "typewriter-effect";
import LoadingPage from "../extra/LoadingPage";
import LoginImage from "assest/images/LoginImage.jpg";
import { FormTitle, inputClasses } from "../extra/Widget";

const DocumentUpload = () => {
  // const [Loading, setLoading] = useState(false);
  const [Loading] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getDocument = (data) => {
    console.log(data);
  };
  const getImage = (data) => {
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7"
    >
      {Loading && (
        <div className="h-screen w-screen flex justify-center items-center mx-auto bg-transparent/30 dark:bg-transparent/60 fixed">
          <LoadingPage />
        </div>
      )}
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl">
          <input
            className="w-full mix-blend-multiply"
            type="image"
            src={LoginImage}
            alt="OTP verification image"
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <div className="text-lg md:text-xl pb-8">
            <Typewriter
              options={{
                strings:
                  "Please upload the document below to complete your application.",
                autoStart: true,
                loop: false,
                delay: 30,
              }}
            />
          </div>
          <form
            onSubmit={handleSubmit(getDocument)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-4">
              <FormTitle formTitle={"Identity"} />
              <div className="flex flex-col">
                <div className={inputClasses}>
                  <div className="flex justify-between items-center text-primary-color-1 px-2 dark:text-primary-color-7">
                    <label>Driving license (front)</label>
                    <label className="py-1 px-2" htmlFor="license_front">
                      Add {console.log(getValues("licenceFrontImage"))}
                    </label>
                    <input
                      id="license_front"
                      type="file"
                      onChange={getImage}
                      className="hidden"
                      {...register("licenceFrontImage", {
                        required: "Please upload license front image !",
                      })}
                    />
                  </div>
                </div>
                {errors.licenceFrontImage && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.licenceFrontImage?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className={inputClasses}>
                  <div className="flex justify-between items-center text-primary-color-1 px-2 dark:text-primary-color-7">
                    <label>Driving license (back)</label>
                    <label className="py-1 px-2" htmlFor="license_back">
                      Add
                    </label>
                    <input
                      id="license_back"
                      type="file"
                      className="hidden"
                      {...register("licenceBackImage", {
                        required: "Please upload license back image !",
                      })}
                    />
                  </div>
                </div>
                {errors.licenceBackImage && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.licenceBackImage?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className={inputClasses}>
                  <div className="flex justify-between items-center text-primary-color-1 px-2 dark:text-primary-color-7">
                    <label>Medicare card</label>
                    <label className="py-1 px-2" htmlFor="medicare_card">
                      Add
                    </label>
                    <input
                      id="medicare_card"
                      type="file"
                      className="hidden"
                      {...register("medicalcardImage", {
                        required: "Please upload medicare card image !",
                      })}
                    />
                  </div>
                </div>
                {errors.medicalcardImage && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.medicalcardImage?.message}
                  </span>
                )}
              </div>
              <FormTitle formTitle={"Income verification"} />
              <div className="flex flex-col">
                <div className={inputClasses}>
                  <div className="flex justify-between items-center text-primary-color-1 px-2 dark:text-primary-color-7">
                    <label>Most recent payslip</label>
                    <label className="py-1 px-2" htmlFor="most_recent_payslip">
                      Add {}
                    </label>
                    <input
                      id="most_recent_payslip"
                      type="file"
                      className="hidden"
                      {...register("mostRecentPayslip", {
                        required: "Please upload most recent payslip !",
                      })}
                    />
                  </div>
                </div>
                {errors.mostRecentPayslip && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.mostRecentPayslip?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className={inputClasses}>
                  <div className="flex justify-between items-center text-primary-color-1 px-2 dark:text-primary-color-7">
                    <label>Second most recent payslip</label>
                    <label
                      className="py-1 px-2"
                      htmlFor="second_most_recent_payslip"
                    >
                      Add
                    </label>
                    <input
                      id="second_most_recent_payslip"
                      type="file"
                      className="hidden"
                      {...register("secondMostRecentPayslip", {
                        required: "Please upload second most recent payslip !",
                      })}
                    />
                  </div>
                </div>
                {errors.secondMostRecentPayslip && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.secondMostRecentPayslip?.message}
                  </span>
                )}
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-5"
                >
                  Next
                  <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

const index = () => {
  return (
    <div>
      <DocumentUpload />
    </div>
  );
};

export default index;
