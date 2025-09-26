const express = require("express");
const router = express.Router();
const axios = require("axios");
const { authenticateToken } = require("../middleware/auth");

// POST /predict -> calls Python service
router.post("/", authenticateToken, async (req, res) => {
  try {
    const ML_URL = process.env.ML_URL || "http://localhost:8001/predict";
    const response = await axios.post(ML_URL, req.body, { timeout: 15000 });
    res.json(response.data);
  } catch (err) {
    console.error("/predict error:", err.message);
    res.status(500).json({ error: "ML service error" });
  }
});

module.exports = router;
