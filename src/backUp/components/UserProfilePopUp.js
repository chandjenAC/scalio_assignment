import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getResourceValueByKey } from "../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    padding: 20,
    minWidth: 300,
    right: 0,
    top: 34,
    zIndex: 99,
  },
  logOutButton: {
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
}));

const UserProfilePopUp = (props) => {
  const { resource, onClickLogout, user } = props;
  const classes = useStyles();

  return (
    <Paper elevation={8} classes={{ root: classes.root }}>
      <Typography variant="body1">{user}</Typography>
      <Button className={classes.logOutButton} onClick={onClickLogout}>
        <Typography color="error" variant="body2">
          {getResourceValueByKey(resource, "LOGOUT", "Logout")}
        </Typography>
      </Button>
    </Paper>
  );
};

export default UserProfilePopUp;
