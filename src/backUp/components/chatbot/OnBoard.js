import React, { useEffect, useState } from "react";
import { getOnboardBody } from "../../utils/getPayloads/onboard";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { Box, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const OnBoard = (props) => {
  const [data, setData] = useState(null);
  const { resource, previousStep } = props;

  useEffect(() => {
    const startOnBoarding = async () => {
      let regNo = props.steps.enterCINResponse
        ? props.steps.enterCINResponse.value
        : props.steps.enterCorporateNameResponse.value;
      let cin = props.steps.enterCINResponse
        ? props.steps.enterCINResponse.value
        : props.steps.enterCorporateNameResponse.value;
      const body = getOnboardBody(regNo, cin);
      let response = await post(env.ONBOARD, body);
      setData(response);
      if (response.status.success === true) {
        props.triggerNextStep({ trigger: "greeting2" });
      }
    };
    startOnBoarding();
  }, [previousStep.value]);

  return data?.status.success ? (
    <Box>
      <Typography variant="body2">{data.status.message}</Typography>
    </Box>
  ) : !data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SORRY!_COULDN'T_ONBOARD!",
          "Sorry! Couldn't OnBoard!"
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(resource, "ONBOARDING...", "OnBoarding...")}
      </Typography>
    </Box>
  );
};
export default OnBoard;
