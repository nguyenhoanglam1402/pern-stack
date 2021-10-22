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

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, user) => {
    if (error) {
      console.log("Error", error.message);
      await res.sendStatus(403);
    }
    req.user = await user;
    await next();
  });
};

const permission = (req, res, next) => {
  const { uid } = req.user;
  const idForSearch = req.params.id;
  if (uid === idForSearch) {
    next();
  } else {
    res.sendStatus(403);
  }
};
module.exports = { authToken, authRole, permission };
