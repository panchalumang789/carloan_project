const Joi = require("joi");
const dbConnect = require("../config/db.connection");
const userTable = require("../models/user");

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

/**
 * create users table
 */
const createTable = (req, res, next) => {
  userTable
    .then((result) => {
      if (result.command !== "CREATE") {
        next({
          error: { status: 500, message: "Something is wrong!", error: result },
        });
      } else next();
    })
    .catch((error) => {
      next({
        error: { status: 500, message: "Something is wrong!", error: error },
      });
    });
};

const getUser = async (req, res, next) => {
  dbConnect.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      next({ error: { status: 404, message: "User table not found!" } });
    } else {
      console.log(result.rows[0].id);
      res.locals.users = result.rows;
      next();
    }
  });
};

const createUser = async (req, res, next) => {
  const userValidation = Joi.object().keys({
    status: Joi.string().required(),
    income: Joi.number().min(10000).required(),
    contactNo: Joi.string()
      .length(10)
      .pattern(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    firstName: Joi.string().min(2).max(15).required(),
    lastName: Joi.string().min(2).max(15).required(),
    gender: Joi.string().required().valid("Male", "Female", "Other"),
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
    licenceFname: Joi.string().min(2).max(15).required(),
    licenceLname: Joi.string().min(2).max(15).required(),
    licenceNumber: Joi.string().required(),
    licenceType: Joi.string()
      .required()
      .valid(...licenceType),
    licenceExpireDate: Joi.array()
      .items(Joi.string(), Joi.number().required())
      .required(),
    licenceIssueDate: Joi.array()
      .items(Joi.string(), Joi.number().required())
      .required(),
    licenceBackImage: Joi.string().required(),
    licenceFrontImage: Joi.string().required(),
  });

  const validate = userValidation.validate(req.body);
  if (validate.error) {
    next({ error: { status: 400, message: validate.error.message } });
  } else {
    dbConnect.query(
      `INSERT INTO users (status,income,contactNo,firstName,lastName,gender,email,state,medicalcardImage,licenceFname,licenceLname,licenceNumber,licenceType,licenceExpireDate,licenceIssueDate,licenceBackImage,licenceFrontImage) VALUES (
            '${req.body.status}',
            '${req.body.income}',
            '${req.body.contactNo}',
            '${req.body.firstName}',
            '${req.body.lastName}',
            '${req.body.gender}',
            '${req.body.email}',
            '${req.body.state}',
            '${req.body.medicalcardImage}',
            '${req.body.licenceFname}',
            '${req.body.licenceLname}',
            '${req.body.licenceNumber}',
            '${req.body.licenceType}',
            ARRAY [${req.body.licenceExpireDate}],
            ARRAY [${req.body.licenceIssueDate}],
            '${req.body.licenceBackImage}',
            '${req.body.licenceFrontImage}'
        ) ON CONFLICT(id) DO NOTHING`,
      (error, result) => {
        if (error) {
          if (error.detail) {
            next({ error: { status: 500, message: error.detail } });
          } else {
            next({ error: { status: 500, error: error } });
          }
        } else {
          if (result.rowCount === 1) {
            next();
          } else
            next({ error: { status: 500, message: "Something is wrong!" } });
        }
      }
    );
  }
};

/**
 *
 * @return delete user data by id
 */
const deleteUser = async (req, res, next) => {
  dbConnect.query(
    `DELETE FROM users WHERE id=${req.params.id}`,
    (error, result) => {
      if (error) {
        next({ error: { status: 400, message: "Invalid argument." } });
      } else {
        if (result.rowCount === 1) {
          next();
        } else {
          next({ error: { status: 400, message: "Invalid argument." } });
        }
      }
    }
  );
};

module.exports = { createTable, getUser, createUser, deleteUser };
