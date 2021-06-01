import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: "15px",
    margin: "6px 12px",
    width: "75px",
    height: "75px",
    cursor: "pointer",
    background: "linear-gradient(-35deg,#75dbe0,#fbd7fc)",
    boxShadow: "-2px 2px 8px -1px rgba(0, 0, 0, 0.18)",
    transition: "all 0.3s ease-out",
    "&:hover": {
      boxShadow: "-2px 3px 5px 0px rgba(0, 0, 0, 0.75)",
    },
  },
}));

const AppIconContainer = (props) => {
  const { src, alt, path } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item>
        <img
          className={classes.icon}
          src={src}
          alt={alt}
          onClick={() => navigate(path)}
        />
      </Grid>
      <Grid item>
        <Typography variant="body2">{alt}</Typography>
      </Grid>
    </Grid>
  );
};

export default AppIconContainer;
