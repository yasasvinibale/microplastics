const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; 
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // { email, role, iat, exp }
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles, SECRET_KEY };
