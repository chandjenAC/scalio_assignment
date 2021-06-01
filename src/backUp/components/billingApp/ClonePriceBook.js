import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import { Form, Formik, Field } from "formik";
import { Button, Grid, makeStyles } from "@material-ui/core";
import FormikDatePicker from "../common/atoms/FormikDatePicker/FormikDatePicker";
import Loader from "../common/atoms/Loaders/Loader";
import FormikSelect from "../common/atoms/FormikSelect/FormikSelect";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  form: {
    height: "100%",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  formGridContainer: {
    position: "relative",
    height: "100%",
  },
  errors: {
    color: theme.palette.error.main,
    display: "block",
    fontSize: 12,
  },
  fieldContainer: {
    padding: "6px 10px",
  },
  buttonText: {
    color: theme.palette.primary.dark,
  },
  submitButtonContainer: {
    width: "100%",
    padding: "16px 16px 0px 16px",
  },
}));

const ClonePriceBook = (props) => {
  const {
    resource,
    billingProjectId,
    selectedBillingProjectId,
    clonePriceBook,
    setClonePriceBook,
    billingProjectOptions,
    handleChangeBillingProject,
    priceBookOptions,
    currencyOptions,
    loading,
  } = props;

  const classes = useStyles();

  const handleClose = (e) => {
    e.stopPropagation();
    setClonePriceBook(false);
  };

  return (
    <DialogBox
      open={true}
      showTitleDivider={true}
      handleClose={handleClose}
      title={getResourceValueByKey(
        resource,
        "CLONE_PRICE_BOOK",
        "Clone Price Book"
      )}
    >
      <Formik
        initialValues={{
          priceBookName: "",
          version: "",
          contractNo: "",
          contractStartDate: null,
          contractEndDate: null,
          billingProjectId: "",
          priceBook: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.priceBookName) {
            errors.priceBookName = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.contractNo) {
            errors.contractNo = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.contractStartDate) {
            errors.contractStartDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.contractEndDate) {
            errors.contractEndDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.billingProjectId) {
            errors.billingProjectId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.priceBook) {
            errors.priceBook = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.ccy) {
            errors.ccy = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.version) {
            errors.version = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          values.currentBillingProjectId = billingProjectId;
          clonePriceBook(values, {
            onSuccess: () => {
              setSubmitting(false);
            },
            onError: () => {
              setSubmitting(false);
            },
          });
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form className={classes.form}>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              direction="column"
              className={classes.formGridContainer}
            >
              <div className={classes.centerDiv}>
                {(isSubmitting || loading) && <Loader />}
              </div>

              <Grid item className={classes.fieldContainer}>
                <Field
                  component={TextField}
                  name="priceBookName"
                  placeholder={getResourceValueByKey(
                    resource,
                    "PRICE_BOOK_NAME",
                    "Price Book Name"
                  )}
                />
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={TextField}
                  name="contractNo"
                  label={getResourceValueByKey(
                    resource,
                    "CONTRACT_NUMBER",
                    "Contract Number"
                  )}
                />
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={TextField}
                  name="version"
                  label={getResourceValueByKey(resource, "VERSION", "Version")}
                />
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="contractStartDate"
                  label={getResourceValueByKey(
                    resource,
                    "CONTRACT_START_DATE",
                    "Contract Start Date"
                  )}
                />
                <span className={classes.errors}>
                  {errors.contractStartDate}
                </span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="contractEndDate"
                  label={getResourceValueByKey(
                    resource,
                    "CONTRACT_END_DATE",
                    "Contract End Date"
                  )}
                />
                <span className={classes.errors}>
                  {errors.contractStartDate}
                </span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  name="ccy"
                  component={FormikSelect}
                  minWidth={155}
                  label={getResourceValueByKey(
                    resource,
                    "SELECT_CURRENCY",
                    "Select Currency"
                  )}
                  options={currencyOptions}
                />
                <span className={classes.errors}>{errors.ccy}</span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  name="billingProjectId"
                  component={FormikSelect}
                  minWidth={155}
                  onChange={handleChangeBillingProject}
                  label={getResourceValueByKey(
                    resource,
                    "SELECT_BILLING_PROJECT",
                    "Select Billing Project"
                  )}
                  options={billingProjectOptions}
                />
                <span className={classes.errors}>
                  {errors.billingProjectId}
                </span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  name="priceBook"
                  component={FormikSelect}
                  minWidth={155}
                  disabled={!selectedBillingProjectId}
                  label={getResourceValueByKey(
                    resource,
                    "SELECT_PRICE_BOOK",
                    "Select Price Book"
                  )}
                  options={priceBookOptions}
                />
                <span className={classes.errors}>{errors.priceBook}</span>
              </Grid>
              <Grid item className={classes.submitButtonContainer}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  style={{ float: "right" }}
                >
                  <span className={classes.buttonText}>
                    {getResourceValueByKey(resource, "CLONE", "Clone")}
                  </span>
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </DialogBox>
  );
};

export default ClonePriceBook;
