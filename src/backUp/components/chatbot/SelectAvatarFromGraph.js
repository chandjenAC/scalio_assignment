import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { Box, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const SelectAvatarFromGraph = (props) => {
  let nodeDescriptions;
  let isMounted = false;
  const { resource, triggerNextStep } = props;

  useEffect(() => {
    isMounted = true;
    nodeDescriptions = JSON.parse(localStorage.getItem("nodeDescriptions"));
    if (isMounted && nodeDescriptions) {
      triggerNextStep({ trigger: "attachLogo" });
    }
    return () => {
      isMounted = false;
    };
  });

  return !isEmpty(nodeDescriptions) ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "CLICK_TO_NAVIGATE_THROUGH_GRAPH_MESSAGE",
          "You may click to navigate through data graph on the right to get more details."
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SELECT_AVATAR_FROM_GRAPH_MESSAGE",
          "Please select your Avatar from Graph."
        )}
      </Typography>
    </Box>
  );
};
export default SelectAvatarFromGraph;
