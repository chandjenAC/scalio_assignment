import React from "react";
import { makeStyles, InputAdornment } from "@material-ui/core";
import { getResourceValueByKey } from "../utils/resourceHelper";
import { ReactComponent as YogiWebbLogo } from "../images/yogiWebb.svg";
import Loader from "./common/atoms/Loaders/Loader";
import PasswordIcon from "@material-ui/icons/LockOutlined";
import EmailIcon from "@material-ui/icons/MailOutline";
import { Formik, Form, Field } from "formik";
import { Button, Paper, Grid, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";

const SYS_USER_MAIL_ID =
  process.env.REACT_APP_SYS_USER_MAIL_ID || "sysuser@topverse.com";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.grey[50],
  },
  loginContainer: {
    borderRadius: "20px",
    height: "450px",
  },
  form: {
    height: "100%",
  },
  logoContainer: { margin: "40px 40px 60px 40px" },
  logo: {
    width: "90px",
    height: "auto",
  },
  fieldContainer: {
    padding: 16,
  },
  formGridContainer: {
    position: "relative",
    height: "100%",
  },
  submitButtonContainer: {
    padding: 16,
  },
  buttonText: {
    color: theme.palette.primary.dark,
  },
  icon: {
    fontSize: 20,
    color: theme.palette.grey[800],
  },
  errorDiv: {
    position: "absolute",
    width: "100%",
    bottom: "6%",
    left: "50%",
    transform: "translate(-50%, 0%)",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Login = (props) => {
  const { resource, isLoading, onFormSubmit, clearErrorMsg, error } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid
        style={{ height: "100vh" }}
        container
        justify="center"
        alignItems="center"
      >
        {isLoading && (
          <div className={classes.centerDiv}>
            <Loader />
          </div>
        )}
        <Grid item xs={11} sm={6} md={4} lg={4}>
          <Paper className={classes.loginContainer} elevation={3}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = getResourceValueByKey(
                    resource,
                    "REQUIRED",
                    "Required!"
                  );
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = getResourceValueByKey(
                    resource,
                    "INVALID_EMAIL_ADDRESS",
                    "Invalid email address!"
                  );
                } else if (values.email && values.email === SYS_USER_MAIL_ID) {
                  errors.email = getResourceValueByKey(
                    resource,
                    "SYS_USER_LOGIN_DISABLED",
                    "System user login is disabled."
                  );
                }
                return errors;
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
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    className={classes.formGridContainer}
                  >
                    <Grid item className={classes.logoContainer}>
                      <YogiWebbLogo className={classes.logo} />
                    </Grid>

                    <Grid item className={classes.fieldContainer}>
                      <Field
                        component={TextField}
                        name="email"
                        type="email"
                        placeholder={getResourceValueByKey(
                          resource,
                          "EMAIL/USERNAME",
                          "Email/Username"
                        )}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon className={classes.icon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item className={classes.fieldContainer}>
                      <Field
                        component={TextField}
                        type="password"
                        placeholder={getResourceValueByKey(
                          resource,
                          "PASSWORD",
                          "Password"
                        )}
                        name="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PasswordIcon className={classes.icon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item className={classes.submitButtonContainer}>
                      <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        <span className={classes.buttonText}>
                          {getResourceValueByKey(
                            resource,
                            "LET'S_GO!",
                            "Let's Go!"
                          )}
                        </span>
                      </Button>
                    </Grid>

                    <Grid item className={classes.errorDiv}>
                      {error && (
                        <Typography variant="caption" color="error">
                          {error}
                          {clearErrorMsg()}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
