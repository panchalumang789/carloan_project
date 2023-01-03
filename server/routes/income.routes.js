const router = require("express").Router();

const incomeRoutes = router;
const incomeController = require("../controller/income.controller");

incomeRoutes.post("/income", incomeController.addIncome, async (req, res) => {
  res.status(200).send("Income added successfully.");
});

module.exports = incomeRoutes;
