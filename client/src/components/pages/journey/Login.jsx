import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customerService from "services/customerServices";

const Login = (props) => {
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
    sendOTP(data.mobile);
    props.sendMobile(data);
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
      className="flex items-center h-screen"
    >
      <ToastContainer />
      <div className="w-1/2 text-center">
        <p>Your privacy and security is important.</p>
        <p>Please protect your account with SMS authentication.</p>
      </div>
      <div className="w-1/2 text-center">
        <form onSubmit={handleSubmit(getMobile)}>
          <div>
            <label htmlFor="contact_no">Mobile</label>
            <input
              id="contact_no"
              type="number"
              placeholder="Contact No"
              {...register("mobile", {
                required: true,
                minLength: "10",
                maxLength: "10",
              })}
            />
            {errors.mobile?.type === "required" && (
              <span>This field is required.</span>
            )}
            {errors.mobile?.type === "minLength" && (
              <span>This field is required.</span>
            )}
            {errors.mobile?.type === "maxLength" && (
              <span>This field is required.</span>
            )}
          </div>
          <button type="submit" className="p-2 border border-primary-color-1">
            Next
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
