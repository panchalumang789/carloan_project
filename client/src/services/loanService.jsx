import axios from "axios";
let headers = {
    "Content-type": "Application/json",
    Authorization: "Bearer",
};

class loanService {
    applyLoan = async (data) => {
        try {
            let output = await axios.post(`${process.env.REACT_APP_HOST_URL}${data.path}`, data.details.loanData, { headers })
            return output.data;
        } catch (error) {
            throw error
        }
    }
}
export default loanService;
