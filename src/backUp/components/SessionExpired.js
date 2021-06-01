import React from "react";
import { Grid, Typography, makeStyles, Fade, Paper } from "@material-ui/core";
import { getResourceValueByKey } from "../utils/resourceHelper";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sessionExpRoot: {
    height: "100vh",
  },
  gridItems: {
    margin: 10,
  },
  clickHere: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

const SessionExpired = (props) => {
  const { resource } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0}>
        <Grid
          container
          direction="column"
          className={classes.sessionExpRoot}
          alignItems="center"
          justify="center"
        >
          <Grid item className={classes.gridItems}>
            <Typography variant="h6" color="error">
              {getResourceValueByKey(
                resource,
                "YOUR_SESSION_HAS_TIMED_OUT",
                "Your session has timed out."
              )}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItems}>
            <Typography variant="body2">
              <span className={classes.clickHere} onClick={() => handleClick()}>
                {getResourceValueByKey(resource, "CLICK_HERE", "Click here")}
              </span>{" "}
              &nbsp;
              {getResourceValueByKey(
                resource,
                "TO_LOGIN_AGAIN",
                "to login again"
              )}
            </Typography>
          </Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default SessionExpired;
