import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const IncomeDetails = (props) => {
  const [incomeDetails, setIncomeData] = useState({});
  const cookie = new Cookies();
  let { loanId } = useParams();
  useEffect(() => {
    setIncomeData(props.incomeDetails);
    return () => {};
  }, [props]);
  return (
    <div className="border-t-2 border-primary-color-1 dark:border-primary-color-5 px-4 py-2">
      <p className="font-medium text-xl pt-1 flex justify-between">
        <span>
          Income Details <span className="text-sm">(monthly)</span>
        </span>
        {!incomeDetails && (
          <Link
            to={"/journey/incomeDetail"}
            onClick={() => cookie.set("loanDetail", { loanId: loanId })}
            className="text-lg"
          >
            <span className="fa-solid fa-plus"></span> Add
          </Link>
        )}
      </p>
      <div className="flex flex-col md:flex-row pt-3 pb-2 gap-x-8 tex-base md:text-center">
        <div className="flex md:flex-col">
          <span>Rental income: </span>
          <span className="font-semibold">
            &#x20B9; {incomeDetails ? incomeDetails.rental_income : 0}
          </span>
        </div>
        <div className="flex md:flex-col">
          <span>Investment income: </span>
          <span className="font-semibold">
            &#x20B9; {incomeDetails ? incomeDetails.investment_income : 0}
          </span>
        </div>
        <div className="flex md:flex-col">
          <span>Salary sacrifice: </span>
          <span className="font-semibold">
            &#x20B9; {incomeDetails ? incomeDetails.salary_sacrifice : 0}
          </span>
        </div>
        <div className="flex md:flex-col">
          <span>Centralink benifit: </span>
          <span className="font-semibold">
            &#x20B9; {incomeDetails ? incomeDetails.centralink_benifit : 0}
          </span>
        </div>
        <div className="flex md:flex-col">
          <span>Foreign income: </span>
          <span className="font-semibold">
            &#x20B9; {incomeDetails ? incomeDetails.foreign_income : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;
