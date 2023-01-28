const Joi = require("joi");
const jwt = require("jsonwebtoken");
const loanTable = require("../models/loan");
const incomeTable = require("../models/income");
const expensesTable = require("../models/expenses");
const carTable = require("../models/car");
const userTable = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../config/errorCode");

const userStatus = ["Employee", "Unemployed"];
const loanStatus = ["In progress", "In review", "Approved", "Rejected"];

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
  status: Joi.string()
    .valid(...loanStatus)
    .optional(),
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
          status: NOT_FOUND,
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
        status: SERVER_ERROR,
        message: "Something is wrong, loan application not found!",
      },
    });
  }
};

/**
 * @return all loans details with pagination
 */
const getLoanByStatus = async (req, res, next) => {
  try {
    let filter = "";
    if (res.locals.role === "User") {
      filter = {
        userId: res.locals.user.id,
        status: req.query.status,
      };
    } else {
      filter = {
        status: req.query.status,
      };
    }
    let allLoans = await loanTable.findAll({
      where: filter,
    });
    res.locals.length = allLoans.length;
    let loanData = await loanTable.findAll({
      where: filter,
      order: ["id"],
      limit: req.query.limit,
      offset: req.query.limit * parseInt(req.query.offset - 1),
    });
    if (loanData.length === 0) {
      next({
        error: {
          status: NOT_FOUND,
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
        status: SERVER_ERROR,
        message: "Something is wrong, loan application not found!",
      },
    });
  }
};

const getLoanByUserId = async (req, res, next) => {
  try {
    if (res.locals.role !== "Admin") {
      next({
        error: {
          status: BAD_REQUEST,
          message: "Something is wrong, loan application not found!",
        },
      });
    }
    let loanFind = await loanTable.findAll({
      where: { userId: req.params.id, status: req.query.status },
    });
    if (loanFind.length <= 0) {
      next({
        error: {
          status: NOT_FOUND,
          message: "Something is wrong, loan application not found!",
        },
      });
    }
    res.locals.loans = loanFind;
    next();
  } catch (error) {
    next({
      error: {
        status: SERVER_ERROR,
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
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: expensesTable,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (loanFind !== null) {
      let carFind = await carTable.findOne({
        where: { id: loanFind.carId },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      });
      if (carFind.length <= 0) {
        next({ error: { status: 500, message: "Something is wrong!" } });
      }
      let UserFind = await userTable.findOne({
        where: { id: loanFind.userId },
        attributes: {
          exclude: ["id"],
        },
      });
      loanFind.dataValues.carDetails = carFind;
      loanFind.dataValues.userDetails = UserFind;
      res.locals.loans = loanFind;
      next();
    } else {
      next({
        error: {
          status: BAD_REQUEST,
          message: "Something is wrong, loan application not found!",
        },
      });
    }
  } catch (error) {
    if (error.original) {
      next({ error: { status: SERVER_ERROR, message: error.original } });
    } else next({ error: { status: SERVER_ERROR, message: "Invalid token" } });
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
      next({ error: { status: BAD_REQUEST, message: error.message } });
    }
    let addLoan = await loanTable.build(req.body).save();
    res.locals.loanId = addLoan.id;
    next();
  } catch (error) {
    if (error.errors)
      next({
        error: { status: SERVER_ERROR, message: error.errors[0].message },
      });
    else next({ error: { status: SERVER_ERROR, message: error } });
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

/**
 * @param {*} req get loan new details from body
 * @param {*} res update loan details by id
 */
const updateLoanStatus = async (req, res, next) => {
  try {
    if (res.locals.role === "Admin") {
      await loanTable.update(
        { status: req.body.status },
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
  } catch (error) {
    if (error.errors)
      next({ error: { status: 500, message: error.errors[0].message } });
    else next({ error: { status: 500, message: error } });
  }
};

module.exports = {
  getLoan,
  getLoanByStatus,
  getLoanByUserId,
  getLoanById,
  newLoan,
  updateLoan,
  updateLoanStatus,
};
