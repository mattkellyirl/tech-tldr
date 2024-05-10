const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Import Dependent Files
const routes = require("./routes");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");

// Create instance of express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup session configuration
const sess = {
  secret: "796f7520676f74206d65",
  cookie: {
    maxAge: 120000, // Session will expire after 2 minutes of inactivity
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Apply session middleware
app.use(session(sess));

// Create instance of handlebars with custom helpers
const hbs = exphbs.create({ helpers });

// Set Handlebars as view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from "public" directory

// Mount application routes
app.use(routes);

// Synchronize Sequelize with the database
sequelize.sync({ force: false }).then(() => {
  // Start HTTP Server
  app.listen(PORT, () => console.log("Now listening"));
});
