const router = require("express").Router();

const loanRoutes = router;
const authorization = require("../middleware/authorization");
const loanController = require("../controller/loan.controller");

loanRoutes.get(
  "/loans",
  authorization.verifyRole("Admin"),
  loanController.getLoan,
  (req, res) => {
    res.send(res.locals.loans);
  }
);

loanRoutes.get(
  "/loan/:id",
  // authorization.verifyRole("Admin"),
  loanController.getLoanById,
  (req, res) => {
    res.send(res.locals.loans);
  }
);

loanRoutes.get("/loan", loanController.getUserLoan, (req, res) => {
  res.send(res.locals.loans);
});

loanRoutes.post("/loan", loanController.newLoan, (req, res) => {
  res.send("Loan application submitted.");
});

loanRoutes.put("/loan/:id", loanController.updateLoan, (req, res) => {
  res.send("Loan application updated successfully.");
});

module.exports = loanRoutes;
