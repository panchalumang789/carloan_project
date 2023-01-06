const Joi = require("joi");
const userTable = require("../models/user");
const incomeTable = require("../models/income");
const expensesTable = require("../models/expenses");

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
const gender = ["Male", "Female", "Other"];
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
  gender: Joi.string()
    .required()
    .valid(...gender),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  state: Joi.string()
    .required()
    .valid(...states),
  medicalcardImage: Joi.string().required(),
  licenceFname: Joi.string().min(2).max(20).required(),
  licenceLname: Joi.string().min(2).max(20).required(),
  licenceNumber: Joi.string().required(),
  licenceType: Joi.string()
    .required()
    .valid(...licenceType),
  licenceExpireDate: Joi.string().required(),
  licenceIssueDate: Joi.string().required(),
  licenceBackImage: Joi.string().required(),
  licenceFrontImage: Joi.string().required(),
});

/**
 * @return all users details
 */
const getUser = async (req, res, next) => {
  userTable
    .findAll({
      order: ["id"],
    })
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "Users not found!" } });
      } else {
        res.locals.users = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "Users not found!" } });
    });
};

/**
 * @return users details by Id
 */
const getUserById = async (req, res, next) => {
  userTable
    .findOne({
      where: {
        id: req.params.id,
      },
      order: ["id"],
      include: [incomeTable, expensesTable],
    })
    .then((result) => {
      if (result.length === 0) {
        next({ error: { status: 404, message: "Users not found!" } });
      } else {
        res.locals.users = result;
        next();
      }
    })
    .catch(() => {
      next({ error: { status: 404, message: "Users not found!" } });
    });
};

/**
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const createUser = async (req, res, next) => {
  const validate = userValidation.validate(req.body);

  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    userTable
      .build(req.body)
      .save()
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
          message: `${firstName} ${lastName}  registered successfully.`,
          token: token,
        };
        next();
      })
      .catch((error) => {
        if (error.errors)
          next({ error: { status: 500, message: error.errors[0].message } });
        else next({ error: { status: 500, message: error.original.detail } });
      });
  }
};

/**
 * @param {*} req get user details from body
 * @param {*} res add new user details
 */
const updateUser = async (req, res, next) => {
  const validate = userValidation.validate(req.body);

  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
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
  userTable
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      if (result === 1) {
        next();
      } else {
        next({ error: { status: 400, message: "Invalid argument." } });
      }
    })
    .catch(() => {
      next({ error: { status: 400, message: "Invalid argument." } });
    });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
