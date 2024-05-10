const router = require("express").Router();
const userAuthorization = require("../../utils/userAuthorization");
const {
  newPost,
  updatePost,
  deletePost,
} = require("../../controller/postController");

// Create New Post
router.post("/", userAuthorization, newPost);

// Update Post
router.put("/:id", userAuthorization, updatePost);

// Delete Post
router.delete("/:id", userAuthorization, deletePost);

module.exports = router;
