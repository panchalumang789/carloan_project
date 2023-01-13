const Joi = require("joi");
const userTable = require("../models/user");
const incomeTable = require("../models/income");
const jwt = require("jsonwebtoken");
const expensesTable = require("../models/expenses");
const loanTable = require("../models/loan");

const licenceType = ["LMV-NT", "HPMV", "HGMV"];
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
];
const prefix = ["Mr.", "Ms.", "Mrs."];

// Validation rules
const userValidation = Joi.object().keys({
  contactNo: Joi.string()
    .length(10)
    .pattern(/^[6-9]{1}[0-9]{9}$/)
    .required()
    .messages({ any: "Not a valid number." }),
  prefix: Joi.string()
    .required()
    .valid(...prefix),
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  state: Joi.string()
    .required()
    .valid(...states),
  medicalcardImage: Joi.string().default(null).optional(),
  licenseFirstName: Joi.string().min(2).max(20).required(),
  licenseLastName: Joi.string().min(2).max(20).required(),
  licenseIssueDate: Joi.string().required(),
  licenceNumber: Joi.string().required(),
  licenceType: Joi.string()
    .required()
    .valid(...licenceType),
  licenceExpireDate: Joi.string().required(),
  licenceIssueState: Joi.string()
    .required()
    .valid(...states),
  licenceBackImage: Joi.string().default(null).optional(),
  licenceFrontImage: Joi.string().default(null).optional(),
});

/**
 * @return all users details
 */
const getUser = async (req, res, next) => {
  try {
    let filter = "";
    if (res.locals.role === "User") {
      filter = {
        id: res.locals.user.id,
      };
    }
    let findUsers = await userTable.findAll({ where: filter, order: ["id"] });
    if (findUsers.length === 0) {
      next({ error: { status: 404, message: "Users not found!" } });
    } else {
      res.locals.users = findUsers;
      next();
    }
  } catch (error) {
    next({ error: { status: 404, message: "Users not found!" } });
  }
};

/**
 * @return users details by contact no
 */
const getUserByContactNo = async (req, res, next) => {
  try {
    let findUser = await userTable.findOne({
      where: { contactNo: req.params.contactNo },
    });
    if (Object.keys(findUser).length <= 0) {
      next({ error: { status: 404, message: "Users not found!" } });
    } else {
      res.locals.users = findUser;
      next();
    }
  } catch (error) {
    next({ error: { status: 404, message: "Users not found!" } });
  }
};

/**
 * @return users details by Id
 */
const getUserById = async (req, res, next) => {
  try {
    if (res.locals.role === "Admin") {
      let findUser = await userTable.findOne({
        where: { id: req.params.id },
        order: ["id"],
        include: [{ model: loanTable, include: [incomeTable, expensesTable] }],
      });
      if (Object.keys(findUser).length <= 0) {
        next({ error: { status: 404, message: "Users not found!" } });
      } else {
        res.locals.users = findUser;
        next();
      }
    } else {
      next({ error: { status: 401, message: "Permission denied!" } });
    }
  } catch (error) {
    next({ error: { status: 404, message: "Users not found!" } });
  }
};

/**
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const createUser = async (req, res, next) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      next({ error: { status: 400, message: error.message } });
    }
    let addUser = await userTable.build(req.body).save();
    if (req.params.loanid && req.params.loanid !== "") {
      await loanTable.update(
        { userId: addUser.id },
        { where: { id: req.params.loanid } }
      );
    }
    res.locals.user = {
      message: `${req.body.firstName} ${req.body.lastName} registered successfully.`,
      token: res.locals.token,
    };
    next();
  } catch (error) {
    if (error.errors)
      next({ error: { status: 500, message: error.errors[0].message } });
    else next({ error: { status: 500, message: error.original.detail } });
  }
};

/**
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const updateUser = async (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    next({ error: { status: 400, message: error.message } });
  } else {
    userTable
      .count({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result === 0) {
          next({ error: { status: 500, message: "User not found." } });
        } else {
          userTable
            .update(
              { ...req.body },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
            .then((result) => {
              let token = jwt.sign(
                {
                  contactNo: result.contactNo,
                  firstName: result.firstName,
                  lastName: result.lastName,
                  email: result.email,
                },
                process.env.JWT_SECRET_KEY
              );
              res.locals.user = {
                message: `${firstName} ${lastName}  updated successfully.`,
                token: token,
              };
              next();
            })
            .catch((error) => {
              if (error.errors)
                next({
                  error: { status: 500, message: error.errors[0].message },
                });
              else next({ error: { status: 500, message: error } });
            });
        }
      });
  }
};

/**
 * @param {*} res delete user data by id
 */
const deleteUser = async (req, res, next) => {
  try {
    let deleteUser = userTable.destroy({ where: { id: req.params.id } });
    if (deleteUser === 1) {
      next();
    } else {
      next({ error: { status: 400, message: "Invalid argument." } });
    }
  } catch (error) {
    next({ error: { status: 400, message: "Invalid argument." } });
  }
};

module.exports = {
  states,
  getUser,
  getUserById,
  getUserByContactNo,
  createUser,
  updateUser,
  deleteUser,
};
