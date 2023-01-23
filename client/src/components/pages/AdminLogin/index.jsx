import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import loginService from "services/loginService";
import { FormTitle, inputClasses } from "components/pages/journey/extra/Widget";
import { useNavigate } from "react-router-dom";
import LoginImage from "assest/images/OTPPage.jpg";

const AdminLogin = () => {
  const adminService = new loginService();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getMobile = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    try {
      const { output, error } = await adminService.adminLogin({
        details: data,
      });
      if (!output) {
        toast.error(error.data.message, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          position: "top-center",
        });
      } else {
        toast.success("Login successful...", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          position: "top-center",
        });
        localStorage.setItem("token", output.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {}
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
          <LoadingPage stroke={"#e0f5f5"} wheel={"#A3BEBE"} />
        </div>
      )}
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl">
          <input
            className="w-full mix-blend-multiply"
            type="image"
            src={LoginImage}
            alt="Authentication Image"
          />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(getMobile)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-5">
              <FormTitle formTitle={"Admin Login"} />
              <div className="flex text-md flex-col">
                <label htmlFor="email" className="px-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="text"
                  autoFocus
                  placeholder="Admin@admin.com"
                  className={inputClasses}
                  autoComplete="off"
                  {...register("email", {
                    required: "Please enter your email address!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter valid email address!",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="flex text-md flex-col">
                <label htmlFor="password" className="px-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className={inputClasses}
                  autoComplete="off"
                  {...register("password", {
                    required: "Please enter your password!",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="w-full flex mx-auto justify-end">
                <button
                  type="submit"
                  className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
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
      <AdminLogin />
    </div>
  );
};

export default index;
