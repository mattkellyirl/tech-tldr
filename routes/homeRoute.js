const router = require("express").Router();
const dayjs = require("dayjs");
const { User, Post, Comment } = require("../models");

// Render Homepage
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
      },
    });

    res.render("home", {
      title: "Tech TL;DR",
      posts: posts.map((post) => ({
        title: post.title,
        content: post.content,
        created_at: dayjs(post.created_at).format("dddd, MMMM DD YYYY"),
        username: post.user.username,
      })),
    });
  } catch (err) {
    console.error("Error Finding Posts:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Find All Posts", details: err });
  }
});

module.exports = router;
