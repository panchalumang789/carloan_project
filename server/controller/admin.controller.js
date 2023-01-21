const jwt = require("jsonwebtoken");
const adminTable = require("../models/admin");

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
      next({ error: { status: 404, message: "Invalid email password!" } });
    }
    res.locals.users = findAdmin.dataValues;
    next();
  } catch (error) {
    next({ error: { status: 404, message: "Invalid email password!" } });
  }
};

module.exports = { addAdmin, adminLogin };
