import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import { Navigator } from "./extra/Widget";

const Login = () => {
  const cookie = new Cookies();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });

  const loginService = new customerService();

  const sendOTP = async (contactNo) => {
    const result = await loginService.sendOTP({
      path: "login",
      details: { ContactNo: contactNo },
    });
    setTimeout(() => {
      navigate("/journey/verifyOTP");
    }, 6000);
    const functionThatReturnPromise = () =>
      new Promise((resolve) => setTimeout(resolve, 3000));
    toast.promise(functionThatReturnPromise, {
      pending: "Sending OTP",
      success: `${result.message} Verification: ${result.verification}`,
      error: "Something is wrong !",
    });
  };

  const getMobile = (data) => {
    setLoading(true);
    cookie.set("contactNo", { ContactNo: data.mobile });
    sendOTP(data.mobile);
  };
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.3 } }}
      className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      {Loading &&
        {
          /* <div className="h-screen w-screen flex justify-center items-center mx-auto fixed">
        <div className="fixed z-10 backdrop-blur-3xl bg-opacity-20">
          <svg
            className="car"
            width="102"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              transform="translate(2 1)"
              stroke="#002742"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="car__body"
                d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
                strokeWidth="3"
              />
              <ellipse
                className="car__wheel--left"
                strokeWidth="3.2"
                fill="#FFF"
                cx="83.493"
                cy="30.25"
                rx="6.922"
                ry="6.808"
              />
              <ellipse
                className="car__wheel--right"
                strokeWidth="3.2"
                fill="#FFF"
                cx="46.511"
                cy="30.25"
                rx="6.922"
                ry="6.808"
              />
              <path
                className="car__line car__line--top"
                d="M22.5 16.5H2.475"
                strokeWidth="3"
              />
              <path
                className="car__line car__line--middle"
                d="M20.5 23.5H.4755"
                strokeWidth="3"
              />
              <path
                className="car__line car__line--bottom"
                d="M25.5 9.5h-19"
                strokeWidth="3"
              />
            </g>
          </svg>
          <span className="text-xl font-semibold pl-6 animate-pulse duration-50 py-2">
            Loading ...
          </span>
        </div>
      </div> */
        }}
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <p>Please protect your account with SMS authentication.</p>
          <Typewriter
            options={{
              strings: "Your privacy and security is important for us.",
              autoStart: true,
              loop: false,
              delay: 60,
            }}
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(getMobile)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-12">
              <div className="flex flex-col">
                <label htmlFor="contact_no" className="px-1">
                  Mobile
                </label>
                <input
                  id="contact_no"
                  type="number"
                  autoFocus
                  placeholder="Contact No"
                  className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-60"
                  {...register("mobile", {
                    required: "Please enter your Contact-No !",
                    minLength: {
                      value: 10,
                      message: "Please enter valid Contact-No !",
                    },
                    maxLength: {
                      value: 10,
                      message: "Please enter valid Contact-No !",
                    },
                  })}
                />
                {errors.mobile?.type === "required" && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.mobile?.message}
                  </span>
                )}
                {errors.mobile?.type === "minLength" && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.mobile?.message}
                  </span>
                )}
                {errors.mobile?.type === "maxLength" && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.mobile?.message}
                  </span>
                )}
              </div>
              <Navigator prevForm={"/journey/workDetail"} />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
