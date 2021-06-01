import { env } from "../../ENV";
import { post } from "../callApi";
import {
  getBillingClientOptionsFromResponse,
  getCountryCodeOptionsFromResponse,
  getIndustryTypeOptionsFromResponse,
  getTokenOptionsFromResponse,
  getBillingStatementOptionsFromResponse,
} from "./getOptionsFromResponse";
import {
  getSearchBillingClientBody,
  getSearchBillingStatementBody,
  getSearchCountryCodesBody,
  getSearchIndustryTypesBody,
  getSearchTokenBody,
} from "./getPayloads";

let currentPageState = 1;
let pageSize = 200;
let defaultAnchorFilter = [
  {
    fieldName: "subType",
    operator: "in",
    values: ["Funder"],
  },
  {
    fieldName: "status",
    operator: "eq",
    values: ["Active"],
  },
];
let defaultBuyerFilter = [
  {
    fieldName: "subType",
    operator: "in",
    values: ["Anchor"],
  },
  {
    fieldName: "status",
    operator: "eq",
    values: ["Active"],
  },
];
let defaultSupplierFilter = [
  {
    fieldName: "subType",
    operator: "in",
    values: ["Corporate"],
  },
  {
    fieldName: "status",
    operator: "eq",
    values: ["Active"],
  },
];

const getOptionsData = async ({ url, payload, getOptionsFromResponse }) => {
  let response = await post(url, payload);

  let options = getOptionsFromResponse(response.data);

  return { options: options, recordCount: response.recordCount };
};

const getOptionsDataBySearchText = async ({
  searchText,
  url,
  getPayload,
  defaultFilter,
  searchTextFieldName,
  getOptionsFromResponse,
}) => {
  let filter =
    defaultFilter === "userInput"
      ? searchText
      : [
          {
            fieldName: searchTextFieldName,
            operator: "like",
            values: [searchText],
            ignoreCase: true,
          },
          ...defaultFilter,
        ];
  let paging = {
    pageSize: pageSize,
    currentPage: 1,
  };
  let optionsData = await getOptionsData({
    url: url,
    payload: getPayload(filter, paging),
    getOptionsFromResponse: getOptionsFromResponse,
  });

  return optionsData.options;
};

const getOptions = async ({
  searchText,
  prevOptions,
  defaultFilter,
  url,
  getPayload,
  searchTextFieldName,
  getOptionsFromResponse,
}) => {
  let filteredOptions;
  let recordCount;

  if (!searchText) {
    let paging = {
      pageSize: pageSize,
      currentPage: currentPageState,
    };
    let filter = defaultFilter === "userInput" ? "" : defaultFilter;
    let optionsData = await getOptionsData({
      url: url,
      payload: getPayload(filter, paging),
      getOptionsFromResponse: getOptionsFromResponse,
    });

    recordCount = optionsData.recordCount;
    filteredOptions = [...prevOptions, ...optionsData.options];

    currentPageState++;
  } else {
    filteredOptions = await getOptionsDataBySearchText({
      searchText: searchText,
      url: url,
      getPayload: getPayload,
      defaultFilter: defaultFilter,
      searchTextFieldName: searchTextFieldName,
      getOptionsFromResponse: getOptionsFromResponse,
    });
  }

  const hasMore = recordCount > prevOptions.length + pageSize;
  const slicedOptions = filteredOptions.slice(
    prevOptions.length,
    prevOptions.length + pageSize
  );

  return { slicedOptions: slicedOptions, hasMore: hasMore };
};

const loadOptionsHandler = async (
  searchText,
  prevOptions,
  {
    defaultFilter,
    url,
    getPayload,
    searchTextFieldName,
    getOptionsFromResponse,
  }
) => {
  if (!prevOptions || prevOptions.length === 0) currentPageState = 1;
  const options = await getOptions({
    searchText,
    prevOptions,
    defaultFilter,
    url,
    getPayload,
    searchTextFieldName,
    getOptionsFromResponse,
  });

  const { slicedOptions, hasMore } = options;

  return {
    options: slicedOptions,
    hasMore,
  };
};

