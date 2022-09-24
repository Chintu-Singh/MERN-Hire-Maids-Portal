import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
    marginTop: 30,
    marginRight: 7,
    marginLeft: 7,
  },
});

export const JobCard = ({ content, action }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>{content}</CardContent>
      <CardActions>{action}</CardActions>
    </Card>
  );
};
