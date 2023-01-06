const Joi = require("joi");
const incomeTable = require("../models/income");

// Validation Rules
const incomeValidation = Joi.object().keys({
  userId: Joi.number().required(),
  loanId: Joi.number().required(),
  additional_income: Joi.number().min(0).default(0).required(),
  rental_income: Joi.number().min(0).default(0).required(),
  investment_income: Joi.number().min(0).default(0).required(),
  salary_secrifice: Joi.number().min(0).default(0).required(),
  foreign_income: Joi.number().min(0).default(0).required(),
});

/**
 * @return all income details
 */
const getIncome = async (req, res, next) => {
  incomeTable
    .findAll()
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "No income details found!" } });
      } else {
        res.locals.income = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "No income details found!" } });
    });
};

/**
 * @return income details by UserId
 */
const getUserIncome = async (req, res, next) => {
  incomeTable
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
            message: "Something is wrong, income details not found!",
          },
        });
      } else {
        res.locals.income = result;
        next();
      }
    })
    .catch(() => {
      next({
        error: {
          status: 404,
          message: "Something is wrong, income details not found!",
        },
      });
    });
};

/**
 * @param {*} req get income details from body
 * @param {*} res add new income details
 */
const addIncome = async (req, res, next) => {
  const validate = incomeValidation.validate(req.body);

  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    incomeTable
      .build(req.body)
      .save()
      .then(() => {
        next();
      })
      .catch((error) => {
        if (error.errors)
          next({ error: { status: 500, message: error.errors[0].message } });
        else next({ error: { status: 500, message: error.original.detail } });
      });
  }
};

module.exports = {
  getIncome,
  getUserIncome,
  addIncome,
};
