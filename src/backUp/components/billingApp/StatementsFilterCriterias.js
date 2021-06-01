import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import { Grid, makeStyles } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
// import FilterButton from "../common/molecules/Filters/FilterButton";

const useStyles = makeStyles((theme) => ({
  filtersMainCont: {
    paddingTop: 2,
  },
  filterItem: {
    margin: "0px 6px",
  },
  selectMoleculeBox: {
    margin: "12px 12px 0px 12px",
  },
}));

const StatementsFilterCriterias = (props) => {
  const {
    resource,
    // activeFilters,
    // statusOptions,
    // handleApplyClientFilter,
    // handleClearClientFilter,
    // handleApplyTxnDateFilter,
    // handleClearTxnDateFilter,
    // handleApplyStatusFilter,
    // handleClearStatusFilter,
  } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.filtersMainCont}>
      <Grid item className={classes.filterItem}>
        <Tooltip title={getResourceValueByKey(resource, "FILTERS", "Filters")}>
          <FilterIcon />
        </Tooltip>
      </Grid>
      {/* uncomment below code and create a paginatedAsync client filter*/}
      {/* <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "FEE_TYPE", "Fee Type")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_FEE_TYPE",
            "Filter by Fee Type"
          )}
          filterValue={activeFilters.starfleet}
          disableApplyButton={false}
          selectLabel={getResourceValueByKey(
            resource,
            "SELECT_FEE_TYPE",
            "Select Fee Type"
          )}
          defaultValue={activeFilters.txnEvent}
          selectOptions={txnEvents}
          handleApplyFilter={handleApplyClientFilter}
          clearFilter={handleClearClientFilter}
        />
      </Grid> */}
      {/* <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="dateRange"
          displayName={getResourceValueByKey(resource, "DATE", "Txn. Date")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_DATE",
            "Filter by Date"
          )}
          filterValue={activeFilters.txnDate}
          disableApplyButton={false}
          selectLabel={getResourceValueByKey(
            resource,
            "SELECT_DATE",
            "Select Date"
          )}
          defaultValue={activeFilters.txnDate}
          handleApplyFilter={handleApplyTxnDateFilter}
          clearFilter={handleClearTxnDateFilter}
        />
      </Grid> */}
    </Grid>
  );
};

export default StatementsFilterCriterias;
