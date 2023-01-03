const carTable = require("../models/car");
const carsList = require(".././carsList");

/**
 *
 * @param {*} res get all car maker list
 */
const getCarmakers = async (req, res, next) => {
  carTable
    .findAll({
      attributes: ["id", "make"],
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
 *
 * @param {*} res get all cars details
 */
const getCars = async (req, res, next) => {
  carTable
    .findAll()
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
 *
 * @param {*} res add all cars data
 */
const addCars = async (req, res, next) => {
  carTable
    .bulkCreate(carsList, { validate: true })
    .then(() => {
      next();
    })
    .catch((error) => {
      next({ error: { status: 500, message: error.original } });
    });
};

module.exports = { getCarmakers, getCars, addCars };
