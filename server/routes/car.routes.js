const router = require("express").Router();

const carRoutes = router;
const carsMiddleware = require("../middleware/cars.middleware");

carRoutes.get("/carCompany", carsMiddleware.getCarmakers, async (req, res) => {
  res.status(200).send(res.locals.carMakers);
});

carRoutes.get("/cars", carsMiddleware.getCars, async (req, res) => {
  res.status(200).send(res.locals.cars);
});

carRoutes.post("/cars", carsMiddleware.addCars, async (req, res) => {
  res.status(200).send("Cars added successfully.");
});

module.exports = carRoutes;
