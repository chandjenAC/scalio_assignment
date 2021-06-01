import React, { useCallback, useEffect, useState } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Loader from "../common/atoms/Loaders/Loader";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import { TextField } from "formik-material-ui";
import { Grid, makeStyles } from "@material-ui/core";
import { Button, TextField as MuiTextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import currencies from "../../meta/currencies.json";
import { CheckboxWithLabel } from "formik-material-ui";
import { Autocomplete } from "formik-material-ui-lab";
import AsyncPaginatedSelect from "../../containers/Common/AsyncPaginatedSelect";
import { buyerLoadOptions } from "../../utils/loadOptions";
import { supplierLoadOptions } from "../../utils/loadOptions";

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
  fullWidth: { width: "100%" },
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
    padding: "4px 8px",
    // flexGrow: 1,
    // width: "100%",
  },
  buttonText: {
    color: theme.palette.primary.dark,
  },
  typoSubtitle: {
    padding: "24px 8px 2px 8px",
  },
  singleLineField: {
    width: "100%",
    padding: "4px 8px",
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
  checkboxCont: { marginTop: 12 },
  dividerGridItem: {
    flexGrow: 1,
  },
  divider: {
    height: 2,
    background: theme.palette.grey[600],
    width: "100%",
  },
  submitButtonContainer: {
    width: "100%",
    padding: "16px 16px 0px 16px",
  },
}));

