import React, { useEffect, useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FormatDate from "../common/FormatDate";
import { Box, Button, Grid, Popover } from "@material-ui/core";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import ApplyIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Clear";
import { Field, Form, Formik } from "formik";
import Loader from "../common/atoms/Loaders/Loader";
import { TextField } from "formik-material-ui";
import ViewNotes from "./ViewNotes";
import ViewReminders from "./ViewReminders";
import StatementStatusTags from "./StatementStatusTags";

const useStyles = makeStyles((theme) => ({
  billingHeading: {
    fontWeight: 600,
  },
  invoiceDetailBox: {
    border: "1px solid #efefef",
    width: "95%",
    margin: "auto",
    marginTop: 8,
    borderRadius: 10,
  },
  mainContSytle: { padding: "32px 16px 0px 16px", flexWrap: "noWrap" },
  buttonRoot: {
    padding: "2px 10px",
  },
  buttonText: {
    color: theme.palette.common.black,
  },
  iconButton: {
    padding: 0,
  },
  icon: {
    verticalAlign: "middle",
  },
  popoverPaper: {
    minWidth: 250,
    maxWidth: 450,
    overflowX: "scroll",
    padding: "24px 8px 6px 8px",
    position: "relative",
  },
  approveButtonCont: {
    marginLeft: 8,
  },
  approveButtonText: {
    fontWeight: 400,
  },
}));

const StatementHeader = (props) => {
  const {
    resource,
    statementData,
    reminders,
    updateInvoiceDetailsMutation,
    approveStatementMutation,
  } = props;

  const [editInvoiceNumber, setEditInvoiceNumber] = useState(false);
  const [viewNotes, setViewNotes] = useState(false);
  const [viewReminders, setViewReminders] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  let notesCount = 0;

  if (statementData?.notes?.length > 0) {
    notesCount = statementData.notes.length;
  }

  const handleClick = (e, flag) => {
    setAnchorEl(e.currentTarget);
    if (flag === "notes") {
      setViewNotes(true);
    } else {
      setViewReminders(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (viewNotes) {
      setViewNotes(false);
    } else {
      setViewReminders(false);
    }
  };

  const renderDateWithLabel = (label, date) => {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <FormatDate typoVariant="subtitle1" date={date} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const getTagsWithNotesAndReminders = () => {
    return (
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <StatementStatusTags
            resource={resource}
            status={statementData.status}
            paidStatus={statementData.paidStatus}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => handleClick(e, "notes")}
                classes={{
                  root: classes.buttonRoot,
                  label: classes.buttonText,
                }}
              >
                {`${getResourceValueByKey(
                  resource,
                  "NOTE",
                  "Note"
                )}(${notesCount})`}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => handleClick(e, "reminders")}
                classes={{
                  root: classes.buttonRoot,
                  label: classes.buttonText,
                }}
              >
                {`${getResourceValueByKey(resource, "REMINDER", "Reminder")}(${
                  reminders.length
                })`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const getInvoiceNumber = () => {
    return (
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {getResourceValueByKey(
              resource,
              "INVOICE_NUMBER:",
              "Invoice Number:"
            )}
          </Typography>
        </Grid>
        {statementData?.invoiceNumber && (
          <Grid item>
            <Typography variant="subtitle1">
              {statementData.invoiceNumber}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <IconButton
            className={classes.iconButton}
            onClick={() => setEditInvoiceNumber(true)}
          >
            <EditIcon color="primary" fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const getEditInvoiceNumber = () => {
    return (
      <Grid container alignItems="flex-end" spacing={1}>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {getResourceValueByKey(
              resource,
              "INVOICE_NUMBER:",
              "Invoice Number:"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              invoiceNumber: statementData.invoiceNumber || "",
            }}
            onSubmit={(values) => {
              values.id = statementData.id;
              updateInvoiceDetailsMutation(values);
              setEditInvoiceNumber(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container alignItems="flex-end">
                  <div className={classes.centerDiv}>
                    {isSubmitting && <Loader />}
                  </div>
                  <Grid item className={classes.fieldContainer}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      name="invoiceNumber"
                      label={getResourceValueByKey(
                        resource,
                        "INVOICE_NUMBER",
                        "Invoice Number"
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => setEditInvoiceNumber(false)}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          type="submit"
                          disabled={isSubmitting}
                          className={classes.iconButton}
                        >
                          <ApplyIcon color="primary" fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    );
  };

  const getBillingHeadingWithInvoiceNumber = () => {
    return (
      <Grid container justify="space-between" alignItems="flex-end">
        <Grid item>
          <Typography
            variant="h5"
            align="left"
            className={classes.billingHeading}
          >
            {`${getResourceValueByKey(
              resource,
              "BILLING_FULL_CAPS",
              "BILLING"
            )}: ${statementData.statementNumber}`}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              {editInvoiceNumber ? getEditInvoiceNumber() : getInvoiceNumber()}
            </Grid>

            {statementData.status === "New" && (
              <Grid item className={classes.approveButtonCont}>
                <Button
                  variant="contained"
                  color="primary"
                  classes={{
                    label: classes.approveButtonText,
                  }}
                  onClick={() => approveStatementMutation(statementData.id)}
                >
                  {getResourceValueByKey(resource, "APPROVE", "Approve")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const getRelevantDates = () => {
    return (
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        spacing={1}
        className={classes.invoiceDetailBox}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <FormatDate
                    typoVariant="subtitle1"
                    date={statementData.billingPeriodStartDate}
                  />
                </Grid>
                <Grid item>-</Grid>
                <Grid item>
                  <FormatDate
                    typoVariant="subtitle1"
                    date={statementData.billingPeriodEndDate}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {getResourceValueByKey(
                  resource,
                  "BILLING_PERIOD",
                  "Billing Period"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {renderDateWithLabel(
            getResourceValueByKey(resource, "BILL_DATE", "Bill Date"),
            statementData.statementDate
          )}
        </Grid>
        {statementData.statementSentDate && (
          <Grid item>
            {renderDateWithLabel(
              getResourceValueByKey(resource, "BILLING_SENT", "Billing Sent"),
              statementData.statementSentDate
            )}
          </Grid>
        )}
        {statementData.invoiceSentDate && (
          <Grid item>
            {renderDateWithLabel(
              getResourceValueByKey(resource, "INV_SENT", "Inv Sent"),
              statementData.invoiceSentDate
            )}
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        className={classes.mainContSytle}
        spacing={2}
      >
        <Grid item>{getTagsWithNotesAndReminders()}</Grid>
        <Grid item>{getBillingHeadingWithInvoiceNumber()}</Grid>
        <Grid item>{getRelevantDates()}</Grid>
      </Grid>
      {viewNotes && (
        <Popover
          classes={{ paper: classes.popoverPaper }}
          open={viewNotes}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <ViewNotes resource={resource} notes={statementData.notes} />
        </Popover>
      )}
      {viewReminders && (
        <Popover
          classes={{ paper: classes.popoverPaper }}
          open={viewReminders}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <ViewReminders resource={resource} reminders={reminders} />
        </Popover>
      )}
    </>
  );
};

export default StatementHeader;
