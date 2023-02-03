const router = require("express").Router();

const loanRoutes = router;
const authorization = require("../middleware/authorization");
const loanController = require("../controller/loan.controller");
const adminController = require("../controller/admin.controller");


loanRoutes.get(
  "/loans/",
  authorization.verifyToken,
  loanController.getLoanByStatus,
  (req, res) => {
    res.status(200).json({
      loan: res.locals.loans,
      length: res.locals.length,
    });
  }
);

loanRoutes.get(
  "/loans/user/:id",
  authorization.verifyToken,
  loanController.getLoanByUserId,
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

loanRoutes.put(
  "/loan/status/:id",
  authorization.verifyToken,
  loanController.updateLoanStatus,
  (req, res) => {
    res.status(200).json({
      message: "Loan status updated successfully.",
    });
  }
);

loanRoutes.put(
  "/loan/car/:id",
  authorization.verifyToken,
  loanController.updateLoanCar,
  (req, res) => {
    res.status(200).json({
      loanId: res.locals.loanId,
      message: "Car details updated successfully.",
    });
  }
);

loanRoutes.put("/loan/sendMail/:id", adminController.sendMail, (req, res) => {
  res.status(200).json({ mailstatus: res.locals.mailStatus });
});
module.exports = loanRoutes;
