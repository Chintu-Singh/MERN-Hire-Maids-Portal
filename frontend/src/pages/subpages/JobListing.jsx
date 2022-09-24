import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { JobCard } from "../components/JobCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import Slider from "@material-ui/core/Slider";
import FuzzySearch from "fuzzy-search";
import Rating from "@material-ui/lab/Rating";

import JobService from "../../services/jobs";
import UserService from "../../services/users";

import { SopDialogForm } from "../components/JobDialogs";

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
          Recruiter : {job.name}
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
        <Rating
          name="read-only"
          value={job.rating.ratingSum / job.rating.ratingTotal}
          readOnly
        />
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

  const [user, setUser] = useState("");

  const genAction = (job) => {
    const remainingApp =
      job.applications -
      job.applied.reduce(
        (accum, curr) => accum + (curr.status !== "Rejected" ? 1 : 0),
        0
      );

    const check = job.applied.find((app) => app.applicant === user._id);

    if (check) {
      return (
        <Button variant="outlined" color="primary" disabled>
          Applied
        </Button>
      );
    } else if (remainingApp <= 0) {
      return <Button disabled>Full</Button>;
    } else {
      return <SopDialogForm jobId={job._id} setData={setData} />;
    }
  };

  const [jobs, setJobs] = useState([]);

  const setData = async () => {
    const jobRes = await JobService.getAll();
    const userRes = await UserService.initDashboard();
    setJobs(jobRes);
    setUser(userRes);
  };

  useEffect(() => {
    setData();
  }, []);

  const [filters, setFilters] = useState({
    search: "",
    sortBase: "salary",
    order: 1,
    type: "none",
    duration: -1,
    salary: [0, 100],
  });

  const handleChange = (event, newVal) => {
    if (event.target.value !== undefined) {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    } else if (event.currentTarget.value !== undefined) {
      setFilters({
        ...filters,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    } else {
      setFilters({
        ...filters,
        salary: newVal,
      });
    }
  };

  let filtered = jobs;

  const fizz = new FuzzySearch(jobs, ["title"]);

  filtered = fizz.search(filters.search);
  // eslint-disable-next-line
  filtered = filtered.sort((a, b) => {
    if (filters.sortBase === "salary") {
      return filters.order * (a.salary - b.salary);
    } else if (filters.sortBase === "duration") {
      return filters.order * (a.duration - b.duration);
    } else if (filters.sortBase === "rating") {
      let ratA = a.rating.ratingSum / a.rating.ratingTotal;
      let ratB = b.rating.ratingSum / b.rating.ratingTotal;

      if (!ratA) {
        ratA = 0;
      }

      if (!ratB) {
        ratB = 0;
      }

      return (ratA - ratB) * filters.order;
    }
  });

  filtered = filtered.filter((val) => {
    if (filters.type === "none") {
      return true;
    } else {
      return val.type === filters.type;
    }
  });

  filtered = filtered.filter((val) => {
    if (filters.duration === -1) {
      return true;
    } else {
      return val.duration < filters.duration;
    }
  });

  filtered = filtered.filter(
    (job) =>
      (job.salary >= filters.salary[0]) * 100 &&
      job.salary <= filters.salary[1] * 100
  );

  console.log(filters);

  return (
    <>
      <Container>
        <div className={classes.root}>
          <Paper elevation={3}>
            <div className={classes.paperContent}>
              <Grid container spacing={1}>
                <Grid item xs={4} className={classes.contentLeft}>
                  <TextField
                    className={classes.searchBar}
                    label="Search / खोजे"
                    helperText="Search for work / कार्य खोजे"
                    name="search"
                    autoComplete="off"
                    value={filters.search}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} className={classes.contentLeft}>
                  <FormControl className={classes.textBar}>
                    <InputLabel>Duration</InputLabel>
                    <Select
                      name="duration"
                      value={filters.duration}
                      onChange={handleChange}
                    >
                      <MenuItem value={-1}>
                        <em>Any / कोई भी</em>
                      </MenuItem>
                      <MenuItem value={2}>1 / एक महीना</MenuItem>
                      <MenuItem value={3}>2 / दो महीना</MenuItem>
                      <MenuItem value={4}>3 / तीन महीना</MenuItem>
                      <MenuItem value={5}>4 / चार महीना</MenuItem>
                      <MenuItem value={6}>5 / पाँच महीना</MenuItem>
                      <MenuItem value={7}>6 / छह महीना</MenuItem>
                      <MenuItem value={8}>7 / सात महीना</MenuItem>
                      <MenuItem value={9}>8 / आठ महीना</MenuItem>
                      <MenuItem value={10}>9 / नौ महीना</MenuItem>
                    </Select>
                    <FormHelperText>
                      All works before that duration
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <div className={classes.paperContent}>
                <Grid container spacing={1}></Grid>
              </div>
            </div>
          </Paper>
        </div>
        <Grid container spacing={3}>
          {filtered
            .filter((job) => {
              const remainingPos =
                job.positions -
                job.applied.reduce(
                  (accum, curr) => accum + (curr.status === "Accepted" ? 1 : 0),
                  0
                );
              return remainingPos > 0;
            })
            .filter((job) => new Date(job.deadline) > new Date())
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
