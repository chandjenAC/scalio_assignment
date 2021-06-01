import React, { useEffect, useState } from "react";
import {
  getInitiateCINonboardingBody,
  getInitiateCNameOnboardingBody,
} from "../../utils/getPayloads/onboard";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import {
  getResourceValueByKey,
  getResourceValues,
} from "../../utils/resourceHelper";
import { Box, Typography } from "@material-ui/core";

const InitiateOnBoarding = (props) => {
  const [data, setData] = useState(null);
  const { resource, steps, triggerNextStep, previousStep } = props;

  const phrase1 = getResourceValueByKey(
    resource,
    "WE_HAVE_SUCCESSFULLY_ONBOARDED_{corpName}_IN_OUR_PLATFORM",
    "We have successfully onboarded {corpName} in our platform."
  );

  useEffect(() => {
    const initiateOnBoarding = async () => {
      let url;
      let body;
      if (steps.enterCINResponse) {
        // onboarding using CIN
        url = env.INITIATE_CIN_ONBOARDING;
        body = getInitiateCINonboardingBody("IN", steps.enterCINResponse.value);
      } else {
        // onboarding using corporate name
        url = env.INITIATE_CNAME_ONBOARDING;
        body = getInitiateCNameOnboardingBody(
          steps.enterCorporateNameResponse.value,
          steps.enterPrimaryContactNameResponse.value,
          steps.enterCorporateEmailResponse.value
        );
      }
      let response = await post(url, body);
      setData(response);
      if (response.status.success === true) {
        triggerNextStep({ trigger: "startDocumentAttach" });
      }
    };
    initiateOnBoarding();
  }, [previousStep.value]);

  return data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase1, {
          corpName: props.steps.enterCorporateNameResponse
            ? props.steps.enterCorporateNameResponse.value
            : props.steps.enterCINResponse.value,
        })}
      </Typography>
    </Box>
  ) : !data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SORRY!_COULDN'T_INITIATE_TOB_FLOW",
          "Sorry! Couldn't Initiate TOB Flow."
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "INITIATING_ONBOARDING...",
          "Initiating OnBoarding..."
        )}
      </Typography>
    </Box>
  );
};
export default InitiateOnBoarding;
