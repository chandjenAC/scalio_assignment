import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import AppIconContainer from "../common/molecules/AppIconContainer";
import { Grid, Typography, Fade, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  observatoryContainer: {
    padding: 20,
    height: "100%",
  },
  observatoryItems: {
    width: "100%",
  },
  subtitle: {
    padding: "16px 12px 8px 12px",
  },
  paper: {
    borderRadius: "25px 0px 0px 0px",
    height: "100%",
  },
}));

const YogiWebb = (props) => {
  const { resource, appsData } = props;
  const classes = useStyles();

  return (
    <Fade  in={true} timeout={300}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container className={classes.observatoryContainer}>
          <Grid item className={classes.observatoryItems}>
            <Typography
              variant="subtitle1"
              className={classes.subtitle}
              align="left"
            >
              {getResourceValueByKey(resource, "APPLICATIONS", "Applications")}
            </Typography>
            <Grid container>
              {appsData.map((appData, index) => {
                return (
                  <Grid item key={index}>
                    <AppIconContainer
                      src={appData.icon}
                      path={appData.path}
                      alt={appData.appName}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item className={classes.observatoryItems}></Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default YogiWebb;
