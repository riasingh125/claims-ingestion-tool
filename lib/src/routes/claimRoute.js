const express = require("express");
const router = express.Router();
const { AppDataSource } = require("../data.js");

router.get("/claims-summary", async (req, res) => {
  try {
    const claimRepository = AppDataSource.getRepository("Claim");
    const claims = await claimRepository.find();
    res.json(claims);
  } catch (err) {
    console.error("Error fetching claims:", err);
    res.status(500).json({ message: "Error fetching claims" });
  }
});

module.exports = router;
