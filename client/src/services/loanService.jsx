import axios from "axios";
let headers = {
  "Content-type": "Application/json",
  Authorization: "Bearer",
};

class loanService {
  applyLoan = async (data) => {
    try {
      let output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details.loanData,
        { headers }
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
    console.log(data);
    try {
      const output = await axios.get(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      console.log(output.data);
      return output.data;
    } catch (error) {
      return error.response;
    }
  };
}
export default loanService;
