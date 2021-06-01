import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import { Button, Grid, makeStyles, Typography, Box } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import Loader from "../common/atoms/Loaders/Loader";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: 0,
    fontWeight: 400,
    minWidth: "auto",
  },
  form: { position: "relative" },
  firstSubtitle: { margin: "4px 0px 10px 0px" },
  subtitle: { margin: "20px 0px 10px 0px" },
  lastFieldBox: {
    padding: "8px 0px",
  },
  submitButtonContainer: {
    float: "right",
  },
  submitButton: {
    float: "right",
  },
}));

const EditBillingProjectDetails = (props) => {
  const { resource, billingDetails } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const onButtonClick = (e) => {
    e.stopPropagation();
    handleOpen(e);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const onFormSubmit = (values) => {
    const {
      accountName,
      accountNumber,
      cycleDate,
      cyclePeriod,
      firstName,
      LastName,
      emailId,
      phoneNumber,
      streetName,
      townName,
      state,
      postalCode,
      countryCode,
    } = values;
    billingDetails.billingAccount.accountName = accountName;
    billingDetails.billingAccount.accountNumber = accountNumber;
    billingDetails.billingCycle.cycleDate = cycleDate;
    billingDetails.billingCycle.cyclePeriod = cyclePeriod;
    billingDetails.contactDetails.firstName = firstName;
    billingDetails.contactDetails.LastName = LastName;
    billingDetails.contactDetails.emailId = emailId;
    billingDetails.contactDetails.phoneNumber = phoneNumber;
    billingDetails.billingAddress.streetName = streetName;
    billingDetails.billingAddress.townName = townName;
    billingDetails.billingAddress.state = state;
    billingDetails.billingAddress.postalCode = postalCode;
    billingDetails.billingAddress.countryCode = countryCode;
    setOpen(false);
  };

  return (
    <>
      <Button className={classes.button} onClick={(e) => onButtonClick(e)}>
        {getResourceValueByKey(resource, "CLICK_TO_EDIT", "Click to edit")}
      </Button>
      <DialogBox
        open={open}
        showTitleDivider={true}
        handleClose={handleClose}
        // dialogActions={dialogActions}
        title={getResourceValueByKey(
          resource,
          "BILLING_DETAILS",
          "Billing Details"
        )}
      >
        <Formik
          initialValues={{
            accountName: billingDetails.billingAccount.accountName || "",
            accountNumber: billingDetails.billingAccount.accountNumber || "",
            cycleDate: billingDetails.billingCycle.cycleDate || "",
            cyclePeriod: billingDetails.billingCycle.cyclePeriod || "",
            firstName: billingDetails.contactDetails.firstName || "",
            LastName: billingDetails.contactDetails.LastName || "",
            emailId: billingDetails.contactDetails.emailId || "",
            phoneNumber: billingDetails.contactDetails.phoneNumber || "",
            streetName: billingDetails.billingAddress.streetName || "",
            townName: billingDetails.billingAddress.townName || "",
            state: billingDetails.billingAddress.state || "",
            postalCode: billingDetails.billingAddress.postalCode || "",
            countryCode: billingDetails.billingAddress.countryCode || "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            onFormSubmit(values);
            setTimeout(() => {
              setSubmitting(false);
            }, 200);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              <div className={classes.centerDiv}>
                {isSubmitting && <Loader />}
              </div>
              <Typography variant="subtitle2" className={classes.firstSubtitle}>
                {getResourceValueByKey(
                  resource,
                  "BILLING_ACCOUNT",
                  "Billing Account"
                )}
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name="accountName"
                    label={getResourceValueByKey(
                      resource,
                      "ACCOUNT_NAME",
                      "Account Name"
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="accountNumber"
                    label={getResourceValueByKey(
                      resource,
                      "ACCOUNT_NUMBER",
                      "Account Number"
                    )}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" className={classes.subtitle}>
                {getResourceValueByKey(
                  resource,
                  "BILLING_CYCLE",
                  "Billing Cycle"
                )}
              </Typography>

              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name="cycleDate"
                    label={getResourceValueByKey(
                      resource,
                      "CYCLE_DATE",
                      "Cycle Date"
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="cyclePeriod"
                    label={getResourceValueByKey(
                      resource,
                      "CYCLE_PERIOD",
                      "Cycle Period"
                    )}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" className={classes.subtitle}>
                {getResourceValueByKey(resource, "CONTACT", "Contact")}
              </Typography>

              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name="firstName"
                    label={getResourceValueByKey(
                      resource,
                      "FIRST_NAME",
                      "First Name"
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="LastName"
                    label={getResourceValueByKey(
                      resource,
                      "LAST_NAME",
                      "Last Name"
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name="emailId"
                    label={getResourceValueByKey(
                      resource,
                      "EMAIL_ID",
                      "Email ID"
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="phoneNumber"
                    label={getResourceValueByKey(
                      resource,
                      "PHONE_NUMBER",
                      "Phone Number"
                    )}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" className={classes.subtitle}>
                {getResourceValueByKey(
                  resource,
                  "BILLING_ADDRESS",
                  "Billing Address"
                )}
              </Typography>

              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name="streetName"
                    label={getResourceValueByKey(resource, "STREET", "Street")}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="townName"
                    label={getResourceValueByKey(resource, "TOWN", "Town")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name="state"
                    label={getResourceValueByKey(resource, "STATE", "State")}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="postalCode"
                    label={getResourceValueByKey(
                      resource,
                      "POSTAL_CODE",
                      "Postal Code"
                    )}
                  />
                </Grid>
              </Grid>
              <Box className={classes.lastFieldBox}>
                <Field
                  component={TextField}
                  name="countryCode"
                  label={getResourceValueByKey(
                    resource,
                    "COUNTRY_CODE",
                    "Country Code"
                  )}
                />
              </Box>

              <Box className={classes.submitButtonContainer}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  className={classes.submitButton}
                >
                  <span className={classes.buttonText}>
                    {getResourceValueByKey(resource, "OK", "Ok")}
                  </span>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogBox>
    </>
  );
};

export default EditBillingProjectDetails;
