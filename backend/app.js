const express = require("express");
const app = express();
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const {
  authCheck,
  unkownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const userRouter = require("./controllers/users");
const profileRouter = require("./controllers/profile");
const jobRouter = require("./controllers/job");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use(authCheck);
app.use("/api/profile", profileRouter);
app.use("/api/job", jobRouter);
app.get("/api/test", (req, res) => {
  res.json({
    status: 0,
    content: req.profileObj.email,
  });
  res.sendStatus(200).end();
});
app.use(errorHandler);
app.use(unkownEndpoint);

module.exports = app;
