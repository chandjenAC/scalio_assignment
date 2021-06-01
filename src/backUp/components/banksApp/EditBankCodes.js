import React, { useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import { Button, Grid, makeStyles } from "@material-ui/core";
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
  fieldContainer: {
    padding: 16,
  },
  formGridContainer: {
    position: "relative",
    height: "100%",
  },
  submitButtonContainer: {
    float: "right",
  },
  submitButton: {
    float: "right",
  },
}));

const EditBankCodes = (props) => {
  const { resource, rowData } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const onButtonClick = (e) => {
    e.stopPropagation();
    handleOpen(e);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const onFormSubmit = (values) => {
    const { ibanId, chipsId, swiftId, ifscCode, micrCode, bbanId } = values;
    if (ibanId) {
      rowData.ibanId = ibanId;
    }
    if (chipsId) {
      rowData.chipsId = chipsId;
    }
    if (swiftId) {
      rowData.swiftId = swiftId;
    }
    if (ifscCode) {
      rowData.ifscCode = ifscCode;
    }
    if (micrCode) {
      rowData.micrCode = micrCode;
    }
    if (bbanId) {
      rowData.bbanId = bbanId;
    }
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
        title={getResourceValueByKey(resource, "BANK_CODES", "Bank Codes")}
      >
        <Formik
          initialValues={{
            ibanId: rowData.ibanId || "",
            chipsId: rowData.chipsId || "",
            swiftId: rowData.swiftId || "",
            ifscCode: rowData.ifscCode || "",
            micrCode: rowData.micrCode || "",
            bbanId: rowData.bbanId || "",
          }}
          //   validate={(values) => {
          //     const errors = {};
          //     if (!/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/i.test(values.ifscCode)) {
          //       errors.ifscCode = getResourceValueByKey(
          //         resource,
          //         "INVALID_IFSC_CODE",
          //         "Invalid IFSC Code!"
          //       );
          //     }
          //     if (!/[0-9]{10}/i.test(values.ifscCode)) {
          //       errors.micrCode = getResourceValueByKey(
          //         resource,
          //         "INVALID_MICR_CODE",
          //         "Invalid MICR Code!"
          //       );
          //     }
          //     if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i.test(values.swiftId)) {
          //       errors.swiftId = getResourceValueByKey(
          //         resource,
          //         "INVALID_SWIFT_ID",
          //         "Invalid SWIFT ID!"
          //       );
          //     }
          //     return errors;
          //   }}
          onSubmit={(values, { setSubmitting }) => {
            onFormSubmit(values);
            setTimeout(() => {
              setSubmitting(false);
            }, 200);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              <Grid
                container
                // alignItems="center"
                // justify="center"
                direction="column"
                className={classes.formGridContainer}
              >
                <div className={classes.centerDiv}>
                  {isSubmitting && <Loader />}
                </div>

                <Grid item className={classes.fieldContainer}>
                  <Field
                    component={TextField}
                    name="ifscCode"
                    placeholder={getResourceValueByKey(
                      resource,
                      "IFSC_CODE",
                      "IFSC Code"
                    )}
                  />
                </Grid>
                <Grid item className={classes.fieldContainer}>
                  <Field
                    component={TextField}
                    name="micrCode"
                    placeholder={getResourceValueByKey(
                      resource,
                      "MICR_CODE",
                      "MICR Code"
                    )}
                  />
                </Grid>
                <Grid item className={classes.fieldContainer}>
                  <Field
                    component={TextField}
                    name="swiftId"
                    placeholder={getResourceValueByKey(
                      resource,
                      "SWIFT_ID",
                      "SWIFT ID"
                    )}
                  />
                </Grid>
                <Grid item className={classes.fieldContainer}>
                  <Field
                    component={TextField}
                    name="chipsId"
                    placeholder={getResourceValueByKey(
                      resource,
                      "CHIPS_ID",
                      "CHIPS ID"
                    )}
                  />
                </Grid>
                <Grid item className={classes.fieldContainer}>
                  <Field
                    component={TextField}
                    name="ibanId"
                    placeholder={getResourceValueByKey(
                      resource,
                      "IBAN_ID",
                      "IBAN ID"
                    )}
                  />
                </Grid>
                <Grid item className={classes.fieldContainer}>
                  <Field
                    component={TextField}
                    name="bbanId"
                    placeholder={getResourceValueByKey(
                      resource,
                      "BBAN_ID",
                      "BBAN ID"
                    )}
                  />
                </Grid>

                <Grid item className={classes.submitButtonContainer}>
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
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogBox>
    </>
  );
};

export default EditBankCodes;
