const Joi = require("joi");
const dbConnect = require("../config/db.connection");
const loanTable = require("../models/loan");

/**
 * create loan table
 */
const createTable = async (req, res, next) => {
  loanTable
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

const getLoan = async (req, res, next) => {
  dbConnect.query(`SELECT * FROM loans`, (error, result) => {
    if (error) next({ error: { status: 500, message: "Something is wrong!" } });
    else {
      res.locals.loans = result.rows;
      next();
    }
  });
};

const newLoan = async (req, res, next) => {
  //   console.log(...req.body);
  //   next();
  const dataValidation = Joi.object().keys({
    approx_price: Joi.number().required(),
    deposit: Joi.number().required(),
    additional_income: Joi.number().required(),
  });
  const validate = dataValidation.validate(...req.body);
  console.log();
  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    dbConnect.query(
      `INSERT INTO loans (approx_price,deposit,additional_income) VALUES (
      ${req.body[0].approx_price},
      ${req.body[0].deposit},
      ${req.body[0].additional_income}
    )`,
      (error, result) => {
        if (error) {
          next({ error: { status: 500, detail: error } });
        } else {
          if (result.rowCount === 1) {
            next();
          } else
            next({ error: { status: 500, message: "Something is wrong!" } });
        }
      }
    );
  }
};

const updateLoan = async (req, res, next) => {
  const dataValidation = Joi.object().keys({
    approx_price: Joi.number().required(),
    deposit: Joi.number().required(),
    additional_income: Joi.number().required(),
  });

  const validate = dataValidation.validate(req.body);

  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    dbConnect.query(
      `UPDATE loans SET 
            approx_price = ${req.body.approx_price},
            deposit = ${req.body.deposit},
            additional_income = ${req.body.additional_income}
        WHERE id=${req.params.id}`,
      (error, result) => {
        if (error) {
          next({ error: { status: 500, detail: error } });
        } else {
          if (result.rowCount === 1) {
            next();
          } else
            next({
              error: {
                status: 500,
                message: "Data not found, something is wrong!",
              },
            });
        }
      }
    );
  }
};

module.exports = { createTable, getLoan, newLoan, updateLoan };
