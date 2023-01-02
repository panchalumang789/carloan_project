const dbConnect = require("../config/db.connection");
const carTable = require("../models/car");

/**
 * create cars table
 */
const createTable = (req, res, next) => {
  carTable
    .then((result) => {
      if (result.command !== "CREATE") {
        next({
          error: { status: 500, message: "Something is wrong!", error: result },
        });
      } else next();
    })
    .catch((error) => {
      next({
        error: { status: 500, message: "Something is wrong!", error: error },
      });
    });
};

/**
 *
 * @returns all car companies name
 */
const getCarmakers = async (req, res, next) => {
  dbConnect.query("SELECT DISTINCT make FROM cars", (error, result) => {
    if (error) next({ error: { status: 404, message: "No car maker found!" } });
    else {
      res.locals.carMakers = result.rows;
      next();
    }
  });
};

/**
 *
 * @return all cars details
 */
const getCars = async (req, res, next) => {
  dbConnect.query("SELECT * FROM cars", (error, result) => {
    if (error) next({ error: { status: 404, message: "Cars not found!" } });
    else {
      res.locals.cars = result.rows;
      next();
    }
  });
};

/**
 *
 * @return add new car data
 */
const addCar = async (req, res, next) => {
  dbConnect.query(
    `INSERT INTO cars (make, model, production_year, model_type,image)
    VALUES('${req.body.make}','${req.body.model}', ARRAY [${req.body.productionyear}],'${req.body.modeltype}','${req.body.image}')`,
    (error, result) => {
      if (error) {
        next({ error: { status: 500, message: error.detail } });
      } else {
        if (result.rowCount === 1) {
          next();
        } else next({ error: { status: 500, message: "Something is wrong!" } });
      }
    }
  );
};

/**
 *
 * @return delete car data by id
 */
const deleteCar = async (req, res, next) => {
  dbConnect.query(
    `DELETE FROM cars WHERE id=${req.params.id}`,
    (error, result) => {
      if (error) {
        next({ error: { status: 400, message: "Invalid argument." } });
      } else {
        if (result.rowCount === 1) {
          next();
        } else {
          next({ error: { status: 400, message: "Invalid argument." } });
        }
      }
    }
  );
};

module.exports = { createTable, getCarmakers, getCars, addCar, deleteCar };
