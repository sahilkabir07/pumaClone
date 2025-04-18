const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED USER:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).json({ message: "Token is invalid or expired" });
  }
};

module.exports = authenticateToken;
