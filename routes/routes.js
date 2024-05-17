const router = require("express").Router();
const dayjs = require("dayjs");
const { User, Post, Comment } = require("../models");

// Render Homepage
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User }],
    });

    res.render("index", {
      layout: "main",
      title: "Tech TL;DR - Home",
      posts: posts.map((post) => ({
        title: post.title,
        content: post.content,
        created_at: dayjs(post.created_at).format("dddd, MMMM DD YYYY"),
        username: post.user.username,
        post_id: post.id,
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

// Render Dashboard Page
router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard", {
      layout: "main",
      title: "Tech TL;DR - Dashboard",
    });
  } catch (err) {
    console.error("Error Rendering Dashboard Page:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Render Dashboard Page", details: err });
  }
});

// Render TL;DR Post
router.get("/post/:id", async (req, res) => {
  try {
    // Retrieve Post
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    // Retrieve Comments
    const postComments = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User, attributes: ["username"] }],
    });

    res.render("post", {
      layout: "main",
      title: "Tech TL;DR - Post",
      post: {
        title: post.title,
        content: post.content,
        created_at: dayjs(post.created_at).format("dddd, MMMM DD YYYY"),
        post_username: post.user.username,
        post_id: post.id,
      },
      comments: postComments.map((comment) => ({
        content: comment.content,
        created_at: dayjs(comment.created_at).format("dddd, MMMM DD YYYY"),
        comment_username: comment.user.username,
      })),
    });
  } catch (err) {
    console.error("Error Rendering Post:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Render Post", details: err });
  }
});

// Render Edit TL;DR Post
router.get("/post/:id/edit", async (req, res) => {
  try {
    res.render("edit-post", {
      layout: "main",
      title: "Tech TL;DR - Edit Post",
    });
  } catch (err) {
    console.error("Error Rendering Edit Post:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - Render Edit Post", details: err });
  }
});

// // Handle New User Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Create a new user in the database
//     const newUser = await User.create({ username, password });

//     // Log in the user by setting session variables
//     req.session.user_id = newUser.id;
//     req.session.logged_in = true;

//     // Redirect the user to the homepage
//     res.redirect("/");
//   } catch (err) {
//     console.error("Error Signing Up User:", err);
//     res.status(500).json({ error: "Error Signing Up User", details: err });
//   }
// });

module.exports = router;
