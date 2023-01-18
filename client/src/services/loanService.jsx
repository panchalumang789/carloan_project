import axios from "axios";
// let headers = {
//   "Content-type": "Application/json",
//   Authorization: "Bearer",
// };

class loanService {
  applyLoan = async (data) => {
    try {
      let output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
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
      const output = await axios.get(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
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
}
export default loanService;
