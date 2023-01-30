import axios from "axios";

class loanService {
  applyLoan = async (data) => {
    try {
      let output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}loan`,
        data.details.loanData,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      return output.data;
    } catch (error) {
      throw error;
    }
  };

  getLoan = async (data) => {
    try {
      const output = await axios.get(`${process.env.REACT_APP_HOST_URL}loans`, {
        headers: {
          Authorization: data.headerData,
        },
      });
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  getLoanbyStatus = async (data) => {
    let output, error;
    try {
      const findLoan = await axios.get(
        `${process.env.REACT_APP_HOST_URL}loans/status?status=${data.status}&offset=${data.offset}&limit=${data.limit}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = findLoan.data;
    } catch (err) {
      error = err.response.data;
    }
    return { output, error };
  };

  getLoanbyId = async (data) => {
    let output, error;
    try {
      const loanData = await axios.get(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = loanData.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  getLoanbyUserId = async (data) => {
    let output, error;
    try {
      const loanData = await axios.get(
        `${process.env.REACT_APP_HOST_URL}loans/user/${data.userId}?status=${data.status}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = loanData.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  updateLoanStatus = async (data) => {
    let output, error;
    try {
      const updateLoanStatus = await axios.put(
        `${process.env.REACT_APP_HOST_URL}loan/status/${data.loanId}`,
        data.body,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = updateLoanStatus.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  sendMail = async (data) => {
    let output, error;
    try {
      const sendMail = await axios.put(
        `${process.env.REACT_APP_HOST_URL}loan/sendMail/${data.loanId}`,
        data.body
      );
      output = sendMail.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  updateLoan = async (data) => {
    let output, error;
    try {
      const updateLoan = await axios.put(
        `${process.env.REACT_APP_HOST_URL}loan/${data.loanId}`,
        data.bodyData,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = updateLoan.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  updateLoanCar = async (data) => {
    let output, error;
    try {
      const updateLoanCar = await axios.put(
        `${process.env.REACT_APP_HOST_URL}loan/car/${data.loanId}`,
        data.bodyData,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = updateLoanCar.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  updateIncome = async (data) => {
    let output, error;
    try {
      const updateExpenses = await axios.put(
        `${process.env.REACT_APP_HOST_URL}income/${data.incomeId}`,
        data.bodyData,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = updateExpenses.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  updateExpenses = async (data) => {
    let output, error;
    try {
      const updateExpenses = await axios.put(
        `${process.env.REACT_APP_HOST_URL}expenses/${data.expensesId}`,
        data.bodyData,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = updateExpenses.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };
}
export default loanService;
