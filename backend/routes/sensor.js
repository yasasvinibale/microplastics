const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

router.post("/data", authenticateToken, async (req, res) => {
  // TODO: save sensor data to DB
  res.json({ message: "Sensor data received", data: req.body });
});

module.exports = router;
