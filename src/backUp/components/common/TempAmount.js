import React from "react";
import { Typography, Grid } from "@material-ui/core";

const TempAmount = (props) => {
  const { label, amount, data, baseCcy } = props;

  let locale = localStorage.getItem("locale")||"en-US"
  let formattedAmount = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount ? (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      style={{ padding: "4px" }}
    >
      {label && (
        <Grid item>
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
      )}

      <Grid item>
        <Typography variant="body2">
          {data.amount ? data.amount.ccy : baseCcy} {formattedAmount}
        </Typography>
      </Grid>
    </Grid>
  ) : null;
};

export default TempAmount;
