import React from "react";
import resource from "../../resources/policyApp.json";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Typography } from "@material-ui/core";

const AddNodes = (props) => {
  const { viewPolicyEditOptions } = props;

  const renderTitle = () => {
    return viewPolicyEditOptions
      ? getResourceValueByKey(resource, "ADD_POLICY", "Add Policy")
      : getResourceValueByKey(resource, "ADD_CRITERIA", "Add Criteria");
  };

  const getAttributes = () => {
    return "Getting Attr";
  };

  return (
    <div style={{ width: "100%", position: "relative", height: "100%" }}>
      <Typography variant="subtitle1">{renderTitle()}</Typography>
      {getAttributes()}
    </div>
  );
};

export default AddNodes;
