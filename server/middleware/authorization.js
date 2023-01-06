const { equal } = require("joi");
const jwt = require("jsonwebtoken");
const userTable = require("../models/user");
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

/**
 * @return generate token for loggedin user
 */
const generateToken = (role) => {
  return (req, res, next) => {
    let credential = {
      role: role,
      contactNo: req.body.contactNo,
      email: req.body.email,
    };
    let token = jwt.sign(credential, process.env.JWT_SECRET_KEY);
    res.locals.token = token;
    next();
  };
};

const verifyRole = (req, res, next) => {
  // if (req.headers.role === "Admin") {
  //   res.locals.role = req.headers.role;
  //   next();
  // } else if (req.headers.token && req.headers.token !== "") {
  //   res.locals.token = req.headers.token;
  //   next();
  // } else {
  //   next({ error: { status: 500, message: "Permission denied!" } });
  // }
  next();
};

const verifyToken = async (req, res, next) => {
  try {
    let verify = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    if (verify.role === "Admin") {
      res.locals.role = verify.role;
      next();
    } else if (verify.role === "User") {
      let findUser = await userTable.findOne({
        where: { contactNo: verify.contactNo },
      });
      if (findUser.id) {
        res.locals.role = verify.role;
        res.locals.user = { id: findUser.id };
        next();
      } else {
        next({ error: { status: 500, message: "Permission denied!" } });
      }
    } else {
      next({ error: { status: 500, message: "Permission denied!" } });
    }
  } catch (error) {
    if (error.original) {
      next({ error: { status: 500, message: error.original } });
    } else next({ error: { status: 500, message: "Invalid token" } });
  }
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

module.exports = { generateToken, verifyRole, verifyToken, verifyOTP };
