import React from "react";
import { IconButton } from "@material-ui/core";
import { Button, Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Loader from "../common/atoms/Loaders/Loader";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AmountReceived from "./AmountReceived";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 0,
  },
  button: { padding: "4px 45px" },
  paymentTagButtonCont: { marginTop: 8 },
  keyboardDatePicker: {
    margin: 0,
    "& svg": {
      width: "1rem",
      height: "1rem",
    },
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const LogPaymentForm = (props) => {
  const {
    resource,
    statementData,
    isLoading,
    amount,
    date,
    handleClickCancel,
    handleClickApply,
    getButtonDisable,
    handlePaymentTagClick,
    handleChangeAmount,
    isSelected,
    handleDateChange,
  } = props;

  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={1}>
      <div className={classes.centerDiv}>{isLoading && <Loader />}</div>
      <Grid item>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="subtitle2">
              {getResourceValueByKey(resource, "LOG_PAYMENT", "Log Payment")}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleClickCancel}
              className={classes.iconButton}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {getResourceValueByKey(
            resource,
            "ENTER_THE_AMOUNT_AND_DATE_PAYMENT_WAS_RECEIVED_BY_CLIENT.",
            "Enter the amount and date payment was received by client."
          )}
        </Typography>
      </Grid>
      <Grid item className={classes.paymentTagButtonCont}>
        <AmountReceived
          resource={resource}
          isSelected={isSelected}
          ccy={statementData.statementAmount.ccy}
          amount={amount}
          handleChangeAmount={handleChangeAmount}
          handlePaymentTagClick={handlePaymentTagClick}
        />
      </Grid>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.keyboardDatePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            autoOk={true}
            label={getResourceValueByKey(resource, "DATE", "Date")}
            placeholder="mm/dd/yyyy"
            value={date}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Button className={classes.button} onClick={handleClickCancel}>
              {getResourceValueByKey(resource, "CANCEL", "Cancel")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              disabled={getButtonDisable()}
              onClick={handleClickApply}
            >
              {getResourceValueByKey(resource, "APPLY", "Apply")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogPaymentForm;
