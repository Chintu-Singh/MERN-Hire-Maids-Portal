const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const applicantSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  education: [
    {
      name: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  resume: String,
  image: String,
  rating: {
    ratingSum: Number,
    ratingTotal: Number,
  },
});

const recruiterSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  contact: String,
  bio: String,
  image: String,
});

applicantSchema.plugin(uniqueValidator);
recruiterSchema.plugin(uniqueValidator);
const Applicant = mongoose.model("Applicant", applicantSchema);
const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = { Applicant, Recruiter };
