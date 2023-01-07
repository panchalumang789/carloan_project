const router = require("express").Router();

const authorization = require("../middleware/authorization");

router.post("/verify", authorization.verifyOTP, async (req, res) => {
  res
    .status(200)
    .json({ message: `OTP ${res.locals.response}`, Token: res.locals.token });
});

module.exports = router;
