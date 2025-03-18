const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

//Using Multer for in memory storage of CSVs - for now?
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Actual endpoint
router.post("/upload-csv", upload.single("csvFile"), (req, res) => {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin);
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  console.log("File uploaded successfully:", file);
  // Process the CSV file here
  res.status(200).json({ message: "File uploaded successfully" });
});

module.exports = router; // Export the router
