import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import JobService from "../../services/jobs";
import JobProfile from "./JobProfile";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useStyles2 = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const JobDashboard = ({ jobId, setRootData }) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [open, setOpen] = useState(false);
  const [job, setJob] = useState({});
  const [filters] = useState({
    sort: "name",
    order: 1,
  }); //set Filters

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRootData();
  };

  const setData = async () => {
    const res = await JobService.getJob(jobId);
    setJob(res);
  };

  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleClick = (event) => {
  //   setFilters({
  //     ...filters,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   });
  // };

  job.applied?.sort((a, b) => {
    if (filters.sort === "name") {
      if (
        a.applicant.firstName.toLowerCase() <
        b.applicant.firstName.toLowerCase()
      ) {
        return -1 * filters.order;
      } else if (
        a.applicant.firstName.toLowerCase() >
        b.applicant.firstName.toLowerCase()
      ) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else if (filters.sort === "doa") {
      if (new Date(a.dateOfApplication) < new Date(b.dateOfApplication)) {
        return -1 * filters.order;
      } else if (
        new Date(a.dateOfApplication) > new Date(b.dateOfApplication)
      ) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    } else {
      if (
        a.applicant.firstName.toLowerCase() <
        b.applicant.firstName.toLowerCase()
      ) {
        return -1 * filters.order;
      } else if (
        a.applicant.firstName.toLowerCase() >
        b.applicant.firstName.toLowerCase()
      ) {
        return 1 * filters.order;
      } else {
        return 0;
      }
    }
  });

  const handleShortlist = async (event) => {
    await JobService.shortListUser({
      jobId: job._id,
      appId: event.currentTarget.value,
    });
    setData();
  };

  const handleAccept = async (event) => {
    await JobService.acceptUser({
      jobId: job._id,
      appId: event.currentTarget.value,
    });
    setData();
  };

  const handleReject = async (event) => {
    await JobService.rejectUser({
      jobId: job._id,
      appId: event.currentTarget.value,
    });
    setData();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        VIEW <VisibilityRoundedIcon />
      </Button>
      <Dialog
        scroll="body"
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes2.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CancelRoundedIcon />
            </IconButton>
            MANAGE WORKERS / श्रमिकों का प्रबंधन करें &nbsp;&nbsp;&nbsp;
          </Toolbar>
        </AppBar>
        {job.applied
          ?.filter((app) => app.status !== "Rejected")
          ?.map((app) => {
            return (
              <Card className={classes.root} key={app.applicant.email}>
                <CardContent>
                  <JobProfile
                    email={app.applicant.email}
                    sop={app.sop}
                    doa={app.dateOfApplication}
                    jobStatus={app.status}
                  />
                </CardContent>
                <CardActions>
                  {app.status === "Applied" ? (
                    <Button
                      size="small"
                      color="default"
                      value={app.applicant._id}
                      onClick={handleShortlist}
                    >
                      Shortlist / शॉर्टलिस्ट
                    </Button>
                  ) : app.status === "Shortlisted" ? (
                    <Button
                      size="small"
                      color="inherit"
                      onClick={handleAccept}
                      value={app.applicant._id}
                    >
                      Accept / स्वीकार करे
                    </Button>
                  ) : (
                    ""
                  )}
                  {app.status !== "Accepted" ? (
                    <Button
                      size="small"
                      color="secondary"
                      onClick={handleReject}
                      value={app.applicant._id}
                    >
                      Reject / अस्वीकार करे
                    </Button>
                  ) : (
                    ""
                  )}
                </CardActions>
              </Card>
            );
          })}
      </Dialog>
    </div>
  );
};
