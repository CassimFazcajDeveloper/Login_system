const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config")

const app = express();

// Set EJS
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.json())
app.use((express.urlencoded({extended: false})))

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});


app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
      name: req.body.username,
      password: hashedPassword,
    };

    const userData = await collection.insertMany(data);

    console.log(userData);

    res.send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

// Start server
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});