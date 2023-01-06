const Joi = require("joi");
const expensesTable = require("../models/expenses");
const loanTable = require("../models/loan");

// Validation Rules
const expensesValidation = Joi.object().keys({
  userId: Joi.number().required(),
  loanId: Joi.number().required(),
  vehicle_running_cost: Joi.number().default(null).optional(),
  travel_cost: Joi.number().default(null).optional(),
  utilities_cost: Joi.number().default(null).optional(),
  insurances: Joi.number().default(null).optional(),
  tel_internet: Joi.number().default(null).optional(),
  entertainment: Joi.number().default(null).optional(),
});

/**
 * @return all expenses data
 */
const getAllExpenses = async (req, res, next) => {
  expensesTable
    .findAll()
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "No expenses data found!" } });
      } else {
        res.locals.expenses = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "No expenses data found!" } });
    });
};

/**
 * @return expenses data by UserId
 */
const getUserExpenses = async (req, res, next) => {
  expensesTable
    .findAll({
      where: {
        userId: req.params.id,
      },
    })
    .then((result) => {
      if (result.length === 0) {
        next({
          error: {
            status: 404,
            message: "Something is wrong, expenses data not found!",
          },
        });
      } else {
        res.locals.expenses = result;
        next();
      }
    })
    .catch(() => {
      next({
        error: {
          status: 404,
          message: "Something is wrong, expenses data not found!",
        },
      });
    });
};

/**
 * @param {*} req get expenses data from body
 * @param {*} res add new expenses data
 */
const addExpenses = async (req, res, next) => {
  try {
    let validate = expensesValidation.validate(req.body);
    if (validate.error) {
      next({ error: { status: 400, message: validate.error.message } });
    }
    let findLoan = await loanTable.findOne({
      where: { id: req.body.loanId, userId: req.body.userId },
    });
    if (findLoan === null) {
      next({ error: { status: 500, message: "UserId or LoanId is wrong!" } });
    } else {
      const addExpenses = await expensesTable.build(req.body).save();
      res.locals.expenses = addExpenses;
      next();
    }
  } catch (error) {
    next({ error: { status: 500, message: error.errors[0].message } });
  }
};

module.exports = {
  getAllExpenses,
  getUserExpenses,
  addExpenses,
};
