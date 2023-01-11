import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const WorkDetails = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });

  const WorkDetails = (data) => {
    props.workDetail(data);
    navigate("/journey/loginDetail");
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
      className="flex items-center justify-center h-screen"
    >
      <div className="w-1/2 text-center">
        <p>What is your work situation?</p>
      </div>
      <form onSubmit={handleSubmit(WorkDetails)} className="w-1/2 text-center">
        <div>
          <p>Loan Detail</p>
          <div>
            <label htmlFor="user_status">Status</label>
            <select
              name="user_status"
              id="user_status"
              defaultValue=""
              {...register("user_status", { required: true })}
            >
              <option value="" disabled>
                Select work status
              </option>
              <option value="Employee">I am an Employee</option>
              <option value="Unemployed">I am an Unemployed</option>
            </select>
            {errors.user_status && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="user_income">Income</label>
            <input
              type="number"
              id="user_income"
              placeholder="Income"
              className="border"
              {...register("user_income", { required: true, min: 10000 })}
            />
            {errors.user_income?.type === "required" && (
              <span>This field is required.</span>
            )}
            {errors.user_income?.type === "min" && (
              <span>Income should be greater than 10000.</span>
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

export default WorkDetails;
