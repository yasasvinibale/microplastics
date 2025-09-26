const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

router.get("/history", authenticateToken, async (req, res) => {
  // TODO: fetch user-specific history from DB
  res.json([
    { id: 1, plastic_present: true, particle_count: 42, safe: false },
    { id: 2, plastic_present: false, particle_count: 0, safe: true },
  ]);
});

router.get("/analytics", authenticateToken, async (req, res) => {
  // TODO: compute aggregated analytics from DB
  res.json({
    daily_tests: [5, 8, 6, 10, 12],
    safe_percentage: 75,
    common_polymers: { PET: 40, PP: 30, PS: 20 },
  });
});

module.exports = router;
