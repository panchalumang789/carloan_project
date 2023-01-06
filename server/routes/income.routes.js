const router = require("express").Router();

const incomeRoutes = router;
const authorization = require("../middleware/authorization");
const incomeController = require("../controller/income.controller");

incomeRoutes.get(
  "/income",
  authorization.verifyRole,
  incomeController.getIncome,
  async (req, res) => {
    res.status(200).send(res.locals.income);
  }
);

incomeRoutes.get(
  "/income/user/:id",
  incomeController.getUserIncome,
  async (req, res) => {
    res.status(200).send(res.locals.income);
  }
);

incomeRoutes.post("/income", incomeController.addIncome, (req, res) => {
  res.status(200).json({ message: "Income added successfully." });
});

module.exports = incomeRoutes;
