import React from "react";
import { Button, FormControl, Grid, Input } from "@material-ui/core";
import { InputAdornment, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  paymentTagButton: { padding: "1px 16px" },
  paymentTagButtonText: { fontWeight: 400, fontSize: 12 },
  paymentTagButtonSelected: {
    padding: "1px 16px",
    backgroundColor: theme.palette.primary.light,
  },
  inputAdornment: { fontSize: 10 },
  textField: {
    width: "25ch",
  },
  disabledInput: { color: theme.palette.common.black },
}));

const AmountReceived = (props) => {
  const {
    resource,
    index,
    handlePaymentTagClick,
    isSelected,
    amount,
    handleChangeAmount,
    ccy,
  } = props;

  const classes = useStyles();
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <Button
          variant="outlined"
          classes={{
            root: isSelected("Paid", index)
              ? classes.paymentTagButtonSelected
              : classes.paymentTagButton,
            label: classes.paymentTagButtonText,
          }}
          onClick={() => handlePaymentTagClick("Paid", index)}
        >
          {getResourceValueByKey(resource, "FULL", "Full")}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          classes={{
            root: isSelected("Partially Paid", index)
              ? classes.paymentTagButtonSelected
              : classes.paymentTagButton,
            label: classes.paymentTagButtonText,
          }}
          onClick={() => handlePaymentTagClick("Partially Paid", index)}
        >
          {getResourceValueByKey(resource, "PARTIAL", "Partial")}
        </Button>
      </Grid>
      <Grid item>
        <FormControl className={classes.textField}>
          <Input
            value={amount}
            type="number"
            classes={{ disabled: classes.disabledInput }}
            // disabled
            onChange={(e) => handleChangeAmount(e, index)}
            placeholder={getResourceValueByKey(resource, "AMOUNT", "Amount")}
            endAdornment={
              <InputAdornment
                position="end"
                classes={{ root: classes.inputAdornment }}
              >
                <Typography variant="caption" color="textSecondary">
                  {ccy}
                </Typography>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AmountReceived;
