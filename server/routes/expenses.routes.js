const router = require("express").Router();

const expensesRoutes = router;
const authorization = require("../middleware/authorization");
const expensesController = require("../controller/expenses.controller");

expensesRoutes.get(
  "/expenses",
  authorization.verifyRole,
  expensesController.getAllExpenses,
  async (req, res) => {
    res.status(200).send(res.locals.expenses);
  }
);

expensesRoutes.get(
  "/expenses/user/:id",
  expensesController.getExpensesByUserId,
  async (req, res) => {
    res.status(200).send("Expenses added successfully.");
  }
);

expensesRoutes.get(
  "/expenses/loan/:id",
  expensesController.getExpensesByLoanId,
  async (req, res) => {
    res.status(200).send("Expenses added successfully.");
  }
);

expensesRoutes.post(
  "/expenses",
  expensesController.addExpenses,
  async (req, res) => {
    res.status(200).send("Expenses added successfully.");
  }
);

module.exports = expensesRoutes;
