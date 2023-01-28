const Joi = require("joi");
const expensesTable = require("../models/expenses");
const loanTable = require("../models/loan");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../config/errorCode");

// Validation Rules
const expensesValidation = Joi.object().keys({
  userId: Joi.number().required(),
  loanId: Joi.number().required(),
  vehicle_running_cost: Joi.number().default(null).optional(),
  travel_cost: Joi.number().default(null).optional(),
  utilities_cost: Joi.number().default(null).optional(),
  insurance: Joi.number().default(null).optional(),
  tel_internet: Joi.number().default(null).optional(),
  entertainment: Joi.number().default(null).optional(),
});

/**
 * @return all expenses data
 */
const getAllExpenses = async (req, res, next) => {
  try {
    const findExpenses = await expensesTable.findAll();
    if (findExpenses.length === 0) {
      next({
        error: { status: NOT_FOUND, message: "No expenses data found!" },
      });
    } else {
      res.locals.expenses = findExpenses;
      next();
    }
  } catch (error) {
    next({
      error: { status: SERVER_ERROR, message: "No expenses data found!" },
    });
  }
};

/**
 * @param {*} req get expenses data from body
 * @param {*} res add new expenses data
 */
const addExpenses = async (req, res, next) => {
  try {
    if (res.locals.role === "User") {
      req.body.userId = res.locals.user.id;
    }
    let { error } = expensesValidation.validate(req.body);
    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    }
    let findLoan = await loanTable.findOne({
      where: { id: req.body.loanId, userId: req.body.userId },
    });
    if (findLoan === null) {
      next({
        error: { status: BAD_REQUEST, message: "UserId or LoanId is wrong!" },
      });
    } else {
      const addExpenses = await expensesTable.build(req.body).save();
      res.locals.expenses = addExpenses;
      next();
    }
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error.errors } });
  }
};

const updateExpenses = async (req, res, next) => {
  try {
    const { error } = expensesValidation.validate(req.body);
    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    }

    let updateExpenses = await expensesTable.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    if (!updateExpenses) {
      next({ error: { status: BAD_REQUEST, message: "Something is wrong!" } });
    }
    res.locals.expenses = "Expenses updated successfully.";
    next();
  } catch (error) {
    if (error.errors)
      next({ error: { status: 500, message: error.errors[0].message } });
    else next({ error: { status: 500, message: error } });
  }
};

module.exports = {
  getAllExpenses,
  addExpenses,
  updateExpenses,
};
