const { Post } = require("../models");

module.exports = {
  // Create New Post
  async newPost(req, res) {
    try {
      const postData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });

      console.log("Request Body: ", req.body);

      console.log("New Post Created:", postData);

      return res
        .status(200)
        .json({ message: "Request Successful - New Post", postData });
    } catch (err) {
      console.error("Error Creating New Post:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - New Post", details: err });
    }
  },

  // Update Post
  async updatePost(req, res) {
    try {
      // Find post by ID
      const post = await Post.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
      });

      // If post does not exist, return 404 error
      if (!post) {
        return res.status(404).json({ message: "Post Not Found" });
      } else {
        // If post exists, update it
        const newPostData = await Post.update(
          {
            title: req.body.title,
            content: req.body.content,
          },
          { where: { id: req.params.id } }
        );

        console.log("Post Updated:", newPostData);

        return res
          .status(200)
          .json({ message: "Request Successful - Update Post", newPostData });
      }
    } catch (err) {
      console.error("Error Updating Post:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - Update Post", details: err });
    }
  },

  // Delete Post
  async deletePost(req, res) {
    try {
      // Find post by ID
      const post = await Post.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
      });

      // If post does not exist, return 404 error
      if (!post) {
        return res.status(404).json({ message: "Post Not Found" });
      } else {
        // If post exists, delete it
        const deletePost = await Post.destroy({
          where: { id: req.params.id, user_id: req.session.user_id },
        });

        console.log("Post Deleted:", deletePost);

        return res
          .status(200)
          .json({ message: "Request Successful - Delete Post", deletePost });
      }
    } catch (err) {
      console.error("Error Deleting Post:", err);
      return res
        .status(500)
        .json({ error: "Request Failed - Delete Post", details: err });
    }
  },
};
