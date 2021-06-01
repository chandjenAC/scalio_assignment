import React from "react";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import AmountReceived from "./AmountReceived";
import { formatAmountByCcy } from "../../utils";
import { format, parseISO } from "date-fns";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { billingStatementLoadOptions } from "../../utils/loadOptions";
import AsyncPaginatedSelect from "../../containers/Common/AsyncPaginatedSelect";
import TableRow from "../common/molecules/TableRow";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  accountInfo: { position: "relative" },
  formControlRoot: { margin: 0 },
}));

const PaymentLog = (props) => {
  const {
    resource,
    index,
    log,
    handleSelectRow,
    handleChangeSearch,
    isSelected,
    handleChangeAmount,
    handlePaymentTagClick,
    handleDateChange,
  } = props;

  const classes = useStyles();

  const renderLabelValue = (label, value) => (
    <Grid container alignItems="baseline">
      <Grid item>
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">&nbsp;{value}</Typography>
      </Grid>
    </Grid>
  );

  const formatOptionLabel = ({ customerName, invoiceNumber }) => {
    return (
      <>
        {renderLabelValue(
          getResourceValueByKey(resource, "CLIENT:", "Client:"),
          customerName
        )}
        {renderLabelValue(
          getResourceValueByKey(resource, "INVOICE_NO:", "Invoice No:"),
          invoiceNumber
        )}
      </>
    );
  };

  const getColumn1 = () => (
    <Grid
      container
      alignItems="center"
      justify={log.id ? "space-around" : "flex-start"}
      className={classes.accountInfo}
    >
      <Grid item sm={2} md={2} lg={2}>
        <FormControlLabel
          classes={{ root: classes.formControlRoot }}
          control={
            <Checkbox
              checked={Boolean(log.isRowSelected)}
              onChange={(e) => handleSelectRow(e, index)}
              color="primary"
            />
          }
        />
      </Grid>
      {log.id ? (
        <>
          <Grid item sm={5} md={5} lg={5}>
            <Typography variant="subtitle1" align="left">
              {log.client.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="left">
              {log.invoiceNumber}
            </Typography>
          </Grid>
          <Grid item sm={5} md={5} lg={5}>
            <Typography variant="subtitle1" align="left">
              {formatAmountByCcy({
                amount: log.statementDetails.amount,
                ccy: log.statementDetails.ccy,
                minFractionDigits: 2,
                maxFractionDigits: 2,
                currencyDisplay: "code",
                notation: "standard",
              })}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="left">
              {`${getResourceValueByKey(resource, "DUE:", "Due:")} ${format(
                new Date(parseISO(log.statementDetails.dueDate)),
                "MM/dd/yyyy"
              )}`}
            </Typography>
          </Grid>
        </>
      ) : (
        <Grid item sm={9} md={9} lg={9}>
          <AsyncPaginatedSelect
            formatOptionLabel={formatOptionLabel}
            placeholder={getResourceValueByKey(
              resource,
              "CLIENT/_INVOICE_NUMBER",
              "Client/ Invoice Number"
            )}
            onChange={(e) => handleChangeSearch(e, index)}
            loadOptions={billingStatementLoadOptions}
          />
        </Grid>
      )}
    </Grid>
  );

  const getColumn2 = () => (
    <AmountReceived
      resource={resource}
      index={index}
      data={log}
      isSelected={isSelected}
      ccy={"INR"}
      amount={log.paidAmount.value}
      handleChangeAmount={handleChangeAmount}
      handlePaymentTagClick={handlePaymentTagClick}
    />
  );

  const getColumn3 = () => (
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
        value={log.dateReceived && new Date(parseISO(log.dateReceived))}
        onChange={(e) => handleDateChange(e, index)}
      />
    </MuiPickersUtilsProvider>
  );

  return (
    <TableRow
      column1={getColumn1()}
      column2={getColumn2()}
      column3={getColumn3()}
    />
  );
};

export default PaymentLog;
