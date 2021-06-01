import React from "react";
import TopMetrics from "./TopMetrics";
import GraphPath from "../common/GraphPath";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    // padding: "0px 36px 0px 30px",
    // [theme.breakpoints.down("sm")]: {
    //   padding: "8px 12px 0px 12px",
    // },
  },
}));

const GraphPathAndTopMetrics = (props) => {
  const {
    resource,
    reloadGraphNodes,
    metricsData,
    selectedNodeTrail,
    setSelectedNodeTrail,
    setLastSelectedNode,
    setViewTokenInfoPanel,
  } = props;

  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="space-between">
      <Grid item>
        <GraphPath
          resource={resource}
          reloadGraphNodes={reloadGraphNodes}
          selectedNodeTrail={selectedNodeTrail}
          setSelectedNodeTrail={setSelectedNodeTrail}
          setLastSelectedNode={setLastSelectedNode}
          setViewTokenInfoPanel={setViewTokenInfoPanel} //this setter fn should be removed when policy app is migrated to react-query
        />
      </Grid>
      <Grid item>
        <TopMetrics metricsData={metricsData} />
      </Grid>
    </Grid>
  );
};

export default GraphPathAndTopMetrics;
