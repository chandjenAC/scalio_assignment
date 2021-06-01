export const getFilterSortPaginate = (filters, sorts, paging) => {
  // let mappedFilters = [];
  // let mappedSorts = [];

  // filters.map((filter) => {
  //   mappedFilters.push({
  //     fieldName: filter.fieldName,
  //     operator: filter.operator,
  //     values: filter.values,
  //     ignoreCase: filter.ignoreCase,
  //   });
  // });
  // sorts.map((sort) => {
  //   mappedSorts.push({
  //     fieldName: sort.fieldName,
  //     sortOrder: sort.sortOrder,
  //   });
  // });
  let body = {
    filters: filters,
    sort: sorts,
    paging: paging
      ? { pageSize: paging.pageSize, currentPage: paging.currentPage }
      : undefined,
  };
  return body;
};
