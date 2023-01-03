const router = require("express").Router();

const userRoutes = router;
const userController = require("../controller/user.controller");

userRoutes.get("/user", userController.getUser, (req, res) => {
  res.status(200).send(res.locals.users);
});

userRoutes.post("/user", userController.createUser, (req, res) => {
  res
    .status(200)
    .send(
      `${req.body.firstName} ${req.body.lastName} registered successfully.`
    );
});

userRoutes.delete("/user/:id", userController.deleteUser, (req, res) => {
  res.status(200).send(`User deleted successfully.`);
});

module.exports = userRoutes;
