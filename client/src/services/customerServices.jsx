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
    try {
      let output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details,
        { headers }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  verifyOTP = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}verify`,
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
        `${process.env.REACT_APP_HOST_URL}${data.path}/${data.details.contactNo}`,
        { headers }
      );
      console.log(output.data);
      return output.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  registerUser = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details,
        {
          headers: {
            loanid: data.headerData.loanId,
          },
        }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  updateUser = async (data) => {
    console.log(data);
    try {
      const output = await axios.put(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
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
        data.details,
        {
          headers: {
            Authorization: `${data.headerData}`,
          },
        }
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
      return error.response;
    }
  };

  verifyToken = async (data) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      return result.data;
    } catch (error) {
      return error.response;
    }
  };

  verifyUser = async (data) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details,
        { headers }
      );
      return result.data;
    } catch (error) {
      return error.response;
    }
  };
}
export default customerService;
