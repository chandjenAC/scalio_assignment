import React, { useEffect, useState } from "react";
import { searchTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { retrieveTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { Box, Typography } from "@material-ui/core";
import { getResourceValues } from "../../utils/resourceHelper";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import isEmpty from "lodash/isEmpty";

const SearchCorporateName = (props) => {
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
    "AVATAR_WITH_THE_CORPORATE_NAME:_{cName}_DOESNOT_EXIST._WOULD_YOU_LIKE_TO_ONBOARD?",
    "Avatar with the Corporate Name: {cName} doesnot exist. Would you like to OnBoard?"
  );
  const phrase2 = getResourceValueByKey(
    resource,
    "SEARCHING_{cName}...",
    "searching {cName}..."
  );

  useEffect(() => {
    const searchCorporateName = async () => {
      const body = searchTokenBody({
        type: "avatar",
        fieldName: "companyName",
        value: steps.enterCorporateNameResponse.value,
      });
      let response = await post(env.TOKEN_SEARCH_URL, body);
      setSearchData(response);
      if (isEmpty(response) || response?.data?.length == 0) {
        triggerNextStep({
          trigger: "searchCorporateNameFailedinitiateOnBoarding",
        });
      }
    };
    searchCorporateName();
  }, [previousStep.value]);

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
        //if tokenResponse is received, then now we have the tokenId and avatarId to start attaching documents
        triggerNextStep({ trigger: "startDocumentAttach" });
      } else {
        triggerNextStep({
          trigger: "searchCorporateNameFailedinitiateOnBoarding",
        });
      }
    };
    if (!isEmpty(searchData) && searchData?.data?.length > 0) {
      getTokenResponse();
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
  ) : isEmpty(searchData) || searchData?.data?.length == 0 ? (
    <Box>
      <Typography variant="body2">
        {getResourceValues(phrase1, {
          cName: steps.enterCorporateNameResponse.value,
        })}
      </Typography>
    </Box>
  ) : searchData?.status?.success === false ? (
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
          cName: steps.enterCorporateNameResponse.value,
        })}
      </Typography>
    </Box>
  );
};

export default SearchCorporateName;

// return searchData && searchData.status.success === false ? (
//   <div>
//     <p style={{ color: "black" }}>Sorry! Something went wrong!</p>
//   </div>
// ) : (
//   <div>
//     <p style={{ color: "black" }}>
//       searching {steps.enterCorporateNameResponse.value}..
//     </p>
//     {tokenResponse &&
//       tokenResponse.data &&
//       !_.isEmpty(tokenResponse.data.data) && (
//         <p style={{ color: "black" }}>
//           I have found your Avatar. You can use the data graph on the right to
//           get more details.
//         </p>
//       )}
//   </div>
// );
