import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const LinearProgressWithLabel = ({ value, color }) => {
  const classes = useStyles();

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 5,
      width: "100%",
      borderRadius: 2.5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 2.5,
      backgroundColor: color,
    },
  }))(LinearProgress);

  const CutomizedProgressBar = (props) => {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <BorderLinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="subtitle2">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <CutomizedProgressBar value={value} />
    </div>
  );
};

export default LinearProgressWithLabel;
