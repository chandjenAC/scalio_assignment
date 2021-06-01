import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { ReactComponent as EmailIcon } from "../../images/common/email.svg";
import { ReactComponent as CommentsIcon } from "../../images/common/comments.svg";
import { ReactComponent as PhoneIcon } from "../../images/common/phone.svg";

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 15,
    color: "grey",
  },
}));

const SocialActions = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      <Grid item>
        <EmailIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <CommentsIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <PhoneIcon className={classes.icon} />
      </Grid>
    </Grid>
  );
};

export default SocialActions;
