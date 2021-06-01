import React, { useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FormikDatePicker from "../common/atoms/FormikDatePicker/FormikDatePicker";
import Loader from "../common/atoms/Loaders/Loader";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import { TextField } from "formik-material-ui";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";

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
    padding: 8,
  },
  buttonText: {
    color: theme.palette.primary.dark,
  },
  submitButtonContainer: {
    width: "100%",
    padding: "16px 16px 0px 16px",
  },
}));

const GenerateInvoice = (props) => {
  const {
    resource,
    // selectedRows,
    clientInfo,
    generateInvoice,
    setOpenGenerateInvoicePopup,
  } = props;

  const classes = useStyles();
  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpenGenerateInvoicePopup(false);
  };

  return (
    <DialogBox
      open={true}
      handleClose={handleClose}
      title={getResourceValueByKey(
        resource,
        "GENERATE_STATEMENT",
        "Generate Statement"
      )}
    >
      <Formik
        initialValues={{
          invoiceNumber: "",
          invoiceDate: null,
          dueDate: null,
          billingFeeRecordsFromDate: null,
          billingFeeRecordsToDate: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.invoiceNumber) {
            errors.invoiceNumber = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.invoiceDate) {
            errors.invoiceDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.dueDate) {
            errors.dueDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.billingFeeRecordsFromDate) {
            errors.billingFeeRecordsFromDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.billingFeeRecordsToDate) {
            errors.billingFeeRecordsToDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) =>
          generateInvoice(
            { invoiceDetails: values, customerTopId: clientInfo.clientTopId },
            {
              onSuccess: () => {
                if (isMounted) {
                  setSubmitting(false);
                }
              },
              onError: () => {
                if (isMounted) {
                  setSubmitting(false);
                }
              },
            }
          )
        }
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
                {isSubmitting && <Loader />}
              </div>

              <Grid item className={classes.fieldContainer}>
                <Field
                  component={TextField}
                  name="invoiceNumber"
                  placeholder={getResourceValueByKey(
                    resource,
                    "STATEMENT_NUMBER",
                    "Statement Number"
                  )}
                />
                {/* <span className={classes.errors}>{errors.invoiceNumber}</span> */}
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="invoiceDate"
                  label={getResourceValueByKey(
                    resource,
                    "STATEMENT_DATE",
                    "Statement Date"
                  )}
                />
                <span className={classes.errors}>{errors.invoiceDate}</span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="dueDate"
                  label={getResourceValueByKey(
                    resource,
                    "DUE_DATE",
                    "Due Date"
                  )}
                />
                <span className={classes.errors}>{errors.dueDate}</span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="billingFeeRecordsFromDate"
                  label={getResourceValueByKey(
                    resource,
                    "RECORDS_FROM",
                    "Records From"
                  )}
                />
                <span className={classes.errors}>{errors.dueDate}</span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="billingFeeRecordsToDate"
                  label={getResourceValueByKey(
                    resource,
                    "RECORDS_TILL",
                    "Records Till"
                  )}
                />
                <span className={classes.errors}>{errors.dueDate}</span>
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
                    {getResourceValueByKey(resource, "GENERATE", "Generate")}
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

export default GenerateInvoice;
