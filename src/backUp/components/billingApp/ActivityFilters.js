import React from "react";
import { Grid, makeStyles, Tooltip } from "@material-ui/core";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import FilterButton from "../common/molecules/Filters/FilterButton";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { billingClientLoadOptions } from "../../utils/loadOptions";
import { billingPastDueClientLoadOptions } from "../../utils/loadOptions";
import { billingPendingApprovalClientLoadOptions } from "../../utils/loadOptions";

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

const ActivityFilters = (props) => {
  const {
    resource,
    activeFilters,
    loadPastDueCustomers,
    loadPendingApprovalCustomers,
    handleApplyClientFilter,
    handleClearClientFilter,
    handleApplyTxnDateFilter,
    handleClearTxnDateFilter,
  } = props;
  const classes = useStyles();

  const getLoadOptions = () => {
    if (loadPastDueCustomers) {
      return billingPastDueClientLoadOptions;
    } else if (loadPendingApprovalCustomers) {
      return billingPendingApprovalClientLoadOptions;
    }
    return billingClientLoadOptions;
  };

  return (
    <Grid container className={classes.filtersMainCont}>
      <Grid item className={classes.filterItem}>
        <Tooltip title={getResourceValueByKey(resource, "FILTERS", "Filters")}>
          <FilterIcon />
        </Tooltip>
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="asyncPaginatedSelect"
          loadOptions={getLoadOptions()}
          placeholder={getResourceValueByKey(resource, "CLIENT", "Client")}
          displayName={getResourceValueByKey(resource, "CLIENT", "Client")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_CLIENT",
            "Filter by Client"
          )}
          filterValue={activeFilters.client.label}
          defaultValue={activeFilters.client}
          handleApplyFilter={handleApplyClientFilter}
          clearFilter={handleClearClientFilter}
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
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "STARRED", "Starred")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_STARRED",
            "Filter by Starred"
          )}
          selectLabel={getResourceValueByKey(resource, "STARRED", "Starred")}
          defaultValue={activeFilters.client}
          selectOptions={[]}
          filterValue={activeFilters.client}
          handleApplyFilter={handleApplyClientFilter}
          clearFilter={handleClearClientFilter}
        />
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "STATUS", "Status")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_STATUS",
            "Filter by Status"
          )}
          selectLabel={getResourceValueByKey(resource, "STATUS", "Status")}
          defaultValue={activeFilters.client}
          selectOptions={[]}
          filterValue={activeFilters.client}
          handleApplyFilter={handleApplyClientFilter}
          clearFilter={handleClearClientFilter}
        />
      </Grid>
    </Grid>
  );
};

export default ActivityFilters;
