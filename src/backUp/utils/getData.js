import { post, get, put } from "./callApi";
import { postWithoutAuth } from "./callApi";
import { env } from "../ENV";
import format from "date-fns/format";
import { getFilterSortPaginate } from "./getPayloads/getFilterSortPaginate";

export const login = (body) => {
  return postWithoutAuth(env.AUTHN_SIGNIN_URL, body);
};

export const logout = (body) => {
  return post(env.AUTHN_LOGOUT_URL, body);
};

export const getTopMetrics = (key, body) => {
  return post(env.TOP_METRICS_URL, body);
};

export const getPaginatedTokens = (key, body) => {
  return post(env.TOKEN_SEARCH_URL, body);
};

export const retrieveToken = (key, body) => {
  return post(env.TOKEN_RETRIEVE_URL, body);
};

export const retrieveSubtoken = (key, body) => {
  return post(env.SUBTOKEN_RETRIEVE_URL, body);
};

export const retrieveSubtokenData = (key, body) => {
  return post(env.SUBTOKEN_DATA_RETRIEVE_URL, body);
};

export const getDltInfo = (key, body) => {
  return post(env.TOKEN_DLT_INFO_URL, body);
};

export const searchAV = (key, body) => {
  return post(env.SEARCH_AV_URL, body);
};

export const getDataTypesMeta = (key, body) => {
  return post(env.DATA_TYPE_META_URL, body);
};

export const getTokenTypesMeta = (key, body) => {
  return post(env.TOKEN_TYPE_META_URL, body);
};

export const searchToken = (key, body) => {
  return post(env.TOKEN_SEARCH_URL, body);
};

export const getNetworkTree = () => {
  return get(env.NETWORK_INFO_TREE);
};

export const getUsersForStarfleet = (key, starfleetId) => {
  return get(`${env.NEON_SERVICE_USERS_FOR_STARFLEET}/${starfleetId}`);
};

export const getAnchorsForStarfleet = (key, starfleetId) => {
  return get(`${env.NEON_SERVICE_ANCHORS_FOR_STARFLEET}/${starfleetId}`);
};

export const searchTopUser = (key, body) => {
  return post(env.DMS_SEARCH_TOP_USER, body);
};

export const searchTopToken = (key, body) => {
  return post(env.DMS_SEARCH_TOP_TOKEN, body);
};

export const getUserStarfleetAssociations = (key, userId) => {
  return get(`${env.USER_STARFLEET_ASSOCIATION}/${userId}`);
};

export const getUserAvatarAssociations = (key, userId) => {
  return get(`${env.USER_AVATAR_ASSOCIATION}/${userId}`);
};

export const getAnchorAvatarAssociations = (key, anchorId) => {
  return get(`${env.ANCHOR_AVATAR_ASSOCIATION}/${anchorId}`);
};

export const getEpDashboardData = (key, body) => {
  return post(env.DASHBOARD_SERVICE_EP_DASHBOARD, body);
};

export const getEpDashboardFilters = (key, body) => {
  return post(env.DASHBOARD_SERVICE_FILTERS, body);
};

export const getBillingProjects = (key, body) => {
  return post(env.SEARCH_TOP_BILLING_PROJECTS, body);
};

export const getBillingProjectSummary = (key, body) => {
  return post(env.BILLING_PROJECT_SUMMARY, body);
};

export const getBillingProjectSummaryForPendingApproval = (key, body) => {
  return post(env.BILLING_PROJECT_PENDING_APPROVAL_SUMMARY, body);
};

export const getBillingProjectSummaryForPastDue = (key, body) => {
  return post(env.BILLING_PROJECT_PAST_DUE_SUMMARY, body);
};

export const getBillingProjectSummaryDetail = (key, body) => {
  return post(env.BILLING_PROJECT_SUMMARY_DETAIL, body);
};

export const getBillingProjectPerformance = (key, body) => {
  return post(env.BILLING_PROJECT_PERFORMANCE, body);
};

export const calculateBillingFee = (values) => {
  const body = {
    customerTopId: values.customerTopId,
    fromDate: format(new Date(values.fromDate), "yyyyMMdd"),
    toDate: format(new Date(values.toDate), "yyyyMMdd"),
  };
  return post(env.CALCULATE_FEE, body);
};

export const logPaymentBatch = (body) => {
  return post(env.LOG_PAYMENT_BATCH, body);
};

export const createBillingStatement = (values) => {
  const body = {
    customerTopId: values.customerTopId,
    invoiceDetails: {
      statementNumber: values.invoiceDetails.invoiceNumber,
      statementDate: format(
        new Date(values.invoiceDetails.invoiceDate),
        "yyyyMMdd"
      ),
      dueDate: format(new Date(values.invoiceDetails.dueDate), "yyyyMMdd"),
    },
    billingFeeRecords: {
      fromDate: format(
        new Date(values.invoiceDetails.billingFeeRecordsFromDate),
        "yyyyMMdd"
      ),
      toDate: format(
        new Date(values.invoiceDetails.billingFeeRecordsToDate),
        "yyyyMMdd"
      ),
    },
  };
  return post(env.CREATE_BILLING_STATEMENT, body);
};

export const getBillingStatement = (key, statementId) => {
  return get(`${env.BILLING_STATEMENT}/${statementId}`);
};

export const getBillingFeeSummaryByTxnType = (key, body) => {
  return post(env.BILLING_FEE_SUMMARY_BY_TXN_TYPE, body);
};

