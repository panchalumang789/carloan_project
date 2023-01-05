const Joi = require("joi");
const loanTable = require("../models/loan");
const incomeTable = require("../models/income");
const expensesTable = require("../models/expenses");
const carTable = require("../models/car");
const userTable = require("../models/user");

// Validation Rules
const dataValidation = Joi.object().keys({
  carId: Joi.number().required(),
  approx_price: Joi.number().min(0).required(),
  deposit: Joi.number().min(0).required(),
  term: Joi.number().min(0).max(10).required(),
  ballon: Joi.number().min(0).max(35).default(0),
  user_status: Joi.string().required(),
  user_income: Joi.number().min(10000).required(),
  contactNo: Joi.string()
    .length(10)
    .pattern(/^[6-9]{1}[0-9]{9}$/)
    .required()
    .messages({ any: "Not a valid number." }),
  agentId: Joi.number().optional(),
});

/**
 * @return all loans details
 */
const getLoan = async (req, res, next) => {
  loanTable
    .findAll({
      order: ["id"],
    })
    .then((result) => {
      if (result.length === 0) {
        next({
          error: {
            status: 500,
            message: "Something is wrong, loan application not found!",
          },
        });
      } else {
        res.locals.loans = result;
        next();
      }
    })
    .catch((error) => {
      next({
        error: {
          status: 500,
          message: "Something is wrong, loan application not found!",
        },
      });
    });
};

/**
 * @return loan details by LoanId
 */
const getLoanById = async (req, res, next) => {
  loanTable
    .findOne({
      order: ["id"],
      where: {
        id: req.params.id,
      },
      include: [incomeTable, expensesTable],
    })
    .then((result) => {
      if (result === null) {
        next({
          error: {
            status: 500,
            message: "Something is wrong, loan application not found!",
          },
        });
      } else {
        carTable
          .findOne({
            where: {
              id: result.carId,
            },
          })
          .then((carresult) => {
            if (carresult.length === 0) {
              next({ error: { status: 500, message: "Something is wrong!" } });
            } else {
              result.dataValues.carImage = carresult.dataValues.image;
              res.locals.loans = result;
              next();
            }
          })
          .catch(() => {
            next({ error: { status: 500, message: "Something is wrong!" } });
          });
      }
    })
    .catch((error) => {
      next({
        error: {
          status: 500,
          message: "Something is wrong, loan application not found!",
        },
      });
    });
};

/**
 * @return loan details by ContacNo
 */
const getLoanByContactNo = async (req, res, next) => {
  loanTable
    .findAll({
      order: ["id"],
      where: {
        contactNo: res.locals.contactNo,
      },
      include: [incomeTable, expensesTable],
    })
    .then((result) => {
      if (result.length <= 0) {
        next({
          error: {
            status: 500,
            message: "Something is wrong, loan application not found!",
          },
        });
      } else {
        carTable
          .findOne({
            where: {
              id: result.carId,
            },
          })
          .then((carresult) => {
            if (carresult.length === 0) {
              next({ error: { status: 500, message: "Something is wrong!" } });
            } else {
              result.dataValues.carImage = carresult.dataValues.image;
              res.locals.loans = result;
              next();
            }
          })
          .catch(() => {
            next({ error: { status: 500, message: "Something is wrong!" } });
          });
      }
    })
    .catch((error) => {
      next({
        error: {
          status: 500,
          message: "Something is wrong, loan application not found!",
        },
      });
    });
};

/**
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const newLoan = async (req, res, next) => {
  const validate = dataValidation.validate(req.body);
  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    userTable
      .findOne({
        where: {
          contactNo: req.body.contactNo,
        },
      })
      .then((result) => {
        if (result) {
          loanTable
            .build(req.body)
            .save()
            .then(() => {
              next();
            })
            .catch((error) => {
              if (error.errors)
                next({
                  error: { status: 500, message: error.errors[0].message },
                });
              else
                next({
                  error: { status: 500, message: error.original.detail },
                });
            });
        } else {
          userTable
            .build(req.body)
            .save()
            .then(() => {
              loanTable
                .build(req.body)
                .save()
                .then(() => {
                  next();
                })
                .catch((error) => {
                  if (error.errors)
                    next({
                      error: { status: 500, message: error.errors[0].message },
                    });
                  else
                    next({
                      error: { status: 500, message: error.original.detail },
                    });
                });
            })
            .catch((error) => {
              if (error.errors)
                next({
                  error: { status: 500, message: error.errors[0].message },
                });
              else
                next({
                  error: { status: 500, message: error.original.detail },
                });
            });
        }
      })
      .catch((error) => {
        if (error.errors)
          next({ error: { status: 500, message: error.errors[0].message } });
        else next({ error: { status: 500, message: error.original.detail } });
      });

    // loanTable
    //   .build(req.body)
    //   .save()
    //   .then(() => {
    //     next();
    //   })
    //   .catch((error) => {
    //     if (error.errors)
    //       next({ error: { status: 500, message: error.errors[0].message } });
    //     else next({ error: { status: 500, message: error.original.detail } });
    //   });
  }
};

/**
 * @param {*} req get loan new details from body
 * @param {*} res update loan details by id
 */
const updateLoan = async (req, res, next) => {
  const validate = dataValidation.validate(req.body);

  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    loanTable
      .update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
        }
      )
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
  getLoan,
  getLoanByContactNo,
  getLoanById,
  newLoan,
  updateLoan,
};
