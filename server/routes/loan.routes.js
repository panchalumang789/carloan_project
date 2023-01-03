const router = require("express").Router();

const loanRoutes = router;
const loanMiddleware = require("../middleware/loan.middleware");

loanRoutes.get("/loan", loanMiddleware.getLoan, (req, res) => {
  res.send(res.locals.loans);
});

loanRoutes.post("/loan", loanMiddleware.newLoan, (req, res) => {
  res.send("ok");
});

loanRoutes.put("/loan/:id", loanMiddleware.updateLoan, (req, res) => {
  res.send("ok");
});

module.exports = loanRoutes;
