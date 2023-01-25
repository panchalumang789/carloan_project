import axios from "axios";

class loginService {
  adminLogin = async (data) => {
    let output, error;
    try {
      const login = await axios.post(
        `${process.env.REACT_APP_HOST_URL}admin`,
        data.details
      );
      output = login.data;
    } catch (err) {
      error = err.response;
    }
    return { output, error };
  };
}

export default loginService;
