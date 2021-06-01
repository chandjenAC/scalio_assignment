import React, { useEffect, useState } from "react";
import NetworkInfoTable from "../../components/tradebotApp/NetworkTreeInfo/NetworkInfoTable";
import SubPanel from "../../components/tradebotApp/NetworkTreeInfo/SubPanel";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TriggerEventsContainer from "./TriggerEventsContainer";
import SettingsContainer from "./SettingsContainer";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  networkInfoParentCont: {
    height: "100%",
    width: "100%",
    padding: "0px 8px",
  },
  paper: {
    position: "relative",
    margin: "6px 6px 0px 6px",
    width: "100%",
    height: "100%",
    padding: "12px 16px",
  },
  title: {
    flex: "0 1 auto",
  },
  triggerBox: { position: "absolute", top: 12, right: 12 },
  mainGridItem: {
    flex: "1 1 auto",
  },
}));

const NetworkInfoContainer = (props) => {
  const {
    resource,
    networkTree,
    selectedNodeTrail,
    setNetworkTreeTableData,
    networkTreeTableData,
    subPanelData,
    lastSelectedNode,
  } = props;

  const columnHeadings = [
    getResourceValueByKey(resource, "TOPVERSE_LEVEL", "Topverse Level"),
    getResourceValueByKey(resource, "LEVEL_NAME", "Level Name"),
    getResourceValueByKey(resource, "OWNER", "Owner"),
  ];
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);

  let sponsors = [];
  networkTree?.sponsors &&
    networkTree.sponsors.map((sponsor, index) => {
      sponsors.push(sponsor.avatarId);
    });

  let intializeTable = [
    {
      level: "1",
      levelDetails: {
        label: getResourceValueByKey(resource, "NETWORK", "Network"),
        value: networkTree?.networkName,
      },
      ownerDetails: {
        label: getResourceValueByKey(resource, "SPONSOR", "Sponsor"),
        value: sponsors,
      },
    },
  ];

  useEffect(() => {
    setTableData(intializeTable);
  }, [networkTree]);

  useEffect(() => {
    let tempTable = intializeTable;
    if (networkTreeTableData.tenant) {
      tempTable.push({
        level: "1.1",
        levelDetails: {
          label: getResourceValueByKey(resource, "STARFLEET", "Starfleet"),
          value: networkTreeTableData.starfleet,
        },
        ownerDetails: {
          label: getResourceValueByKey(resource, "TENANT", "Tenant"),
          value: networkTreeTableData.tenant,
        },
      });
    }
    if (networkTreeTableData.anchor) {
      tempTable.push({
        level: "1.1.1",
        levelDetails: {
          label: getResourceValueByKey(resource, "STARBASE", "Starbase"),
          value: networkTreeTableData.starbase,
        },
        ownerDetails: {
          label: getResourceValueByKey(resource, "ANCHOR", "Anchor"),
          value: networkTreeTableData.anchor,
        },
      });
    }
    setTableData(tempTable);
  }, [networkTreeTableData]);

  useEffect(() => {
    switch (selectedNodeTrail.length) {
      case 2:
        setNetworkTreeTableData((prevState) => ({
          ...prevState,
          tenant: "",
          starfleet: "",
          anchor: "",
          starbase: "",
        }));
        break;
      case 3:
        setNetworkTreeTableData((prevState) => ({
          ...prevState,
          tenant: selectedNodeTrail[2].displayName,
          starfleet: "",
          anchor: "",
          starbase: "",
        }));
        break;
      case 4:
        setNetworkTreeTableData((prevState) => ({
          ...prevState,
          starfleet: selectedNodeTrail[3].displayName,
          anchor: "",
          starbase: "",
        }));
        break;
      default:
        break;
    }
  }, [selectedNodeTrail]);

  return (
    <Grid
      container
      direction="column"
      className={classes.networkInfoParentCont}
    >
      <Paper elevation={5} className={classes.paper}>
        <Box className={classes.triggerBox}>
          <TriggerEventsContainer
            resource={resource}
            lastSelectedNode={lastSelectedNode}
          />
        </Box>
        <Grid item className={classes.title}>
          <Typography variant="subtitle1" color="primary" align="center">
            {networkTree?.networkName}
          </Typography>
        </Grid>
        <Grid item className={classes.mainGridItem}>
          <NetworkInfoTable
            resource={resource}
            tableData={tableData}
            columnHeadings={columnHeadings}
          />

          <SettingsContainer
            resource={resource}
            lastSelectedNode={lastSelectedNode}
          />

          {subPanelData && (
            <SubPanel
              resource={resource}
              data={subPanelData}
              selectedNode={lastSelectedNode}
            />
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NetworkInfoContainer;
