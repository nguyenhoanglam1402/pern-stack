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
    return res.sendStatus(401).json({
      message: "Access was denied",
    });
  }
  const decode = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
  req.uid = decode.uid;
  req.role = decode.role;
  console.log(req.body);
  next();
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
