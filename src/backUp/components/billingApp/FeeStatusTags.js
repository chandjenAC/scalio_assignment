import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const FeeStatusTags = ({ resource, status }) => {
  const getColorByStatus = () => {
    return status === "Billed"
      ? "#d0e1ff"
      : status === "NotBilled"
      ? "lightgrey"
      : status === "Paid"
      ? "#cbf5dd"
      : status === "New"
      ? "#f6c3fa"
      : status === "Excluded"
      ? "#fbffb8"
      : "none";
  };

  const useStyles = makeStyles((theme) => ({
    statusBox: {
      display: "grid",
      placeItems: "center",
      background: getColorByStatus(),
      borderRadius: 3,
      width: "fit-content",
      padding: "2px 16px",
    },
  }));

  const classes = useStyles();

  const getStatusText = () => {
    return status === "Billed"
      ? getResourceValueByKey(resource, "BILLED", "Billed")
      : status === "NotBilled"
      ? getResourceValueByKey(resource, "NOT_BILLED", "Not Billed")
      : status === "Paid"
      ? getResourceValueByKey(resource, "PAID", "Paid")
      : status === "New"
      ? getResourceValueByKey(resource, "NEW", "New")
      : status === "Excluded"
      ? getResourceValueByKey(resource, "EXCLUDED", "Excluded")
      : status;
  };

  return (
    <Box className={classes.statusBox}>
      <Typography variant="caption">{getStatusText()}</Typography>
    </Box>
  );
};

export default FeeStatusTags;
