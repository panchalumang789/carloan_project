const userTable = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    if (req.body.phone === "Umang") {
      next();
    } else {
      next({ error: { status: 500, message: "User does not exists!" } });
    }
  } catch (error) {
    next(error);
  }
};