export const excludeBillingActivity = (body) => {
  return post(env.EXCLUDE_BILLING_ACTIVITY, body);
};

export const includeBillingActivity = (body) => {
  return post(env.INCLUDE_BILLING_ACTIVITY, body);
};

export const recalculateBillingFee = (body) => {
  return post(env.RECALCULATE_FEE, body);
};

export const getPriceBooksByBillingProject = (key, billingProjectId) => {
  let filters = [
    {
      fieldName: "billingProjectId",
      operator: "eq",
      values: [billingProjectId],
    },
  ];
  let body = getFilterSortPaginate(filters, [], {});
  return post(env.SEARCH_TOP_PRICE_BOOKS, body);
};

export const cloneExistingPriceBook = (values) => {
  const body = {
    cloneFrom: {
      id: values.priceBook.id,
      billingProjectId: values.priceBook.billingProjectId,
      priceBookName: values.priceBook.priceBookName,
      contractStartDate: values.priceBook.contractStartDate,
      contractEndDate: values.priceBook.contractEndDate,
      contractNumber: values.priceBook.contractNumber,
      ccy: values.priceBook.ccy,
      version: values.priceBook.version,
      status: values.priceBook.status,
    },
    priceBook: {
      billingProjectId: values.currentBillingProjectId,
      priceBookName: values.priceBookName,
      contractStartDate: format(new Date(values.contractStartDate), "yyyyMMdd"),
      contractEndDate: format(new Date(values.contractEndDate), "yyyyMMdd"),
      contractNumber: values.contractNo,
      ccy: values.ccy,
      version: values.version,
    },
  };

  return post(env.CLONE_TOP_PRICE_BOOK, body);
};

export const addActivityNote = (values) => {
  const body = {
    id: values.entityId,
    message: values.note,
  };
  return post(env.BILLING_ACTIVITY_NOTES, body);
};

export const addStatementNote = (values) => {
  const body = {
    id: values.entityId,
    message: values.note,
  };
  return put(env.BILLING_STATEMENT_NOTES, body);
};

export const getBillingProjectReminders = (key, statementId) => {
  const body = {};
  if (statementId) {
    body.statementId = statementId;
  }
  return post(env.BILLING_PROJECT_REMINDERS, body);
};

export const updateInvoiceDetails = (values) => {
  if (values.dueDate) {
    values.dueDate = format(new Date(values.dueDate), "yyyyMMdd");
  }
  return put(env.UPDATE_INVOICE_DETAILS, values);
};

export const approveStatement = (id) => {
  const body = { id: id };
  return post(env.APPROVE_BILLING_STATEMENT, body);
};

export const statementSent = (body) => {
  return put(env.BILLING_STATEMENT, body);
};

export const markAsPastDue = (body) => {
  return post(env.MARK_PAST_DUE_BILLING_STATEMENT, body);
};

export const updateFavourite = (body) => {
  return post(env.BILLING_PROJECT_UPDATE_FAVOURITE, body);
};

export const logPayment = (body) => {
  return put(env.UPDATE_PAYMENT_DETAILS, body);
};

export const getDataFromES = (key, body) => {
  return post(env.ELASTIC_SEARCH, body);
};

export const getSessionsData = (key, body) => {
  return post(env.AUTHN_SESSIONS_LIST, body);
};

export const getDMSexecuteData = (key, body) => {
  return post(env.DMS_EXECUTE, body);
};

export const getCountryCodes = (key, body) => {
  return post(env.DMS_SEARCH_COUNTRY_CODE, body);
};

export const getIndustryTypes = (key, body) => {
  return post(env.DMS_SEARCH_INDUSTRY_TYPE, body);
};

export const getTimeZones = (key, body) => {
  return post(env.DMS_SEARCH_TIME_ZONE, body);
};

export const generateEpDashboardData = (values) => {
  let ccys = [];
  let supplierTopIds = [];
  let years = [];

  values.ccys.map((ccy) => {
    ccys.push(ccy.value);
  });
  values.supplierTopIds.map((supplier) => {
    supplierTopIds.push(supplier.value);
  });
  values.years.map((year) => {
    years.push(year.value);
  });

  const body = {
    buyerTopId: values.buyerTopId,
    supplierTopIds: supplierTopIds,
    ccys: ccys,
    years: years,
    earningAPR: {
      max: values.earningAPRmax,
      min: values.earningAPRmin,
    },
    amountRange: {
      max: values.amountRangeMax,
      min: values.amountRangeMin,
    },
    rowsToBeGenerated: values.rowsToBeGenerated,
    limitRejected: values.limitRejected,
    yieldRejected: values.yieldRejected,
    limit: values.limit,
    utilizedAmountRange: {
      max: values.utilizedAmountRangeMax,
      min: values.utilizedAmountRangeMin,
    },
    updateAcceptancePolicy: values.updateAcceptancePolicy,
    ignoreSupplierCountry: values.ignoreSupplierCountry,
  };
  return post(env.GENERATE_EP_DASHBOARD_DATA, body);
};

export const getBankAccountSpec = (key, body) => {
  return post(env.SEARCH_ACCOUNT_SPEC, body);
};

export const onboardAvatar = (body) => {
  return post(env.ONBOARD_AVATAR, body);
};

export const generateInvoice = (body) => {
  return post(env.GENERATE_INVOICE, body);
};

export const createToki = (body) => {
  return post(env.CREATE_TOKI, body);
};
