const router = require("express").Router();

const expensesRoutes = router;
const authorization = require("../middleware/authorization");
const expensesController = require("../controller/expenses.controller");

expensesRoutes.get(
  "/expenses",
  authorization.verifyToken,
  expensesController.getAllExpenses,
  async (req, res) => {
    res.status(200).send(res.locals.expenses);
  }
);

expensesRoutes.post(
  "/expenses",
  authorization.verifyToken,
  expensesController.addExpenses,
  (req, res) => {
    res.status(200).json({ message: "Expenses added successfully." });
  }
);

expensesRoutes.put(
  "/expenses/:id",
  authorization.verifyToken,
  expensesController.updateExpenses,
  (req, res) => {
    res.status(200).json({ message: res.locals.expenses });
  }
);

module.exports = expensesRoutes;
