const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  // Create New User
  async newUser(req, res) {
    try {
      const newUserData = await User.create(req.body);

      // Initialize session
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;

      console.log("New User Created:", newUserData);
      console.log("New User Logged In:", newUserData);

      return res
        .status(200)
        .json({ message: "Request Successful - New User", newUserData });
    } catch (err) {
      console.error("Error Creating New User:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - New User", details: err });
    }
  },

  // Login New User
  async loginUser(req, res) {
    try {
      // Find user by username
      const userData = await User.findOne({
        where: { username: req.body.username },
      });

      // If user does not exist, return 404 error
      if (!userData) {
        return res.status(404).json({ message: "User Not Found" });
      } else {
        // Compare encrypted password
        const validPassword = await bcrypt.compare(
          req.body.password,
          userData.password
        );

        // If passwords match, user is logged in
        if (validPassword) {
          // Initialize session
          req.session.user_id = userData.id;
          req.session.logged_in = true;

          console.log("User Logged In:", userData);
          return res
            .status(200)
            .json({ message: "Request Successful - User Logged In", userData });
        } else {
          // If passwords don't match, return 401 error
          return res.status(401).json({ message: "Invalid User Credentials" });
        }
      }
    } catch (err) {
      console.error("Error Logging In User:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - Logging In User", details: err });
    }
  },

  // Logout User
  async logoutUser(req, res) {
    try {
      if (req.session.logged_in) {
        req.session.destroy(() => {
          res
            .status(200)
            .json({ message: "Request Successful - User Logged Out" });
        });
      } else {
        return res
          .status(401)
          .json({ error: "User Is Not Logged In", details: err });
      }
    } catch (err) {
      console.error("Error Logging Out User:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - Logging Out User", details: err });
    }
  },
};
