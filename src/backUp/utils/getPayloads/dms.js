export const getDMSpayload = (fieldName, values, currentPage, pageSize) => {
  return {
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
      // {
      //   fieldName: "updateInfo.createdOn",
      //   sortOrder: "DESC",
      // },
    ],
    paging: {
      currentPage: currentPage,
      pageSize: pageSize || 20,
    },
  };
};

export const getDMSexecutePayload = (query) => {
  return {
    query: query,
    params: {},
  };
};
