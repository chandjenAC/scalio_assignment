import { Grid, makeStyles, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FormikDatePicker from "../common/atoms/FormikDatePicker/FormikDatePicker";
import Loader from "../common/atoms/Loaders/Loader";
import DialogBox from "../common/molecules/DialogBox/DialogBox";

const useStyles = makeStyles((theme) => ({
  form: {
    height: "100%",
  },
  formGridContainer: {
    position: "relative",
    height: "100%",
  },
  fieldContainer: {
    padding: 8,
  },
  submitButtonContainer: {
    width: "100%",
    padding: "16px 16px 0px 16px",
  },
  buttonText: {
    color: theme.palette.primary.dark,
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  errors: {
    color: theme.palette.error.main,
    display: "block",
    fontSize: 12,
  },
}));

const CalculateFee = (props) => {
  const { resource, clientInfo, setOpenCalculateFeePopup, calculate } = props;
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
    setOpenCalculateFeePopup(false);
  };

  //   const validationSchema = Yup.object().shape({
  //     customerTopId: Yup.string().required(
  //       getResourceValueByKey(resource, "REQUIRED", "Required!")
  //     ),
  //     fromDate: Yup.date()
  //       .nullable()
  //       .required(getResourceValueByKey(resource, "REQUIRED", "Required!")),
  //     toDate: Yup.date()
  //       .nullable()
  //       .required(getResourceValueByKey(resource, "REQUIRED", "Required!")),
  //   });

  return (
    <DialogBox
      open={true}
      handleClose={handleClose}
      title={getResourceValueByKey(resource, "CALCULATE_FEE", "Calculate Fee")}
    >
      <Formik
        initialValues={{
          // customerTopId: "",
          fromDate: null,
          toDate: null,
        }}
        //   validationSchema={validationSchema}
        validate={(values) => {
          const errors = {};
          if (!values.fromDate) {
            errors.fromDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.toDate) {
            errors.toDate = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          values.customerTopId = clientInfo.clientTopId;
          calculate(values, {
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
                {isSubmitting && <Loader />}
              </div>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="fromDate"
                  label={getResourceValueByKey(
                    resource,
                    "FROM_DATE",
                    "From Date"
                  )}
                />
                <span className={classes.errors}>{errors.fromDate}</span>
              </Grid>
              <Grid item className={classes.fieldContainer}>
                <Field
                  component={FormikDatePicker}
                  name="toDate"
                  label={getResourceValueByKey(resource, "TO_DATE", "To Date")}
                />
                <span className={classes.errors}>{errors.toDate}</span>
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
                    {getResourceValueByKey(resource, "CALCULATE", "Calculate")}
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

export default CalculateFee;
