const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

router.get("/stats", authenticateToken, async (req, res) => {
  // TODO: compute from DB filtered by req.user (role- or user-based)
  res.json({
    total_samples: 120,
    safe_samples: 90,
    unsafe_samples: 30,
    latest_result: { plastic_present: true, particle_count: 42 },
  });
});

module.exports = router;
