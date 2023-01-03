const Joi = require("joi");
const incomeTable = require("../models/income");

/**
 *
 * @param {*} req get income details from body
 * @param {*} res add new income details
 */
const addIncome = async (req, res, next) => {
  const incomeValidation = Joi.object().keys({
    additional_income: Joi.number().min(0).default(0),
    rental_income: Joi.number().min(0).default(0),
    investment_income: Joi.number().min(0).default(0),
    salary_secrifice: Joi.number().min(0).default(0),
    foreign_income: Joi.number().min(0).default(0),
  });

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
        else next({ error: { status: 500, message: error } });
      });
  }
};

module.exports = { addIncome };
