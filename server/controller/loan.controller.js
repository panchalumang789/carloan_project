const Joi = require("joi");
const jwt = require("jsonwebtoken");
const loanTable = require("../models/loan");
const incomeTable = require("../models/income");
const expensesTable = require("../models/expenses");
const carTable = require("../models/car");
const userTable = require("../models/user");

const userStatus = ["Employee", "Unemployed"];

// Validation Rules
const dataValidation = Joi.object().keys({
  carId: Joi.number().required(),
  userId: Joi.number().default(null).optional(),
  approx_price: Joi.number().min(0).required(),
  deposit: Joi.number().min(0).required(),
  term: Joi.number().min(0).max(10).required(),
  balloon: Joi.number().min(0).max(35).default(0),
  user_status: Joi.string()
    .required()
    .valid(...userStatus),
  user_income: Joi.number().min(10000).required(),
  agentId: Joi.number().optional().default(null),
  status: Joi.string().optional().default(null),
});

/**
 * @return all loans details
 */
const getLoan = async (req, res, next) => {
  try {
    let filter = "";
    if (res.locals.role === "User") {
      filter = {
        userId: res.locals.user.id,
      };
    }
    let loanData = await loanTable.findAll({ where: filter, order: ["id"] });
    if (loanData.length === 0) {
      next({
        error: {
          status: 500,
          message: "Something is wrong, loan application not found!",
        },
      });
    } else {
      res.locals.loans = loanData;
      next();
    }
  } catch (error) {
    next({
      error: {
        status: 500,
        message: "Something is wrong, loan application not found!",
      },
    });
  }
};

/**
 * @return loan details by LoanId
 */
const getLoanById = async (req, res, next) => {
  try {
    let filter = { id: parseInt(req.params.id) };
    if (res.locals.role === "User") {
      filter = {
        id: parseInt(req.params.id),
        userId: parseInt(res.locals.user.id),
      };
    }
    let loanFind = await loanTable.findOne({
      order: ["id"],
      where: filter,
      include: [
        {
          model: incomeTable,
          attributes: {
            exclude: ["userId", "loanId", "createdAt", "updatedAt"],
          },
        },
        {
          model: expensesTable,
          attributes: {
            exclude: ["userId", "loanId", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (loanFind !== null) {
      let carFind = await carTable.findOne({ where: { id: loanFind.carId } });
      if (carFind.length !== 0) {
        loanFind.dataValues.carMaker = carFind.dataValues.make;
        loanFind.dataValues.carModel = carFind.dataValues.model;
        loanFind.dataValues.carModel_type = carFind.dataValues.model_type;
        loanFind.dataValues.carImage = carFind.dataValues.image;
        res.locals.loans = loanFind;
        next();
      } else {
        next({ error: { status: 500, message: "Something is wrong!" } });
      }
    } else {
      next({
        error: {
          status: 500,
          message: "Something is wrong, loan application not found!",
        },
      });
    }
  } catch (error) {
    if (error.original) {
      next({ error: { status: 500, message: error.original } });
    } else next({ error: { status: 500, message: "Invalid token" } });
  }
};

/**
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const newLoan = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let verify = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY
      );
      let findUser = await userTable.findOne({
        where: { contactNo: verify.contactNo },
      });
      req.body.userId = findUser.id;
    }
    let { error } = dataValidation.validate(req.body);
    if (error) {
      next({ error: { status: 400, message: error.message } });
    }
    let addLoan = await loanTable.build(req.body).save();
    res.locals.loanId = addLoan.id;
    next();
  } catch (error) {
    if (error.errors)
      next({ error: { status: 500, message: error.errors[0].message } });
    else next({ error: { status: 500, message: error } });
  }
};

/**
 * @param {*} req get loan new details from body
 * @param {*} res update loan details by id
 */
const updateLoan = async (req, res, next) => {
  try {
    let validate = dataValidation.validate(req.body);
    if (validate.error) {
      next({ error: { status: 400, message: validate.error.message } });
    }
    if (res.locals.role === "Admin") {
      await loanTable.update({ ...req.body }, { where: { id: req.params.id } });
      next();
    } else if (res.locals.role === "User") {
      let findLoan = await loanTable.findOne({ where: { id: req.params.id } });
      if (res.locals.user.id === findLoan.userId) {
        await loanTable.update(
          { ...req.body },
          { where: { id: req.params.id } }
        );
        next();
      } else {
        next({
          error: {
            status: 400,
            message: "Unothorized request!",
          },
        });
      }
    } else {
      next({
        error: {
          status: 500,
          message: "Something is wrong, loan application not found!",
        },
      });
    }
  } catch (error) {
    if (error.errors)
      next({ error: { status: 500, message: error.errors[0].message } });
    else next({ error: { status: 500, message: error } });
  }
};

module.exports = {
  getLoan,
  getLoanById,
  newLoan,
  updateLoan,
};
