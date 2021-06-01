import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import LeftArrow from "@material-ui/icons/ArrowBackIos";

const CustomLeftArrow = ({ onClick, arrowColor, size, ...rest }) => {
  const useStyles = makeStyles((theme) => ({
    icon: {
      color:
        arrowColor === "light"
          ? theme.palette.primary.light
          : theme.palette.primary.main,
    },
  }));
  const classes = useStyles();

  return (
    <IconButton
      onClick={() => onClick()}
      style={{ position: "absolute", left: size === "default" ? -12 : 0 }}
    >
      <LeftArrow className={classes.icon} fontSize={size} />
    </IconButton>
  );
};

export default CustomLeftArrow;
