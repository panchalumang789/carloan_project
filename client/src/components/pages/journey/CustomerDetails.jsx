import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import customerService from "services/customerServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    return () => {};
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
        exit={{
          opacity: 0,
          x: window.innerWidth,
          transition: { duration: 0.3 },
        }}
        className="flex items-center flex-col md:flex-row h-screen"
      >
        <ToastContainer />
        <div className="w-1/2 text-center">
          <p>Perfect! You have been verified.</p>
          <p>
            Simply fill in your details while we prepare your best loan matches.
          </p>
        </div>
        <div className="w-1/2 text-center">
          <p>Details</p>
          <form onSubmit={handleSubmit(customerDetails)}>
            <div className="flex text-center">
              <div className="w-1/4">
                <label htmlFor="prefix">Prefix</label>
                <select
                  name="prefix"
                  id="prefix"
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
                {errors.prefix && <span>This field is required.</span>}
              </div>
              <div className="w-3/4">
                <label htmlFor="firstname">First name</label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="FirstName"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && <span>This field is required.</span>}
              </div>
            </div>
            <div>
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                placeholder="LastName"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && <span>This field is required.</span>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required.</span>}
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                defaultValue=""
                {...register("state", { required: true })}
              >
                <option value="" disabled>
                  Select State
                </option>
                {States.map((state, index) => {
                  return (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
              {errors.state && <span>This field is required.</span>}
            </div>
            <button type="submit" className="p-2 border border-primary-color-1">
              Next
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default CustomerDetails;
