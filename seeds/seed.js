const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const posts = await Post.bulkCreate(postData, {
      returning: true,
    });

    console.log("Database seeded successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Error Seeding Database", err);
  }
};

seedDatabase();
