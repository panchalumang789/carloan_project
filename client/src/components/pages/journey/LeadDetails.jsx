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
    getValues,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues: leadDetail });
  const LeadDetail = (data) => {
    cookie.set("leadDetails", data);
    navigate("/journey/carDetail");
  };
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
        y: window.innerHeight,
        transition: { duration: 0.3 },
      }}
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
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form
            onSubmit={handleSubmit(LeadDetail)}
            className="flex justify-center flex-col mx-auto"
          >
            <div className="flex flex-col gap-y-6">
              <FormTitle formTitle={"Loan Details"} />
              <div className="flex flex-col gap-y-5">
                <div className="flex text-md flex-col">
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    type="number"
                    id="approx_price"
                    autoFocus
                    placeholder="Approx Amount"
                    className={inputClasses + " pl-10"}
                    {...register("approx_price", {
                      required: "Please enter approx amount!",
                      min: {
                        value: 0,
                        message: "Approx amount should be greater than 0!",
                      },
                      max: {
                        value: 1000000000,
                        message:
                          "Approx amount should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.approx_price && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.approx_price?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  <input
                    type="number"
                    id="deposit"
                    placeholder="Deposit"
                    className={inputClasses + " pl-10"}
                    {...register("deposit", {
                      required: "Please enter deposit amount!",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Deposit should be greater than 0!",
                      },
                      validate: () =>
                        Number(getValues("deposit")) <
                        Number(getValues("approx_price")),
                      max: {
                        value: 1000000000,
                        message: "Deposit should be less than 1,00,00,00,000!",
                      },
                    })}
                  />
                  {errors.deposit && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.deposit?.message}
                    </span>
                  )}
                  {errors.deposit?.type === "validate" && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      Deposit should be less than Approx Amount
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <select
                    id="term"
                    defaultValue={""}
                    className={selectClasses}
                    {...register("term", {
                      required: "Please select loan term!",
                    })}
                  >
                    <option disabled value="">
                      Select loan term
                    </option>
                    <option value="1">1 year</option>
                    <option value="2">2 year</option>
                    <option value="3">3 year</option>
                    <option value="4">4 year</option>
                    <option value="5">5 year</option>
                    <option value="6">6 year</option>
                    <option value="7">7 year</option>
                    <option value="8">8 year</option>
                    <option value="9">9 year</option>
                    <option value="10">10 year</option>
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
                  <div className="input-group-prepend">
                    <span
                      className="ml-4 my-1.5 fixed text-lg "
                      id="basic-addon1"
                    >
                      &#x20B9;
                    </span>
                  </div>
                  {errors.ballon && (
                    <span className="text-red-500 pt-1 px-1 text-sm">
                      {errors.ballon?.message}
                    </span>
                  )}
                </div>
              </div>
              <Navigator prevForm={"/"} />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadDetails;
