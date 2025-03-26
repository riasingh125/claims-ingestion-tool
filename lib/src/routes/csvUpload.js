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

    // Parse CSV with PapaParse
    Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
      complete: async (results) => {
        const claimRepository = AppDataSource.getRepository("Claim");
        // Map CSV rows to Claim entity fields.
        const claims = results.data.map((row) => {
          return claimRepository.create({
            icn: row.ICN, // CSV: ICN
            payer_name: row.PayerName, // CSV: PayerName
            remittance_number: row.RemittanceNumber, // CSV: RemittanceNumber
            pmt_date: row.PmtDate, // CSV: PmtDate (ensure proper date format if needed)
            provider_npi: row.ProviderNPI, // CSV: ProviderNPI
            patient_name: row.PatientName, // CSV: PatientName
            patient_control_number: row.PatientControlNumber, // CSV: PatientControlNumber
            tob: row.TOB, // CSV: TOB
            status_code: row.StatusCode, // CSV: StatusCode
            subscriber_id: row.SubscriberIDNumber, // CSV: SubscriberIDNumber
            clm_charge: row.ClmCharge, // CSV: ClmCharge
            clm_paid_amount: row.ClmPaidAmount, // CSV: ClmPaidAmount
            clm_allow_amount: row.ClmAllowAmount, // CSV: ClmAllowAmount
            clm_denied_amount: row.ClmDeniedAmount, // CSV: ClmDeniedAmount
            clm_non_covered_amount: row.ClmNonCoveredAmount, // CSV: ClmNonCoveredAmount
            clm_deductible_amount: row.ClmDeductibleAmount, // CSV: ClmDeductibleAmount
            clm_co_insurance_amount: row.ClmCoInsuranceAmount, // CSV: ClmCoInsuranceAmount
            clm_co_pay_amount: row.ClmCoPayAmount, // CSV: ClmCoPayAmount
            clm_cont_adj_amount: row.ClmContAdjAmount // CSV: ClmContAdjAmount
          });
        });

        try {
          await claimRepository.save(claims);
          // Optionally delete the file after processing
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
    console.error("Error processing upload:", err);
    res.status(500).json({ message: "Error processing upload" });
  }
});

module.exports = router;
