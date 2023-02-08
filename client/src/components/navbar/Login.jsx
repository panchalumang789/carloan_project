import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import customerService from "services/customerServices";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import {
  errorToast,
  FormTitle,
  inputClasses,
} from "components/pages/journey/extra/Widget";
import LoginImage from "assest/images/LoginImage.jpg";
import { motion, useDragControls } from "framer-motion";

const Login = () => {
  const cookie = new Cookies();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginService = new customerService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: cookie.get("contactNo"),
  });

  const sendOTP = async (contactNo) => {
    const result = await loginService.sendOTP({
      details: { ContactNo: contactNo },
    });
    if (result.message && result.verification) {
      setTimeout(() => {
        navigate("/verify");
      }, 4000);
      const functionThatReturnPromise = () =>
        new Promise((resolve) => setTimeout(resolve, 3000));
      toast.promise(
        functionThatReturnPromise,
        {
          pending: "Sending OTP",
          success: `${result.message} Verification: ${result.verification}`,
          error: "Something is wrong !",
        },
        {
          position: "top-center",
        }
      );
    } else {
      errorToast(result.message);
    }
  };

  const getMobile = (data) => {
    setLoading(true);
    cookie.set("contactNo", { contactNo: data.contactNo }, { maxAge: 3600 });
    sendOTP(data.contactNo);
  };
  const controls = useDragControls();
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-primary-color-5 dark:bg-primary-color-8 text-primary-color-4 dark:text-primary-color-7">
      {Loading && (
        <div className="h-screen w-screen flex justify-center items-center mx-auto bg-transparent/50 dark:bg-transparent/60 fixed">
          <LoadingPage />
        </div>
      )}
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl">
          <motion.input
            drag
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.3}
            className="w-full mix-blend-multiply cursor-default"
            type="image"
            src={LoginImage}
            alt="OTP verification image"
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-20">
          <div className="rounded-xl p-8 shadow-wrapper">
            <FormTitle formTitle={"Login"} />
            <form
              onSubmit={handleSubmit(getMobile)}
              className="flex justify-center flex-col mx-auto mt-5"
            >
              <div className="flex flex-col gap-y-12">
                <div className="flex flex-col">
                  <label htmlFor="contact_no" className="px-1">
                    Contact no. <span className="text-red-500">*</span>
                  </label>
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 fixed text-lg fa fa-phone my-2.5"
                      id="basic-addon1"
                    ></span>
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
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
                  >
                    Next
                    <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
