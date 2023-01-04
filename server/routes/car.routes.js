const router = require("express").Router();

const carRoutes = router;
const carsController = require("../controller/cars.controller");

carRoutes.get("/carCompany", carsController.getCarmakers, async (req, res) => {
  res.status(200).send(res.locals.carMakers);
});

carRoutes.get("/cars", carsController.getCars, async (req, res) => {
  res.status(200).send(res.locals.cars);
});

carRoutes.post("/cars", carsController.addCars, async (req, res) => {
  res.status(200).send(`${res.locals.cars} cars added successfully.`);
});

module.exports = carRoutes;
