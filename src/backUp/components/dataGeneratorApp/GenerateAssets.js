import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { TextField } from "formik-material-ui";
import { Grid, makeStyles } from "@material-ui/core";
import { Button, TextField as MuiTextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import currencies from "../../meta/currencies.json";
import { Autocomplete } from "formik-material-ui-lab";
import AsyncPaginatedSelect from "../../containers/Common/AsyncPaginatedSelect";
import { buyerLoadOptions } from "../../utils/loadOptions";
import Loader from "../common/atoms/Loaders/Loader";
import { supplierLoadOptions } from "../../utils/loadOptions";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
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
  datesCont: {
    padding: "0px 8px",
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
  rowsToBeGeneratedItem: { marginTop: 16, width: "100%", padding: "4px 0px" },
  submitButtonContainer: {
    width: "100%",
    margin: "33px 16px 0px 8px",
  },
  button: {
    width: 250,
    float: "left",
  },
}));

const GenerateAssets = (props) => {
  const {
    resource,
    isLoading,
    shortCodes,
    setShortCodes,
    selectedBuyerName,
    setSelectedBuyerName,
    generateInvoiceMutation,
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
          buyerAvatarId: "",
          supplierAvatarId: "",
          currency: "",
          maturityDateFrom: null,
          maturityDateTo: null,
          totalAssetAmount: 0,
          rowsToBeGenerated: 0,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.buyerAvatarId) {
            errors.buyerAvatarId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.supplierAvatarId) {
            errors.supplierAvatarId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.currency) {
            errors.currency = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (!values.maturityDateFrom) {
            errors.maturityDateFrom = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.maturityDateFrom && values.maturityDateTo) {
            if (
              values.maturityDateFrom.getTime() >
              values.maturityDateTo.getTime()
            ) {
              errors.maturityDateFrom = getResourceValueByKey(
                resource,
                "MUST_BE_LESS_THAN_UPPER_RANGE",
                "Must be less than upper range"
              );
            }
          }
          if (!values.maturityDateTo) {
            errors.maturityDateTo = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.rowsToBeGenerated <= 0) {
            errors.rowsToBeGenerated = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_0!",
              "Must be greater than 0!"
            );
          } else if (
            values.rowsToBeGenerated !== 0 &&
            !values.rowsToBeGenerated
          ) {
            errors.rowsToBeGenerated = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.totalAssetAmount <= 0) {
            errors.totalAssetAmount = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_0!",
              "Must be greater than 0!"
            );
          } else if (
            values.totalAssetAmount !== 0 &&
            !values.totalAssetAmount
          ) {
            errors.totalAssetAmount = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let payload = {
            buyer: {
              avatarId: values.buyerAvatarId,
              vcMappingCode: shortCodes.buyer,
            },
            supplier: {
              avatarId: values.supplierAvatarId,
              vcMappingCode: shortCodes.supplier,
            },
            currency: values.currency.value,
            rowsToBeGenerated: values.rowsToBeGenerated,
            formatName: `${selectedBuyerName} Invoice Asset End Point`,
            maturityDateRange: {
              from: format(new Date(values.maturityDateFrom), "yyyyMMdd"),
              to: format(new Date(values.maturityDateTo), "yyyyMMdd"),
            },
            totalAssetAmount: values.totalAssetAmount,
          };
          generateInvoiceMutation(payload);
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
                      name="currency"
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
                          error={touched["currency"] && !!errors["currency"]}
                          helperText={touched["currency"] && errors["currency"]}
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
                      name="buyerAvatarId"
                      loadOptions={buyerLoadOptions}
                      placeholder={getResourceValueByKey(
                        resource,
                        "BUYER",
                        "Buyer"
                      )}
                      onChange={(value) => {
                        setShortCodes((prevState) => ({
                          ...prevState,
                          buyer: value?.shortCode,
                        }));
                        setSelectedBuyerName(value?.label);
                      }}
                    />
                    <span className={classes.errors}>
                      {errors.buyerAvatarId}
                    </span>
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
                      name="supplierAvatarId"
                      loadOptions={supplierLoadOptions}
                      placeholder={getResourceValueByKey(
                        resource,
                        "SUPPLIER",
                        "Supplier"
                      )}
                      onChange={(value) => {
                        setShortCodes((prevState) => ({
                          ...prevState,
                          supplier: value?.shortCode,
                        }));
                      }}
                    />
                    <span className={classes.errors}>
                      {errors.supplierAvatarId}
                    </span>
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
                  "MATURITY_DATE_RANGE",
                  "Maturity Date Range"
                )}
              </Typography>

              <Grid item>
                <Grid container spacing={2} className={classes.datesCont}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item>
                      <Field
                        component={DatePicker}
                        name="maturityDateFrom"
                        minDate={new Date()}
                        autoOk
                        format="MM/dd/yyyy"
                        label={getResourceValueByKey(resource, "FROM", "From")}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        component={DatePicker}
                        name="maturityDateTo"
                        minDate={new Date()}
                        autoOk
                        format="MM/dd/yyyy"
                        label={getResourceValueByKey(resource, "TO", "To")}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.typoSubtitle}
              >
                {getResourceValueByKey(
                  resource,
                  "TOTAL_ASSET_AMOUNT",
                  "Total Asset Amount"
                )}
              </Typography>

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
                      component={NumberFormattedInput}
                      prefix={values.currency?.value || ""}
                      name="totalAssetAmount"
                      type="number"
                      label={getResourceValueByKey(
                        resource,
                        "AMOUNT",
                        "Amount"
                      )}
                    />
                    <span className={classes.errors}>
                      {errors.totalAssetAmount}
                    </span>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.rowsToBeGeneratedItem}>
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
                      component={TextField}
                      name="rowsToBeGenerated"
                      type="number"
                      label={getResourceValueByKey(
                        resource,
                        "NO._OF_INVOICES_TO_BE_GENERATED",
                        "No. of Invoices to be generated"
                      )}
                    />
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
                    {getResourceValueByKey(resource, "GENERATE", "Generate")}
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

export default GenerateAssets;
