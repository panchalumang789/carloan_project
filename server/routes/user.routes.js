const router = require("express").Router();

const userRoutes = router;
const authorization = require("../middleware/authorization");
const userController = require("../controller/user.controller");

// get all states
userRoutes.get("/states", (req, res) => {
  res.send(userController.states);
});

// @admin all users list
userRoutes.get(
  "/users",
  authorization.verifyToken,
  userController.getUser,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
);

// get user by contact no
userRoutes.get(
  "/user/mobile/:contactNo",
  userController.getUserByContactNo,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
);

// @admin user details by id
userRoutes.get(
  "/user/:id",
  authorization.verifyToken,
  userController.getUserById,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
);

userRoutes.post(
  "/user/:loanid",
  authorization.generateToken("User"),
  userController.createUser,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
);

userRoutes.put("/user/:id", userController.updateUser, (req, res) => {
  res.status(200).send(res.locals.user);
});

userRoutes.delete("/user/:id", userController.deleteUser, (req, res) => {
  res.status(200).send(`User deleted successfully.`);
});

userRoutes.post("/admin", authorization.generateToken("Admin"), (req, res) => {
  res.status(200).send(res.locals.token);
});

module.exports = userRoutes;
