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
    res
      .status(200)
      .json({ length: res.locals.length, users: res.locals.users });
  }
);

userRoutes.get(
  "/agents",
  authorization.verifyToken,
  userController.getAgents,
  (req, res) => {
    res.status(200).send(res.locals.agents);
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

// @return verify user token
userRoutes.get("/user/verify", authorization.verifyToken, (req, res) => {
  res.status(200).json({ user: res.locals.userDetail, role: res.locals.role });
});

// @return user role
userRoutes.get("/user/verify/role", authorization.getUserRole, (req, res) => {
  res.status(200).json({ role: res.locals.role });
});

// @admin user details by id
userRoutes.get(
  "/user/:id",
  authorization.verifyToken,
  userController.getUserById,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
);

/**
 * @returns register user
 */
userRoutes.post(
  "/user",
  authorization.generateToken("User"),
  userController.createUser,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
);

/**
 * @returns register agent
 */
userRoutes.post(
  "/agent",
  authorization.generateToken("Agent"),
  userController.createAgent,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
);

/**
 * @returns update user
 */
userRoutes.put("/user/:id", userController.updateUser, (req, res) => {
  res.status(200).send(res.locals.user);
});

/**
 * @returns delete user
 */
userRoutes.delete("/user/:id", userController.deleteUser, (req, res) => {
  res.status(200).send(`User deleted successfully.`);
});

/**
 * @returns admin login
 */
userRoutes.post("/admin", authorization.generateToken("Admin"), (req, res) => {
  res.status(200).send(res.locals.token);
});

/**
 * @returns loggedin user detail
 */
userRoutes.get("/user", authorization.verifyToken, (req, res) => {
  res.status(200).send(res.locals.user);
});

module.exports = userRoutes;
