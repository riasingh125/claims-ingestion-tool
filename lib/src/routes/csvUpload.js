// routes/upload.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const Papa = require("papaparse");
const { AppDataSource } = require("../data");
const multer = require("multer");

// Configure multer to store uploaded files in a temporary folder ("uploads/")
const upload = multer({ dest: "uploads/" });

// Middleware to set CORS/access control headers
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust as needed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Handle preflight OPTIONS requests
router.options("/*", (req, res) => {
  res.sendStatus(200);
});



// Use multer middleware to handle the file upload.
// "csvFile" is the field name that the frontend sends in FormData.
router.post("/upload-csv", upload.single("csvFile"), async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    
    // Get the uploaded file's path
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");
    console.log("Raw file content:", fileContent.substring(0, 500));

    // Parse CSV with PapaParse
    Papa.parse(fileContent, {
      header: true,
      delimiter: ",", // ensure the tab delimiter is used
      dynamicTyping: true,
      complete: async (results) => {
        console.log("PapaParse results:", results);
        const claimRepository = AppDataSource.getRepository("Claim");
        if (results.data && results.data.length > 0) {
          console.log("First row of parsed data:", results.data[0]);
          console.log("Keys in first row:", Object.keys(results.data[0]));
        } else {
          console.log("No data parsed.");
        }
        // Map CSV rows to Claim entity fields using lowercase keys.
        const claims = results.data.map((row, index) => {
          
          return claimRepository.create({
            icn: row.ICN,
            payer_name: row.PayerName,
            remittance_number: row.RemittanceNumber,
            pmt_date: row.PmtDate,
            provider_npi: row.ProviderNPI,
            patient_name: row.PatientName,
            patient_control_number: row.PatientControlNumber,
            tob: row.TOB,
            status_code: row.StatusCode,
            subscriber_id: row.SubscriberIDNumber,
            clm_charge: row.ClmCharge,
            clm_paid_amount: row.ClmPaidAmount,
            clm_allow_amount: row.ClmAllowAmount,
            clm_denied_amount: row.ClmDeniedAmount,
            clm_non_covered_amount: row.ClmNonCoveredAmount,
            clm_deductible_amount: row.ClmDeductibleAmount,
            clm_co_insurance_amount: row.ClmCoInsuranceAmount,
            clm_co_pay_amount: row.ClmCoPayAmount,
            clm_cont_adj_amount: row.ClmContAdjAmount,
          });
          
        });
        console.log("Mapped claims (first 10):", claims.slice(0, 10));
        try {
          await claimRepository.save(claims);
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
          res.status(200).json({ message: "CSV data imported successfully." });
        } catch (err) {
          console.error("Error saving data:", err);
          res.status(500).json({ message: "Error saving data" });
        }
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
        res.status(500).json({ message: "Error parsing CSV" });
      },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Unexpected error occurred" });
  }
});

module.exports = router;
