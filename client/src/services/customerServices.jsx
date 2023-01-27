import axios from "axios";
let headers = {
  "Content-type": "Application/json",
  Authorization: "",
};

class customerService {
  getState = async () => {
    let output = await axios.get(`${process.env.REACT_APP_HOST_URL}states`, {
      headers,
    });
    return output.data;
  };

  getUser = async (data) => {
    let output, error;
    try {
      const getUsers = await axios.get(
        `${process.env.REACT_APP_HOST_URL}users?offset=${data.offset}&limit=${data.limit}`,
        {
          headers: {
            Authorization: data.headerData,
          },
        }
      );
      output = getUsers.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  sendOTP = async (data) => {
    try {
      let output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}login`,
        data.details,
        { headers }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  verifyOTP = async (data) => {
    let output, error;
    try {
      const verifyOTP = await axios.post(
        `${process.env.REACT_APP_HOST_URL}verify`,
        data.details,
        { headers }
      );
      output = verifyOTP.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  findUserbyContact = async (data) => {
    try {
      const output = await axios.get(
        `${process.env.REACT_APP_HOST_URL}user/mobile/${data.details.contactNo}`,
        { headers }
      );
      return output.data;
    } catch (error) {
      return error.response;
    }
  };

  registerUser = async (data) => {
    let output, error;
    try {
      const createUser = await axios.post(
        `${process.env.REACT_APP_HOST_URL}user`,
        data.details,
        {
          headers: {
            loanid: data.headerData.loanId,
          },
        }
      );
      output = createUser.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  updateUser = async (data) => {
    let output, error;
    try {
      const updateUser = await axios.put(
        `${process.env.REACT_APP_HOST_URL}${data.path}`,
        data.details
      );
      output = updateUser.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };

  addIncome = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}income`,
        data.details,
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

  addExpenses = async (data) => {
    try {
      const output = await axios.post(
        `${process.env.REACT_APP_HOST_URL}expenses`,
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
        `${process.env.REACT_APP_HOST_URL}user/verify`,
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
