const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const sequalize = require("./config/db.connection");

const authorization = require("./routes/login.routes");
const carRoutes = require("./routes/car.routes");
const userRoutes = require("./routes/user.routes");
const loanRoutes = require("./routes/loan.routes");
const incomeRoutes = require("./routes/income.routes");
const expensesRoutes = require("./routes/expenses.routes");

app.use(bodyParser.json(), cookieParser());

app.use(
  authorization,
  carRoutes,
  userRoutes,
  loanRoutes,
  incomeRoutes,
  expensesRoutes
);

// Error handler
app.use((error, req, res, next) => {
  if (error.error.detail) {
    res.status(error.error.status || 500).send({ message: error.error.detail });
  } else {
    res
      .status(error.error.status || 500)
      .send({ message: error.error.message });
  }
});

// synchronize all sequalize model with database
sequalize.sync({ alter: true }, (error, result) => {
  if (error) return error;
  else return result;
});
// sequalize.sync({ force: true }, (error, result) => {
//   if (error) return error;
//   else return sequalize.drop();
// });

// Running server
app.listen(process.env.PORT || 3333, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
