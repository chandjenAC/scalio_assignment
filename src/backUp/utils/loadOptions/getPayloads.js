import { getFilterSortPaginate } from "../getPayloads/getFilterSortPaginate";
import { tokenBodyContext } from "../getPayloads/tokenPayloads";

export const getSearchTokenBody = (filter, paging) => {
  let sort = [
    {
      fieldName: "name",
      sortOrder: "ASC",
    },
  ];
  let body = {
    context: tokenBodyContext,
    payload: {
      type: "avatar",
      criteria: getFilterSortPaginate(filter, sort, paging),
    },
  };
  return body;
};

export const getSearchBillingClientBody = (filter, paging) => {
  let sort = [
    {
      fieldName: "customerName",
      sortOrder: "ASC",
    },
  ];
  let body = getFilterSortPaginate(filter, sort, paging);
  return body;
};

export const getSearchBillingStatementBody = (userInput, paging) => {
  let body = {
    userInput: userInput || "",
    paging: paging,
  };
  return body;
};

export const getSearchCountryCodesBody = (filter, paging) => {
  let sort = [
    {
      fieldName: "country",
      sortOrder: "ASC",
    },
  ];
  let body = getFilterSortPaginate(filter, sort, paging);
  return body;
};

export const getSearchIndustryTypesBody = (filter, paging) => {
  let sort = [
    {
      fieldName: "name",
      sortOrder: "ASC",
    },
  ];

  let body = getFilterSortPaginate(filter, sort, paging);
  return body;
};
