import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import { Grid, makeStyles } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import FilterButton from "../common/molecules/Filters/FilterButton";
import { billingClientLoadOptions } from "../../utils/loadOptions";

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

const ActivityFilterCriterias = (props) => {
  const {
    resource,
    activeFilters,
    hideClientFilter,
    statusOptions,
    handleApplyClientFilter,
    handleClearClientFilter,
    handleApplyTxnDateFilter,
    handleClearTxnDateFilter,
    handleApplyStatusFilter,
    handleClearStatusFilter,
  } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.filtersMainCont}>
      <Grid item className={classes.filterItem}>
        <Tooltip title={getResourceValueByKey(resource, "FILTERS", "Filters")}>
          <FilterIcon />
        </Tooltip>
      </Grid>
      {!hideClientFilter && (
        <Grid item className={classes.filterItem}>
          <FilterButton
            filterType="asyncPaginatedSelect"
            loadOptions={billingClientLoadOptions}
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
            disableFilter={true}
          />
        </Grid>
      )}
      <Grid item className={classes.filterItem}>
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
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="multiSelect"
          displayName={getResourceValueByKey(resource, "STATUS", "Status")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_STATUS",
            "Filter by Status"
          )}
          selectOptions={statusOptions}
          filterValue={activeFilters.status}
          disableApplyButton={false}
          selectLabel={getResourceValueByKey(
            resource,
            "SELECT_STATUS",
            "Select Status"
          )}
          defaultValue={activeFilters.status}
          handleApplyFilter={handleApplyStatusFilter}
          clearFilter={handleClearStatusFilter}
        />
      </Grid>
    </Grid>
  );
};

export default ActivityFilterCriterias;
