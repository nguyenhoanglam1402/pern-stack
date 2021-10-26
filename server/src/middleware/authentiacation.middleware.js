const jwt = require("jsonwebtoken");

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({
        success: false,
        message: "Access denied",
      });
    } else {
      next();
    }
  };
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    res.status(401).json({
      success: false,
      message: "Token is empty",
    });
  }
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, user) => {
    if (error) {
      console.log("Error", error.message);
      await res.status(403).json({
        success: false,
        message: "Your token is not valid"
      });
    }
    req.user = await user;
    await next();
  });
};

const permission = (req, res, next) => {
  const { uid } = req.user;
  const idForActivities = req.params.id;
  if (uid === idForActivities) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "You don't have permission"
    });
  }
};
module.exports = { authToken, authRole, permission };
