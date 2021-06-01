import React from "react";
import RightArrow from "@material-ui/icons/ArrowForwardIos";
import { IconButton, makeStyles } from "@material-ui/core";

const CustomRightArrow = ({ onClick, arrowColor, size, ...rest }) => {
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
      style={{ position: "absolute", right: size === "default" ? -15 : 0 }}
    >
      <RightArrow className={classes.icon} fontSize={size} />
    </IconButton>
  );
};

export default CustomRightArrow;
