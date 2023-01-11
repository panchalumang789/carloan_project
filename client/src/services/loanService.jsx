import axios from "axios";
let headers = {
    "Content-type": "Application/json",
    Authorization: "Bearer",
};

class loanService {
    applyLoan = async (data) => {
        let output = await axios.post(`${process.env.REACT_APP_HOST_URL}${data.path}`, data.details.loanData, { headers })
        return output.data;
    }
}
export default loanService;