import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import { Grid, makeStyles } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import FilterButton from "../common/molecules/Filters/FilterButton";

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

const StatementFilterCriterias = (props) => {
  const {
    resource,
    // activeFilters,
    handleApplyTxnDateFilter,
    handleClearTxnDateFilter,
  } = props;

  const statusOptions = [
    { label: getResourceValueByKey(resource, "NEW", "New"), value: "New" },
    {
      label: getResourceValueByKey(resource, "NOT_BILLLED", "Not Billed"),
      value: "NotBilled",
    },
    {
      label: getResourceValueByKey(resource, "BILLED", "Billed"),
      value: "Billed",
    },
    {
      label: getResourceValueByKey(
        resource,
        "PENDING_APPROVAL",
        "Pending Approval"
      ),
      value: "Pending Approval",
    },
    { label: getResourceValueByKey(resource, "SENT", "Sent"), value: "Sent" },
    {
      label: getResourceValueByKey(resource, "PAST_DUE", "Past Due"),
      value: "Past Due",
    },
  ];

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
          displayName={getResourceValueByKey(resource, "STATUS", "Status")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_STATUS",
            "Filter by Status"
          )}
          // filterValue={activeFilters.starfleet}
          selectLabel={getResourceValueByKey(resource, "STATUS", "Status")}
          // defaultValue={activeFilters.starfleet}
          selectOptions={statusOptions}
          handleApplyFilter={handleApplyTxnDateFilter}
          clearFilter={handleClearTxnDateFilter}
        />
      </Grid>
      <Grid item className={classes.filterItem}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "DATE", "Date")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_DATE",
            "Filter by Date"
          )}
          selectLabel={getResourceValueByKey(resource, "DATE", "Date")}
          selectOptions={statusOptions}
          // filterValue={selectedTxnDate}
          handleApplyFilter={handleApplyTxnDateFilter}
          clearFilter={handleClearTxnDateFilter}
        />
      </Grid>
    </Grid>
  );
};

export default StatementFilterCriterias;
