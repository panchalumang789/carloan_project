import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Cookies from "universal-cookie";

const WorkDetails = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [workDetail, setWorkDetail] = useState({})
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });

  const WorkDetails = (data) => {
    let leadCookie = cookie.get('leadDetails');
    cookie.set('leadDetails', { ...leadCookie, ...data })
    navigate("/journey/loginDetail");
  };
  useMemo(() => {
    if (cookie.get('leadDetails')) {
      setWorkDetail(cookie.get('leadDetails'))
    }
    //eslint-disable-next-line
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
        transition: { duration: 0.3 },
      }}
      className="h-screen bg-primary-color-5 dark:bg-primary-color-1 text-primary-color-4 dark:text-primary-color-7"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 max-w-screen-xl h-full mx-auto">
        <div className="w-5/6 lg:w-1/2 text-left text-lg xl:text-2xl md:px-20">
          <Typewriter options={{
            strings: "What is your work situation?",
            autoStart: true,
            loop: false,
            delay: 60,
          }} />
        </div>
        <div className="w-5/6 lg:w-1/2 md:px-28">
          <form onSubmit={handleSubmit(WorkDetails)} className="flex justify-center flex-col mx-auto">
            <div className="flex flex-col gap-y-6">
              <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">Loan Detail</p>
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col">
                  <label htmlFor="user_status" className="px-1">Status</label>
                  <select
                    name="user_status"
                    id="user_status"
                    defaultValue={workDetail.user_status || ""} className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1"
                    {...register("user_status", { required: true })}
                  >
                    <option value="" disabled>
                      Select work status
                    </option>
                    <option value="Employee">I am an Employee</option>
                    <option value="Unemployed">I am an Unemployed</option>
                  </select>
                  {errors.user_status && <span className="text-red-500 pt-1 px-1 text-sm">This field is required.</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="user_income" className="px-1">Income</label>
                  <input
                    type="number"
                    id="user_income"
                    placeholder="Income"
                    value={workDetail.user_income}
                    className="p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-6 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-1 placeholder:opacity-60"
                    {...register("user_income", { required: true, min: 10000 })}
                  />
                  {errors.user_income?.type === "required" && (
                    <span className="text-red-500 pt-1 px-1 text-sm">This field is required.</span>
                  )}
                  {errors.user_income?.type === "min" && (
                    <span className="text-red-500 pt-1 px-1 text-sm">Income should be greater than 10000.</span>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-around">
                <Link to={'/journey/carDetail'} className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center p-3 border border-primary-color-1"><em className=" group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left rounded-md dark:bg-primary-color-6 dark:hover:bg-primary-color-4"></em> Back</Link>
                <button type="submit" className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1">Next <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right rounded-md dark:bg-primary-color-6 dark:hover:bg-primary-color-4" /></button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </motion.div>
  );
};

export default WorkDetails;
