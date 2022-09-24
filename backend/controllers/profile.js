const router = require("express").Router();
const { User, Applicant, Recruiter } = require("../mongo");

router.get("/init", async (req, res) => {
  const user = await User.findOne({ email: req.profileObj.email });
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
    _id: user._id,
  });
});
router.get("/details", async (req, res) => {
  const user = await User.findOne({ email: req.profileObj.email });
  let details = {};
  if (user.type === 0) {
    details = await Applicant.findOne({ email: req.profileObj.email });
  } else {
    details = await Recruiter.findOne({ email: req.profileObj.email });
  }
  const { passwordHash, _id, __v, ...rest } = {
    ...user._doc,
    ...details._doc,
  };
  res.json({
    ...rest,
  });
});
router.post("/update", async (req, res) => {
  const newProfile = req.body;
  const user = await User.findOne({ email: req.profileObj.email });
  if (newProfile.email !== req.profileObj.email) {
    return res.json({
      status: 1,
      error: "Emails don't match",
    });
  }
  await User.updateOne(
    { email: req.profileObj.email },
    {
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
    }
  );
  if (user.type === 0) {
    await Applicant.updateOne(
      { email: req.profileObj.email },
      {
        education: newProfile.education,
        skills: newProfile.skills,
        resume: newProfile.resume,
        image: newProfile.image,
      }
    );
  } else {
    await Recruiter.updateOne(
      { email: req.profileObj.email },
      {
        contact: newProfile.contact,
        bio: newProfile.bio,
        image: newProfile.image,
      }
    );
  }
  res.json({
    status: 0,
    content: "Profile Edited Succesfully",
  });
});
router.post("/getGiven", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let details = {};
  details = await Applicant.findOne({ email: req.body.email });
  const { passwordHash, _id, __v, ...rest } = {
    ...user._doc,
    ...details._doc,
  };
  res.json({
    ...rest,
  });
});
module.exports = router;
