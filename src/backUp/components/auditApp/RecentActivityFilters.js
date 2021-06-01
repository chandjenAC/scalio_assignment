import React from "react";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FilterButton from "../common/molecules/Filters/FilterButton";
import { Grid, makeStyles, Tooltip } from "@material-ui/core";
import { avatarLoadOptions } from "../../utils/loadOptions";

const useStyles = makeStyles((theme) => ({
  filtersMainCont: {
    padding: "0px 16px 0px 26px",
    marginLeft: 6,
    marginTop: 6,
  },
  filterItem: {
    margin: "0px 12px",
  },
  filterIcon: {
    width: 15,
  },
  selectItem: {
    margin: "0px 16px 0px 0px",
  },
}));

const RecentActivityFilters = (props) => {
  const {
    resource,
    activeFilters,
    handleApplyUserIdFilter,
    handleClearUserIdFilter,
    handleApplyOrgFilter,
    handleClearOrgFilter,
    handleApplyAppFilter,
    handleClearAppFilter,
    handleApplyStarfleetFilter,
    handleClearStarfleetFilter,
    handleApplyStatusFilter,
    handleClearStatusFilter,
    handleApplyActivityTypeFilter,
    handleClearActivityTypeFilter,
    handleApplyDateTimeFilter,
    handleClearDateTimeFilter,
  } = props;

  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="flex-end"
      justify="space-between"
      className={classes.filtersMainCont}
    >
      <Grid item>
        <Grid container alignItems="flex-end">
          <Grid item className={classes.filterItem}>
            <Tooltip
              title={getResourceValueByKey(resource, "FILTERS", "Filters")}
            >
              <FilterIcon className={classes.filterIcon} />
            </Tooltip>
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="asyncPaginatedSelect"
              loadOptions={avatarLoadOptions}
              placeholder={getResourceValueByKey(
                resource,
                "ORGANIZATION",
                "Organization"
              )}
              displayName={getResourceValueByKey(
                resource,
                "ORGANIZATION",
                "Organization"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_ORGANIZATION",
                "Filter by Organization"
              )}
              filterValue={activeFilters.org}
              defaultValue={activeFilters.org}
              handleApplyFilter={handleApplyOrgFilter}
              clearFilter={handleClearOrgFilter}
            />
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="aggregateSelect"
              aggregateSelect={{
                serverName: "txn",
                indexName: "user-audit-log-*",
                field: "userId",
              }}
              displayName={getResourceValueByKey(
                resource,
                "USER_ID",
                "User ID"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_USER_ID",
                "Filter by User ID"
              )}
              placeholder={getResourceValueByKey(
                resource,
                "USER_ID",
                "User ID"
              )}
              filterValue={activeFilters.userId}
              handleApplyFilter={handleApplyUserIdFilter}
              clearFilter={handleClearUserIdFilter}
            />
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="aggregateSelect"
              aggregateSelect={{
                serverName: "txn",
                indexName: "user-audit-log-*",
                field: "activityType",
              }}
              displayName={getResourceValueByKey(
                resource,
                "ACTIVITY",
                "Activity"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_ACTIVITY",
                "Filter by Activity"
              )}
              placeholder={getResourceValueByKey(
                resource,
                "ACTIVITY",
                "Activity"
              )}
              filterValue={activeFilters.activityType}
              handleApplyFilter={handleApplyActivityTypeFilter}
              clearFilter={handleClearActivityTypeFilter}
            />
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="aggregateSelect"
              aggregateSelect={{
                serverName: "txn",
                indexName: "user-audit-log-*",
                field: "starfleetName",
              }}
              displayName={getResourceValueByKey(
                resource,
                "STARFLEET",
                "Starfleet"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_STARFLEET",
                "Filter by Starfleet"
              )}
              filterValue={activeFilters.starfleet}
              handleApplyFilter={handleApplyStarfleetFilter}
              clearFilter={handleClearStarfleetFilter}
            />
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="aggregateSelect"
              aggregateSelect={{
                serverName: "txn",
                indexName: "user-audit-log-*",
                field: "clientAppId",
              }}
              displayName={getResourceValueByKey(resource, "APP", "App")}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_APP",
                "Filter by App"
              )}
              filterValue={activeFilters.app}
              handleApplyFilter={handleApplyAppFilter}
              clearFilter={handleClearAppFilter}
            />
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="aggregateSelect"
              aggregateSelect={{
                serverName: "txn",
                indexName: "user-audit-log-*",
                field: "status",
              }}
              displayName={getResourceValueByKey(resource, "STATUS", "Status")}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_STATUS",
                "Filter by Status"
              )}
              filterValue={activeFilters.status}
              handleApplyFilter={handleApplyStatusFilter}
              clearFilter={handleClearStatusFilter}
            />
          </Grid>
          <Grid item className={classes.selectItem}>
            <FilterButton
              typoSize="small"
              filterType="date/time"
              displayName={getResourceValueByKey(
                resource,
                "DATE/TIME",
                "Date/time"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_DATE/TIME",
                "Filter by Date/time"
              )}
              filterValue={activeFilters.dateTime}
              disableApplyButton={false}
              selectLabel={getResourceValueByKey(
                resource,
                "DATE/TIME",
                "Date/time"
              )}
              handleApplyFilter={handleApplyDateTimeFilter}
              clearFilter={handleClearDateTimeFilter}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RecentActivityFilters;
