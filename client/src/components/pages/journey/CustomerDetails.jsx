import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typewriter from "typewriter-effect";

const CustomerDetails = () => {
  const [States, setStates] = useState([]);
  const userService = new customerService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  useEffect(() => {
    const getStates = async () => {
      const result = await userService.getState({ data: { url: "states" } });
      setStates(result);
    };
    getStates();
    return () => { };
    //eslint-disable-next-line
  }, []);

  const customerDetails = (data) => {
    console.log(data);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.3 } }}
        className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
      >
        <ToastContainer />
        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
          <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
            <Typewriter options={{
              strings: "Perfect! You have been verified :) ",
              autoStart: true,
              loop: false,
              delay: 60,
            }} />
            <p>
              Simply fill in your details while we prepare your best loan matches.
            </p>
          </div>
          <div className="w-5/6 lg:w-1/2 md:px-28">
            <div className="flex flex-col gap-y-5">
              <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">Details</p>
              <form onSubmit={handleSubmit(customerDetails)} className="flex flex-col gap-y-5">
                <div className="flex gap-x-2 text-center w-full">
                  <div className="w-1/4">
                    <label htmlFor="prefix">Prefix</label>
                    <select
                      name="prefix"
                      id="prefix"
                      className="p-2 w-full h-10 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6"
                      {...register("prefix", { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Prefix
                      </option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                    {errors.prefix && <span className="text-red-500 pt-1 px-1 text-sm">This field is required.</span>}
                  </div>
                  <div className="w-3/4">
                    <label htmlFor="firstname">First name</label>
                    <input
                      id="firstname"
                      type="text"
                      placeholder="FirstName"
                      className="p-2 w-full rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                      {...register("firstname", { required: "FirstName is required.", pattern: '' })}
                    />
                    {errors.firstname && <span className="text-red-500 pt-1 px-1 text-sm">{errors.firstname?.message}</span>}
                  </div>
                </div>
                <div className="flex text-md flex-col">
                  <label htmlFor="lastname" className="px-1">Last name</label>
                  <input
                    id="lastname"
                    type="text"
                    placeholder="LastName"
                    className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                    {...register("lastname", { required: true })}
                  />
                  {errors.lastname && <span className="text-red-500 pt-1 px-1 text-sm">This field is required.</span>}
                </div>
                <div className="flex text-md flex-col">
                  <label htmlFor="email" className="px-1">Email</label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                    className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                    {...register("email", {
                      required: 'E-Mail is required!', pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address!"
                      }
                    })}
                  />
                  {errors.email?.type === 'required' && <span className="text-red-500 pt-1 px-1 text-sm">{errors.email?.message}</span>}
                  {errors.email?.type === 'pattern' && <span className="text-red-500 pt-1 px-1 text-sm">{errors.email?.message}</span>}
                </div>
                <div className="flex text-md flex-col">
                  <label htmlFor="state" className="px-1">State</label>
                  <select
                    id="state"
                    name="state"
                    defaultValue=""
                    className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6"
                    {...register("state", { required: true })}
                  >
                    <option value="" disabled>Select State</option>
                    {States.map((state, index) => {
                      return (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </select>
                  {errors.state && <span className="text-red-500 pt-1 px-1 text-sm">This field is required.</span>}
                </div>
                <button type="submit" className="p-2 mt-5 border border-primary-color-1 hover:bg-primary-color-3 font-semibold  rounded-md dark:bg-primary-color-6 dark:hover:bg-primary-color-4">
                  Next
                </button>
              </form>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomerDetails;
