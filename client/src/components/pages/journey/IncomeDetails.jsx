import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";

const IncomeDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ model: "all" });
  const incomeDetails = (data) => {
    console.log(data);
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
      <div className="w-1/2 text-center">
        <p>Do you earn any additional income.</p>
      </div>
      <div className="w-1/2 text-center">
        <p>Additional Income</p>
        <form onSubmit={handleSubmit(incomeDetails)}>
          <div>
            <label>Additional Income</label>
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              name="income"
              id="yes"
              value="yes"
              {...register("additional_income", { required: true })}
            />
            <label htmlFor="no">No</label>
            <input
              type="radio"
              name="income"
              id="no"
              value="no"
              {...register("additional_income", { required: true })}
            />
            {errors.additional_income && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="rental_income">
              Rental income per month (after tax)
            </label>
            <input
              id="rental_income"
              type="number"
              className="border"
              {...register("rental_income", { required: true })}
            />
            {errors.rental_income && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="investment_income">
              Investment income per month (after tax)
            </label>
            <input
              id="investment_income"
              type="number"
              className="border"
              {...register("investment_income", { required: true })}
            />
            {errors.investment_income && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="salary_sacrifice">
              Salary sacrifice per month (after tax)
            </label>
            <input
              id="salary_sacrifice"
              type="number"
              className="border"
              {...register("salary_sacrifice", { required: true })}
            />
            {errors.salary_sacrifice && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="centralink_benifit">
              Centralink benifit per month (after tax)
            </label>
            <input
              id="centralink_benifit"
              type="number"
              className="border"
              {...register("centralink_benifit", { required: true })}
            />
            {errors.centralink_benifit && <span>This field is required.</span>}
          </div>
          <div>
            <label htmlFor="foreign_income">
              Foreign income per month (after tax)
            </label>
            <input
              id="foreign_income"
              type="number"
              className="border"
              {...register("foreign_income", { required: true })}
            />
            {errors.foreign_income && <span>This field is required.</span>}
          </div>
          <button type="submit" className="p-2 border border-primary-color-1">
            Next
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default IncomeDetails;
