import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Sync";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleAndPathBox: { width: "100%", padding: "3px 4px 0px 4px" },
  button: {
    padding: "0px",
    minWidth: 32,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  closeIcon: { fontSize: "28px", marginTop: "12px" },
  refreshIcon: { fontSize: "28px" },
  chevronIcon: {
    fontSize: "20px",
    color: theme.palette.grey.A700,
    marginTop: "2px",
  },
  moreIcon: { fontSize: "18px", color: theme.palette.primary.main },
}));

const GraphPath = (props) => {
  const [graphPathLevel, setGraphPathLevel] = useState(1);

  const classes = useStyles();

  const {
    resource,
    reloadGraphNodes,
    setLastSelectedNode,
    selectedNodeTrail,
    setSelectedNodeTrail,
    setViewTokenInfoPanel,
  } = props;

  useEffect(() => {
    let pathLevel = Math.ceil(selectedNodeTrail.length / 3);
    setGraphPathLevel(pathLevel);
  }, [selectedNodeTrail]);

  const handleMetricsNavigation = (trail) => {
    let newTrail = [];
    if (trail === "...") {
      //navigating back, if selected breadcrumb is "..." and graphPathLevel is 2(ie; when coming back), then hide TokenInfoPanel
      // if (graphPathLevel === 2) {
      //   setViewTokenInfoPanel && setViewTokenInfoPanel(false);
      // }
      for (let i = 0; i < graphPathLevel * 3 - 3; i++) {
        newTrail.push(selectedNodeTrail[i]);
      }
    } else {
      // keeps the trail till the selected one and removes the rest from selectedNodeTrail
      for (let i = 0; i < selectedNodeTrail.length; i++) {
        newTrail.push(selectedNodeTrail[i]);
        if (selectedNodeTrail[i].id === trail.id) {
          break;
        }
      }
      //navigating back, if selected breadcrumb is a metric node, then hide TokenInfoPanel
      if (trail.root && !trail.policyRoot) {
        setViewTokenInfoPanel && setViewTokenInfoPanel(false);
      }
    }
    return newTrail;
  };

  const handleSelectNodeTrail = (trail) => {
    let newTrail = [];
    newTrail = handleMetricsNavigation(trail);
    setLastSelectedNode(newTrail[newTrail.length - 1]); //sets last selected node one step back to get the splittedID's and make api call
    setSelectedNodeTrail(newTrail);
  };

  const renderTrail = (trail, index) => {
    return (
      <Grid item key={index}>
        <Grid container justify="flex-start">
          <Grid item>
            <Button
              className={classes.button}
              onClick={() => handleSelectNodeTrail(trail)}
            >
              <Typography variant="body2" color={"primary"} align="left">
                {trail.displayName ? trail.displayName : trail.tokenDisplayName}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <ChevronRightIcon className={classes.chevronIcon} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box className={classes.titleAndPathBox}>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="body2">
            {getResourceValueByKey(resource, "GRAPH_PATH", "Graph Path")}
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={getResourceValueByKey(resource, "RELOAD", "Reload")}>
            <Button
              className={classes.button}
              onClick={() => reloadGraphNodes()}
            >
              <RefreshIcon color={"primary"} className={classes.refreshIcon} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      {graphPathLevel > 1 ? (
        <Grid container justify="flex-start">
          <Grid item>
            <Grid container alignItems="baseline">
              <Grid item>
                <Button
                  className={classes.button}
                  onClick={() => handleSelectNodeTrail("...")}
                >
                  <MoreHorizIcon className={classes.moreIcon} />
                </Button>
              </Grid>
              <Grid item>
                <ChevronRightIcon className={classes.chevronIcon} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-start" alignItems="baseline">
              {props.selectedNodeTrail.map((trail, index) => {
                return (
                  index >= graphPathLevel * 3 - 3 && renderTrail(trail, index)
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify="flex-start" alignItems="baseline">
          {props.selectedNodeTrail.map((trail, index) => {
            return renderTrail(trail, index);
          })}
        </Grid>
      )}
    </Box>
  );
};

export default GraphPath;
