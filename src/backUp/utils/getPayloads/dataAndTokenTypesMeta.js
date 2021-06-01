const getContext = (sponsorId, starfleetId, starbaseId, avatarId, deviceID) => {
  return {
    sponsorId: sponsorId,
    starfleetId: starfleetId,
    starbaseId: starbaseId,
    avatarId: avatarId,
    deviceID: deviceID,
  };
};

const metaContext = getContext("CTP", "CTPDemo", "T-MR", "CTP", "");

export const getTypesMetaBody = () => {
  const body = {
    context: metaContext,
    payload: {},
  };
  return body;
};
