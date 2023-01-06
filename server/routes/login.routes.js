const router = require("express").Router();

const authorization = require("../middleware/authorization");

// router.post("/login", authorization.sendOTP, async (req, res) => {
//   res.status(200).json({ message: `OTP ${res.locals.response}` });
// });

router.post("/verify", authorization.verifyOTP, async (req, res) => {
  res
    .status(200)
    .json({ message: `OTP ${res.locals.response}`, Token: res.locals.token });
});

router.post("/verifyUser", authorization.verifyToken, async (req, res) => {
  res.status(200).send(res.locals.user);
});

// router.post("/verifyUser", authorization.verifyUser, async (req, res) => {
//   res.status(200).send(res.locals.user);
// });

module.exports = router;
