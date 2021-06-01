import React from "react";
import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import LinearProgressWithLabel from "../common/molecules/Charts/LinearProgressWithLabel";
import { formatAmountByCcy } from "../../utils";

const circleDivCommonStyles = { width: 8, height: 8, borderRadius: 4 };

const colors = [
  "#1ff26a",
  "#1a90ff",
  "#1ff26a",
  "#1a90ff",
  "#1ff26a",
  "#1a90ff",
  "#1ff26a",
  "#1a90ff",
];

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: 16,
    borderRadius: 15,
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
  },
  scrollDiv: { maxHeight: "150px", overflowY: "scroll", padding: "0px 6px" },
  box: { padding: "6px 0px" },
  greenCircle: {
    ...circleDivCommonStyles,
    backgroundColor: "#1ff26a",
  },
  blueCircle: {
    ...circleDivCommonStyles,
    backgroundColor: "#1a90ff",
  },
  noWrap: { flexWrap: "noWrap" },
}));

const FeeType = (props) => {
  const { resource, data } = props;

  const classes = useStyles();

  const getCircleDiv = (color) => {
    return color === "#1ff26a" ? (
      <Grid item className={classes.greenCircle}></Grid>
    ) : (
      <Grid item className={classes.blueCircle}></Grid>
    );
  };

  return (
    <Card className={classes.card}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary" align="left">
            {getResourceValueByKey(resource, "FEE_TYPE_CAPS", "FEE TYPE")}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="left"
              >
                {getResourceValueByKey(
                  resource,
                  "DISCOUNTING:",
                  "Discounting:"
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="left">
                {data.discountingText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.scrollDiv}>
        {data?.totalFeeYTDTypes?.map((item, index) => {
          let color = colors[index];
          return (
            <Box className={classes.box} key={index}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Grid container alignItems="baseline" spacing={1}>
                    {getCircleDiv(color)}
                    <Grid item>
                      <Typography variant="subtitle1">{item.type}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="textSecondary">
                    {formatAmountByCcy({
                      amount: item.total || 0,
                      ccy: item.ccy,
                      minFractionDigits: 2,
                      maxFractionDigits: 2,
                      currencyDisplay: "code",
                    })}
                  </Typography>
                </Grid>
              </Grid>
              {item?.events?.map((event, index) => {
                return (
                  <Grid
                    key={index}
                    container
                    alignItems="center"
                    justify="space-between"
                    className={classes.noWrap}
                  >
                    <Grid item>
                      <Typography variant="body2" color="textSecondary">
                        {event.event}
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                      <LinearProgressWithLabel
                        value={event.eventPercentage}
                        color={color}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Box>
          );
        })}
      </div>
    </Card>
  );
};

export default FeeType;
