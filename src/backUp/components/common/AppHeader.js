import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
  },
}));

const AppHeader = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h6"
      align="left"
      color="textSecondary"
      className={classes.title}
    >
      {title}
    </Typography>
  );
};

export default AppHeader;
