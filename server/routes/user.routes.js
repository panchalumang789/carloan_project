const router = require("express").Router();

const userRoutes = router;
const userMiddleware = require("../middleware/user.middleware");

userRoutes.get("/user", userMiddleware.getUser, (req, res) => {
  res.status(200).send(res.locals.users);
});

userRoutes.post("/user", userMiddleware.createUser, (req, res) => {
  res
    .status(200)
    .send(
      `${req.body.firstName} ${req.body.lastName} registered successfully.`
    );
});

userRoutes.delete("/user/:id", userMiddleware.deleteUser, (req, res) => {
  res.status(200).send(`User deleted successfully.`);
});

module.exports = userRoutes;
