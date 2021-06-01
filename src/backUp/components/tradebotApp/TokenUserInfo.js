import React from "react";
import LabelAndValue from "../common/LabelAndValue";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userInfoContainer: {
    height: "100%",
  },
  mainGridItem: {
    padding: "4px 0px 4px",
  },
}));

const TokenUserInfo = (props) => {
  const { resource, token } = props;

  const classes = useStyles();

  let labels = {
    emailId: getResourceValueByKey(resource, "EMAIL_ID", "Email ID"),
  };
  let userDetails = {
    // ID: token.association.users.id,
    // "TOP User ID": token.association.users.topUserId,
    [labels.emailId]: token.association.users[0].userDetails.emailId,
    // Name: token.association.users.userDetails.name,
    // "Contact No.": token.association.users.userDetails.phoneNumber,
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      className={classes.userInfoContainer}
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="subtitle1" color="primary" align="center">
          {getResourceValueByKey(resource, "USER_INFO", "User Info")}
        </Typography>
      </Grid>
      <Grid item className={classes.mainGridItem}>
        <Grid container>
          {Object.keys(userDetails).map((key, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
              <LabelAndValue label={key} value={userDetails[key]} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TokenUserInfo;
