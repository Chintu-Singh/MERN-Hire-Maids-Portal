import Paper from "@material-ui/core/Paper";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { SkillDialogForm } from "../components/FormDialog";
import JobService from "../../services/jobs";

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
  formControl: {
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();

  const [jobForm, setForm] = useState({
    title: "",
    applications: 0,
    positions: 0,
    deadline: "2022-12-12T14:00",
    type: "Full-Time",
    salary: 0,
    duration: 0,
    skills: [],
  });

  const [skill, setSkill] = useState("");

  const handleChange = (event) => {
    setForm({
      ...jobForm,
      [event.target.name]: event.target.value,
    });
  };

  const [open, setOpen] = useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };
  const handleSubmit = async () => {
    setOpen(true);
    await JobService.addJob(jobForm);
    setForm({
      title: "",
      applications: 0,
      positions: 0,
      deadline: "2022-12-12T14:00",
      type: "Full-Time",
      salary: 0,
      duration: 0,
      skills: [],
    });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={6}>
        <div className={classes.paperContent}>
          <Container component="main" maxWidth="xs">
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.content}>
                <TextField
                  label="Title of Work / काम का शीर्षक"
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={jobForm.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.content}>
                <TextField
                  label="Application /आवेदन पत्र"
                  helperText="कर्मचारियों की संख्या जिन्हें आप आवेदन करने की अनुमति देते हैं"
                  variant="outlined"
                  fullWidth
                  name="applications"
                  onChange={handleChange}
                  value={jobForm.applications}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.content}>
                <TextField
                  label="Positions / रिक्ति"
                  helperText="श्रमिकों के लिए उपलब्ध रिक्तियों की संख्या"
                  variant="outlined"
                  fullWidth
                  name="positions"
                  onChange={handleChange}
                  value={jobForm.positions}
                />
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <TextField
                  label="Deadline"
                  type="datetime-local"
                  fullWidth
                  name="deadline"
                  onChange={handleChange}
                  value={jobForm.deadline}
                />
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Type of Work</InputLabel>
                  <Select
                    name="type"
                    value={jobForm.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="Full-Time">
                      Full Time / पूर्णकालिक
                    </MenuItem>
                    <MenuItem value="Part-Time">Part Time / अंशकालिक</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.content}>
                <TextField
                  label="Salary / वेतन"
                  variant="outlined"
                  fullWidth
                  name="salary"
                  onChange={handleChange}
                  value={jobForm.salary}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.content}>
                <TextField
                  label="Duration in months / महीनों में काम की अवधि"
                  helperText="0 - Flexible // 1 - One Month"
                  variant="outlined"
                  fullWidth
                  name="duration"
                  onChange={handleChange}
                  value={jobForm.duration}
                />
              </Grid>

              <Grid item xs={12} className={classes.content}>
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      <h3>Skills you need / कौशल जो आपको चाहिए</h3>
                    </ListSubheader>
                  }
                >
                  {jobForm.skills.map((skill, index) => (
                    <div key={skill}>
                      {index ? <Divider /> : ""}
                      <ListItem>
                        <ListItemText primary={skill} />
                      </ListItem>
                    </div>
                  ))}
                  <ListItem>
                    <SkillDialogForm
                      skill={skill}
                      setSkill={setSkill}
                      profile={jobForm}
                      setProfile={setForm}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Create Work / काम बनाएँ
                </Button>
                <Snackbar
                  anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                  }}
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleToClose}
                >
                  <SnackbarContent
                    style={{
                      backgroundColor: "red",
                    }}
                    message={
                      <span id="client-snackbar">
                        Successfully created work
                      </span>
                    }
                  />
                </Snackbar>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Paper>
    </div>
  );
};

export default App;
