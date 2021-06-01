import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";
import FormatDate from "../common/FormatDate";

const useStyles = makeStyles((theme) => ({
  eventsContainer: {
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

const TokenEvents = (props) => {
  const { resource, getEvents } = props;
  const classes = useStyles();

  const columns = [
    {
      field: "eventCode",
      title: getResourceValueByKey(resource, "EVENT_CODE", "Event Code"),
    },
    {
      field: "eventDate",
      title: getResourceValueByKey(resource, "EVENT_DATE", "Event Date"),
      type: "date",
      render: (rowData) => (
        <FormatDate date={rowData.eventDate} currentFormat="yyyymmdd" />
      ),
    },
    {
      field: "eventTimeZone",
      title: getResourceValueByKey(
        resource,
        "EVENT_TIME_ZONE",
        "Event Time Zone"
      ),
      dontTruncate: true,
    },
    {
      field: "type",
      title: getResourceValueByKey(resource, "TYPE", "Type"),
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      render: (rowData) => {
        let renderText = rowData.triggerCount
          ? `${rowData.status} (${rowData.triggerCount})`
          : rowData.status;
        return <Typography variant="body2">{renderText}</Typography>;
      },
    },
  ];

  return (
    <Box className={classes.eventsContainer}>
      <Box>
        <Typography variant="subtitle1" color="primary" align="center">
          {getResourceValueByKey(
            resource,
            "ACTIVITIES_AND_EVENTS",
            "Activities and Events"
          )}
        </Typography>
      </Box>
      <Box className={classes.mainGridItem}>
        {/* <WhitelistedTable data={events} columnHeadings={whiteList} /> */}
        <Mtable
          style={{ boxShadow: "none", padding: "0px" }}
          title={""}
          columns={columns}
          data={getEvents}
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

export default TokenEvents;
