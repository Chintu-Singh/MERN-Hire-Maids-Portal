const router = require("express").Router();
const { Job, User, Applicant } = require("../mongo");
const logger = require("../utils/logger");
router.get("/all", async (req, res) => {
  let jobs = await Job.find({});
  jobs = jobs.map((job) => {
    const { __v, ...rest } = job._doc;
    return rest;
  });
  res.json(jobs);
});
router.post("/add", async (req, res) => {
  const job = req.body;
  logger.info("Job Recieved");
  logger.info(job);
  const recruiter = await User.findOne({ email: req.profileObj.email });
  const newJob = new Job({
    title: job.title,
    name: recruiter.firstName + " " + recruiter.lastName,
    email: req.profileObj.email,
    applications: job.applications,
    positions: job.positions,
    type: job.type,
    salary: job.salary,
    duration: job.duration,
    skills: job.skills,
    deadline: job.deadline,
    rating: {
      ratingSum: 0,
      ratingTotal: 0,
    },
    applied: [],
    creationDate: Date(),
  });
  await newJob.save();
  res.json({
    status: 1,
    content: "Added Job successfully",
  });
});
router.post("/apply", async (req, res) => {
  const applicant = await User.findOne({ email: req.profileObj.email });
  const job = await Job.findOne({ _id: req.body.jobId });
  const acceptedCheck = applicant.applied.reduce(
    (accum, app) => accum || app.status === "Accepted",
    false
  );
  if (acceptedCheck) {
    return res.json({
      status: 0,
      content: "Already accepted to a job",
    });
  }
  const countCheck = applicant.applied.reduce(
    (accum, app) => accum + (app.status !== "Rejected" ? 1 : 0),
    0
  );
  if (countCheck === 10) {
    return res.json({
      status: 0,
      content: "Cannot apply to more than 10 jobs at a single time",
    });
  }
  job.applied = job.applied.concat({
    applicant: applicant._id,
    sop: req.body.sop,
    status: "Applied",
    dateOfApplication: Date(),
  });
  await job.save();
  applicant.applied = applicant.applied.concat({
    job: job._id,
    status: "Applied",
  });
  await applicant.save();
  return res.json({
    status: 0,
    content: "Applied Successfully",
  });
});
router.get("/getMy", async (req, res) => {
  const user = await User.findOne({ email: req.profileObj.email }).populate(
    "applied.job"
  );
  await user._doc.applied.forEach(async (curr) => {
    const getUser = await User.findOne({ email: curr.job.email });
    curr.name = getUser.firstName + " " + getUser.lastName;
  });
  const { passwordHash, __v, ...rest } = user._doc;
  res.json(rest);
});
router.get("/getRecJobs", async (req, res) => {
  const jobs = await Job.find({ email: req.profileObj.email }).populate(
    "applied.applicant"
  );
  res.json(jobs);
});
router.post("/getJob", async (req, res) => {
  const job = await Job.findOne({ _id: req.body.jobId }).populate(
    "applied.applicant"
  );
  res.json(job);
});
router.post("/editJob", async (req, res) => {
  const data = req.body;
  const job = await Job.findOne({ _id: data.id });
  job.applications = data.maxApp;
  job.positions = data.maxPos;
  job.deadline = data.deadline;
  job.save();
  res.sendStatus(200);
});
router.post("/shortListUser", async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ _id: data.appId });
  const job = await Job.findOne({ _id: data.jobId });
  const reqJob = user.applied.find((job) => job.job == data.jobId);
  const reqUser = job.applied.find((app) => app.applicant == data.appId);
  reqJob.status = "Shortlisted";
  reqUser.status = "Shortlisted";
  await user.save();
  await job.save();
  res.sendStatus(200);
});
const rejectUser = async (data) => {
  const user = await User.findOne({ _id: data.appId });
  const job = await Job.findOne({ _id: data.jobId });
  const reqJob = user.applied.find(
    (job) => String(job.job) === String(data.jobId)
  );
  const reqUser = job.applied.find(
    (app) => String(app.applicant) === String(data.appId)
  );
  reqJob.status = "Rejected";
  reqUser.status = "Rejected";
  await user.save();
  await job.save();
};
router.post("/acceptUser", async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ _id: data.appId });
  const job = await Job.findOne({ _id: data.jobId });
  const reqJob = user.applied.find((job) => job.job == data.jobId);
  const reqUser = job.applied.find((app) => app.applicant == data.appId);
  reqJob.status = "Accepted";
  reqUser.status = "Accepted";
  reqJob.dateOfJoining = new Date();
  reqUser.dateOfJoining = new Date();
  reqJob.rated = false;
  reqUser.rated = false;
  await user.applied.forEach(async (x) => {
    if (x.job != data.jobId) {
      x.status = "Rejected";
      const y = await Job.findOne({ _id: x.job });
      const getY = y.applied.find(
        (app) => String(app.applicant) === String(user._id)
      );
      getY.status = "Rejected";
      await y.save();
    }
    return job;
  });
  await user.save();
  await job.save();
  const remainingPos =
    job.positions -
    job.applied.reduce(
      (accum, curr) => accum + (curr.status === "Accepted" ? 1 : 0),
      0
    );
  if (remainingPos <= 0) {
    await job.applied.forEach(async (app) => {
      if (app.status === "Applied" || app.status === "Shortlisted") {
        await rejectUser({ jobId: job._id, appId: app.applicant });
      }
    });
  }
  res.sendStatus(200);
});
router.post("/rejectUser", async (req, res) => {
  const data = req.body;
  await rejectUser(data);
  res.sendStatus(200);
});
router.post("/deleteJob", async (req, res) => {
  const data = req.body;
  const job = await Job.findOne({ _id: data.jobId });
  await job.applied.forEach(async (app) => {
    const user = await User.findOne({ _id: app.applicant });
    user.applied = user.applied.filter(
      (app) => String(app.job) !== String(job._id)
    );
    await user.save();
  });
  await job.remove();
  res.sendStatus(200);
});
router.post("/rateUser", async (req, res) => {
  const data = req.body;
  const applicant = await Applicant.findOne({ email: data.email });
  const job = await Job.findOne({ _id: data.jobId }).populate(
    "applied.applicant"
  );
  applicant.rating.ratingTotal++;
  applicant.rating.ratingSum += data.rating;
  job.applied.forEach((curr, index, arr) => {
    if (curr.applicant.email === data.email) {
      arr[index].rated = true;
    }
  });
  applicant.save();
  job.save();
  res.sendStatus(200);
});
router.post("/rateJob", async (req, res) => {
  const data = req.body;
  const email = req.profileObj.email;
  const user = await User.findOne({ email: email });
  const job = await Job.findOne({ _id: data.jobId });
  job.rating.ratingTotal++;
  job.rating.ratingSum += data.rating;
  user.applied.forEach((curr, index, arr) => {
    if (String(curr.job) === String(data.jobId)) {
      arr[index].rated = true;
    }
  });
  user.save();
  job.save();
  res.sendStatus(200);
});

module.exports = router;
