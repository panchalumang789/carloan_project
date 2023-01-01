const express = require("express");
const app = express();
require("dotenv").config();

const carRoutes = require("./routes/car.routes");

app.use(express.json());

app.use(carRoutes);

// Error handler from middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).send({ message: error.message });
});

// Running server
app.listen(process.env.PORT || 3333, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
