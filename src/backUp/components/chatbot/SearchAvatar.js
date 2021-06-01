import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getResourceValues } from "../../utils/resourceHelper";

const SearchAvatar = (props) => {
  const [searchSuccess, setSearchSuccess] = useState("loading");
  const {
    resource,
    onSubmitSearch,
    steps,
    triggerNextStep,
    previousStep,
  } = props;

  const phrase1 = getResourceValueByKey(
    resource,
    "SORRY!_NO_MATCHING_RESULTS_FOR_{avatarName}",
    "Sorry!. No matching results for {avatarName}."
  );
  const phrase2 = getResourceValueByKey(
    resource,
    "SEARCHING_{avatarName}...",
    "Searching {avatarName}..."
  );

  useEffect(() => {
    const searchAvatar = async () => {
      localStorage.removeItem("nodeDescriptions");
      let response = await onSubmitSearch(steps.enterAvatarNameResponse.value);
      if (response) {
        setSearchSuccess(true);
        triggerNextStep({ trigger: "selectAvatarFromGraph" });
      } else {
        setSearchSuccess(false);
        setTimeout(() => {
          triggerNextStep({ trigger: "greeting2" });
        }, 2500);
      }
    };
    searchAvatar();
  }, [previousStep.value]);

  return searchSuccess === true ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "PERFECT!_I_HAVE_FOUND_MATCHING_RESULTS",
          "Perfect! I have found matching results."
        )}
      </Typography>
    </Box>
  ) : !searchSuccess ? (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase1, {
          avatarName: steps.enterAvatarNameResponse.value,
        })}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase2, {
          avatarName: steps.enterAvatarNameResponse.value,
        })}
      </Typography>
    </Box>
  );
};

export default SearchAvatar;
