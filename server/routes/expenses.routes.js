const router = require("express").Router();

const expensesRoutes = router;
const authorization = require("../middleware/authorization");
const expensesController = require("../controller/expenses.controller");

expensesRoutes.get(
  "/expenses",
  authorization.verifyRole("Admin"),
  expensesController.getAllExpenses,
  async (req, res) => {
    res.status(200).send(res.locals.expenses);
  }
);

expensesRoutes.get(
  "/expenses/user/:id",
  expensesController.getUserExpenses,
  async (req, res) => {
    res.status(200).send(res.locals.expenses);
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
