require("dotenv").config();

const PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;
module.exports = {
  PORT,
  MONGO_URI,
  SECRET,
};
