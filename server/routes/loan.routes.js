const router = require("express").Router();

const loanRoutes = router;
const loanController = require("../controller/loan.controller");

loanRoutes.get("/loan", loanController.getLoan, (req, res) => {
  res.send(res.locals.loans);
});

loanRoutes.post("/loan", loanController.newLoan, (req, res) => {
  res.send("ok");
});

loanRoutes.put("/loan/:id", loanController.updateLoan, (req, res) => {
  res.send("ok");
});

module.exports = loanRoutes;
