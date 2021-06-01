import React, { useMemo } from "react";
import { Card, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import BarChartMolecule from "../common/molecules/Charts/BarChartMolecule";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: 12,
    borderRadius: 15,
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
  },
}));

const PastDue = (props) => {
  const { resource, data } = props;

  const classes = useStyles();

  const getDisplayNameByKey = (key) => {
    switch (key) {
      case "30Days":
        return getResourceValueByKey(resource, "30D", "30d");
      case "60Days":
        return getResourceValueByKey(resource, "60D", "60d");
      case "90Days":
        return getResourceValueByKey(resource, "90D", "90d");
      case "MoreThan90Days":
        return getResourceValueByKey(resource, "+90D", "+90d");
      default:
        return "";
    }
  };

  const getData = () => {
    const chartData = { data: [], bars: [] };
    Object.keys(data).forEach((key) => {
      if (key !== "ccy") {
        const displayName = getDisplayNameByKey(key);
        chartData.data.push({ name: displayName, value: data[key] });
      }
    });
    chartData.bars.push({
      key: "value",
      name: getResourceValueByKey(resource, "AMOUNT", "Amount"),
    });
    return chartData;
  };

  const chartData = useMemo(() => getData(), [data]);

  return (
    <Card className={classes.card}>
      <Typography variant="subtitle1" color="textSecondary" align="left">
        {getResourceValueByKey(resource, "PAST_DUE_CAPS", "PAST DUE")}
      </Typography>
      <BarChartMolecule
        width="95%"
        height={150}
        data={chartData}
        barSize={30}
        hideCartesianGrid={true}
        hideXaxisLine={true}
        hideYaxis={true}
        barGradient="skyblueGradient"
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
    </Card>
  );
};

export default PastDue;
