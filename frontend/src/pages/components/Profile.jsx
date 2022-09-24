import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
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
    "& > *": {
      width: "100%",
    },
  },
  paperContent: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  divider: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState({});

  useEffect(() => {
    const setData = async () => {
      const res = await ProfileService.getProfile();
      if (res.status === 0) {
        setProfile(res);
      }
      setLoading(false);
    };

    setData();
  }, []);

  let renderSection = "";

  if (profile.type === 0) {
    renderSection = (
      <>
        <Grid item xs={12} className={classes.content}>
          <Rating
            name="read-only"
            value={profile.rating.ratingSum / profile.rating.ratingTotal}
            readOnly
          />
        </Grid>
        <Grid item xs={6} className={classes.content}>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <h3>Contact and other Details</h3>
              </ListSubheader>
            }
          >
            {profile.education.map((val, index) => {
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
                    ${formatDate(val.startDate)} `}
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
                <h3>Abilities and Skills</h3>
              </ListSubheader>
            }
          >
            {profile.skills.map((skill, index) => (
              <>
                {index ? <Divider /> : ""}
                <ListItem>
                  <ListItemText primary={skill} />
                </ListItem>
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs={3} className={classes.content}></Grid>
      </>
    );
  } else {
    renderSection = (
      <>
        <Grid item xs={12} className={classes.content}>
          <Typography>{`Contact No: ${profile.contact}`}</Typography>
        </Grid>
        <Divider variant="middle" className={classes.divider} />
        <Grid item xs={12} className={classes.content}>
          <Typography>{profile.bio}</Typography>
        </Grid>
      </>
    );
  }

  if (isLoading) {
    return "";
  } else {
    return (
      <div className={classes.root}>
        <Paper elevation={6}>
          <div className={classes.paperContent}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.content}>
                <Typography component="h6" variant="h4">
                  {profile.firstName} {profile.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Avatar
                  alt={profile.firstName}
                  src={profile.image}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Typography component="h1" variant="subtitle1">
                  {profile.email} <br />
                  {profile.type
                    ? "Account Type: HouseOwner"
                    : "Account Type: Maid"}
                </Typography>
              </Grid>
              {renderSection}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
};

export default Profile;
