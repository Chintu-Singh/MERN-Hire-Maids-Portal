const jwt = require("jsonwebtoken");
const config = require("./config");
const logger = require("./logger");

const extractToken = (req) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};
const authCheck = (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    return res.json({
      status: 1,
      error: "Token Missing or Invalid",
    });
  }
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return res.json({
      status: 1,
      error: "Token Missing or Invalid",
    });
  }
  req.profileObj = decodedToken;
  next();
};
const errorHandler = (error, req, res, next) => {
  if (error.name === "CaseError") {
    return res.json({
      status: 1,
      error: "Malformatted Id",
    });
  } else if (error.name === "ValidationError") {
    return res.json({
      status: 1,
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return res.json({
      status: 1,
      error: "Invalid Token",
    });
  }
  logger.error(error);
  next();
};
const unkownEndpoint = (req, res) => {
  return res.send({
    status: 1,
    error: "unkown endpoint",
  });
};
module.exports = {
  authCheck,
  unkownEndpoint,
  errorHandler,
};
