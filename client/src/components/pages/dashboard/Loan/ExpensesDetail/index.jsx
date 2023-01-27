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
      <div className="flex flex-col md:flex-row pt-3 pb-2 gap-x-8 text-base md:text-center">
        <div className="flex md:flex-col">
          <span>Vehicle running cost: </span>
          <div className="font-semibold">
            &#x20B9;{" "}
            {expensesDetails ? expensesDetails.vehicle_running_cost : "0"}{" "}
          </div>
        </div>
        <div className="flex md:flex-col">
          <span>Travel cost: </span>
          <div className="font-semibold">
            &#x20B9; {expensesDetails ? expensesDetails.travel_cost : "0"}
          </div>
        </div>
        <div className="flex md:flex-col">
          <span>Utilities cost: </span>
          <div className="font-semibold">
            &#x20B9; {expensesDetails ? expensesDetails.utilities_cost : "0"}
          </div>
        </div>
        <div className="flex md:flex-col">
          <span>Insurances: </span>
          <div className="font-semibold">
            &#x20B9; {expensesDetails ? expensesDetails.insurance : "0"}
          </div>
        </div>
        <div className="flex md:flex-col">
          <span>Telephone & Internet: </span>
          <div className="font-semibold">
            &#x20B9; {expensesDetails ? expensesDetails.tel_internet : "0"}
          </div>
        </div>
        <div className="flex md:flex-col">
          <span>Entertainment: </span>
          <div className="font-semibold">
            &#x20B9; {expensesDetails ? expensesDetails.entertainment : "0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDetail;