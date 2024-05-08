const router = require("express").Router();
const {
  newUser,
  loginUser,
  logoutUser,
} = require("../../controller/userController");

// Create New User
router.post("/signup", newUser);

// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout", logoutUser);

module.exports = router;
