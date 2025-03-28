const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
const express = require("express");
const app = express();
const { AppDataSource } = require("./data.js"); // Make sure this file exports your DataSource


// Set up middleware
app.use(express.json());

// Define your routes
const authRoutes = require("./routes/authRoute");
const uploadRoutes = require("./routes/csvUpload");
const claimsRouter = require("./routes/claimRoute");

app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", claimsRouter);

// A simple tester route
app.get("/hello", (req, res) => {
  console.log(process.env.DATABASE_URL);
  res.send("Hello, world!");
});

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Initialize the DataSource before starting the server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log("Error during Data Source initialization:", error);
  });
