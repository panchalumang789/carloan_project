const Joi = require("joi");
const incomeTable = require("../models/income");
const loanTable = require("../models/loan");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../config/errorCode");

// Validation Rules
const incomeValidation = Joi.object().keys({
  userId: Joi.number().required(),
  loanId: Joi.number().required(),
  additional_income: Joi.boolean().required(),
  rental_income: Joi.number().default(0),
  investment_income: Joi.number().default(0),
  salary_sacrifice: Joi.number().default(0),
  centralink_benifit: Joi.number().default(0),
  foreign_income: Joi.number().default(0),
});

/**
 * @return all income details
 */
const getIncome = async (req, res, next) => {
  try {
    const findIncome = await incomeTable.findAll();
    if (findIncome.length === 0) {
      next({
        error: { status: NOT_FOUND, message: "No income details found!" },
      });
    } else {
      res.locals.income = findIncome;
      next();
    }
  } catch (error) {
    next({ error: { status: NOT_FOUND, message: "No income details found!" } });
  }
};

/**
 * @param {*} req get income details from body
 * @param {*} res add new income details
 */
const addIncome = async (req, res, next) => {
  try {
    if (res.locals.role === "User") {
      req.body.userId = res.locals.user.id;
    }
    let { error } = incomeValidation.validate(req.body);
    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    }
    let findLoan = await loanTable.findOne({
      where: { id: req.body.loanId, userId: req.body.userId },
    });
    if (findLoan === null) {
      next({
        error: { status: SERVER_ERROR, message: "UserId or LoanId is wrong!" },
      });
    } else {
      const addIncome = await incomeTable.build(req.body).save();
      res.locals.income = addIncome;
      next();
    }
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error.errors } });
  }
};

const updateIncome = async (req, res, next) => {
  try {
    const { error } = incomeValidation.validate(req.body);
    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    }

    let updateIncome = await incomeTable.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    if (!updateIncome) {
      next({ error: { status: BAD_REQUEST, message: "Something is wrong!" } });
    }
    res.locals.income = "Income updated successfully.";
    next();
  } catch (error) {
    if (error.errors)
      next({
        error: { status: SERVER_ERROR, message: error.errors[0].message },
      });
    else next({ error: { status: SERVER_ERROR, message: error } });
  }
};

module.exports = {
  getIncome,
  addIncome,
  updateIncome,
};
