const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const carRoutes = require("./routes/car.routes");
const userRoutes = require("./routes/user.routes");
const loanRoutes = require("./routes/loan.routes");

app.use(bodyParser.json());

app.use(carRoutes, userRoutes, loanRoutes);

// Error handler from middleware
app.use((error, req, res, next) => {
  if (error.error.detail) {
    res.status(error.error.status || 500).send({ message: error.error.detail });
  } else {
    res
      .status(error.error.status || 500)
      .send({ message: error.error.message });
  }
});

// Running server
app.listen(process.env.PORT || 3333, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
