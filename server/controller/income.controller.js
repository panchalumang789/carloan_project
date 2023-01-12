const Joi = require("joi");
const incomeTable = require("../models/income");
const loanTable = require("../models/loan");

// Validation Rules
const incomeValidation = Joi.object().keys({
  userId: Joi.number().required(),
  loanId: Joi.number().required(),
  additional_income: Joi.number().min(0).default(0).required(),
  rental_income: Joi.number().min(0).default(0).required(),
  investment_income: Joi.number().min(0).default(0).required(),
  salary_secrifice: Joi.number().min(0).default(0).required(),
  centralink_benifit: Joi.number().min(0).default(0).required(),
  foreign_income: Joi.number().min(0).default(0).required(),
});

/**
 * @return all income details
 */
const getIncome = async (req, res, next) => {
  try {
    const findIncome = await incomeTable.findAll();
    if (findIncome.length === 0) {
      next({ error: { status: 404, message: "No income details found!" } });
    } else {
      res.locals.income = findIncome;
      next();
    }
  } catch (error) {
    next({ error: { status: 404, message: "No income details found!" } });
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
      next({ error: { status: 400, message: error.message } });
    }
    let findLoan = await loanTable.findOne({
      where: { id: req.body.loanId, userId: req.body.userId },
    });
    if (findLoan === null) {
      next({ error: { status: 500, message: "UserId or LoanId is wrong!" } });
    } else {
      const addIncome = await incomeTable.build(req.body).save();
      res.locals.income = addIncome;
      next();
    }
  } catch (error) {
    next({ error: { status: 500, message: error.errors } });
  }
};

module.exports = {
  getIncome,
  addIncome,
};
