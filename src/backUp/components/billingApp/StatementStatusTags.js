import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const commonStyles = {
  display: "grid",
  placeItems: "center",
  borderRadius: 3,
  padding: "2px 16px",
  margin: "0px 6px 0px 0px",
};

const StatementStatusTags = ({ resource, status, paidStatus }) => {
  const getColorByStatus = (key) => {
    return ["Sent", "Approved"].includes(status)
      ? "#d0e1ff"
      : key === "NotBilled"
      ? "lightgrey"
      : key === "Paid"
      ? "#cbf5dd"
      : key === "New"
      ? "#f5f59a"
      : key === "Past Due"
      ? "#f7bec4"
      : key === "Partially Paid"
      ? "#daf7e6"
      : "none";
  };

  const useStyles = makeStyles((theme) => ({
    statusBox: {
      ...commonStyles,
      background: getColorByStatus(status),
    },
    paidStatus: {
      ...commonStyles,
      background: getColorByStatus(paidStatus),
    },
  }));

  const classes = useStyles();

  const getStatusText = (key) => {
    return key === "Sent"
      ? getResourceValueByKey(resource, "SENT", "Sent")
      : key === "Approved"
      ? getResourceValueByKey(resource, "APPROVED", "Approved")
      : key === "Paid"
      ? getResourceValueByKey(resource, "PAID", "Paid")
      : key === "New"
      ? getResourceValueByKey(
          resource,
          "PENDING_FOR_APPROVAL",
          "Pending for Approval"
        )
      : key === "Past Due"
      ? getResourceValueByKey(resource, "PAST_DUE", "Past Due")
      : key === "Partially Paid"
      ? getResourceValueByKey(resource, "PARTIALLY_PAID", "Partially Paid")
      : key;
  };

  return (
    <Grid container>
      <Grid item>
        <Box className={classes.statusBox}>
          <Typography variant="caption">{getStatusText(status)}</Typography>
        </Box>
      </Grid>
      {paidStatus && (
        <Grid item>
          <Box className={classes.paidStatus}>
            <Typography variant="caption">
              {getStatusText(paidStatus)}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default StatementStatusTags;
