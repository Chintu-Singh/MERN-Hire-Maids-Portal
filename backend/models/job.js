const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  applications: {
    type: Number,
    default: 0,
  },
  positions: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  skills: [
    {
      type: String,
    },
  ],
  rating: {
    ratingSum: Number,
    ratingTotal: Number,
  },
  applied: [
    {
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      sop: String,
      status: String,
      dateOfApplication: Date,
      dateOfJoining: Date,
      rated: Boolean,
    },
  ],
  creationDate: Date,
});
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
