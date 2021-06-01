import React, { useMemo } from "react";
import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import CircularProgress from "./CircularProgress";
import { formatNumber } from "../../utils";

const gradientCircleCommonStyles = {
  height: 14,
  width: 14,
  borderRadius: "50%",
  marginTop: 4,
};

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: 12,
    borderRadius: 15,
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
  },
  marginTop20: { marginTop: 20 },
  lastGradientCircle: {
    ...gradientCircleCommonStyles,
    backgroundImage: "linear-gradient(#2b26d1, #fa66f7)",
  },
  currentGradientCircle: {
    ...gradientCircleCommonStyles,
    backgroundImage: "linear-gradient(#ffd642, #ff8a33)",
  },
  detailsBox: {
    margin: "6px 0px",
    flexWrap: "noWrap",
  },
  difference: { lineHeight: 1.2 },
}));

const LastVsCurrentBill = (props) => {
  const { resource, data } = props;

  const classes = useStyles();

  const getOuterValue = () => {
    const last = data?.lastStatementDetails?.value;
    const current = data?.currentBalanceAmount?.value;
    const value = (last / (last + current)) * 100;
    return value;
  };

  const getInnerValue = () => {
    const last = data?.lastStatementDetails?.value;
    const current = data?.currentBalanceAmount?.value;
    const value = (current / (last + current)) * 100;
    return value;
  };

  const outerValue = useMemo(() => getOuterValue(), [data]);
  const innerValue = useMemo(() => getInnerValue(), [data]);

  return (
    <Card className={classes.card}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary" align="left">
            {getResourceValueByKey(
              resource,
              "LAST_V/S_CURRENT_BILL",
              "LAST V/S CURRENT BILL"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="primary" align="left">
            {data?.priceBookDetails?.ccy}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="space-around"
        className={classes.marginTop20}
      >
        <Grid item>
          <Grid
            container
            spacing={1}
            className={classes.detailsBox}
            justify="flex-end"
          >
            <Grid item>
              <Typography variant="subtitle2" align="right">
                {getResourceValueByKey(resource, "LAST", "Last")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="right"
              >
                {formatNumber(data?.lastStatementDetails?.value || 0, 2, 2)}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.lastGradientCircle} />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            className={classes.detailsBox}
            justify="flex-end"
          >
            <Grid item>
              <Typography variant="subtitle2" align="right">
                {getResourceValueByKey(resource, "CURRENT", "Current")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="right"
              >
                {formatNumber(data?.currentBalanceAmount?.value, 2, 2)}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.currentGradientCircle} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CircularProgress
            width="110px"
            height="110px"
            innerValue={innerValue}
            outerValue={outerValue}
            startColorInner="#ffd642"
            endColorInner="#ff8a33"
            startColorOuter="#2b26d1"
            endColorOuter="#fa66f7"
          >
            <Typography variant="subtitle1" className={classes.difference}>
              {`${data.lastVsCurrentDiffPercentage.toFixed(2)}%`}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {getResourceValueByKey(resource, "DIFFERENCE", "Difference")}
            </Typography>
          </CircularProgress>
        </Grid>
      </Grid>
    </Card>
  );
};

export default LastVsCurrentBill;
