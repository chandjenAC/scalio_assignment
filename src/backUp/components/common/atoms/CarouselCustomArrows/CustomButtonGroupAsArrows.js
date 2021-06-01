import React from "react";
import LeftArrow from "@material-ui/icons/ArrowBackIos";
import RightArrow from "@material-ui/icons/ArrowForwardIos";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainPrevButton: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "0%",
    transform: "translate(0%, -50%)",
  },
  mainNextButton: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    right: "0%",
    transform: "translate(0%, -50%)",
  },
}));

const CustomButtonGroupAsArrows = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  const classes = useStyles();
  return (
    <>
      <IconButton
        onClick={previous}
        className={classes.mainPrevButton}
        color="primary"
        disabled={currentSlide === 0}
      >
        <LeftArrow className={classes.icon} fontSize="small" />
      </IconButton>
      <IconButton
        onClick={next}
        className={classes.mainNextButton}
        color="primary"
      >
        <RightArrow className={classes.icon} fontSize="small" />
      </IconButton>
    </>
  );
};
export default CustomButtonGroupAsArrows;
