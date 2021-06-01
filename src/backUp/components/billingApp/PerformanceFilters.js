import React from "react";
import { Grid, makeStyles, Tooltip } from "@material-ui/core";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import FilterButton from "../common/molecules/Filters/FilterButton";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  filtersMainCont: {
    paddingTop: 2,
  },
  filterItem: {
    margin: "0px 6px",
  },
  button: {
    padding: "1px 10px",
  },
  buttonText: {
    color: theme.palette.common.white,
  },
  selectMoleculeBox: {
    margin: "12px 12px 0px 12px",
  },
}));

const PerformanceFilters = (props) => {
  const {
    resource,
    activeFilters,
    ccyOptions,
    clientOptions,
    performanceData,
    handleApplyCcyFilter,
    handleClearCcyFilter,
    handleApplyCustomerFilter,
    handleClearCustomerFilter,
    handleApplyTxnDateFilter,
    handleClearTxnDateFilter,
  } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.filtersMainCont}>
      <Grid item className={classes.filterItem}>
        <Tooltip title={getResourceValueByKey(resource, "FILTERS", "Filters")}>
          <FilterIcon />
        </Tooltip>
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "CCY", "Ccy")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_CURRENCY",
            "Filter by Currency"
          )}
          selectLabel={getResourceValueByKey(resource, "CURRENCY", "Currency")}
          defaultValue={activeFilters.ccy || performanceData.selectedCCY}
          selectOptions={ccyOptions}
          filterValue={activeFilters.ccy || performanceData.selectedCCY}
          handleApplyFilter={handleApplyCcyFilter}
          clearFilter={handleClearCcyFilter}
        />
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "CLIENT", "Client")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_CLIENT",
            "Filter by Client"
          )}
          filterValue={activeFilters.client.name}
          selectLabel={getResourceValueByKey(
            resource,
            "SELECT_CLIENT",
            "Select Client"
          )}
          defaultValue={activeFilters.client.id}
          selectOptions={clientOptions}
          handleApplyFilter={handleApplyCustomerFilter}
          clearFilter={handleClearCustomerFilter}
        />
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="dateRange"
          displayName={getResourceValueByKey(resource, "DATE", "Date")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_DATE",
            "Filter by Date"
          )}
          filterValue={activeFilters.txnDate}
          selectLabel={getResourceValueByKey(resource, "DATE", "Date")}
          defaultValue={activeFilters.txnDate}
          handleApplyFilter={handleApplyTxnDateFilter}
          clearFilter={handleClearTxnDateFilter}
        />
      </Grid>
    </Grid>
  );
};

export default PerformanceFilters;
