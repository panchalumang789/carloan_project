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
}
export default customerService;
