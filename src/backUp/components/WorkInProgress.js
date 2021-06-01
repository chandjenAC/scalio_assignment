import React from "react";
import { Grid, Typography, Fade, Paper } from "@material-ui/core";

const WorkInProgress = () => {
  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={0}
        style={{ height: "100%", borderRadius: "25px 0px 0px 0px" }}
      >
        <Grid
          container
          style={{ height: "100%" }}
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <Typography variant="body1">Work in progress</Typography>
          </Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default WorkInProgress;
