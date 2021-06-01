import React, { useEffect, useState } from "react";
import { searchTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { retrieveTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { Box, Typography } from "@material-ui/core";
import { getResourceValues } from "../../utils/resourceHelper";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import isEmpty from "lodash/isEmpty";

const SearchCIN = (props) => {
  const [searchData, setSearchData] = useState(null);
  const [tokenResponse, setTokenResponse] = useState(null);
  const {
    resource,
    steps,
    previousStep,
    renderNodesFromResponse,
    triggerNextStep,
  } = props;

  const phrase1 = getResourceValueByKey(
    resource,
    "AVATAR_WITH_THE_CIN:_{cin}_DOESNOT_EXIST._WOULD_YOU_LIKE_TO_ONBOARD?",
    "Avatar with the CIN: {cin} doesnot exist. Would you like to OnBoard ?"
  );
  const phrase2 = getResourceValueByKey(
    resource,
    "SEARCHING_{cin}...",
    "searching {cin}..."
  );

  useEffect(() => {
    const searchID = async () => {
      const body = searchTokenBody(
        "avatar",
        "cinNum",
        steps.enterCINResponse.value
      );
      let response = await post(env.TOKEN_SEARCH_URL, body);
      setSearchData(response);
    };
    searchID();
  }, [previousStep.value, steps.enterCINResponse.value]);

  useEffect(() => {
    const getTokenResponse = async () => {
      const body = retrieveTokenBody({
        id: searchData.data[0].id,
        type: "avatar",
      });
      let response = await post(env.TOKEN_RETRIEVE_URL, body);
      setTokenResponse(response);
      if (response && !isEmpty(response.data)) {
        renderNodesFromResponse(response);
        triggerNextStep({ trigger: "startDocumentAttach" });
      } else {
        triggerNextStep({
          trigger: "searchCINFailedinitiateOnBoarding",
        });
      }
    };
    if (!isEmpty(searchData)) {
      getTokenResponse();
    }
    if (isEmpty(searchData)) {
      triggerNextStep({
        trigger: "searchCINFailedinitiateOnBoarding",
      });
    }
  }, [searchData]);

  return !isEmpty(tokenResponse?.data) ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "AVATAR_FOUND_MESSAGE",
          "Perfect! I have found your Avatar. You may click to navigate through data graph on the right to get more details."
        )}
      </Typography>
    </Box>
  ) : searchData?.data.length === 0 ? (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase1, {
          cin: steps.enterCINResponse.value,
        })}
      </Typography>
    </Box>
  ) : searchData?.status.success === false ? (
    <Box>
      <Typography variant="body2">
        {getResourceValueByKey(
          resource,
          "OOPS!_SOMETHING_WENT_WRONG!",
          "Oops! Something went wrong!"
        )}
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase2, {
          cin: steps.enterCINResponse.value,
        })}
      </Typography>
    </Box>
  );
};
export default SearchCIN;

// return searchData && searchData.status.success === true ? (
//   <div>
//     <p style={{ color: "black" }}>
//       Successfully retrieved information related to{" "}
//       {props.steps.enterCINResponse.value}!
//     </p>{" "}
//   </div>
// ) : searchData && searchData.status.success === false ? (
//   <div>
//     <p style={{ color: "black" }}>Sorry! Something went wrong!</p>
//   </div>
// ) : (
//   <div>
//     <p style={{ color: "black" }}>Searching entered ID..</p>{" "}
//   </div>
// );
