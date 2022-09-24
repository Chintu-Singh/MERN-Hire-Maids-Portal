import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import JobService from "../../services/jobs";

import ErrorDialog from "../components/ErrorDialog";

export const SopDialogForm = ({ jobId, setData }) => {
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSop("");
    setOpen(false);
  };

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorContent, setErrorContent] = React.useState("");

  const handleError = (content) => {
    setErrorContent(content);
    setErrorOpen(true);
  };

  const handleApply = async () => {
    const res = await JobService.applyJob(jobId, sop);
    handleError(res.content);
    setData();
    handleClose();
  };

  const handleSopChange = async (event) => {
    setSop(event.target.value);
  };

  return (
    <>
      <ErrorDialog
        open={errorOpen}
        setOpen={setErrorOpen}
        title="Apply for work"
        content={errorContent}
      />
      <Button onClick={handleClickOpen}>Apply / आवेदन करें</Button>
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">
          Apply for work / आवेदन करें
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Motive for applying / आवेदन करने का उद्देश्य{" "}
          </DialogContentText>
          <TextField
            multiline
            rows={5}
            id="sop"
            autoFocus
            variant="outlined"
            margin="dense"
            name="sop"
            value={sop}
            onChange={handleSopChange}
            label="Write some words"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
