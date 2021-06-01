import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import BarChartMolecule from "../common/molecules/Charts/BarChartMolecule";
import cloneDeep from "lodash/cloneDeep";

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

const TotalTransactionsChart = (props) => {
  const { resource, data } = props;

  const classes = useStyles();

  const getData = () => {
    let graphData = [];
    let dataClone = cloneDeep(data);
    dataClone.splice(0, 12).forEach((item) => {
      graphData.push({
        name: item.month,
        txnCount: item.txnCount,
      });
    });
    graphData.reverse();
    return {
      data: graphData,
      bars: [
        {
          key: "txnCount",
          name: getResourceValueByKey(resource, "TRANSACTIONS", "Transactions"),
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
    if (dataClone.length > 12) {
      dataClone.splice(0, 12);
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
              "TRANSACTION_DETAILS_ARE_NOT_AVAILABLE!",
              "Transaction details are not available!"
            )}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TotalTransactionsChart;
