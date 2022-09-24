import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { JobCard } from "../components/JobCard";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import InputLabel from "@material-ui/core/InputLabel";
// import Button from "@material-ui/core/Button";

import JobService from "../../services/jobs";

import RateApp from "../components/RateApp";

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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
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

export const MyEmployees = () => {
  const classes = useStyles();

  const [applicants, setApplicants] = useState([]);

  const setData = async () => {
    const res = await JobService.getRecJobs();
    const unboxed = [];
    res.forEach((job) => {
      let { applied, ...rest } = job;
      applied = applied.filter((app) => app.status === "Accepted");
      console.log(applied);
      unboxed.push(
        ...applied.map((app) => ({
          title: rest.title,
          type: rest.type,
          name: app.applicant.firstName + " " + app.applicant.lastName,
          email: app.applicant.email,
          dateOfJoining: app.dateOfJoining,
          rated: app.rated,
          jobId: rest._id,
        }))
      );
    });
    setApplicants(unboxed);
  };

  useEffect(() => {
    setData();
  }, []);

  const genContent = (app) => (
    <>
      <Typography className={classes.title} color="textPrimary" gutterBottom>
        {app.name}
      </Typography>
      <Typography
        className={classes.subtitle}
        color="textSecondary"
        gutterBottom
      >
        {app.title}
      </Typography>
      <Typography
        className={classes.subtitle}
        color="textSecondary"
        gutterBottom
      >
        {app.type}
      </Typography>
      <Typography
        className={classes.subtitle}
        color="textSecondary"
        gutterBottom
      >
        Date Of Joining: {new Date(app.dateOfJoining).toString()}
      </Typography>
    </>
  );

  const genAction = (app) => <RateApp app={app} setData={setData} />;

  const [filters] = useState({
    sort: "name",
    order: 1,
  }); //setFilters

  // const handleChange = (event) => {
  //   setFilters({
  //     ...filters,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   });
  // };

  applicants.sort((a, b) => {
    if (filters.sort === "name") {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1 * filters.order;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else if (filters.sort === "title") {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1 * filters.order;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else if (filters.sort === "doj") {
      const dateA = new Date(a.dateOfJoining),
        dateB = new Date(b.dateOfJoining);
      if (dateA < dateB) {
        return -1 * filters.order;
      } else if (dateA > dateB) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1 * filters.order;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    }
  });

  return (
    <>
      {applicants.map((app) => (
        <div key={app.email}>
          <Grid item>
            <JobCard content={genContent(app)} action={genAction(app)} />
          </Grid>
        </div>
      ))}
    </>
  );
};

export default MyEmployees;
