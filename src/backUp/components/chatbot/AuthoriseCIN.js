import React, { useEffect, useState } from "react";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { Box, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const AuthoriseCIN = (props) => {
  const [data, setData] = useState(null);
  const { resource, previousStep, triggerNextStep } = props;

  useEffect(() => {
    const identifyID = async () => {
      const body = {
        a123: previousStep.value,
      };
      let response = await post(env.IDENTIFY_ID, body);
      setData(response);
      if (response.status.success) {
        triggerNextStep({ trigger: "searchCIN" });
      }
    };
    identifyID();
  }, [previousStep.value]);

  return data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SUCCESSFULLY_VERIFIED_CIN",
          "Successfully verified CIN."
        )}
      </Typography>
    </Box>
  ) : !data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SORRY!_YOU_HAVE_ENTERED_AN_INVALID_ID",
          "Sorry! You have entered an Invalid ID"
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "VERIFYING_ID_PLEASE_WAIT...",
          "Verifying ID. Please wait..."
        )}
      </Typography>
    </Box>
  );
};
export default AuthoriseCIN;
