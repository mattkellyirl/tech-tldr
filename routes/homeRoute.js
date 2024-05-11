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

    res.render("index", {
      layout: "main",
      title: "Tech TL;DR - Home",
      posts: posts.map((post) => ({
        title: post.title,
        content: post.content,
        created_at: dayjs(post.created_at).format("dddd, MMMM DD YYYY"),
        username: post.user.username,
      })),
    });
  } catch (err) {
    console.error("Error Rendering Home Page:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Render Home Page", details: err });
  }
});

// Render Login Page
router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      layout: "main",
      title: "Tech TL;DR - Login",
    });
  } catch (err) {
    console.error("Error Rendering Login Page:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Render Login Page", details: err });
  }
});

// Render Signup Page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {
      layout: "main",
      title: "Tech TL;DR - Signup",
    });
  } catch (err) {
    console.error("Error Rendering Signup Page:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Render Signup Page", details: err });
  }
});

module.exports = router;
