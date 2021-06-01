export const epDashboardDataBody = ({
  ccy = "INR",
  period = "Months",
  keys,
  scope,
}) => {
  let criteria = {
    currency: ccy,
    period: period,
    keys: keys,
  };
  if (scope.id) {
    criteria.scope = { type: "ANCHOR", id: scope.id };
  }
  const body = {
    dashboardtype: "EPDashboard",
    criteria: criteria,
  };
  return body;
};

export const epDashboardGetFiltersBody = ({ anchorTopId }) => {
  let body = {};
  if (anchorTopId) {
    body.anchorTopId = anchorTopId;
  }
  return body;
};
