import React, { useMemo } from "react";
import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ActiveShapePieChartMolecule from "../common/molecules/Charts/ActiveShapePieChartMolecule";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: 12,
    borderRadius: 15,
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
  },
}));

const ProgramType = (props) => {
  const { resource, data } = props;

  const classes = useStyles();

  const getGraphData = () => {
    let graphData = [];
    data.totalFeeYTDTypes.forEach((item) => {
      graphData.push({ name: item.type, value: item.total });
    });

    return graphData;
  };

  const graphData = useMemo(() => getGraphData(), [data]);

  return (
    <Card className={classes.card}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary" align="left">
            {getResourceValueByKey(
              resource,
              "PROGRAM_TYPE_CAPS",
              "PROGRAM TYPE"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="primary" align="left">
            {getResourceValueByKey(resource, "YTD", "YTD")}
          </Typography>
        </Grid>
      </Grid>
      <ActiveShapePieChartMolecule
        resource={resource}
        width={"90%"}
        innerRadius={"75%"}
        height={160}
        data={graphData}
        programTypeData={data}
        paddingAngle={0}
        blueGradient={true}
        hideLabel={true}
        customLegend={true}
        showCenterLabel={true}
      />
    </Card>
  );
};

export default ProgramType;
