const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { User, Result, SensorData } = require("../utils/db");

/**
 * @openapi
 * /results/history:
 *   get:
 *     summary: Get historical analysis results for the authenticated user
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   plastic_present:
 *                     type: boolean
 *                   particle_count:
 *                     type: integer
 *                   safety:
 *                     type: string
 *                   size_range:
 *                     type: string
 *                   polymer_type:
 *                     type: string
 *                   confidence:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/history", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    const items = await Result.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
      limit: 100,
    });
    res.json(items);
  } catch (err) {
    console.error("/results/history", err);
    res.status(500).json({ error: "Internal error" });
  }
});

/**
 * @openapi
 * /results/analytics:
 *   get:
 *     summary: Get aggregated analytics for the authenticated user's results
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 daily_tests:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: Counts for the last 7 days (oldest to newest)
 *                 safe_percentage:
 *                   type: integer
 *                   description: Percentage of samples with plastic_present=false
 *                 common_polymers:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                 particle_type_counts:
 *                   type: object
 *                   description: Aggregated counts by particle type (e.g., fiber, pellet, bead) from recent sensor data
 *                   additionalProperties:
 *                     type: integer
 */
router.get("/analytics", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const all = await Result.findAll({ where: { userId: user.id } });
    const total = all.length;
    const safe = all.filter((r) => r.plastic_present === false).length;
    const safe_percentage = total > 0 ? Math.round((safe / total) * 100) : 0;

    // Group by polymer_type
    const common_polymers = {};
    for (const r of all) {
      const key = r.polymer_type || "Unknown";
      common_polymers[key] = (common_polymers[key] || 0) + 1;
    }

    // Simple last-7-days daily counts
    const dayMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const buckets = new Array(7).fill(0);
    for (const r of all) {
      const idx = Math.floor((now - new Date(r.createdAt).getTime()) / dayMs);
      if (idx >= 0 && idx < 7) buckets[6 - idx] += 1; // oldest->newest
    }

    // Aggregate particle types from recent sensor data (last 500 records)
    const recentSensor = await SensorData.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
      limit: 500,
    });
    const particle_type_counts = {};
    for (const s of recentSensor) {
      const t = (s.type || "Unknown").toString().trim().toLowerCase();
      const mapped = ["fiber", "pellet", "bead"].includes(t) ? t : (t || "unknown");
      particle_type_counts[mapped] = (particle_type_counts[mapped] || 0) + 1;
    }

    res.json({
      daily_tests: buckets,
      safe_percentage,
      common_polymers,
      particle_type_counts,
    });
  } catch (err) {
    console.error("/results/analytics", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
