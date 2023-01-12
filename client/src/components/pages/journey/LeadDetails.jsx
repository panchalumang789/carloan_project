import { motion } from "framer-motion";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  FormTitle,
  Navigator,
  inputClasses,
  selectClasses,
} from "./extra/Widget";

const LeadDetails = () => {
  const cookie = new Cookies();
  const [leadDetail] = useState(cookie.get("leadDetails"));
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all", defaultValues: leadDetail });
  const LeadDetail = (data) => {
    cookie.set("leadDetails", data);
    navigate("carDetail");
  };
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.3 } }}
      className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <p>Hello I'm Kate.</p>
          <p>I am here to help you find the best car loan options.</p>
          <Typewriter
            options={{
              strings: "Let's get started.",
              autoStart: true,
              loop: false,
              delay: 60,
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit(LeadDetail)}
          className="w-5/6 lg:w-1/2 md:px-28"
        >
          <div className="flex flex-col gap-y-5">
            <FormTitle formTitle={"Loan Details"} />
            <div className="flex text-md flex-col">
              <label htmlFor="approx_price" className="px-1">
                Approx Amount
              </label>
              <input
                type="number"
                id="approx_price"
                autoFocus
                placeholder="Approx Amount"
                className={inputClasses}
                {...register("approx_price", {
                  required: "Please enter approx amount!",
                  min: {
                    value: 0,
                    message: "Approx amount should be greater than 0!",
                  },
                })}
              />
              {errors.approx_price?.type === "required" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.approx_price?.message}
                </span>
              )}
              {errors.approx_price?.type === "min" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.approx_price?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="deposit" className="px-1">
                Deposit
              </label>
              <input
                type="number"
                id="deposit"
                placeholder="Deposit"
                className={inputClasses}
                {...register("deposit", {
                  required: "Please enter deposit amount!",
                  min: {
                    value: 0,
                    message: "Deposit should be greater than 0!",
                  },
                })}
              />
              {errors.deposit?.type === "required" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.deposit?.message}
                </span>
              )}
              {errors.deposit?.type === "min" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.deposit?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="term" className="px-1">
                Term
              </label>
              <select
                id="term"
                defaultValue={""}
                className={selectClasses}
                {...register("term", { required: "Please select loan term!" })}
              >
                <option disabled value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {errors.term && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.term?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="ballon" className="px-1">
                Ballon
              </label>
              <input
                type="number"
                id="ballon"
                placeholder="Ballon"
                className={inputClasses}
                {...register("ballon", {
                  min: {
                    value: 0,
                    message: "Ballon should be greater than 0!",
                  },
                  max: {
                    value: 35,
                    message: "Ballon should be less than 35!",
                  },
                })}
              />
              {errors.ballon?.type === "min" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.ballon?.message}
                </span>
              )}
              {errors.ballon?.type === "max" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.ballon?.message}
                </span>
              )}
            </div>
            <Navigator prevForm={"/"} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LeadDetails;
