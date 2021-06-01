import React from "react";
import { Button, Grid, IconButton } from "@material-ui/core";
import { makeStyles, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FilterButton from "../common/molecules/Filters/FilterButton";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import { buyerLoadOptions } from "../../utils/loadOptions";
import ReloadIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  filtersMainCont: {
    paddingTop: 2,
  },
  filterItem: {
    margin: "0px 6px",
  },
  button: {
    padding: "6px 10px",
    fontWeight: 400,
  },
  buttonText: {
    color: theme.palette.common.black,
  },
  selectMoleculeBox: {
    margin: "12px 12px 0px 12px",
  },
}));

const CcyAndPeriodFilters = (props) => {
  const {
    resource,
    ccyFilterOptions,
    periodFilterOptions,
    filters,
    applyCcyFilter,
    applyPeriodFilter,
    clearCurrencyFilter,
    clearPeriodFilter,
    anchorInitialOptions,
    applyScopeFilter,
    clearScopeFilter,
    reloadDashboard,
    setOpenGenerateDataDialog,
  } = props;
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justify="space-between">
      <Grid item>
        <Grid container className={classes.filtersMainCont}>
          <Grid item className={classes.filterItem}>
            <Tooltip
              title={getResourceValueByKey(resource, "FILTERS", "Filters")}
            >
              <FilterIcon />
            </Tooltip>
          </Grid>
          <Grid item className={classes.filterItem}>
            <FilterButton
              filterType="asyncPaginatedSelect"
              loadOptions={buyerLoadOptions}
              initialOptions={anchorInitialOptions}
              placeholder={getResourceValueByKey(resource, "ANCHOR", "Anchor")}
              displayName={getResourceValueByKey(resource, "ANCHOR", "Anchor")}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_ANCHOR",
                "Filter by Anchor"
              )}
              filterValue={filters.scope.label}
              defaultValue={filters.scope}
              handleApplyFilter={applyScopeFilter}
              clearFilter={clearScopeFilter}
            />
          </Grid>
          <Grid item className={classes.filterItem}>
            <FilterButton
              filterType="select"
              displayName={getResourceValueByKey(
                resource,
                "FILTER_BY_CURRENCY",
                "Filter by Currency"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_CURRENCY",
                "Filter by Currency"
              )}
              filterValue={filters.currency}
              selectLabel={getResourceValueByKey(
                resource,
                "SELECT_CURRENCY",
                "Select Currency"
              )}
              defaultValue={filters.currency}
              selectOptions={ccyFilterOptions}
              handleApplyFilter={applyCcyFilter}
              clearFilter={clearCurrencyFilter}
            />
          </Grid>
          <Grid item className={classes.filterItem}>
            <FilterButton
              filterType="select"
              displayName={getResourceValueByKey(
                resource,
                "FILTER_BY_PERIOD",
                "Filter by Period"
              )}
              popoverTitle={getResourceValueByKey(
                resource,
                "FILTER_BY_PERIOD",
                "Filter by Period"
              )}
              filterValue={filters.period}
              handleApplyFilter={applyPeriodFilter}
              clearFilter={clearPeriodFilter}
              defaultValue={filters.period}
              selectLabel={getResourceValueByKey(
                resource,
                "SELECT_PERIOD",
                "Select Period"
              )}
              selectOptions={periodFilterOptions}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
              onClick={() => setOpenGenerateDataDialog(true)}
            >
              {getResourceValueByKey(resource, "GENERATE", "Generate")}
            </Button>
          </Grid>
          <Grid item>
            <Tooltip
              title={getResourceValueByKey(resource, "RELOAD", "Reload")}
            >
              <IconButton onClick={reloadDashboard}>
                <ReloadIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CcyAndPeriodFilters;
