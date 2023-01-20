import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loanService from "services/loanService";

const Loan = () => {
  const [loanDetails, setLoanData] = useState({});
  const [error, setError] = useState("");
  const [incomeDetails, setIncomeData] = useState({
    rental_income: "",
    investment_income: "",
    salary_sacrifice: "",
    centralink_benifit: "",
    foreign_income: "",
  });
  const [expensesDetails, setExpensesData] = useState({});
  let { loanId } = useParams();
  useEffect(() => {
    const loanServices = new loanService();
    try {
      (async () => {
        const { output, error } = await loanServices.getLoanbyId({
          path: `loan/${loanId}`,
          headerData: localStorage.getItem("token"),
        });

        if (error) {
          setError(error.data);
        } else {
          setLoanData(output);
          setIncomeData(output.incomes[0]);
          setExpensesData(output.expenses[0]);
        }
      })();
    } catch (error) {
      console.log(error);
    }
    return () => {};
  }, [loanId]);

  return (
    <>
      {error !== "" ? (
        <div className="text-2xl font-medium text-primary-color-6 dark:text-primary-color-5">{error.message}</div>
      ) : (
        <div className="flex h-full w-full gap-x-6">
          <div className="w-5/6 border-2 border-primary-color-1 dark:border-primary-color-5 lg:w-1/4 p-3">
            <p className="text-lg font-medium">Loan Summary</p>
            <div className="p-5">
              <div>
                <span>Loan id: </span>
                <span className="font-semibold text-lg mx-auto">
                  {loanDetails.id}
                </span>
              </div>
              <div>
                <span>Applied on: </span>
                <span className="font-semibold text-lg mx-auto">
                  {new Date(loanDetails.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span>Last update on: </span>
                <span className="font-semibold text-lg mx-auto">
                  {new Date(loanDetails.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="w-5/6 lg:w-3/4 flex flex-col gap-y-3 h-full overflow-y-auto">
            <Link
              to={"/dashboard"}
              className="group font-medium flex items-center justify-end gap-x-2 w-32 text-center p-3 border-2 bg-white/30 border-primary-color-1 dark:bg-primary-color-6 dark:hover:bg-primary-color-4 rounded-md dark:border-2 dark:border-primary-color-7"
            >
              <em className="group-hover:mr-2 text-xl transition-all duration-200 fa fa-arrow-left"></em>
              All loans
            </Link>
            <div className="border-t-2 border-primary-color-1 dark:border-primary-color-5 px-4 py-2">
              <p className="font-medium text-xl pt-1">Loan Details</p>
              <div className="flex">
                <div>
                  <span>Approx amount: </span>
                  <span className="font-medium text-lg mx-auto">
                    {loanDetails.approx_price} &#x20B9;
                  </span>
                </div>
                <div>
                  <span>Deposit: </span>
                  <span className="font-medium text-lg mx-auto">
                    {loanDetails.deposit} &#x20B9;
                  </span>
                </div>
                <div>
                  <span>Term: </span>
                  <span className="font-medium text-lg mx-auto">
                    {loanDetails.term} &#x20B9;
                  </span>
                </div>
                <div>
                  <span>Balloon: </span>
                  <span className="font-medium text-lg mx-auto">
                    {loanDetails.balloon} &#x20B9;
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-full h-32 border-t-2 border-primary-color-1 dark:border-primary-color-5 px-2">
                <p className="font-medium text-xl pt-1">Car Details</p>
                <div className="py-2">
                  <div>
                    <span>Maker: </span>
                    <span className="font-medium text-lg mx-auto">
                      {loanDetails.carMaker}
                    </span>
                  </div>
                  <div>
                    <span>Model: </span>
                    <span className="font-medium text-lg mx-auto">
                      {loanDetails.carModel}
                    </span>
                  </div>
                  <div>
                    <span>Mode-type: </span>
                    <span className="font-medium text-lg mx-auto">
                      {loanDetails.carModel_type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-32">
                {/* <img src={loanDetails.carImage} alt="car preview image" /> */}
                <input
                  className="h-36 pb-1"
                  type="image"
                  src={
                    "https://stimg.cardekho.com/images/carexteriorimages/930x620/Bentley/Flying-Spur/7776/1645012163948/front-left-side-47.jpg?tr=h-48"
                  }
                  alt="car preview image"
                />
              </div>
            </div>
            <div className="border-t-2 border-primary-color-1 dark:border-primary-color-5 px-4 py-2">
              <p className="font-medium text-xl pt-1">
                Income Details <span className="text-sm">(monthly)</span>
              </p>
              <div className="flex py-2 gap-x-8">
                <div className="flex flex-col items-center ">
                  <span>Rental income: </span>
                  <span className="font-medium text-lg mx-auto">
                    {incomeDetails.rental_income} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Investment income: </span>
                  <span className="font-medium text-lg mx-auto">
                    {incomeDetails.investment_income} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Salary sacrifice: </span>
                  <span className="font-medium text-lg mx-auto">
                    {incomeDetails.salary_sacrifice} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Centralink benifit: </span>
                  <span className="font-medium text-lg mx-auto">
                    {incomeDetails.centralink_benifit} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Foreign income: </span>
                  <span className="font-medium text-lg mx-auto">
                    {incomeDetails.foreign_income} &#x20B9;
                  </span>
                </div>
              </div>
            </div>
            <div className="border-y-2 border-primary-color-1 dark:border-primary-color-5 px-4 py-2">
              <p className="font-medium text-xl pt-1">
                Expenses Details <span className="text-sm">(monthly)</span>
              </p>
              <div className="flex py-2 gap-x-8">
                <div className="flex flex-col items-center ">
                  <span>Vehicle running cost: </span>
                  <span className="font-medium text-lg mx-auto">
                    {expensesDetails.vehicle_running_cost} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Travel cost: </span>
                  <span className="font-medium text-lg mx-auto">
                    {expensesDetails.travel_cost} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Utilities cost: </span>
                  <span className="font-medium text-lg mx-auto">
                    {expensesDetails.utilities_cost} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Insurances: </span>
                  <span className="font-medium text-lg mx-auto">
                    {expensesDetails.insurance} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Telephone & Internet: </span>
                  <span className="font-medium text-lg mx-auto">
                    {expensesDetails.tel_internet} &#x20B9;
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <span>Entertainment: </span>
                  <span className="font-medium text-lg mx-auto">
                    {expensesDetails.entertainment} &#x20B9;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loan;
