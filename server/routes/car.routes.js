const router = require("express").Router();

const carRoutes = router;
const carsMiddleware = require("../middleware/cars.middleware");

carRoutes.use(carsMiddleware.createTable);

carRoutes.get("/carCompany", carsMiddleware.getCarmakers, async (req, res) => {
  res.status(200).send(res.locals.carMakers);
});

carRoutes.get("/cars", carsMiddleware.getCars, async (req, res) => {
  res.status(200).send(res.locals.cars);
});

carRoutes.post("/cars", carsMiddleware.addCar, async (req, res) => {
  res
    .status(200)
    .send(`${req.body.make} '${req.body.modeltype}' added successfully.`);
});

carRoutes.delete("/cars/:id", carsMiddleware.deleteCar, async (req, res) => {
  res.status(200).send("Car deleted successfully.");
});

module.exports = carRoutes;
