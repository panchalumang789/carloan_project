const Joi = require("joi");
const loanTable = require("../models/loan");
const dbConnect = require("../config/db.connection");

/**
 *
 * @param {*} res get all loans details
 */
const getLoan = async (req, res, next) => {
  loanTable
    .findAll()
    .then((result) => {
      if (result.length === 0) {
        next({
          error: {
            status: 500,
            message: "No loan application found, something is wrong!",
          },
        });
      } else {
        res.locals.loans = result;
        next();
      }
    })
    .catch(() => {
      next({
        error: {
          status: 500,
          message: "No loan application found, something is wrong!",
        },
      });
    });
};

/**
 *
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const newLoan = async (req, res, next) => {
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

/**
 *
 * @param {*} req get loan new details from body
 * @param {*} res update loan details by id
 */
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

module.exports = { getLoan, newLoan, updateLoan };
