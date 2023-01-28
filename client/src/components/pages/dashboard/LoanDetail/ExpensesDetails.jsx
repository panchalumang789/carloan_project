import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const ExpensesDetails = (props) => {
  const [expensesDetails, setExpensesData] = useState({});
  useEffect(() => {
    setExpensesData(props.ExpensesDetails);
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
      {JSON.stringify(expensesDetails)}
    </div>
  );
};

export default ExpensesDetails;
