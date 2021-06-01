import React from "react";
import { formatAmount } from "../../utils";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import DialogBox from "../common/molecules/DialogBox/DialogBox";
import LabelsValuesInDialog from "../common/molecules/LabelsValuesInDialog";
// import MultilineText from "../common/molecules/MultilineText";
import { Box, Grid, IconButton } from "@material-ui/core";
import { makeStyles, Tooltip, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import StyledSwitch from "../../components/common/atoms/Switch/StyledSwitch";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    margin: "12px 0px 6px 0px",
  },
  gridContainer: {
    flexWrap: "noWrap",
  },
  box: {
    padding: "4px 0px",
  },
  labelValues: {
    paddingTop: 2,
  },
  iconButton: {
    padding: 0,
    marginLeft: 10,
  },
}));

const ViewCalculationInfo = (props) => {
  const { resource, selectedRow, setViewCalculationInfo } = props;

  const classes = useStyles();

  const handleClose = (e) => {
    e.stopPropagation();
    setViewCalculationInfo(false);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  return (
    <DialogBox
      open={true}
      showTitleDivider={true}
      handleClose={handleClose}
      dialogActions={dialogActions}
      title={getResourceValueByKey(
        resource,
        "CALCULATION_DETAILS",
        "Calculation Details"
      )}
    >
      <LabelsValuesInDialog
        data={[
          // {
          //   label: getResourceValueByKey(
          //     resource,
          //     "CALCULATION_STATUS",
          //     "Calculation Status"
          //   ),
          //   value: selectedRow.calculationInfo.calStatus,
          // },

          {
            label: getResourceValueByKey(
              resource,
              "PRICING_BOOK",
              "Pricing Book"
            ),
            value: selectedRow?.calcBreakUpInfo?.pricingBook,
          },
          {
            label: getResourceValueByKey(
              resource,
              "PRICING_MODEL",
              "Pricing Model"
            ),
            value: selectedRow?.calcBreakUpInfo?.pricingModel,
          },
          {
            label: getResourceValueByKey(
              resource,
              "PRICING_TIER",
              "Pricing Tier"
            ),
            value: selectedRow.calculationInfo.tierUsed,
          },
          {
            label: getResourceValueByKey(
              resource,
              "TXN._AMOUNT",
              "Txn. Amount"
            ),
            value:
              selectedRow.txnInfo.txnAmount.value === 0
                ? getResourceValueByKey(resource, "N/A", "N/A")
                : `${formatAmount(
                    selectedRow.txnInfo.txnAmount.value
                  )} ${selectedRow.txnInfo.txnAmount.ccy || ""}`,
          },
          {
            label: getResourceValueByKey(resource, "FEE_AMOUNT", "Fee Amount"),
            value:
              selectedRow.txnInfo?.incomeAmount?.value === 0
                ? getResourceValueByKey(resource, "N/A", "N/A")
                : `${formatAmount(selectedRow.txnInfo?.incomeAmount?.value)} ${
                    selectedRow.txnInfo?.incomeAmount?.ccy
                  }`,
          },
        ]}
      />

      {/* {selectedRow.calculationInfo.calType === "P" && (
        <Box className={classes.box}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={5} lg={5}>
              <Typography variant="body2" color="textSecondary">
                {getResourceValueByKey(
                  resource,
                  "TXN._FEE_RATE",
                  "Txn. Fee Rate"
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={7}>
              <Typography variant="subtitle2">
                {hardcodedData.txnFeeRate}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )} */}

      {/* 
      <LabelsValuesInDialog
        data={[
          {
            label: getResourceValueByKey(
              resource,
              "COST_OF_FUNDS",
              "Cost of Funds"
            ),
            value: hardcodedData.costOfFunds,
          },
        ]}
      /> */}

      {selectedRow.calcBreakUpInfo.minFeeApplied === true && (
        <Box className={classes.box}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={5} lg={5}>
              <Typography variant="body2" color="textSecondary">
                {getResourceValueByKey(
                  resource,
                  "MIN_FEE_APPLIED",
                  "Min. Fee Applied"
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={7}>
              <StyledSwitch
                checked={
                  selectedRow.calcBreakUpInfo.minFeeApplied ? true : false
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {selectedRow.calcBreakUpInfo.maxFeeApplied === true && (
        <Box className={classes.box}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={5} lg={5}>
              <Typography variant="body2" color="textSecondary">
                {getResourceValueByKey(
                  resource,
                  "MAX_FEE_APPLIED",
                  "Max. Fee Applied"
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={7}>
              <StyledSwitch
                checked={
                  selectedRow.calcBreakUpInfo.maxFeeApplied ? true : false
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}

      <Typography variant="subtitle2" className={classes.subtitle}>
        {getResourceValueByKey(resource, "TALLYX_FEES", "Tallyx Fees")}
      </Typography>

      <LabelsValuesInDialog
        data={[
          {
            label: getResourceValueByKey(resource, "CALC._TYPE", "Calc. Type"),
            value: selectedRow.calculationInfo.calType,
          },
        ]}
      />

      <Box className={classes.box}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <Typography variant="body2" color="textSecondary">
              {getResourceValueByKey(
                resource,
                "BILLING_FEE_AMOUNT",
                "Bililng Fee Amount"
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={7}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="subtitle2">
                  {`${formatAmount(selectedRow.calculationInfo.calFeeAmount)} ${
                    selectedRow.calculationInfo.calFeeCcy
                  }`}
                </Typography>
              </Grid>
              <Grid item>
                {selectedRow.calcBreakUpInfo?.calculatedAmount?.value > 0 && (
                  <Tooltip
                    title={`${getResourceValueByKey(
                      resource,
                      "FEE_CALCULATION",
                      "Fee Calculation"
                    )}: ${selectedRow.calcBreakUpInfo?.calculatedAmountInStr}`}
                  >
                    <IconButton className={classes.iconButton}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DialogBox>
  );
};

export default ViewCalculationInfo;
