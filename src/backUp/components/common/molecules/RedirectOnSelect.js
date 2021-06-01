import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: "auto",
    maxWidth: "40px",
  },
}));

const RedirectOnSelect = (props) => {
  const { buttonText, url, state } = props;
  const navigate = useNavigate();
  const classes = useStyles();

  const handleRedirect = () => {
    navigate(url, {
      state: state,
    });
  };

  return (
    <Button onClick={() => handleRedirect()} className={classes.button}>
      {buttonText}
    </Button>
  );
};

export default RedirectOnSelect;
