import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { JobCard } from "../components/JobCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import JobService from "../../services/jobs";

import { JobDashboard } from "../components/JobDashboard";
import CancelRounded from "@material-ui/icons/CancelRounded";

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

const EditDialog = ({ job, setData }) => {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    maxApp: job.applications,
    maxPos: job.positions,
    deadline: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await JobService.editJob({ ...form, id: job._id });
    handleClose();
    setData();
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Edit <EditRoundedIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Job</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Max Applications"
            type="number"
            fullWidth
            value={form.maxApp}
            name="maxApp"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Max Positions"
            type="number"
            fullWidth
            value={form.maxPos}
            name="maxPos"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Deadline"
            type="datetime-local"
            fullWidth
            value={form.deadline}
            onChange={handleChange}
            name="deadline"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const App = () => {
  const classes = useStyles();

  const genContent = (job) => {
    const remainingApp =
      job.applications -
      job.applied.reduce(
        (accum, curr) => accum + (curr.status !== "Rejected" ? 1 : 0),
        0
      );

    const remainingPos =
      job.positions -
      job.applied.reduce(
        (accum, curr) => accum + (curr.status === "Accepted" ? 1 : 0),
        0
      );

    return (
      <>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {job.title}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {job.type} • ₹{job.salary} per month
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {job.applications - remainingApp} Applications
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {remainingApp} Remaining Applications
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {remainingPos} Remaining Position
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          Duration : {job.duration ? `${job.duration} Months` : "Indefinate"}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          Deadline : {new Date(job.deadline).toString()}
        </Typography>
        <br />
        <Typography
          className={classes.subtitle}
          component="div"
          color="textSecondary"
        >
          {job.skills.map((skill) => {
            return <div key={skill}>{skill} </div>;
          })}
        </Typography>
      </>
    );
  };

  const genAction = (job) => (
    <>
      <JobDashboard jobId={job._id} setRootData={setData} />
      <EditDialog job={job} setData={setData} />
      <Button value={job._id} color="secondary" onClick={handleDelete}>
        Delete
        <CancelRounded />
      </Button>
    </>
  );

  const [jobs, setJobs] = useState([]);

  const setData = async () => {
    const res = await JobService.getRecJobs();
    setJobs(res);
  };

  useEffect(() => {
    setData();
  }, []);

  const handleDelete = async (event) => {
    await JobService.deleteJob({ jobId: event.currentTarget.value });
    setData();
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {jobs
            .filter((job) => {
              const remainingPos =
                job.positions -
                job.applied.reduce(
                  (accum, curr) => accum + (curr.status === "Accepted" ? 1 : 0),
                  0
                );
              return remainingPos > 0;
            })
            .map((job) => (
              <div key={job._id}>
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
