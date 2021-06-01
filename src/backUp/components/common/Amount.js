import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { formatAmount } from "../../utils";

const Amount = (props) => {
  const { label, amount } = props;

  let formattedAmount = formatAmount(amount.value);

  return formattedAmount ? (
    <Grid
      container
      direction="column"
      style={{ padding: "4px" }}
      alignItems="flex-start"
    >
      {label && (
        <Grid item>
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
      )}
      <Typography variant="body2">
        {amount.ccy} {formattedAmount}
      </Typography>
    </Grid>
  ) : null;
};

export default Amount;
