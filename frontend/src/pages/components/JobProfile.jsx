import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import Rating from "@material-ui/lab/Rating";
import { useState, useEffect } from "react";

import ProfileService from "../../services/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {},
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  divider: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
  },
}));

const JobProfile = ({ email, sop, doa, jobStatus }) => {
  const classes = useStyles();

  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState({});

  useEffect(() => {
    const setData = async () => {
      const res = await ProfileService.getApplicant(email);
      setProfile(res);
      setLoading(false);
    };

    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let renderSection = "";

  renderSection = (
    <>
      <Grid item xs={4} className={classes.content}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <u>
                <h3>Details</h3>
              </u>
            </ListSubheader>
          }
        >
          {profile.education?.map((val, index) => {
            const formatDate = (date) => {
              let formattedDate = new Date(date);
              formattedDate = formattedDate.toDateString().split(" ");
              formattedDate = `${formattedDate[2]} / ${formattedDate[1]} / ${formattedDate[3]}`;

              if (formattedDate === "None") {
                return "Present";
              } else {
                return formattedDate;
              }
            };

            return (
              <div key={`${val.name} ${val.startDate} ${val.endDate}`}>
                {index ? <Divider /> : ""}
                <ListItem>
                  <ListItemText
                    primary={`Contact No: ${val.name}`}
                    secondary={`Birth Date / जन्म तिथि :
                    ${formatDate(val.startDate)}`}
                  />
                </ListItem>
              </div>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={6} className={classes.content}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <u>
                <h3>Abilities and Skills</h3>
              </u>
            </ListSubheader>
          }
        >
          {profile.skills?.map((skill, index) => (
            <>
              {index ? <Divider /> : ""}
              <ListItem>
                <ListItemText primary={skill} />
              </ListItem>
            </>
          ))}
        </List>
      </Grid>
    </>
  );

  if (isLoading) {
    return "";
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.paperContent}>
          <Grid container>
            <Grid item xs={12} className={classes.content}>
              <Typography>
                {profile.firstName} {profile.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              SOP: {sop} <br />
              Date Of Application: {new Date(doa).toString()} <br />
              Rating:
              <Rating
                name="read-only"
                value={profile.rating.ratingSum / profile.rating.ratingTotal}
                readOnly
              />{" "}
              <br />
              Status: {jobStatus}
            </Grid>
            <br />
            {renderSection}
          </Grid>
        </div>
      </div>
    );
  }
};

export default JobProfile;
