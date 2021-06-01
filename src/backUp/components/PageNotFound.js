import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { Button, Fade, Paper } from "@material-ui/core";
import { getResourceValueByKey } from "../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  pageNotFoundRoot: {
    height: "100vh",
  },
  gridItems: {
    margin: 10,
  },
  oopsMessage: {
    margin: 10,
    padding: 12,
    background: theme.palette.primary.light,
  },
}));

const PageNotFound = (props) => {
  const { resource } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0}>
        <Grid
          container
          className={classes.pageNotFoundRoot}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item className={classes.gridItems}>
            <Typography variant="h1">
              {getResourceValueByKey(resource, "404", "404")}
            </Typography>
          </Grid>
          <Grid item className={classes.oopsMessage}>
            <Typography variant="h5">
              {getResourceValueByKey(
                resource,
                "OOPS!_PAGE_NOT_FOUND",
                "Oops! Page not found."
              )}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItems}>
            <Typography variant="body1">
              {getResourceValueByKey(
                resource,
                "PAGE_NOT_FOUND_MESSAGE",
                "The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved."
              )}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItems}>
            <Button onClick={() => navigate("/")} color="primary">
              {getResourceValueByKey(resource, "BACK_TO_HOME", "Back to Home")}
            </Button>
          </Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default PageNotFound;
