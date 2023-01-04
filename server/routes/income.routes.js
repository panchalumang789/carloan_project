const router = require("express").Router();

const incomeRoutes = router;
const authorization = require("../middleware/authorization");
const incomeController = require("../controller/income.controller");

incomeRoutes.get(
  "/income",
  authorization.verifyRole,
  incomeController.getAllIncome,
  async (req, res) => {
    res.status(200).send(res.locals.income);
  }
);

incomeRoutes.get(
  "/income/user/:id",
  incomeController.getIncomeByUserId,
  async (req, res) => {
    res.status(200).send(res.locals.income);
  }
);

incomeRoutes.get(
  "/income/loan/:id",
  incomeController.getIncomeByLoanId,
  async (req, res) => {
    res.status(200).send(res.locals.income);
  }
);

incomeRoutes.post("/income", incomeController.addIncome, async (req, res) => {
  res.status(200).send("Income added successfully.");
});

module.exports = incomeRoutes;
