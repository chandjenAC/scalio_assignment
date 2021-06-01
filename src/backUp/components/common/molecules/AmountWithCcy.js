import React from "react";
import { Grid, Typography } from "@material-ui/core";

const AmountWithCcy = ({ amount, ccy }) => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Typography variant="subtitle2">{amount}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary">
          &nbsp;&nbsp;{ccy}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AmountWithCcy;
