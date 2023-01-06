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
  expensesController.getUserExpenses,
  async (req, res) => {
    res.status(200).send(res.locals.expenses);
  }
);

expensesRoutes.post("/expenses", expensesController.addExpenses, (req, res) => {
  res.status(200).json({ message: "Expenses added successfully." });
});

module.exports = expensesRoutes;
