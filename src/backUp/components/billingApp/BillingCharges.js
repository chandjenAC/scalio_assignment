import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Divider, Grid, IconButton } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import { formatAmount, seperateAndFormatDate } from "../../utils";
import FormatDate from "../common/FormatDate";
// import { ReactComponent as CalenderIcon } from "../../images/common/calendar.svg";
import ApplyIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Clear";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FormikDatePicker from "../common/atoms/FormikDatePicker/FormikDatePicker";
import { Field, Form, Formik } from "formik";
import Loader from "../common/atoms/Loaders/Loader";
import EditIcon from "@material-ui/icons/EditOutlined";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  billingChargesRoot: {
    flexWrap: "noWrap",
    width: "95%",
    margin: "auto",
    marginTop: 20,
    padding: 20,
  },
  divider: {
    height: 4,
    backgroundColor: theme.palette.grey[800],
  },
  feeDetails: {
    padding: "0px 0px 0px 40px",
  },
  seeActivity: {
    cursor: "pointer",
    fontWeight: 600,
  },
  dueDate: {
    marginLeft: "20px",
  },
  dateRangeIconButton: {
    marginLeft: "10px",
    padding: 0,
  },
  iconButton: {
    padding: 0,
  },
  dummy: {
    visibility: "hidden",
  },
}));

