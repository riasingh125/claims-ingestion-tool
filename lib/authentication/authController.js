console.log("JWT_SECRET:", process.env.JWT_SECRET);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../src/data");
require("dotenv").config();



exports.register = async (req, res) => {
  try {
    const origin = req.headers.origin;
    res.setHeader("Access-Control-Allow-Origin", origin);
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository("User");
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = userRepository.create({
      email,
      hashed_password: hashedPassword,
    });

    await userRepository.save(newUser);
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user.", error });
  }
};

exports.login = async (req, res) => {
  try {
    const origin = req.headers.origin;
    res.setHeader("Access-Control-Allow-Origin", origin);
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository("User");
    const user = await userRepository.findOne({ where: { email } });
    console.log("Retrieved user:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in.", error: error.message });
  }
};

