import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import Typewriter from "typewriter-effect";
import LoadingPage from "../extra/LoadingPage";
import LoginImage from "assest/images/LoginImage.jpg";
import { FormTitle, inputClasses } from "../extra/Widget";
import { uploadFile } from "react-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET = "car-loan-project";
const REGION = "ap-south-1";
const ACCESS_KEY = "APKA4YMVVERVYH7YVW6R";
const SECRET_ACCESS_KEY = "djhqpSGREEnvYZontqnKL41PTkgyYrp97jKryECS";

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const inputFileClasses =
  "block w-full file:rounded-sm text-base text-primary-color-1 dark:text-primary-color-7 file:mr-4 file:py-2 file:px-4 file:border file:hover:cursor-pointer file:border-primary-color-1 dark:file:border-white file:text-sm file:font-semibold file:bg-black/10 dark:file:bg-primary-color-9 file:text-primary-color-1 dark:file:text-primary-color-7 hover:file:bg-white/50 dark:hover:file:bg-primary-color-8 hover:file:border-primary-color-1";

const DocumentUpload = () => {
  // const [Loading, setLoading] = useState(false);
  const [Loading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    console.log(file);
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const getDocument = async (data) => {
    const formData = new FormData();
    formData.append("file", data.licenceFrontImage[0]);
    uploadFile(formData, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(getDocument)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-4">
              <FormTitle formTitle={"Identity"} />
              <div className="flex flex-col">
                <label>Driving license (front)</label>
                <div className={inputClasses}>
                  <div className="flex justify-between items-center text-primary-color-1 px-2 dark:text-primary-color-7">
                    <input
                      type="file"
                      className={inputFileClasses}
                      onClick={handleFileInput}
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
              <button onClick={() => handleUpload(selectedFile)}>
                Upload to S3
              </button>
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
