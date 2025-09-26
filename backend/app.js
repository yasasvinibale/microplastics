const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load env
dotenv.config();

const { sequelize } = require("./utils/db");

// Routers
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const resultsRoutes = require("./routes/results");
const predictRoutes = require("./routes/predict");
const sensorRoutes = require("./routes/sensor");

const app = express();

// CORS
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/results", resultsRoutes);
app.use("/predict", predictRoutes);
app.use("/sensor", sensorRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Microplastics Backend running" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
