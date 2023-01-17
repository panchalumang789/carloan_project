import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customerService from "services/customerServices";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";
import { Navigator, inputClasses } from "../extra/Widget";
import LoadingPage from "../extra/LoadingPage";

const LoginDetails = () => {
  const cookie = new Cookies();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginService = new customerService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues: cookie.get("contactNo") });
  console.log(cookie.get("contactNo"));
  const sendOTP = async (contactNo) => {
    const result = await loginService.sendOTP({
      path: "login",
      details: { ContactNo: contactNo },
    });
    if (result.message && result.verification) {
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
    } else {
      toast.error(result.message, {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const getMobile = (data) => {
    setLoading(true);
    cookie.set("contactNo", { contactNo: data.contactNo });
    sendOTP(data.contactNo);
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
      className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      {Loading && (
        <div className="h-screen w-screen flex justify-center items-center mx-auto bg-transparent/30 dark:bg-transparent/60 fixed">
          <LoadingPage stroke={"#A3BEBE"} wheel={"#023641"} />
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
                  Contact no. <span className="text-red-500">*</span>
                </label>
                <div className="input-group-prepend">
                  <span
                    className="ml-4 my-1.5 fixed text-lg "
                    id="basic-addon1"
                  >
                    &#x1F4DE;
                  </span>
                </div>
                <input
                  id="contact_no"
                  type="number"
                  autoFocus
                  placeholder="9876543210"
                  className={inputClasses + " pl-12"}
                  {...register("contactNo", {
                    required: "Please enter your contact no !",
                    minLength: {
                      value: 10,
                      message: "Please enter valid contact no !",
                    },
                    maxLength: {
                      value: 10,
                      message: "Please enter valid contact no !",
                    },
                  })}
                />
                {errors.contactNo && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.contactNo?.message}
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

const index = () => {
  return (
    <div>
      <LoginDetails />
    </div>
  );
};

export default index;
