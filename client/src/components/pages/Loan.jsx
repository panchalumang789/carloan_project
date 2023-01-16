import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loanService from "services/loanService";

const Loan = () => {
  const [loanDetails, setLoanData] = useState({});
  let { loanId } = useParams();
  useEffect(() => {
    const loanServices = new loanService();
    try {
      (async () => {
        const loanData = await loanServices.getLoanbyId({
          path: `loan/${loanId}`,
          headerData: localStorage.getItem("token"),
        });
        setLoanData(loanData);
      })();
    } catch (error) {}
    return () => {};
  }, [loanId]);

  return <div>{JSON.stringify(loanDetails)}</div>;
};

export default Loan;
