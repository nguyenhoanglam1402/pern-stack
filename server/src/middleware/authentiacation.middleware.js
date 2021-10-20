const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  if (req.user === null) {
    return res.status(403).json({
      message: "User must be signed in",
    });
  } else {
    next();
  }
};

const authToken = (req, res, next) => {
  const authHeader = req.headers(["authorization"]);
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(401).json({
        message: "Access denied",
      });
    } else {
      next();
    }
  };
};

module.exports = { authToken };
