import axios from "axios";
let headers = {
  "Content-type": "Application/json",
  Authorization: "Bearer",
};

class carsService {
  getCarMaker = async () => {
    let output = await axios.get(`${process.env.REACT_APP_HOST_URL}carCompany`, { headers })
    return output.data;
  }
  getCarModel = async (data) => {
    let output = await axios.get(`${process.env.REACT_APP_HOST_URL}cars/${data}`, { headers })
    return output.data
  }

  getCarDetails = async (make, model) => {
    let output = await axios.get(`${process.env.REACT_APP_HOST_URL}cars/${make}/${model}`, { headers })
    return output.data
  }
}
export default carsService;
