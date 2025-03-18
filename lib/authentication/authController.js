const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersTableInteract = require("./usersTableInteract");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user already exists
    const existingUser = await usersTableInteract.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    // Hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user record
    const newUser = await usersTableInteract.createUser(email, hashedPassword);
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Retrieve the user from the database
    const user = await usersTableInteract.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Compare provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
};
