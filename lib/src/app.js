// src/app.js
const express = require("express");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
//const authenticate = require("../authentication/protectRoute.js");

const upload = require("./routes/csvUpload");

app.use(express.json());

//TESTER route
app.get("/hello", (req, res) => {
  console.log(process.env.DATABASE_URL);
  res.send("Hello, world!");
});

//Authentication routes
app.use("/api/auth", authRoutes);

//CSV upload route
app.use("/api", upload);

console.log(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
