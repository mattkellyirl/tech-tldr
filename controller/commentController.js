const { Comment } = require("../models");

module.exports = {
  // Create New Comment
  async newComment(req, res) {
    try {
      const commentData = await Comment.create({
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });

      console.log("New Comment Created:", commentData);

      return res
        .status(200)
        .json({ message: "Request Successful - New Comment", commentData });
    } catch (err) {
      console.error("Error Creating New Comment:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - New Comment", details: err });
    }
  },
};
