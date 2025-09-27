const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, authenticateToken } = require("../middleware/auth");
const { User } = require("../utils/db");
const { validate, Joi } = require("../middleware/validate");
const crypto = require("crypto");

// Validation schemas
const signupSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("user", "researcher", "admin").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const requestResetSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().min(16).required(),
  newPassword: Joi.string().min(8).required(),
});

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               role:
 *                 type: string
 *                 enum: [user, researcher, admin]
 *     responses:
 *       200:
 *         description: User registered
 *       400:
 *         description: Validation error or User exists
 */
// Signup
router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name: name || null, email, password: hashed, role: role || "user" });
    return res.json({ message: "User registered" });
  } catch (err) {
    console.error("/auth/signup", err);
    res.status(500).json({ error: "Internal error" });
  }
});

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: JWT token returned
 *       401:
 *         description: Invalid credentials
 */
// Login
router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "12h" });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("/auth/login", err);
    res.status(500).json({ error: "Internal error" });
  }
});

// Logout (client-side)
router.post("/logout", (req, res) => {
  res.json({ message: "Logout handled client-side. Discard the JWT token." });
});

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *       401:
 *         description: Missing or invalid token
 */
// Current user profile
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email }, attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("/auth/me", err);
    res.status(500).json({ error: "Internal error" });
  }
});

/**
 * @openapi
 * /auth/request-reset:
 *   post:
 *     summary: Request a password reset token (development flow returns token in response)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *           example:
 *             email: "user@example.com"
 *     responses:
 *       200:
 *         description: Reset token created (in production this would be emailed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 */
router.post("/request-reset", validate(requestResetSchema), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    // Always respond 200 to avoid user enumeration; only set token if user exists
    if (user) {
      const token = crypto.randomBytes(24).toString("hex");
      const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      user.resetToken = token;
      user.resetExpires = expires;
      await user.save();
      return res.json({ message: "Reset token created. Use it within 15 minutes.", token });
    }
    return res.json({ message: "If the email exists, a reset token has been created." });
  } catch (err) {
    console.error("/auth/request-reset", err);
    res.status(500).json({ error: "Internal error" });
  }
});

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using a valid reset token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *           example:
 *             token: "<paste token>"
 *             newPassword: "newStrongPassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post("/reset-password", validate(resetPasswordSchema), async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || !user.resetExpires || new Date(user.resetExpires).getTime() < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetExpires = null;
    await user.save();
    res.json({ message: "Password has been reset" });
  } catch (err) {
    console.error("/auth/reset-password", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
