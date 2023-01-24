const nodemailer = require("nodemailer");
const adminTable = require("../models/admin");
const fs = require("fs");
const { promisify } = require("util");
const loanTable = require("../models/loan");
const userTable = require("../models/user");
const readFile = promisify(fs.readFile);

const addAdmin = async (req, res, next) => {
  try {
    await adminTable.build(req.body).save();
    res.locals.admin = { message: "Admin added successfully." };
    next();
  } catch (error) {
    if (error.errors)
      next({ error: { status: 400, message: error.errors[0].message } });
    else next({ error: { status: 400, message: error.original.detail } });
  }
};

const adminLogin = async (req, res, next) => {
  try {
    let findAdmin = await adminTable.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (Object.keys(findAdmin).length <= 0) {
      next({ error: { status: 404, message: "Invalid email or password!" } });
    }
    res.locals.users = findAdmin.dataValues;
    next();
  } catch (error) {
    next({ error: { status: 404, message: "Invalid email or password!" } });
  }
};

const sendMail = async (req, res, next) => {
  let loanData = await loanTable.findOne({ where: { id: req.params.id } });
  let userData = await userTable.findOne({
    where: { id: loanData.userId },
  });
  res.locals.email = userData.email;

  let transporter = nodemailer.createTransport({
    port: 587,
    host: "mail.mailtest.radixweb.net",
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "testdotnet@mailtest.radixweb.net",
      pass: "Radix@web#8",
    },
  });
  var mailOptions = {
    from: "Carloan Project testdotnet@mailtest.radixweb.net",
    to: res.locals.email,
    subject: "CARLOAN Update mail for loan status",
    html: await readFile("mailtemp.html", "utf8"),
  };
  transporter.sendMail(mailOptions, (error, result) => {
    if (error) {
      next({ error: { status: 404, message: error.message } });
    } else {
      res.locals.mailStatus = "Mail sended successfully to customer.";
      next();
    }
  });
};

module.exports = { addAdmin, adminLogin, sendMail };