const BillingCharges = (props) => {
  const {
    resource,
    statementData,
    viewBillingActivity,
    setViewBillingActivity,
    updateInvoiceDetailsMutation,
  } = props;
  const classes = useStyles();

  const [editDueDate, setEditDueDate] = useState(false);
  const [editMiscCharges, setEditMiscCharges] = useState(false);
  const [editCredits, setEditCredits] = useState(false);

  const getDueDate = () => {
    return (
      <Grid container>
        <Grid item className={classes.dueDate}>
          <Typography variant="subtitle1">
            {getResourceValueByKey(resource, "DUE:", "Due:")}
          </Typography>
        </Grid>
        <Grid item>
          <FormatDate
            padding="0px"
            typoVariant="subtitle1"
            date={statementData.dueDate}
          />
        </Grid>
        <Grid item>
          <IconButton
            className={classes.dateRangeIconButton}
            onClick={() => setEditDueDate(true)}
          >
            <DateRangeIcon color="primary" fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const getEditDueDate = () => {
    return (
      <Grid container alignItems="flex-end">
        <Grid item className={classes.dueDate}>
          <Typography variant="subtitle1">
            {getResourceValueByKey(resource, "DUE:", "Due:")}&nbsp;
          </Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              dueDate: seperateAndFormatDate(statementData.dueDate) || null,
            }}
            onSubmit={(values) => {
              values.id = statementData.id;
              updateInvoiceDetailsMutation(values);
              setEditDueDate(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container alignItems="flex-end">
                  <div className={classes.centerDiv}>
                    {isSubmitting && <Loader />}
                  </div>
                  <Grid item>
                    <Field
                      component={FormikDatePicker}
                      name="dueDate"
                      label={getResourceValueByKey(
                        resource,
                        "DUE_DATE",
                        "Due Date"
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => setEditDueDate(false)}
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

  const getBillingChargesTotalWithDueDate = () => {
    return (
      <Grid container alignItems="baseline" justify="space-between">
        <Grid item>
          <Grid container alignItems="baseline">
            <Grid item>
              <Typography variant="h6">
                {getResourceValueByKey(
                  resource,
                  "BILLING_CHARGES",
                  "Billing Charges"
                )}
              </Typography>
            </Grid>
            <Grid item>{editDueDate ? getEditDueDate() : getDueDate()}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {`${statementData.invoiceAmount.ccy} ${formatAmount(
              statementData.invoiceAmount.value
            )}`}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const getFeesAndCharges = () => {
    return (
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.feeDetails}
        spacing={1}
      >
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body1">
                {getResourceValueByKey(
                  resource,
                  "FEES_&_CHARGES",
                  "Fees & Charges"
                )}
              </Typography>
            </Grid>
            <Grid
              item
              onClick={() => setViewBillingActivity((prevState) => !prevState)}
            >
              <Typography
                variant="body1"
                color="primary"
                className={classes.seeActivity}
              >
                {viewBillingActivity
                  ? getResourceValueByKey(
                      resource,
                      "HIDE_ACTIVITY",
                      "Hide Activity"
                    )
                  : getResourceValueByKey(
                      resource,
                      "SEE_ACTIVITY",
                      "See Activity"
                    )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1">
                {formatAmount(statementData.statementAmount.value)}&nbsp;
              </Typography>
            </Grid>
            <Grid item className={classes.dummy}>
              <IconButton className={classes.iconButton}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const getMiscCharges = () => {
    return (
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="body1">
            {formatAmount(statementData.additionalcharges.value)}&nbsp;
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            className={classes.iconButton}
            onClick={() => setEditMiscCharges(true)}
          >
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const getEditMiscCharges = () => {
    return (
      <Formik
        initialValues={{
          miscCharges: statementData.additionalcharges.value || 0,
        }}
        onSubmit={(values) => {
          let body = { id: "", additionalcharges: { value: 0, ccy: "" } };
          body.id = statementData.id;
          body.additionalcharges.value = values.miscCharges;
          body.additionalcharges.ccy = statementData.statementAmount.ccy;
          updateInvoiceDetailsMutation(body);
          setEditMiscCharges(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container alignItems="flex-end">
              <div className={classes.centerDiv}>
                {isSubmitting && <Loader />}
              </div>
              <Grid item>
                <Field
                  component={TextField}
                  name="miscCharges"
                  type="number"
                  label={getResourceValueByKey(
                    resource,
                    "MISC._CHARGES",
                    "Misc. Charges"
                  )}
                />
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => setEditMiscCharges(false)}
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
    );
  };

  const getMiscellaneousCharges = () => {
    return (
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.feeDetails}
        spacing={1}
      >
        <Grid item>
          <Typography variant="body1">
            {getResourceValueByKey(
              resource,
              "MISCELLANEOUS_CHARGES",
              "Miscellaneous Charges"
            )}
          </Typography>
        </Grid>
        <Grid item>
          {editMiscCharges ? getEditMiscCharges() : getMiscCharges()}
        </Grid>
      </Grid>
    );
  };

  const getCreditsValue = () => {
    return (
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="body1" color="primary">
            {formatAmount(statementData.credits.value)}&nbsp;
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            className={classes.iconButton}
            onClick={() => setEditCredits(true)}
          >
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const getEditCredits = () => {
    return (
      <Formik
        initialValues={{
          credits: statementData.credits.value || 0,
        }}
        onSubmit={(values) => {
          let body = { id: "", credits: { value: 0, ccy: "" } };
          body.id = statementData.id;
          body.credits.value = values.credits;
          body.credits.ccy = statementData.statementAmount.ccy;
          updateInvoiceDetailsMutation(body);
          setEditCredits(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container alignItems="flex-end">
              <div className={classes.centerDiv}>
                {isSubmitting && <Loader />}
              </div>
              <Grid item>
                <Field
                  component={TextField}
                  name="credits"
                  type="number"
                  label={getResourceValueByKey(resource, "CREDITS", "Credits")}
                />
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => setEditCredits(false)}
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
    );
  };

  const getCredits = () => {
    return (
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.feeDetails}
        spacing={1}
      >
        <Grid item>
          <Typography variant="body1">
            {getResourceValueByKey(resource, "CREDITS", "Credits")}
          </Typography>
        </Grid>
        <Grid item>{editCredits ? getEditCredits() : getCreditsValue()}</Grid>
      </Grid>
    );
  };

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      className={classes.billingChargesRoot}
    >
      <Grid item>{getBillingChargesTotalWithDueDate()}</Grid>
      <Grid item>
        <Divider variant="fullWidth" className={classes.divider} />
      </Grid>
      <Grid item>
        {getFeesAndCharges()}
        {getMiscellaneousCharges()}
        {getCredits()}
      </Grid>
    </Grid>
  );
};

export default BillingCharges;
