const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { User, Result } = require("../utils/db");

/**
 * @openapi
 * /dashboard/stats:
 *   get:
 *     summary: Get overall water sample stats for the authenticated user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_samples:
 *                   type: integer
 *                 safe_samples:
 *                   type: integer
 *                 unsafe_samples:
 *                   type: integer
 *                 latest_result:
 *                   type: object
 *                   nullable: true
 *             example:
 *               total_samples: 12
 *               safe_samples: 8
 *               unsafe_samples: 4
 *               latest_result:
 *                 id: 25
 *                 plastic_present: true
 *                 particle_count: 42
 *                 safety: "unsafe"
 *                 polymer_type: "PET"
 *                 confidence: 0.93
 *                 createdAt: "2025-09-27T10:15:00.000Z"
 */
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const all = await Result.findAll({ where: { userId: user.id }, order: [["createdAt", "DESC"]] });
    const total_samples = all.length;
    const safe_samples = all.filter((r) => r.plastic_present === false).length;
    const unsafe_samples = total_samples - safe_samples;
    const latest = all[0] || null;

    res.json({
      total_samples,
      safe_samples,
      unsafe_samples,
      latest_result: latest,
    });
  } catch (err) {
    console.error("/dashboard/stats", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
