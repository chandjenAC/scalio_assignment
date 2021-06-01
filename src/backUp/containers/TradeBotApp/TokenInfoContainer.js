import React from "react";
import TokenFaceDetails from "../../components/tradebotApp/TokenFaceDetails";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ViewPanelContainer from "./ViewPanelContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "0px 0px 6px 8px",
  },
  faceDetails: {
    height: "auto",
    width: "100%",
  },
  panelWithMenu: {
    flexGrow: "1",
    width: "100%",
  },
}));

const TokenInfoContainer = (props) => {
  const {
    resource,
    nodeDescriptions,
    tokenType,
    typesMeta,
    lastSelectedNode,
    selectedNodeTrail,
    cachedDocs,
    setNodeDescriptions,
  } = props;

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid item className={classes.faceDetails}>
        <TokenFaceDetails
          resource={resource}
          token={nodeDescriptions && nodeDescriptions[tokenType]}
        />
      </Grid>
      <Grid item className={classes.panelWithMenu}>
        <ViewPanelContainer
          resource={resource}
          lastSelectedNode={lastSelectedNode}
          selectedNodeTrail={selectedNodeTrail}
          nodeDescriptions={nodeDescriptions}
          tokenType={tokenType}
          typesMeta={typesMeta}
          cachedDocs={cachedDocs}
          setNodeDescriptions={setNodeDescriptions}
        />
      </Grid>
    </Grid>
  );
};

export default TokenInfoContainer;
