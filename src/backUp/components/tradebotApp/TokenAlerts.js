import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const useStyles = makeStyles((theme) => ({
  alertsContainer: {
    position: "relative",
    height: "100%",
  },
  mainGridItem: {
    paddingTop: 8,
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const TokenAlerts = (props) => {
  const { resource, getAlerts } = props;
  const classes = useStyles();

  const columns = [
    {
      field: "alertMessage",
      title: getResourceValueByKey(resource, "ALERT_MESSAGE", "Alert Message"),
      dontTruncate: true,
    },
    {
      field: "generatedOn",
      title: getResourceValueByKey(resource, "GENERATED_ON", "Generated On"),
      type: "datetime",
    },
  ];

  return (
    <Box className={classes.alertsContainer}>
      <Box>
        <Typography variant="subtitle1" color="primary" align="center">
          {getResourceValueByKey(
            resource,
            "ALERTS_AND_REMINDERS",
            "Alerts and Reminders"
          )}
        </Typography>
      </Box>
      <Box className={classes.mainGridItem}>
        {/* <WhitelistedTable data={events} columnHeadings={whiteList} /> */}
        <Mtable
          style={{ boxShadow: "none", padding: "0px" }}
          title={""}
          columns={columns}
          data={getAlerts}
          options={{
            search: false,
            sorting: false,
            paging: false,
            draggable: false,
          }}
        />
      </Box>
    </Box>
  );
};

export default TokenAlerts;
