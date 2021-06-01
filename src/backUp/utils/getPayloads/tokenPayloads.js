const getContext = (sponsorId, starfleetId, starbaseId, avatarId, deviceID) => {
  return {
    sponsorId: sponsorId,
    starfleetId: starfleetId,
    starbaseId: starbaseId,
    avatarId: avatarId,
    deviceID: deviceID,
  };
};

export const tokenBodyContext = getContext("CTP", "CTPDemo", "T-MR", "CTP", "");

export const topMetricsBody = () => {
  const body = {
    context: tokenBodyContext,
    payload: {},
  };
  return body;
};

export const searchTokenBySubtypeBody = ({ id, currentPage }) => {
  let splittedIDs = id?.split("_");
  const body = {
    context: tokenBodyContext,
    payload: {
      type: splittedIDs?.[0],
      criteria: {
        filters: [
          {
            fieldName: "subType",
            operator: "eq",
            values: [splittedIDs?.[1]],
          },
          {
            fieldName: "status",
            operator: "eq",
            values: [splittedIDs?.[2]],
          },
        ],
        paging: {
          pageSize: 20,
          currentPage: currentPage,
        },
        sort: [
          {
            fieldName: "updateInfo_updatedOn",
            sortOrder: "DESC",
          },
        ],
      },
    },
  };
  return body;
};

export const retrieveTokenBody = ({ id, type }) => {
  const body = {
    context: tokenBodyContext,
    payload: {
      id: id,
      type: type,
      compose: ["faces", "docs", "scores", "subtokens", "dimensions"],
    },
  };
  return body;
};

export const retrieveSubtokenBody = (node) => {
  const body = {
    context: tokenBodyContext,
    payload: {
      id: node?.id,
      type: node?.subtokenType,
      tokenId: node?.tokenId,
      tokenType: "avatar",
      compose: ["faces", "docs", "scores", "subtokens", "dimensions"],
    },
  };
  return body;
};

export const subtokenDataRetrieveBody = (node) => {
  const body = {
    context: tokenBodyContext,
    payload: {
      id: node.id,
      type: node.dimension, //will be the dimension type eg: "avatar-credit-rating"
      tokenId: node.tokenId,
      tokenType: node.tokenType, // eg: "avatar-compliance"
      compose: ["faces", "docs", "scores", "subtokens", "dimensions"],
    },
  };
  return body;
};

export const searchAvBody = (queryText) => {
  const body = {
    context: {
      sponsorId: "b7a1f89d-37f5-4b04-bc74-21fbe29b42f1",
      starfleetId: "Tallyx",
      starbaseId: "T-MR",
    },
    payload: {
      searchtext: queryText,
    },
  };
  return body;
};

export const dataTypesMetaBody = () => {
  const body = {
    context: tokenBodyContext,
    payload: {},
  };
  return body;
};

export const tokenTypesMetaBody = () => {
  const body = {
    context: tokenBodyContext,
    payload: {},
  };
  return body;
};

export const searchTokenBody = ({ type, fieldName, value, paging }) => {
  const body = {
    context: tokenBodyContext,
    payload: {
      type: type,
      criteria: {
        filters: [
          {
            fieldName: fieldName,
            operator: "eq",
            values: [value],
          },
        ],
        paging: paging,
        sort: [
          {
            fieldName: "updateInfo_updatedOn",
            sortOrder: "DESC",
          },
        ],
      },
    },
  };
  return body;
};

export const dmsSearchBody = ({ fieldName, values, currentPage, pageSize }) => {
  const body = {
    filters: [
      {
        fieldName: fieldName,
        operator: "in",
        values: values,
      },
    ],
    sort: [
      {
        fieldName: "updateInfo.updatedOn",
        sortOrder: "DESC",
      },
    ],
    paging: {
      currentPage: currentPage,
      pageSize: pageSize || 20,
    },
  };
  return body;
};

export const getDltInfoBody = (tokenId, tokenType) => {
  const body = {
    context: {},
    payload: {
      id: tokenId,
      type: tokenType,
    },
  };
  return body;
};

export const getActivitiesAndEventsBody = (tokenId, tokenType) => {
  const body = {
    context: tokenBodyContext,
    payload: {
      tokenId: tokenId,
      tokenType: tokenType,
      criteria: {
        sort: [
          {
            fieldName: "eventDate",
            sortOrder: "ASC",
          },
        ],
      },
    },
  };
  return body;
};

export const getAlertsAndRemindersBody = (tokenId, tokenType) => {
  const body = {
    context: {
      sponsorId: "b7a1f89d-37f5-4b04-bc74-21fbe29b42f1",
      starfleetId: "Tallyx",
      starbaseId: "T-MR",
    },
    payload: {
      criteria: {
        filters: [
          {
            fieldName: "linkedTxnId",
            operator: "eq",
            values: [tokenId],
          },
        ],
        sort: [
          {
            fieldName: "generatedOn",
            sortOrder: "DESC",
          },
        ],
      },
    },
  };

  return body;
};

export const getAttachLogoBody = (avatarId, logoDocId) => {
  const body = {
    context: {
      sponsorId: "b7a1f89d-37f5-4b04-bc74-21fbe29b42f1",
      starfleetId: "Tallyx",
      starbaseId: "T-MR",
    },
    payload: {
      avatarId: avatarId,
      logoDocId: logoDocId,
    },
  };
  return body;
};

export const getSaveTokenDataBody = (data) => {
  const body = {
    context: tokenBodyContext,
    payload: data,
  };
  return body;
};

export const getTokenPoliciesBody = () => {
  const body = {
    context: tokenBodyContext,
    payload: {},
  };
  return body;
};

export const getTokenPolicyCriteriasBody = (policyId) => {
  const body = {
    context: tokenBodyContext,
    payload: {
      policyId: policyId,
    },
  };
  return body;
};

export const getSaveTokenPolicyBody = (policy) => {
  const body = {
    context: tokenBodyContext,
    payload: policy,
  };
  return body;
};

export const getSaveTokenPolicyCriteriaBody = (criteria) => {
  const body = {
    context: tokenBodyContext,
    payload: criteria,
  };
  return body;
};
