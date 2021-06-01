import React from "react";
import { Typography, Grid } from "@material-ui/core";

const PrimaryContact = (props) => {
  const { contactInfo, keyObj } = props;
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      style={{ padding: "4px" }}
    >
      <Grid item>
        <Typography variant="subtitle1">{keyObj.displayName}</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">{`${contactInfo.firstName} ${contactInfo.lastName}`}</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">{contactInfo.companyTitle}</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">{contactInfo.emailId}</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">{contactInfo.phoneNumber}</Typography>
      </Grid>
    </Grid>
  );
};

export default PrimaryContact;
