import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  progress: {
    zIndex: 99,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Loader = (props) => {
  const { size } = props;
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress size={size ? size : 28} />
    </div>
  );
};

export default Loader;
