const router = require("express").Router();
const userAuthorization = require("../../utils/userAuthorization");
const {
  newComment,
  updateComment,
  deleteComment,
} = require("../../controller/commentController");

// Create New Comment
router.post("/", userAuthorization, newComment);

// Update Comment (not in use)
// router.put("/", userAuthorization, updateComment);

// Delete Comment (not in use)
// router.delete("/", userAuthorization, deleteComment);

module.exports = router;
