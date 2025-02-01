// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();



// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;


// ℹ️ Connects to the database
require("./db");


// MIDDLEWARE IMPORT
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENT ROUTES
const studentRoutes = require("./routes/student.routes");
app.use("/api", studentRoutes);

// COHORT ROUTES
const cohortRoutes = require("./routes/cohort.routes");
app.use("/api", cohortRoutes);

// AUTH ROUTES
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// EXPORT APP TO USE IN SERVER
module.exports = app;