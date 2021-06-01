import { getFilterSortPaginate } from "./getFilterSortPaginate";

export const getBillingFeeSummaryByTxnTypeBody = ({
  statementId,
  activeFilters,
}) => {
  let body;
  let filters = [];
  const { client, txnDate, status, defaultFlag } = activeFilters;

  if (client?.value) {
    filters.push({
      fieldName: "customerTopId",
      operator: "eq",
      values: [client.value],
    });
  }

  if (statementId) {
    filters.push({
      fieldName: "invoiceInfo.statementId",
      operator: "eq",
      values: [statementId],
    });
  }

  if (!defaultFlag) {
    if (status.length > 0) {
      filters.push({
        fieldName: "status",
        operator: "in",
        values: status,
      });
    }
    if (txnDate.gte && txnDate.lte) {
      filters.push({
        fieldName: "txnInfo.txnDate",
        operator: "range",
        values: [txnDate.gte, txnDate.lte],
      });
    }
  }

  body = getFilterSortPaginate(filters, [], {});

  if (defaultFlag) {
    body.default = true;
  }
  return body;
};

export const getBillingProjectSummaryBody = (activeFilters) => {
  let body;
  let filters = [];
  const { client } = activeFilters;
  if (client?.value) {
    filters.push({
      fieldName: "customerTopId",
      operator: "eq",
      values: [client.value],
    });
  }

  body = getFilterSortPaginate(filters, [], {});

  return body;
};

export const getBillingProjectSummaryDetailBody = (projectId) => {
  let body = { projectId: projectId };
  return body;
};

export const getBillingProjectPerformanceBody = (activeFilters) => {
  let body = {};
  if (activeFilters.client.id) {
    body.customerTopId = activeFilters.client.id;
  }
  if (activeFilters.txnDate.gte) {
    body.fromDate = activeFilters.txnDate.gte;
  }
  if (activeFilters.txnDate.lte) {
    body.toDate = activeFilters.txnDate.lte;
  }
  if (activeFilters.ccy) {
    body.ccy = activeFilters.ccy;
  }
  return body;
};
