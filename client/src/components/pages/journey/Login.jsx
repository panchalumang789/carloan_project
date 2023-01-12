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
      {Loading && (
        <div className="loader p-5 flex justify-center items-center gap-x-3 fixed h-screen w-screen transition-all duration-500">
          <div className="w-5 h-5 bg-primary-color-4 rounded-full animate-bounce transition-all duration-100"></div>
          <div className="w-5 h-5 bg-primary-color-4 rounded-full animate-bounce transition-all duration-300"></div>
          <div className="w-5 h-5 bg-primary-color-4 rounded-full animate-bounce transition-all duration-500"></div>
        </div>
      )}
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
