import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { TextField } from "formik-material-ui";
import { Grid, makeStyles, withStyles } from "@material-ui/core";
import { Button, TextField as MuiTextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import currencies from "../../meta/currencies.json";
import { Autocomplete } from "formik-material-ui-lab";
import AsyncPaginatedSelect from "../../containers/Common/AsyncPaginatedSelect";
import { buyerLoadOptions } from "../../utils/loadOptions";
import Loader from "../common/atoms/Loaders/Loader";
import { supplierLoadOptions } from "../../utils/loadOptions";
import cloneDeep from "lodash/cloneDeep";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { anchorLoadOptions } from "../../utils/loadOptions";
import NumberFormattedInput from "../common/atoms/TextField/NumberFormattedInput";

const useStyles = makeStyles((theme) => ({
  formRootCont: { margin: 20, padding: 20 },
  form: {
    height: "100%",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  fullWidth: { width: "100%" },
  formGridContainer: {
    position: "relative",
    height: "100%",
  },
  errors: {
    color: theme.palette.error.main,
    display: "block",
    fontSize: 12,
    textAlign: "left",
  },
  fieldContainer: {
    padding: "4px 8px",
  },
  selectionCriteriasCont: {
    padding: "4px",
  },
  datesCont: {
    padding: "0px 12px",
    textAlign: "left",
  },
  toggleButtonlabel: {
    fontWeight: 600,
  },
  buttonText: {
    fontWeight: 400,
  },
  typoSubtitle: {
    margin: "33px 8px 0px 8px",
  },
  listbox: {
    padding: "4px 8px",
  },
  option: {
    padding: 1,
    fontSize: theme.typography.body2.fontSize,
  },
  noOptions: {
    padding: 5,
    fontSize: theme.typography.body2.fontSize,
  },
  submitButtonContainer: {
    width: "100%",
    margin: "33px 16px 0px 8px",
  },
  button: {
    width: 250,
    float: "left",
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    padding: "6px 20px",
    fontWeight: 600,
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const CreateToki = (props) => {
  const {
    resource,
    isLoading,
    selectionCriteria,
    handleSelectionCriteria,
    createTokiMutation,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.formRootCont}>
      {isLoading && (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      )}
      <Formik
        initialValues={{
          buyerTopId: "",
          supplierTopId: "",
          funderTopId: "",
          fromDate: null,
          toDate: null,
          amount: 0,
          currencyCode: "", //dropdown
        }}
        validate={(values) => {
          const errors = {};
          if (!values.currencyCode) {
            errors.currencyCode = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.buyerTopId) {
            errors.buyerTopId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.supplierTopId) {
            errors.supplierTopId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.funderTopId) {
            errors.funderTopId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (selectionCriteria === "By Date Range") {
            if (!values.toDate) {
              errors.toDate = getResourceValueByKey(
                resource,
                "REQUIRED!",
                "Required!"
              );
            }
            if (!values.fromDate) {
              errors.fromDate = getResourceValueByKey(
                resource,
                "REQUIRED!",
                "Required!"
              );
            } else if (values.fromDate && values.toDate) {
              if (values.fromDate.getTime() > values.toDate.getTime()) {
                errors.fromDate = getResourceValueByKey(
                  resource,
                  "MUST_BE_LESS_THAN_UPPER_RANGE",
                  "Must be less than upper range"
                );
              }
            }
          }
          if (selectionCriteria === "By Amount") {
            if (values.amount <= 0) {
              errors.amount = getResourceValueByKey(
                resource,
                "MUST_BE_GREATER_THAN_0!",
                "Must be greater than 0!"
              );
            } else if (values.amount !== 0 && !values.amount) {
              errors.amount = getResourceValueByKey(
                resource,
                "REQUIRED!",
                "Required!"
              );
            }
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
          let valuesClone = cloneDeep(values);
          valuesClone.currencyCode = values.currencyCode.value;
          valuesClone.starfleetId =
            yogiUserInfo.loginProfile.member.starfleetId;
          valuesClone.networkId = process.env.REACT_APP_NETWORK_ID;
          valuesClone.ownerTopId = values.funderTopId;
          valuesClone.tokiType = "APD";
          valuesClone.tokiSubType = "BAPD";
          if (selectionCriteria === "By Date Range") {
            valuesClone.assetSelectionCriteria = "maturityDateRange";
            valuesClone.assetMaturityDateRange = {
              from: format(new Date(valuesClone.fromDate), "yyyyMMdd"),
              to: format(new Date(valuesClone.toDate), "yyyyMMdd"),
            };
          } else if (selectionCriteria === "By Amount") {
            valuesClone.assetSelectionCriteria = "totalAmount";
            valuesClone.assetTotalAmount = valuesClone.amount;
          } else {
            valuesClone.assetSelectionCriteria = "all";
          }
          delete valuesClone.amount;
          delete valuesClone.toDate;
          delete valuesClone.fromDate;

          createTokiMutation(valuesClone);
          setTimeout(() => {
            setSubmitting(false);
            resetForm();
          }, 200);
        }}
      >
        {({ submitForm, isSubmitting, touched, errors, values }) => (
          <Form className={classes.form}>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              direction="column"
              className={classes.formGridContainer}
            >
              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      classes={{
                        option: classes.option,
                        noOptions: classes.noOptions,
                        loading: classes.noOptions,
                        listbox: classes.listbox,
                      }}
                      name="currencyCode"
                      component={Autocomplete}
                      size="small"
                      options={currencies}
                      getOptionLabel={(option) => option.label || ""}
                      getOptionSelected={(option, value) =>
                        option.label === value.label
                      }
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          error={
                            touched["currencyCode"] && !!errors["currencyCode"]
                          }
                          helperText={
                            touched["currencyCode"] && errors["currencyCode"]
                          }
                          label={getResourceValueByKey(
                            resource,
                            "CURRENCY",
                            "Currency"
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.typoSubtitle}
              >
                {getResourceValueByKey(
                  resource,
                  "ASSET_SELECTION_CRITERIA",
                  "Asset Selection Criteria"
                )}
              </Typography>
              <Grid item>
                <StyledToggleButtonGroup
                  value={selectionCriteria}
                  exclusive
                  onChange={handleSelectionCriteria}
                >
                  <ToggleButton
                    value="By Date Range"
                    classes={{ label: classes.toggleButtonlabel }}
                  >
                    {getResourceValueByKey(
                      resource,
                      "BY_MAT._DATE_RANGE",
                      "By Mat. Date Range"
                    )}
                  </ToggleButton>
                  <ToggleButton
                    value="By Amount"
                    classes={{ label: classes.toggleButtonlabel }}
                  >
                    {getResourceValueByKey(resource, "BY_AMOUNT", "By Amount")}
                  </ToggleButton>
                  <ToggleButton
                    value="Select All"
                    classes={{ label: classes.toggleButtonlabel }}
                  >
                    {getResourceValueByKey(
                      resource,
                      "SELECT_ALL",
                      "Select All"
                    )}
                  </ToggleButton>
                </StyledToggleButtonGroup>
                {selectionCriteria === "By Date Range" && (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} className={classes.datesCont}>
                      <Grid item>
                        <Field
                          component={DatePicker}
                          name="fromDate"
                          minDate={new Date()}
                          autoOk
                          format="MM/dd/yyyy"
                          label={getResourceValueByKey(
                            resource,
                            "FROM",
                            "From"
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          component={DatePicker}
                          name="toDate"
                          minDate={new Date()}
                          autoOk
                          format="MM/dd/yyyy"
                          label={getResourceValueByKey(resource, "TO", "To")}
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                )}
                {selectionCriteria === "By Amount" && (
                  <div className={classes.datesCont}>
                    <Field
                      className={classes.fullWidth}
                      component={NumberFormattedInput}
                      prefix={values.currencyCode?.value || ""}
                      name="amount"
                      type="number"
                      label={getResourceValueByKey(
                        resource,
                        "AMOUNT",
                        "Amount"
                      )}
                    />
                    <span className={classes.errors}>{errors.amount}</span>
                  </div>
                )}
              </Grid>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.typoSubtitle}
              >
                {getResourceValueByKey(resource, "PARTY_INFO", "Party Info")}
              </Typography>

              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={AsyncPaginatedSelect}
                      name="buyerTopId"
                      loadOptions={buyerLoadOptions}
                      placeholder={getResourceValueByKey(
                        resource,
                        "BUYER",
                        "Buyer"
                      )}
                    />
                    <span className={classes.errors}>{errors.buyerTopId}</span>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={AsyncPaginatedSelect}
                      name="supplierTopId"
                      loadOptions={supplierLoadOptions}
                      placeholder={getResourceValueByKey(
                        resource,
                        "SUPPLIER",
                        "Supplier"
                      )}
                    />
                    <span className={classes.errors}>
                      {errors.supplierTopId}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="baseline">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={AsyncPaginatedSelect}
                      name="funderTopId"
                      loadOptions={anchorLoadOptions}
                      placeholder={getResourceValueByKey(
                        resource,
                        "FUNDER",
                        "Funder"
                      )}
                    />
                    <span className={classes.errors}>{errors.funderTopId}</span>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.submitButtonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  onClick={submitForm}
                  className={classes.button}
                >
                  <span className={classes.buttonText}>
                    {getResourceValueByKey(resource, "CREATE", "Create")}
                  </span>
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateToki;
