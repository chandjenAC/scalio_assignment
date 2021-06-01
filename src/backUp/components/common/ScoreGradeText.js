import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const StyledTypo = (props) => {
  const useStyles = makeStyles((theme) => ({
    typo: (props) => {
      return {
        color: props.color ? props.color : theme.palette.text.primary,
        paddingLeft: 4,
      };
    },
  }));

  const classes = useStyles(props);
  return (
    <Typography variant="body1" className={classes.typo}>
      {props.value}
    </Typography>
  );
};

const ScoreGradeText = (props) => {
  const [textColor, setTextColor] = useState("");
  const { scoreData } = props;

  useEffect(() => {
    let data = scoreData && scoreData[0];
    let color =
      data?.score >= 300 && data?.score <= 528
        ? "#f11d28"
        : data?.score >= 529 && data?.score <= 650
        ? "#fd3a2d"
        : data?.score >= 651 && data?.score <= 717
        ? "#ffa83b"
        : data?.score >= 718 && data?.score <= 743
        ? "#53b83a"
        : data?.score >= 744 && data?.score <= 850
        ? "#3da940"
        : null;
    setTextColor(color);
  }, [scoreData]);

  return (
    <StyledTypo color={textColor} value={scoreData && scoreData[0].grade} />
  );
};

export default ScoreGradeText;
