import axios from "axios";
let headers = {
  "Content-type": "Application/json",
  Authorization: "",
};

class customerService {
  getState = async (data) => {
    let output = await axios.get(
      `${process.env.REACT_APP_HOST_URL}${data.data.url}`,
      { headers }
    );
    return output.data;
  };

  sendOTP = async (data) => {
    // console.log(data);
    try {
      let output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details,
        { headers }
      );
      return output.data;
    } catch (error) {
      return error;
    }
  };

  verifyOTP = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details,
        { headers }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  findUserbyContact = async (data) => {
    try {
      const output = await axios.get(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        { headers }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  registerUser = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}/${data.headerData.loanId}`,
        data.details
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  addIncome = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  addExpenses = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${data.headerData}`,
          },
        }
      );
      return output.data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };
}
export default customerService;
