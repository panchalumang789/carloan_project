const router = require("express").Router();
const dbConnect = require("../config/db.connection");

const carsMiddleware = require("../middleware/cars.middleware");

router.get("/carCompany", carsMiddleware.getCarmakers, async (req, res) => {
  res.send();
});

router.get("/cars", carsMiddleware.getCars, async (req, res) => {
  res.send();
});

router.post("/cars", carsMiddleware.addCar, async (req, res) => {
  res
    .status(200)
    .send(`${req.body.make} '${req.body.modeltype}' added Successfully.`);
});

router.delete("/cars", carsMiddleware.deleteCar, async (req, res) => {
  res.status(200).send(`${req.body.modeltype} deleted Successfully.`);
});

module.exports = router;
