import axios from "axios";
let headers = {
  "Content-type": "Application/json",
  Authorization: "Bearer",
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
}
export default customerService;
