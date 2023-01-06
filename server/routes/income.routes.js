const router = require("express").Router();

const incomeRoutes = router;
const authorization = require("../middleware/authorization");
const incomeController = require("../controller/income.controller");

incomeRoutes.get(
  "/income",
  authorization.verifyRole("Admin"),
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

incomeRoutes.post("/income", incomeController.addIncome, async (req, res) => {
  res.status(200).send("Income added successfully.");
});

module.exports = incomeRoutes;
