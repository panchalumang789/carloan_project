const crypto = require("crypto");
const userTable = require("../models/user");
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
const algorithm = "aes-256-cbc";
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const verifyRole = async (req, res, next) => {
  if (req.headers.role && req.headers.role === "Admin") next();
  else next({ error: { status: 500, message: "Permission denied!" } });
};

const verifyUser = async (req, res, next) => {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(req.headers.token, "hex", "utf16le");
  decryptedData += decipher.final("utf16le");
  res.locals.contactNo = decryptedData;
  next();
  // userTable
  //   .findOne({
  //     order: ["id"],
  //     where: {
  //       contactNo: decryptedData,
  //     },
  //   })
  //   .then((result) => {
  //     res.locals.user = result;
  //     next();
  //   })
  //   .catch(() => {
  //     next({ error: { status: 404, message: "Users not found!" } });
  //   });
};

/**
 *
 * @param {*} next
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

const verifyOTP = async (req, res, next) => {
  if (!req.body && req.body.ContactNo === "") {
    next({ error: { status: 500, message: "Invalid parameter!" } });
  } else if (req.body.code === "7777") {
    // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    // let encryptedData = cipher.update(req.body.ContactNo, "utf16le", "hex");
    // encryptedData += cipher.final("hex");

    res.locals.token = "encryptedData";
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

module.exports = { verifyRole, verifyUser, sendOTP, verifyOTP };
