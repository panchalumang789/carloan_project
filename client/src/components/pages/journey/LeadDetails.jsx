import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const LeadDetails = () => {
  const [leadDetail, setLeadDetails] = useState({});
  const cookie = new Cookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const LeadDetail = (data) => {
    cookie.set("leadDetails", data);
    navigate("carDetail");
  };

  useMemo(() => {
    if (cookie.get("leadDetails")) {
      setLeadDetails(cookie.get("leadDetails"));
    }
    //eslint-disable-next-line
  }, [cookie.get("leadDetail")]);

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
            <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
              Loan Detail
            </p>
            <div className="flex text-md flex-col">
              <label htmlFor="approx_price" className="px-1">
                Approx Amount
              </label>
              <input
                type="number"
                id="approx_price"
                placeholder="Approx Amount"
                value={leadDetail.approx_price}
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-6 font-medium placeholder:text-primary-color-6 placeholder:opacity-60"
                {...register("approx_price", {
                  required: "Please enter approx amount!",
                  min: 0,
                })}
              />
              {errors.approx_price?.type === "required" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  {errors.approx_price?.message}
                </span>
              )}
              {errors.approx_price?.type === "min" && (
                <span className="text-red-500 pt-1 px-1 text-sm">
                  Enter valid amount.
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
                value={leadDetail.deposit}
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-60"
                {...register("deposit", {
                  required: "Please enter deposit amount!",
                  min: { value: 0, message: "Deposit must be more than 0 !" },
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
                defaultValue={leadDetail.term || ""}
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 text-primary-color-1 font-medium"
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
                value={leadDetail.ballon}
                className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-60"
                {...register("ballon", {
                  min: { value: 0, message: "Minimum amount of ballon in 0." },
                  max: {
                    value: 35,
                    message: "Maximum amount of ballon in 35.",
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
            <div className="w-full flex justify-around">
              <Link
                to={"/"}
                className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
              >
                <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left "></em>{" "}
                Back
              </Link>
              <button
                type="submit"
                className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-3"
              >
                Next{" "}
                <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LeadDetails;
