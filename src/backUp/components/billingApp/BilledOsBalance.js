import React from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Card, Divider, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { ReactComponent as DownloadIcon } from "../../images/common/download.svg";
import { formatAmountByCcy, formatNumber } from "../../utils";
import { format, parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: 16,
    borderRadius: 15,
    boxShadow: "2px 3px 7px -3px rgba(0,0,0,0.36)",
  },
  balanceText: {
    marginTop: 12,
  },
  iconButton: {
    padding: 4,
  },
  downloadIcon: {
    width: 18,
    color: theme.palette.grey[500],
  },
  dividerCont: { flexWrap: "noWrap", padding: "16px 6px 12px 6px" },
  leftHalfGradientDivider: {
    height: 6,
    margin: "0px 2px 0px 4px",
    borderRadius: "5px 0px 0px 5px",
    background: "linear-gradient(45deg, #71ccf0, #6f97ed)",
  },
  rightHalfGradientDivider: {
    height: 6,
    borderRadius: "0px 5px 5px 0px",
    margin: "0px 4px 0px 2px",
    background: "linear-gradient(45deg, #e07294, #e66c91)",
  },
  noWrap: { flexWrap: "noWrap" },
  pastDueGridItem: {
    borderLeft: "1px solid lightgrey",
  },
}));

const BilledOsBalance = (props) => {
  const { resource, data, onClickDownloadIcon } = props;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="subtitle1" color="textSecondary" align="left">
        {getResourceValueByKey(
          resource,
          "BILLED_O/S_BALANCE",
          "BILLED O/S BALANCE"
        )}
      </Typography>
      <Typography variant="h6" align="left" className={classes.balanceText}>
        {formatAmountByCcy({
          amount: data?.lastStatementDetails?.value || 0,
          ccy: data?.currentBalanceAmount?.ccy,
          minFractionDigits: 2,
          maxFractionDigits: 2,
          currencyDisplay: "code",
          notation: "standard",
        })}
      </Typography>
      {data?.lastStatementDetails && (
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="subtitle1" align="left" color="primary">
              {`${format(
                new Date(parseISO(data?.lastStatementDetails?.statementDate)),
                "MMMM yyyy"
              )} ${getResourceValueByKey(resource, "INVOICE", "Invoice")}`}
            </Typography>
          </Grid>
          {data?.lastStatementDetails?.statementDocURL && (
            <Grid item>
              <IconButton
                className={classes.iconButton}
                onClick={onClickDownloadIcon}
              >
                <DownloadIcon className={classes.downloadIcon} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container alignItems="center" className={classes.dividerCont}>
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Divider
            variant="fullWidth"
            className={classes.leftHalfGradientDivider}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Divider
            variant="fullWidth"
            className={classes.rightHalfGradientDivider}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.noWrap}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography variant="subtitle1">
            {formatNumber(data?.currentBalanceAmount?.value, 2, 2)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {getResourceValueByKey(resource, "CURRENT", "Current")}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          className={classes.pastDueGridItem}
        >
          <Typography variant="subtitle1">
            {formatNumber(data?.pastDueTotal?.total, 2, 2)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {getResourceValueByKey(resource, "PAST_DUE", "Past Due")}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BilledOsBalance;
