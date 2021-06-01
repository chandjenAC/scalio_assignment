import React, { useEffect } from "react";
import { TextField } from "formik-material-ui";
import { Field, Form, Formik } from "formik";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Loader from "../common/atoms/Loaders/Loader";

const useStyles = makeStyles((theme) => ({
  formGridContainer: {
    width: "100%",
  },
  fieldContainer: {
    width: "100%",
    padding: 6,
  },
  textField: {
    width: "100%",
  },
  submitButtonContainer: {
    width: "100%",
  },
  cancelButton: {
    float: "left",
  },
  submitButton: {
    float: "right",
  },
}));

const AddNoteForm = (props) => {
  const { resource, entityId, addNoteMutation, handleClickCancel } = props;

  const classes = useStyles();
  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Formik
      initialValues={{
        note: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.note) {
          errors.note = getResourceValueByKey(
            resource,
            "REQUIRED!",
            "Required!"
          );
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.entityId = entityId;
        addNoteMutation(values, {
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
                component={TextField}
                className={classes.textField}
                name="note"
                label={getResourceValueByKey(resource, "ADD_NOTE", "Add Note")}
              />
            </Grid>
            <Grid item className={classes.submitButtonContainer}>
              <Button
                onClick={handleClickCancel}
                className={classes.cancelButton}
              >
                {getResourceValueByKey(resource, "CANCEL", "Cancel")}
              </Button>

              <Button
                color="primary"
                type="submit"
                disabled={isSubmitting}
                className={classes.submitButton}
              >
                <span className={classes.buttonText}>
                  {getResourceValueByKey(resource, "ADD", "Add")}
                </span>
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddNoteForm;
