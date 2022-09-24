import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";

import JobService from "../../services/jobs.js";

const RateJob = ({ job, setData }) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(2.5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async () => {
    await JobService.rateJob({
      rating: rating,
      jobId: job.job._id,
    });
    await setData();
    handleClose();
  };

  return (
    <>
      {job.rated ? (
        <Button disabled> Already Rated </Button>
      ) : (
        <Button onClick={handleClickOpen}> Rate </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate</DialogTitle>
        <DialogContent>
          <Rating value={rating} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Rate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RateJob;
