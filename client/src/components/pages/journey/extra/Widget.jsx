import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import customerService from "services/customerServices";

const getState = async () => {
  const userService = new customerService();
  const result = await userService.getState();
  return result;
};

const FormTitle = (props) => {
  return (
    <div>
      <p className="text-3xl text-primary-color-6 after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:text-primary-color-7 dark:after:bg-primary-color-5 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
        {props.formTitle}
      </p>
    </div>
  );
};

const Navigator = (props) => {
  return (
    <div className="w-full flex justify-around">
      <Link
        to={props.prevForm}
        className="group font-medium flex items-center justify-end gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
      >
        <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left "></em>{" "}
        Back
      </Link>
      <button
        type="submit"
        className="group font-medium flex items-center justify-start gap-x-2 w-24 text-center p-3 border border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
      >
        Next
        <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
      </button>
    </div>
  );
};

const inputClasses =
  "p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-6 placeholder:opacity-60 dark:placeholder:opacity-90";

const selectClasses =
  "p-2 rounded-md bg-primary-color-7 dark:bg-primary-color-9 dark:text-primary-color-7 text-primary-color-1 font-medium";

const CounterUp = (props) => {
  return <h1>{<CountUp start={0} end={props.num} duration={0.5} />}</h1>;
};

export {
  getState,
  FormTitle,
  Navigator,
  inputClasses,
  selectClasses,
  CounterUp,
};
