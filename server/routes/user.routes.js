const router = require("express").Router();

const userRoutes = router;
const authorization = require("../middleware/authorization");
const userController = require("../controller/user.controller");

// @admin all users list
userRoutes.get(
  "/users",
  authorization.verifyRole,
  userController.getUser,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
);

// @admin user list by id
userRoutes.get(
  "/user/:id",
  authorization.verifyRole,
  userController.getUserById,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
);

// userRoutes.get(
//   "/user",
//   authorization.verifyUser,
//   userController.getUserByContact,
//   (req, res) => {
//     res.status(200).send(res.locals.users);
//   }
// );

userRoutes.post(
  "/user",
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
