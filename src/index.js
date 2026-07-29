const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

// Set EJS
app.set("view engine", "ejs");
app.use(express.static("public"))

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// Start server
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});