export const getLoginBody = (username, password) => {
  return {
    username: username,
    password: password,
  };
};

export const getLogoutBody = (sessionId) => {
  return {
    sessionId: sessionId,
  };
};

export const getSessionsListBody = (criteria) => {
  return {
    isLastOneHour: false,
    criteria: criteria,
  };
};
