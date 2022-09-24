import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { JobCard } from "../components/JobCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import JobService from "../../services/jobs";

import RateJob from "../components/RateJob";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: "100%",
    },
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
  },
  paperContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  contentLeft: {
    marginLeft: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  contentMid: {
    display: "flex",
    justifyContent: "center",
  },
  searchButton: {
    // marginTop: theme.spacing(2),
  },
  searchBar: {
    width: "65%",
  },
  lowerContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  slider: {
    marginTop: theme.spacing(2),
  },
  salary: {
    width: 200,
  },
  textBar: {
    width: "70%",
  },
}));

const App = () => {
  const classes = useStyles();

  const genContent = (job) => (
    <>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        {job.job.title}
      </Typography>
      <Typography
        className={classes.subtitle}
        color="textSecondary"
        gutterBottom
      >
        {job.job.type} • ₹{job.job.salary} per month
      </Typography>
      <Typography
        className={classes.subtitle}
        color="textSecondary"
        gutterBottom
      >
        Recruiter: {job.job.name}
      </Typography>
      <Typography
        className={classes.subtitle}
        color="textSecondary"
        gutterBottom
      >
        Date Of Joining :{" "}
        {job.dateOfJoining
          ? new Date(job.dateOfJoining).toString()
          : "Not Applicable"}
      </Typography>
    </>
  );

  const genAction = (job) => {
    if (job.status === "Accepted") {
      return (
        <>
          <Typography>Status: {job.status}</Typography>
          <RateJob job={job} setData={setData} />
        </>
      );
    } else {
      return <Typography>Status: {job.status}</Typography>;
    }
  };

  const [jobs, setJobs] = useState([]);

  const setData = async () => {
    const res = await JobService.getMy();
    setJobs(res.applied);
  };

  useEffect(() => {
    setData();
  }, []);

  console.log(jobs);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <div key={job.job._id}>
              <Grid item>
                <JobCard content={genContent(job)} action={genAction(job)} />
              </Grid>
            </div>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
