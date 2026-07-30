const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// Set EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// methods for posting data into database
app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
      name: req.body.username,
      password: hashedPassword,
    };

    const existinguser = await collection.findOne({ name: data.name });
    if (existinguser) {
      res.send("user alredy exits");
    } else {
      // send data to databse collection
      const userData = await collection.insertMany(data);
      res.send("User registered successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("user cannot be found");
    }
    // compare the pasword from that of databse encrypted
    const ispasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password,
    );
    if (ispasswordMatch) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrongndetails");
  }
});

// define port and Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
