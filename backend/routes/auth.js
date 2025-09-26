const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../middleware/auth");
const { User } = require("../utils/db");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, role: role || "user" });
    return res.json({ message: "User registered" });
  } catch (err) {
    console.error("/auth/signup", err);
    res.status(500).json({ error: "Internal error" });
  }
});

// Login
router.post("/login", async (req, res) => {
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

module.exports = router;
