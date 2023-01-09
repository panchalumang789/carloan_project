const carTable = require("../models/car");
const carsList = require("../carsList");

/**
 * @param {*} res get all car maker list
 */
const getCarmakers = async (req, res, next) => {
  carTable
    .findAll({
      attributes: ["make"],
      order: ["make"],
      group: ["make"],
    })
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "No car maker found!" } });
      } else {
        res.locals.carMakers = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "No car maker found!" } });
    });
};

/**
 * @param {*} res get all car maker list
 */
const getCarmodel = async (req, res, next) => {
  carTable
    .findAll({
      where: {
        make: req.params.maker,
      },
      attributes: ["model"],
      order: ["model"],
      group: ["model"],
    })
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "No car maker found!" } });
      } else {
        res.locals.cars = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "No car maker found!" } });
    });
};

/**
 * @param {*} res get all cars of car maker
 */
const getCars = async (req, res, next) => {
  carTable
    .findAll({
      where: {
        make: req.params.maker,
        model: req.params.model,
      },
    })
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "Cars not found!" } });
      } else {
        res.locals.cars = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "Cars not found!" } });
    });
};

/**
 * @param {*} res add all cars data
 */
const addCars = async (req, res, next) => {
  carTable
    .bulkCreate(carsList, { validate: true })
    .then((result) => {
      res.locals.cars = result.length;
      next();
    })
    .catch((error) => {
      next({ error: { status: 500, message: error.original.detail } });
    });
};

module.exports = { getCarmakers, getCarmodel, getCars, addCars };
