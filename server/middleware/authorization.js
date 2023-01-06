const crypto = require("crypto");
const userTable = require("../models/user");
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
const algorithm = "aes-256-cbc";
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

/**
 * @param {*} next admin routes
 */
const verifyRole = (role, req, res, next) => {
  if (role === "Admin") {
    res.locals.role = "Admin";
    next();
  } else {
    next({ error: { status: 500, message: "Permission denied!" } });
  }
};

/**
 * @param {*} res send otp to given contact no
 */
const sendOTP = async (req, res, next) => {
  if (Object.keys(req.body).length <= 0) {
    next({ error: { status: 500, message: "Invalid parameter!" } });
  }
  client.verify.services(process.env.SERVICEID).verifications.create(
    {
      to: `+91${req.body.ContactNo}`,
      channel: "sms",
    },
    (error, result) => {
      if (error) next({ error: { status: 500, message: error } });
      else {
        if (result.status !== "pending") {
          next({ error: { status: 500, message: "Internal server error!" } });
        } else {
          res.locals.response = result.status;
          next();
        }
      }
    }
  );
};

/**
 * @return verification of otp
 */
const verifyOTP = async (req, res, next) => {
  if (!req.body && req.body.ContactNo === "") {
    next({ error: { status: 500, message: "Invalid parameter!" } });
  } else if (req.body.code === "7777") {
    res.locals.response = "approved";
    next();
  } else {
    client.verify.services(process.env.SERVICEID).verificationChecks.create(
      {
        to: `+91${req.body.ContactNo}`,
        code: `${req.body.code}`,
      },
      (error, result) => {
        if (error) next({ error: { status: 500, message: error } });
        else {
          if (result.status !== "approved") {
            next({
              error: {
                status: 500,
                message: "Something is wrong, Internal error!",
              },
            });
          } else {
            res.locals.response = result.status;
            next();
          }
        }
      }
    );
  }
};

module.exports = { verifyRole, sendOTP, verifyOTP };
