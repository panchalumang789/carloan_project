const router = require("express").Router();

const authorization = require("../middleware/authorization");
const userController = require("../controller/user.controller");
const adminController = require("../controller/admin.controller");

router.post("/login", authorization.sendOTP, async (req, res) => {
  res.status(200).json({
    message: res.locals.response,
    verification: res.locals.verification,
  });
});

router.post("/verify", authorization.verifyOTP, async (req, res) => {
  res
    .status(200)
    .json({ message: res.locals.response, token: res.locals.token });
});

router.post(
  "/verifyUser",
  userController.getUserByContactNo,
  authorization.generateToken("User"),
  async (req, res) => {
    res
      .status(200)
      .json({ message: res.locals.token, user: res.locals.userName });
  }
);

router.post("/admin/add", adminController.addAdmin, async (req, res) => {
  res.status(200).json(res.locals.admin);
});

router.post(
  "/admin",
  adminController.adminLogin,
  authorization.generateToken("Admin"),
  async (req, res) => {
    res
      .status(200)
      .json({ message: res.locals.token, user: res.locals.userName });
  }
);

module.exports = router;
