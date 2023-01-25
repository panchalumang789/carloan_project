import React, { useState, useEffect } from "react";

const ExpensesDetail = (props) => {
  const [expensesDetails, setIncomeData] = useState({});
  useEffect(() => {
    setIncomeData(props.expensesDetails);
    return () => {};
  }, [props]);
  return (
    <div className="border-y-2 border-primary-color-1 dark:border-primary-color-5 px-4 py-2">
      <p className="font-medium text-xl pt-1 flex justify-between">
        <span>
          Expenses Details <span className="text-sm">(monthly)</span>
        </span>
      </p>
      <div className="flex pt-3 pb-2 gap-x-8 text-base text-center text-clip">
        <div className="flex flex-col">
          <span>Vehicle running cost: </span>
          <div className="font-semibold">
            {expensesDetails ? expensesDetails.vehicle_running_cost : "0"}{" "}
            &#x20B9;
          </div>
        </div>
        <div className="flex flex-col">
          <span>Travel cost: </span>
          <div className="font-semibold">
            {expensesDetails ? expensesDetails.travel_cost : "0"} &#x20B9;
          </div>
        </div>
        <div className="flex flex-col">
          <span>Utilities cost: </span>
          <div className="font-semibold">
            {expensesDetails ? expensesDetails.utilities_cost : "0"} &#x20B9;
          </div>
        </div>
        <div className="flex flex-col">
          <span>Insurances: </span>
          <div className="font-semibold">
            {expensesDetails ? expensesDetails.insurance : "0"} &#x20B9;
          </div>
        </div>
        <div className="flex flex-col">
          <span>Telephone & Internet: </span>
          <div className="font-semibold">
            {expensesDetails ? expensesDetails.tel_internet : "0"} &#x20B9;
          </div>
        </div>
        <div className="flex flex-col">
          <span>Entertainment: </span>
          <div className="font-semibold">
            {expensesDetails ? expensesDetails.entertainment : "0"} &#x20B9;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDetail;
