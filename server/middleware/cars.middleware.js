const dbConnect = require("../config/db.connection");
const carTable = require("../models/car");

/**
 *
 * @returns all car companies name
 */
const getCarmakers = async (req, res, next) => {
  await carTable;
  dbConnect.query("SELECT make FROM cars WHERE", (error, result) => {
    if (error) next({ error: { status: 404, message: "No car maker found!" } });
    else next();
  });
};

/**
 *
 * @return all cars details
 */
const getCars = async (req, res, next) => {
  await carTable;
  dbConnect.query(
    "SELECT make,model,production_year,model_type,image FROM cars WHERE",
    (error, result) => {
      if (error) next({ error: { status: 404, message: "Cars not found!" } });
      else next();
    }
  );
};

/**
 *
 * @return add new car data
 */
const addCar = async (req, res, next) => {
  await carTable;
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
  await carTable;
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

module.exports = { getCarmakers, getCars, addCar, deleteCar };
