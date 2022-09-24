const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const User = require("./models/user");
const { Applicant, Recruiter } = require("./models/profile");
const Job = require("./models/job");

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(error);
  });
const closeCon = () => {
  mongoose.connection.close();
};
module.exports = {
  User,
  Applicant,
  Job,
  Recruiter,
  closeCon,
};
