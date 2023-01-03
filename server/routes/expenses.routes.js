const router = require("express").Router();

const expensesRoutes = router;
const expensesController = require("../controller/expenses.controller");

expensesRoutes.post(
  "/expenses",
  expensesController.addExpenses,
  async (req, res) => {
    res.status(200).send("Expenses added successfully.");
  }
);

module.exports = expensesRoutes;
