// src/app.js
const express = require("express");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const authenticate = require("../authentication/protectRoute.js");

app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/protected", authenticate, (req, res) => {
  console.log(process.env.DATABASE_URL);
  res.json({ message: "Protected content accessed!", user: req.user });
});

app.get("/hello", (req, res) => {
  console.log(process.env.DATABASE_URL);
  res.send("Hello, world!");
});

console.log(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
