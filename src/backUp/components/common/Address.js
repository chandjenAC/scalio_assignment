import React from "react";
import { Typography, Grid } from "@material-ui/core";

const Address = (props) => {
  const { address, label, padding } = props;
  return (
    <Grid
      container
      direction="column"
      style={{ padding: padding ? padding : 4 }}
      alignItems="flex-start"
    >
      {label && (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
        </Grid>
      )}
      {address.streetName && (
        <Grid item>
          <Typography variant="subtitle2">{address.streetName}</Typography>
        </Grid>
      )}
      {address.townName && (
        <Grid item>
          <Typography variant="subtitle2">{address.townName}</Typography>
        </Grid>
      )}
      {address.state && (
        <Grid item>
          <Typography variant="subtitle2">{address.state}</Typography>
        </Grid>
      )}
      {address.countryCode && address.postalCode && (
        <Grid item>
          <Typography variant="subtitle2">
            {address.countryCode}- {address.postalCode}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Address;
