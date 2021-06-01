import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    margin: "0px 6px",
  },
  box: {
    padding: "12px 16px",
    height: "100%",
  },
}));

const ViewPanel = (props) => {
  const {
    resource,
    nodeDescriptions,
    tokenType,
    lastSelectedNode,
    TagName,
  } = props;

  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.box}>
        <TagName
          resource={resource}
          token={nodeDescriptions}
          tokenType={tokenType}
          lastSelectedNode={lastSelectedNode}
        />
      </Box>
    </Paper>
  );
};

export default ViewPanel;
