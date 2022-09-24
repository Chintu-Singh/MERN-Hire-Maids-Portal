import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const EducationDialogForm = ({
  education,
  setEducation,
  profile,
  setProfile,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setProfile({
      ...profile,
      education: [...profile.education, education],
    });
    handleClose();
  };

  const handleClose = () => {
    setEducation({
      name: "",
      startDate: "1900-01-01",
      endDate: "1900-01-01",
    });
    setOpen(false);
  };

  const handleChange = (event) => {
    setEducation({
      ...education,
      [event.target.name]: event.target.value,
    });
  };

  const handleRemove = () => {
    if (profile.education) {
      setProfile({
        ...profile,
        education: profile.education.slice(0, -1),
      });
    }
  };

  return (
    <>
      <ButtonGroup variant="contained" color="primary">
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Delete / मिटाएं
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add / जोड़ें
        </Button>
      </ButtonGroup>
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">
          Add Details / अपना डिटेल जोड़ें
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Contact number"
                name="name"
                value={education.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} xm={12}>
              <br />
              <TextField
                label="Birth / जन्म तिथि"
                type="date"
                name="startDate"
                value={education.startDate}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const SkillDialogForm = ({ skill, setSkill, profile, setProfile }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, skill],
    });
    handleClose();
  };

  const handleClose = () => {
    setSkill("");
    setOpen(false);
  };

  const handleChange = (event) => {
    setSkill(event.target.value);
  };

  const handleRemove = () => {
    if (profile.skills) {
      setProfile({
        ...profile,
        skills: profile.skills.slice(0, -1),
      });
    }
  };

  return (
    <>
      <ButtonGroup variant="contained" color="primary">
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Delete / मिटाएं
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add / जोड़ें
        </Button>
      </ButtonGroup>
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">Add Skills</DialogTitle>
        <DialogContent>
          <DialogContentText>कौशल जोड़ें</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add your skills"
            value={skill}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
