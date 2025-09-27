const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

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

// CORS (supports multiple comma-separated origins)
const defaultOrigins = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"];
const configuredOrigins = (process.env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
const allowedOrigins = configuredOrigins.length ? configuredOrigins : defaultOrigins;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));
app.options("*", cors());
// Security headers
app.use(helmet());

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microplastics API",
      version: "1.0.0",
      description: "API documentation for Microplastics backend",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    path.join(__dirname, "routes", "*.js"),
  ],
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/results", resultsRoutes);
app.use("/predict", predictRoutes);
app.use("/sensor", sensorRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Microplastics Backend running" });
});

// Global error handler (should be after all routes)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    // Keep DB schema in sync during development
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
