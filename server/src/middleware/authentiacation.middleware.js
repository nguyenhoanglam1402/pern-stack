const jwt = require("jsonwebtoken");
const express = require("express");
const authUser = (req, res, next) => {
  if (req.user === null) {
    return res.status(403).json({
      message: "User must be signed in",
    });
  } else {
    next();
  }
};

// const authToken = (req, res, next) => {
//   const authHeader = req.headers(["authorization"]);
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token === null) {
//     res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, user) => {
//     if (error) res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

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

const authToken = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers(["authorization"]);
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      res.sendStatus(401).json({
        success: false,
        message: "Token is not exist!",
      });
    }
    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, user) => {
      if (error) res.sendStatus(403).json({
        success: false,
        message: "Token is not valid!",
      });
      req.user = user;
      next();
    });
  };
};
module.exports = { authToken };
