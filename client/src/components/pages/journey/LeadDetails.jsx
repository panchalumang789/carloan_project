import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const LeadDetails = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const LeadDetail = (data) => {
    props.loanDetail(data);
    navigate("carDetail");
  };
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.3 } }}
      className="flex items-center h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-5"
    >
      <div className="w-1/2 text-left text-2xl px-4 md:px-20">
        <p className="">Hello I'm Kate.</p>
        <p className="">
          I am here to help you find the best car loan options.
        </p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.pauseFor(100).typeString("Let's get started.").start();
          }}
        />
      </div>
      <form onSubmit={handleSubmit(LeadDetail)} className="w-1/2 text md:px-28">
        <div className="flex flex-col gap-y-5">
          <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
            Loan Detail
          </p>
          <div className="flex text-md flex-col">
            <label htmlFor="approx_price" className="px-2 pb-1 ">
              Approx Amount
            </label>
            <input
              type="number"
              id="approx_price"
              placeholder="Approx Amount"
              className="p-2 rounded-md bg-primary-color-3 dark:bg-primary-color-6 dark:text-primary-color-5 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1"
              {...register("approx_price", { required: true, min: 0 })}
            />
            {errors.approx_price?.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required.
              </span>
            )}
            {errors.approx_price?.type === "min" && (
              <span className="text-red-500 text-sm">Enter valid amount.</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="deposit" className="">
              Deposit
            </label>
            <input
              type="number"
              id="deposit"
              placeholder="Deposit"
              className="p-2 rounded-md"
              {...register("deposit", { required: true, min: 0 })}
            />
            {errors.deposit?.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required.
              </span>
            )}
            {errors.deposit?.type === "min" && (
              <span className="text-red-500 text-sm">Enter valid amount.</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="term" className="">
              Term
            </label>
            <select
              id="term"
              className="p-2 rounded-md"
              {...register("term", { required: true })}
              defaultValue=""
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
              <span className="text-red-500 text-sm">
                This field is required.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="ballon" className="">
              Ballon
            </label>
            <input
              type="number"
              id="ballon"
              placeholder="Ballon"
              className="p-2 rounded-md"
              {...register("ballon", { required: true, min: 0, max: 35 })}
            />
            {errors.ballon?.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required.
              </span>
            )}
            {errors.ballon?.type === "min" && (
              <span className="text-red-500 text-sm">Enter valid amount.</span>
            )}
            {errors.ballon?.type === "max" && (
              <span className="text-red-500 text-sm">
                Maximum amount of ballon in 35.
              </span>
            )}
          </div>
          <button type="submit" className="p-2 border border-primary-color-1">
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default LeadDetails;
