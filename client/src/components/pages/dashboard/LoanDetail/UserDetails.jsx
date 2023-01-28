import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const UserDetails = (props) => {
  const [userDetails, setUserData] = useState({});
  useEffect(() => {
    setUserData(props.UserDetails);
  }, [props]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      {JSON.stringify(userDetails)}
      {/* <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">Loan id:</span>
        <input
          className={inputClasses}
          type="number"
          disabled
          defaultValue={loanDetails.id}
        />
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">Approx amount:</span>
        <input
          className={inputClasses}
          type="number"
          disabled
          defaultValue={loanDetails.approx_price}
        />
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">Deposit:</span>
        <input
          className={inputClasses}
          type="number"
          disabled
          defaultValue={loanDetails.deposit}
        />
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">Term:</span>
        <select id="term" value={loanDetails.term} className={selectClasses}>
          <option disabled value="">
            Select loan term
          </option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
          <option value="4">4 years</option>
          <option value="5">5 years</option>
          <option value="6">6 years</option>
          <option value="7">7 years</option>
          <option value="8">8 years</option>
          <option value="9">9 years</option>
          <option value="10">10 years</option>
        </select>
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">Balloon:</span>
        <input
          className={inputClasses}
          type="number"
          disabled
          defaultValue={loanDetails.balloon}
        />
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">User status:</span>
        <select value={loanDetails.user_status} className={selectClasses}>
          <option value="" disabled>
            Select work status
          </option>
          <option value="Employee">I am an Employee</option>
          <option value="Unemployed">I am an Unemployed</option>
        </select>
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">User income:</span>
        <input
          className={inputClasses}
          type="number"
          disabled
          defaultValue={loanDetails.user_income}
        />
      </div>
      <div className="font-medium text-xl flex gap-x-2 items-center">
        <span className="font-normal w-1/5">Apply date:</span>
        <input
          className={inputClasses}
          type="date"
          // defaultValue={
          //   new Date(loanDetails.createdAt).toISOString().split("T")[0] ||
          //   "yyyy-mm-dd"
          // }
          {...register("licenceIssueState", {
            required: "Please select license issue state!",
          })}
        />
      </div> */}
    </div>
  );
};

export default UserDetails;
