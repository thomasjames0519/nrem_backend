const express = require("express");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/*
@ route POST /api/auth/register
@ desc register user
@ access public
*/
// const bcrypt = require('bcrypt');
// const User = require('./models/User'); // Adjust the import based on your file structure

router.post("/register", async (req, res) => {
  try {
    const { id, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    console.log("aaaaa:" + existingUser);
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("\nbbbbb:" + hashedPassword);

    // Create a new user
    const newUser = new User({ id, username, password: hashedPassword });
    console.log("newUser: " + newUser);

    // Save the new user to the database
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    // Check if id and password are provided
    if (!id || !password) {
      return res.status(400).json({ msg: "ID and password are required" });
    }

    // Find user by ID
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    // Successful login
    res.status(200).json({ msg: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;


module.exports = router;