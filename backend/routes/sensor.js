const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { User, SensorData } = require("../utils/db");
const { validate, Joi } = require("../middleware/validate");

const sensorSchema = Joi.object({
  type: Joi.string().optional(),
  count: Joi.number().integer().min(0).optional(),
  payload: Joi.any().optional(),
  timestamp: Joi.alternatives().try(Joi.string().isoDate(), Joi.date()).optional(),
});

/**
 * @openapi
 * /sensor/data:
 *   post:
 *     summary: Submit sensor data for the authenticated user
 *     tags: [Sensor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: []
 *             properties:
 *               type:
 *                 type: string
 *               count:
 *                 type: integer
 *               payload:
 *                 description: Arbitrary JSON payload from the sensor
 *                 type: object
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *           example:
 *             type: "optical"
 *             count: 42
 *             payload:
 *               rawSignal: [0.12, 0.56, 0.33]
 *               deviceId: "DEV-123"
 *             timestamp: "2025-09-27T10:15:00.000Z"
 *     responses:
 *       200:
 *         description: Sensor data saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 item:
 *                   type: object
 *             example:
 *               message: "Sensor data saved"
 *               item:
 *                 id: 1
 *                 type: "optical"
 *                 count: 42
 *                 payload:
 *                   rawSignal: [0.12, 0.56, 0.33]
 *                   deviceId: "DEV-123"
 *                 timestamp: "2025-09-27T10:15:00.000Z"
 *                 userId: 7
 */
router.post("/data", authenticateToken, validate(sensorSchema), async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { type, count, payload, timestamp } = req.body || {};
    const saved = await SensorData.create({
      type: type || null,
      count: typeof count === "number" ? count : null,
      payload: payload || null,
      timestamp: timestamp ? new Date(timestamp) : undefined,
      userId: user.id,
    });

    res.json({ message: "Sensor data saved", item: saved });
  } catch (err) {
    console.error("/sensor/data", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
