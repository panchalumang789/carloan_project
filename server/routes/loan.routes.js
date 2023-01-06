const router = require("express").Router();

const loanRoutes = router;
const authorization = require("../middleware/authorization");
const loanController = require("../controller/loan.controller");

loanRoutes.get(
  "/loans",
  authorization.verifyToken,
  loanController.getLoan,
  (req, res) => {
    res.status(200).send(res.locals.loans);
  }
);

loanRoutes.get(
  "/loan/:id",
  authorization.verifyToken,
  loanController.getLoanById,
  (req, res) => {
    res.status(200).send(res.locals.loans);
  }
);

loanRoutes.post("/loan", loanController.newLoan, (req, res) => {
  res.status(200).json({
    loanId: res.locals.loanId,
    message: "Loan application submitted.",
  });
});

loanRoutes.put(
  "/loan/:id",
  authorization.verifyToken,
  loanController.updateLoan,
  (req, res) => {
    res.status(200).json({
      loanId: res.locals.loanId,
      message: "Loan application updated successfully.",
    });
  }
);

module.exports = loanRoutes;
