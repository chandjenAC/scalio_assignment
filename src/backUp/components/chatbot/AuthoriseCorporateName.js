import React, { useEffect, useState } from "react";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { Box, Typography } from "@material-ui/core";
import {
  getResourceValueByKey,
  getResourceValues,
} from "../../utils/resourceHelper";

const AuthoriseCorporateName = (props) => {
  const [data, setData] = useState(null);

  const { resource, previousStep, triggerNextStep } = props;
  const phrase1 = getResourceValueByKey(
    resource,
    "{corpName}_HAVE_BEEN_VERIFIED_SUCCESSFULLY!",
    "{corpName} have been verified successfully!"
  );
  const phrase2 = getResourceValueByKey(
    resource,
    "VERIFYING_{corpName}...",
    "Verifying {corpName}..."
  );

  useEffect(() => {
    const identifyID = async () => {
      const body = {
        entity1: previousStep.value,
      };
      let response = await post(env.IDENTIFY_ID, body);
      setData(response);
      if (response?.status?.success === true) {
        triggerNextStep({ trigger: "searchCorporateName" });
      }
    };
    identifyID();
  }, [previousStep.value]);

  return data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase1, {
          corpName: previousStep.value,
        })}
      </Typography>
    </Box>
  ) : !data?.status.success ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "SORRY!_COULDN'T_VERIFY_ENTERED_CORPORATE_NAME",
          "Sorry! Couldn't verify entered Corporate Name."
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase2, {
          corpName: previousStep.value,
        })}
      </Typography>
    </Box>
  );
};
export default AuthoriseCorporateName;
