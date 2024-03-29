const router = require("express").Router();

const incomeRoutes = router;
const authorization = require("../middleware/authorization");
const incomeController = require("../controller/income.controller");

incomeRoutes.get(
  "/income",
  authorization.verifyToken,
  incomeController.getIncome,
  async (req, res) => {
    res.status(200).send(res.locals.income);
  }
);

incomeRoutes.post(
  "/income",
  authorization.verifyToken,
  incomeController.addIncome,
  (req, res) => {
    res.status(200).json({ message: "Income added successfully." });
  }
);

incomeRoutes.put(
  "/income/:id",
  authorization.verifyToken,
  incomeController.updateIncome,
  (req, res) => {
    res.status(200).send({ message: res.locals.income });
  }
);

module.exports = incomeRoutes;
