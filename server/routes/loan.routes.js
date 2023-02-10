const router = require("express").Router();

const loanRoutes = router;
const authorization = require("../middleware/authorization");
const loanController = require("../controller/loan.controller");
const adminController = require("../controller/admin.controller");
const multer = require("multer");
const loanTable = require("../models/loan");
const { Sequelize } = require("sequelize");
const upload = multer({ dest: "./document/" });

loanRoutes.get(
  "/loans/",
  authorization.verifyToken,
  loanController.loanCount,
  loanController.getLoanByStatus,
  (req, res) => {
    res.status(200).json({
      loan: res.locals.loans,
      length: res.locals.length,
      loanCount: res.locals.loanCount,
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
  "/loans/count",
  authorization.verifyToken,
  loanController.loanCount,
  (req, res) => {
    res.status(200).send(res.locals.loanCount);
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

loanRoutes.post(
  "/documentUpload/:loanId",
  authorization.verifyToken,
  upload.fields([
    { name: "licenceFrontImage", maxCount: 1 },
    { name: "licenceBackImage", maxCount: 1 },
    { name: "medicalcardImage", maxCount: 1 },
    { name: "mostRecentPayslip", maxCount: 1 },
    { name: "secondMostRecentPayslip", maxCount: 1 },
  ]),
  loanController.updateDocument,
  (req, res) => {
    res.status(200).json({ message: "Doneee" });
  }
);
module.exports = loanRoutes;
