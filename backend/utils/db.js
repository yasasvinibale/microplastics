const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const DB_FILE = process.env.DB_FILE || path.join(__dirname, "..", "data.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_FILE,
  logging: false,
});

// Models
const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "users" }
);

const Result = sequelize.define(
  "Result",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    plastic_present: { type: DataTypes.BOOLEAN, defaultValue: false },
    particle_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    safety: { type: DataTypes.STRING, defaultValue: "unknown" },
    size_range: { type: DataTypes.STRING, defaultValue: "" },
    polymer_type: { type: DataTypes.STRING, defaultValue: "" },
    confidence: { type: DataTypes.FLOAT, defaultValue: 0 },
  },
  { tableName: "results" }
);

User.hasMany(Result, { foreignKey: "userId" });
Result.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Result };