const loadGroupedOptionsHandler = async (
  searchText,
  prevOptions,
  {
    defaultFilter,
    url,
    getPayload,
    searchTextFieldName,
    getOptionsFromResponse,
  }
) => {
  let allAnchorsListPresent = false;

  if (prevOptions && prevOptions.find((x) => x.label === "All"))
    allAnchorsListPresent = true;

  if (!prevOptions || prevOptions.length === 0 || !allAnchorsListPresent)
    currentPageState = 1;

  const options = await getOptions({
    searchText,
    prevOptions,
    defaultFilter,
    url,
    getPayload,
    searchTextFieldName,
    getOptionsFromResponse,
  });

  const { slicedOptions, hasMore } = options;

  //grouping options w.r.t type
  const mapTypeToIndex = new Map();

  const result = [];

  slicedOptions.forEach((option) => {
    const { type } = option;

    if (mapTypeToIndex.has(type)) {
      const index = mapTypeToIndex.get(type);

      result[index].options.push(option);
    } else {
      const index = result.length;

      mapTypeToIndex.set(type, index);

      result.push({
        label: "All",
        options: [option],
      });
    }
  });

  return {
    options: result,
    hasMore,
  };
};

export const avatarLoadOptions = (search, prevOptions) => {
  return loadGroupedOptionsHandler(search, prevOptions, {
    defaultFilter: [],
    url: env.TOKEN_SEARCH_URL,
    getPayload: getSearchTokenBody,
    searchTextFieldName: "name",
    getOptionsFromResponse: getTokenOptionsFromResponse,
  });
};

//anchor is same as funder
export const anchorLoadOptions = (search, prevOptions) => {
  return loadGroupedOptionsHandler(search, prevOptions, {
    defaultFilter: defaultAnchorFilter,
    url: env.TOKEN_SEARCH_URL,
    getPayload: getSearchTokenBody,
    searchTextFieldName: "name",
    getOptionsFromResponse: getTokenOptionsFromResponse,
  });
};

export const buyerLoadOptions = (search, prevOptions) => {
  return loadGroupedOptionsHandler(search, prevOptions, {
    defaultFilter: defaultBuyerFilter,
    url: env.TOKEN_SEARCH_URL,
    getPayload: getSearchTokenBody,
    searchTextFieldName: "name",
    getOptionsFromResponse: getTokenOptionsFromResponse,
  });
};

export const supplierLoadOptions = (search, prevOptions) => {
  return loadGroupedOptionsHandler(search, prevOptions, {
    defaultFilter: defaultSupplierFilter,
    url: env.TOKEN_SEARCH_URL,
    getPayload: getSearchTokenBody,
    searchTextFieldName: "name",
    getOptionsFromResponse: getTokenOptionsFromResponse,
  });
};

export const billingClientLoadOptions = (search, prevOptions) => {
  return loadOptionsHandler(search, prevOptions, {
    defaultFilter: [],
    url: env.BILLING_PROJECT_SUMMARY,
    getPayload: getSearchBillingClientBody,
    searchTextFieldName: "customerName",
    getOptionsFromResponse: getBillingClientOptionsFromResponse,
  });
};

export const billingPastDueClientLoadOptions = (search, prevOptions) => {
  return loadOptionsHandler(search, prevOptions, {
    defaultFilter: [],
    url: env.BILLING_PROJECT_PAST_DUE_SUMMARY,
    getPayload: getSearchBillingClientBody,
    searchTextFieldName: "customerName",
    getOptionsFromResponse: getBillingClientOptionsFromResponse,
  });
};

export const billingPendingApprovalClientLoadOptions = (
  search,
  prevOptions
) => {
  return loadOptionsHandler(search, prevOptions, {
    defaultFilter: [],
    url: env.BILLING_PROJECT_PENDING_APPROVAL_SUMMARY,
    getPayload: getSearchBillingClientBody,
    searchTextFieldName: "customerName",
    getOptionsFromResponse: getBillingClientOptionsFromResponse,
  });
};

export const billingStatementLoadOptions = (search, prevOptions) => {
  return loadOptionsHandler(search, prevOptions, {
    defaultFilter: "userInput",
    url: env.BILLING_STATEMENT_LOOK_UP,
    getPayload: getSearchBillingStatementBody,
    getOptionsFromResponse: getBillingStatementOptionsFromResponse,
  });
};

export const countryCodeLoadOptions = (search, prevOptions) => {
  return loadOptionsHandler(search, prevOptions, {
    defaultFilter: [],
    url: env.DMS_SEARCH_COUNTRY_CODE,
    getPayload: getSearchCountryCodesBody,
    searchTextFieldName: "countryCode",
    getOptionsFromResponse: getCountryCodeOptionsFromResponse,
  });
};

export const industryTypeLoadOptions = (search, prevOptions) => {
  return loadOptionsHandler(search, prevOptions, {
    defaultFilter: [],
    url: env.DMS_SEARCH_INDUSTRY_TYPE,
    getPayload: getSearchIndustryTypesBody,
    searchTextFieldName: "name",
    getOptionsFromResponse: getIndustryTypeOptionsFromResponse,
  });
};