const GenerateData = (props) => {
  const {
    resource,
    generateData,
    anchorInitialOptions,
    setOpenGenerateDataDialog,
  } = props;

  const [selectedBuyer, setSelectedBuyer] = useState("");

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
    setOpenGenerateDataDialog(false);
  };

  const getYearOptions = () => {
    let yearOptions = [];
    let yearNow = new Date().getFullYear();
    for (let i = -5; i <= 0; i++) {
      yearOptions.push({ label: String(yearNow + i), value: yearNow + i });
    }
    return yearOptions;
  };

  const handleChangeBuyer = (selectedOption) => {
    setSelectedBuyer(selectedOption?.value || "");
  };

  const extendedSupplierLoadOptions = useCallback(
    async (search, prevOptions) => {
      const result = await supplierLoadOptions(
        search,
        prevOptions,
        selectedBuyer
      );
      return result;
    },
    [selectedBuyer]
  );

  return (
    <DialogBox
      open={true}
      handleClose={handleClose}
      title={getResourceValueByKey(
        resource,
        "GENERATE_DASHBOARD_DATA",
        "Generate Dashboard Data"
      )}
    >
      <Formik
        initialValues={{
          buyerTopId: "",
          supplierTopIds: [],
          ccys: [],
          years: [],
          earningAPRmin: 0,
          earningAPRmax: "",
          amountRangeMin: 0,
          amountRangeMax: "",
          utilizedAmountRangeMin: 0,
          utilizedAmountRangeMax: "",
          limitRejected: "",
          yieldRejected: "",
          limit: "",
          rowsToBeGenerated: "",
          updateAcceptancePolicy: false,
          ignoreSupplierCountry: true,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.buyerTopId) {
            errors.buyerTopId = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values?.supplierTopIds?.length === 0 || !values.supplierTopIds) {
            errors.supplierTopIds = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.ccys.length === 0) {
            errors.ccys = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.years.length === 0) {
            errors.years = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.earningAPRmin !== 0 && !values.earningAPRmin) {
            errors.earningAPRmin = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.earningAPRmin < 0) {
            errors.earningAPRmin = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_OR_EQUAL_TO_0!",
              "Must be greater than or equal to 0!"
            );
          } else if (values.earningAPRmin > 100) {
            errors.earningAPRmin = getResourceValueByKey(
              resource,
              "MUST_BE_LESS_THAN_100!",
              "Must be less than 100!"
            );
          }

          if (!values.earningAPRmax) {
            errors.earningAPRmax = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.earningAPRmax > 100) {
            errors.earningAPRmax = getResourceValueByKey(
              resource,
              "MUST_BE_LESS_THAN_100!",
              "Must be less than 100!"
            );
          } else if (values.earningAPRmax < 0) {
            errors.earningAPRmax = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_OR_EQUAL_TO_0!",
              "Must be greater than or equal to 0!"
            );
          }
          if (values.amountRangeMin !== 0 && !values.amountRangeMin) {
            errors.amountRangeMin = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.amountRangeMin < 0) {
            errors.amountRangeMin = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_OR_EQUAL_TO_0!",
              "Must be greater than or equal to 0!"
            );
          }
          if (!values.amountRangeMax) {
            errors.amountRangeMax = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.amountRangeMax < 0) {
            errors.amountRangeMax = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_OR_EQUAL_TO_0!",
              "Must be greater than or equal to 0!"
            );
          }
          if (
            values.utilizedAmountRangeMin !== 0 &&
            !values.utilizedAmountRangeMin
          ) {
            errors.utilizedAmountRangeMin = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.utilizedAmountRangeMin < 0) {
            errors.utilizedAmountRangeMin = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_OR_EQUAL_TO_0!",
              "Must be greater than or equal to 0!"
            );
          }
          if (!values.utilizedAmountRangeMax) {
            errors.utilizedAmountRangeMax = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          } else if (values.utilizedAmountRangeMax > values.limit) {
            errors.utilizedAmountRangeMax = getResourceValueByKey(
              resource,
              "MUST_BE_LESS_THAN_PROVIDED_LIMIT!",
              "Must be less than provided Limit!"
            );
          } else if (values.utilizedAmountRangeMax < 0) {
            errors.utilizedAmountRangeMax = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_OR_EQUAL_TO_0!",
              "Must be greater than or equal to 0!"
            );
          }
          if (values.limitRejected <= 0) {
            errors.limitRejected = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_0!",
              "Must be greater than 0!"
            );
          } else if (values.limitRejected !== 0 && !values.limitRejected) {
            errors.limitRejected = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.yieldRejected <= 0) {
            errors.yieldRejected = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_0!",
              "Must be greater than 0!"
            );
          } else if (values.yieldRejected !== 0 && !values.yieldRejected) {
            errors.yieldRejected = getResourceValueByKey(
              resource,
              "REQUIRED!",
              "Required!"
            );
          }
          if (values.limit <= 0) {
            errors.limit = getResourceValueByKey(
              resource,
              "MUST_BE_GREATER_THAN_0!",
              "Must be greater than 0!"
            );
          } else if (values.limit !== 0 && !values.limit) {
            errors.limit = getResourceValueByKey(
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
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) =>
          generateData(values, {
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
          })
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

              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="baseline">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={AsyncPaginatedSelect}
                      name="buyerTopId"
                      onChange={handleChangeBuyer}
                      loadOptions={buyerLoadOptions}
                      initialOptions={anchorInitialOptions}
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
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={AsyncPaginatedSelect}
                      loadOptions={extendedSupplierLoadOptions}
                      cacheUniqs={[selectedBuyer]}
                      disabled={!selectedBuyer}
                      isMulti={true}
                      name="supplierTopIds"
                      placeholder={getResourceValueByKey(
                        resource,
                        "SUPPLIER",
                        "Supplier"
                      )}
                    />
                    <span className={classes.errors}>
                      {errors.supplierTopIds}
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
                    md={6}
                    lg={6}
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
                      name="ccys"
                      component={Autocomplete}
                      size="small"
                      multiple
                      options={currencies}
                      getOptionLabel={(option) => option.label || ""}
                      getOptionSelected={(option, value) =>
                        option.label === value.label
                      }
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          error={touched["ccys"] && !!errors["ccys"]}
                          helperText={touched["ccys"] && errors["ccys"]}
                          label={getResourceValueByKey(
                            resource,
                            "CURRENCIES",
                            "Currencies"
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
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
                      name="years"
                      component={Autocomplete}
                      size="small"
                      multiple
                      options={getYearOptions()}
                      getOptionLabel={(option) => option.label || ""}
                      getOptionSelected={(option, value) =>
                        option.label === value.label
                      }
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          error={touched["years"] && !!errors["years"]}
                          helperText={touched["years"] && errors["years"]}
                          label={getResourceValueByKey(
                            resource,
                            "YEARS",
                            "Years"
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Typography variant="body2" className={classes.typoSubtitle}>
                {getResourceValueByKey(
                  resource,
                  "AMOUNT_RANGE",
                  "DD Offer Request Amount Range"
                )}
              </Typography>

              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="baseline">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="amountRangeMin"
                      type="number"
                      label={getResourceValueByKey(resource, "MIN", "Min")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="amountRangeMax"
                      type="number"
                      label={getResourceValueByKey(resource, "MAX", "Max")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Typography variant="body2" className={classes.typoSubtitle}>
                {getResourceValueByKey(
                  resource,
                  "EARNING_APR",
                  "Earning APR Range"
                )}
              </Typography>

              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="baseline">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="earningAPRmin"
                      type="number"
                      label={getResourceValueByKey(resource, "MIN", "Min")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="earningAPRmax"
                      type="number"
                      label={getResourceValueByKey(resource, "MAX", "Max")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.singleLineField}>
                <Field
                  className={classes.fullWidth}
                  component={TextField}
                  name="rowsToBeGenerated"
                  type="number"
                  label={getResourceValueByKey(
                    resource,
                    "ROWS_TO_BE_GENERATED",
                    "Accepted Rows"
                  )}
                />
              </Grid>

              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="baseline">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="limitRejected"
                      type="number"
                      label={getResourceValueByKey(
                        resource,
                        "LIMIT_REJECTED",
                        "Limit Rejected Rows"
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="yieldRejected"
                      type="number"
                      label={getResourceValueByKey(
                        resource,
                        "YIELD_REJECTED",
                        "Yield Rejected Rows"
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.singleLineField}>
                <Field
                  className={classes.fullWidth}
                  component={TextField}
                  name="limit"
                  type="number"
                  label={getResourceValueByKey(resource, "LIMIT", "Limit")}
                />
              </Grid>

              <Typography variant="body2" className={classes.typoSubtitle}>
                {getResourceValueByKey(
                  resource,
                  "UTILIZED_AMOUNT_RANGE",
                  "Utilized Amount Range"
                )}
              </Typography>

              <Grid item className={classes.fullWidth}>
                <Grid container alignItems="baseline">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="utilizedAmountRangeMin"
                      type="number"
                      label={getResourceValueByKey(resource, "MIN", "Min")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.fieldContainer}
                  >
                    <Field
                      className={classes.fullWidth}
                      component={TextField}
                      name="utilizedAmountRangeMax"
                      type="number"
                      label={getResourceValueByKey(resource, "MAX", "Max")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.fullWidth}>
                <Grid
                  container
                  alignItems="baseline"
                  className={classes.checkboxCont}
                >
                  <Grid item className={classes.fieldContainer}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="updateAcceptancePolicy"
                      Label={{
                        label: (
                          <Typography variant="body2">
                            {getResourceValueByKey(
                              resource,
                              "UPDATE_ACCEPTANCE_POLICY",
                              "Update Acceptance Policy"
                            )}
                          </Typography>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item className={classes.fieldContainer}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="ignoreSupplierCountry"
                      Label={{
                        label: (
                          <Typography variant="body2">
                            {getResourceValueByKey(
                              resource,
                              "IGNORE_SUPPLIER_COUNTRY",
                              "Ignore Supplier Country"
                            )}
                          </Typography>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
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

export default GenerateData;
