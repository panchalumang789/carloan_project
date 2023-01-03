const Joi = require("joi");
const expensesTable = require("../models/expenses");

/**
 *
 * @param {*} req get expenses data from body
 * @param {*} res add new expenses data
 */
const addExpenses = async (req, res, next) => {
  const expensesValidation = Joi.object().keys({
    vehicle_running_cost: Joi.number().default(null).optional(),
    travel_cost: Joi.number().default(null).optional(),
    utilities_cost: Joi.number().default(null).optional(),
    insurances: Joi.number().default(null).optional(),
    tel_internet: Joi.number().default(null).optional(),
    entertainment: Joi.number().default(null).optional(),
  });

  const validate = expensesValidation.validate(req.body);

  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    expensesTable
      .build(req.body)
      .save()
      .then(() => {
        next();
      })
      .catch((error) => {
        if (error.errors)
          next({ error: { status: 500, message: error.errors[0].message } });
        else next({ error: { status: 500, message: error } });
      });
  }
};

module.exports = { addExpenses };
