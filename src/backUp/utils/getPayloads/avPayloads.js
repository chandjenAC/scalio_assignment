export const getAVsearchPayload = (queryText) => {
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
