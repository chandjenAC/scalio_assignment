import React, { useMemo } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import BarChartMolecule from "../common/molecules/Charts/BarChartMolecule";
import cloneDeep from "lodash/cloneDeep";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
    height: "100%",
  },
  centerDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

const TwoMonthsRevenueChart = (props) => {
  const { resource, data } = props;

  const classes = useStyles();

  const getData = () => {
    let graphData = [];
    let dataClone = cloneDeep(data);
    dataClone.splice(0, 2).forEach((item) => {
      graphData.push({
        name: item.month,
        revenue: item.revenue,
      });
    });
    graphData.reverse();
    return {
      data: graphData,
      bars: [
        {
          key: "revenue",
          name: getResourceValueByKey(resource, "REVENUE", "Revenue"),
        },
      ],
    };
  };

  const getTitle = () => {
    if (data?.length === 0 || !data) {
      return "";
    }
    let dataClone = cloneDeep(data);
    dataClone.reverse();
    if (dataClone.length > 2) {
      dataClone.splice(0, 2);
    }
    return `${dataClone[0].month} ${dataClone[0].year} - ${
      dataClone[dataClone.length - 1].month
    } ${dataClone[dataClone.length - 1].year}`;
  };

  const transactionsData = useMemo(() => getData(), [data]);

  const title = useMemo(() => getTitle(), [data]);

  return (
    <div className={classes.fullWidth}>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        align="left"
        gutterBottom
      >
        {title}
      </Typography>
      {data?.length > 0 ? (
        <BarChartMolecule width="95%" height={310} data={transactionsData} />
      ) : (
        <div className={classes.centerDiv}>
          <Typography variant="body2" color="error">
            {getResourceValueByKey(
              resource,
              "REVENUE_DETAILS_ARE_NOT_AVAILABLE!",
              "Revenue details are not available!"
            )}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TwoMonthsRevenueChart;
