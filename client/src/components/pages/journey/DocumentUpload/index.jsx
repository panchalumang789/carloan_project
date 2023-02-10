import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import Typewriter from "typewriter-effect";
import LoadingPage from "../extra/LoadingPage";
import LoginImage from "assest/images/LoginImage.jpg";
import { FormTitle, inputClasses } from "../extra/Widget";
import loanService from "services/loanService";
import { useLocation } from "react-router-dom";
import useProgress from "useProgress";
window.Buffer = window.Buffer || require("buffer").Buffer;

const inputFileClasses =
  "block w-full file:rounded-sm text-base file:text-base text-primary-color-1 dark:text-primary-color-7 file:mr-4 file:py-2 file:px-4 file:border file:hover:cursor-pointer file:border-primary-color-1 dark:file:border-white file:text-sm file:font-semibold file:bg-black/10 dark:file:bg-primary-color-9 file:text-primary-color-1 dark:file:text-primary-color-7 hover:file:bg-white/50 dark:hover:file:bg-primary-color-8 hover:file:border-primary-color-1";

const DocumentUpload = () => {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(95);
  }, [setProgress]);
  const documentService = new loanService();
  const location = useLocation();
  const [Loading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getDocument = async (data) => {
    const { output, error } = await documentService.uploadDocument({
      bodyData: data,
      loanId: location.state,
      headerData: localStorage.getItem("token"),
    });
    console.log(output.message);
    console.log(error);
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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl">
          <input
            className="w-full mix-blend-multiply"
            type="image"
            src={LoginImage}
            alt="OTP verification image"
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-24">
          <form
            onSubmit={handleSubmit(getDocument)}
            className="flex justify-center flex-col mx-auto rounded-xl p-8 shadow-wrapper"
          >
            <div className="flex flex-col gap-y-3">
              <FormTitle formTitle={"License Document"} />
              <div className="flex flex-col">
                <label>Driving license (front)</label>
                <div className={inputClasses + " mb-0.5"}>
                  <div className="flex justify-between items-center text-primary-color-1 dark:text-primary-color-7">
                    <input
                      id="frontImage"
                      type="file"
                      name="file"
                      className={inputFileClasses}
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
                <label>Driving license (back)</label>
                <div className={inputClasses + " mb-0.5"}>
                  <div className="flex justify-between items-center text-primary-color-1  dark:text-primary-color-7">
                    <input
                      type="file"
                      className={inputFileClasses}
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
                <label>Medicare card</label>
                <div className={inputClasses + " mb-0.5"}>
                  <div className="flex justify-between items-center text-primary-color-1  dark:text-primary-color-7">
                    <input
                      type="file"
                      className={inputFileClasses}
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
              <div className="flex flex-col">
                <label>Most recent payslip</label>
                <div className={inputClasses + " mb-0.5"}>
                  <div className="flex justify-between items-center text-primary-color-1  dark:text-primary-color-7">
                    <input
                      type="file"
                      className={inputFileClasses}
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
                <label>Second most recent payslip</label>
                <div className={inputClasses + " mb-0.5"}>
                  <div className="flex justify-between items-center text-primary-color-1  dark:text-primary-color-7">
                    <input
                      type="file"
                      className={inputFileClasses}
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
