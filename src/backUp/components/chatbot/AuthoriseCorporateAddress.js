import React, { useEffect, useState } from "react";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { Box } from "@material-ui/core";
import {
  getResourceValueByKey,
  getResourceValues,
} from "../../utils/resourceHelper";

const AuthoriseCorporateAddress = (props) => {
  const [data, setData] = useState(null);
  const { resource, setParentNodeState, triggerNextStep, previousStep } = props;
  const phrase1 = getResourceValueByKey(
    resource,
    `THIS_SEEMS_LIKE_A_{idType}.IS_THAT_RIGHT?`,
    "This seems like a {idType}. Is that right?"
  );

  useEffect(() => {
    const identifyID = async () => {
      const body = {
        entity2: previousStep.value,
      };
      let response = await post(env.IDENTIFY_ID, body);
      setData(response);
      if (response.status.success) {
        setParentNodeState("success", { id: "identity" });
        triggerNextStep({
          trigger: "corporateAddressAuthResponse",
        });
      }
    };
    identifyID();
  }, [previousStep.value]);

  return data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase1, {
          idType: data.data.entity2.idType,
        })}
      </Typography>
    </Box>
  ) : !data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SORRY!_YOU_HAVE_ENTERED_INVALID_DETAILS",
          "Sorry! You have entered Invalid Details"
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "VERIFYING_DETAILS_PLEASE_WAIT...",
          "Verifying Details. Please wait..."
        )}
      </Typography>
    </Box>
  );
};
export default AuthoriseCorporateAddress;
