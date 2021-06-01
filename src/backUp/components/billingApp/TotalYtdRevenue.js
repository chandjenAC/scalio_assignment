import React from "react";
import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { formatAmountByCcy, formatNumber } from "../../utils";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: 16,
    borderRadius: 15,
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
  },
  revenue: {
    margin: "12px 0px 6px 0px",
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 400,
  },
  buttonRoot: {
    padding: "2px 10px",
  },
  pieChartCont: {
    display: "grid",
    placeItems: "center",
    height: 88,
  },
  noWrap: { flexWrap: "noWrap" },
}));

const TotalYtdRevenue = (props) => {
  const { resource, data, viewContract, viewBillingStructure } = props;

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography variant="subtitle1" color="textSecondary" align="left">
        {getResourceValueByKey(
          resource,
          "TOTAL_YTD_REVENUE",
          "TOTAL YTD REVENUE"
        )}
      </Typography>
      <Typography variant="h6" align="left" className={classes.revenue}>
        {formatAmountByCcy({
          amount: data?.totalFeeYTD?.total || 0,
          ccy: data?.totalFeeYTD?.ccy,
          minFractionDigits: 2,
          maxFractionDigits: 2,
          currencyDisplay: "code",
          notation: "standard",
        })}
      </Typography>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            onClick={() => viewContract(data)}
            classes={{ label: classes.buttonLabel, root: classes.buttonRoot }}
            color="primary"
            variant="outlined"
          >
            {getResourceValueByKey(resource, "CONTRACT", "Contract")}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => viewBillingStructure(data)}
            classes={{ label: classes.buttonLabel, root: classes.buttonRoot }}
            color="primary"
            variant="outlined"
          >
            {getResourceValueByKey(
              resource,
              "BILLING_STRUCTURE",
              "Billing Structure"
            )}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" justify="flex-end">
        <Grid item>
          <Typography variant="subtitle1">
            {formatNumber(data?.pastDueTotal?.total, 2, 2)}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ textAlign: "right" }}
          >
            {getResourceValueByKey(resource, "PAST_DUE", "Past Due")}
          </Typography>
        </Grid>
        <Grid item className={classes.pieChartCont}>
          <CircularProgressbarWithChildren
            value={data?.pastDueTotal?.pastDuePercentage}
            styles={{
              root: {
                width: 80,
              },
              path: {
                stroke: "#e66c91",
                strokeWidth: 5,
                strokeLinecap: "butt",
              },
              trail: {
                stroke: "#f0f0f0",
                strokeWidth: 5,
                strokeLinecap: "butt",
              },
            }}
          >
            <Grid
              container
              alignItems="baseline"
              justify="center"
              className={classes.noWrap}
            >
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  {formatNumber(data?.pastDueTotal?.pastDuePercentage, 1, 1)}{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  &nbsp;{"%"}
                </Typography>
              </Grid>
            </Grid>
          </CircularProgressbarWithChildren>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TotalYtdRevenue;
