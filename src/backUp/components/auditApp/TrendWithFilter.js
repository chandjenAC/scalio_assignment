import React from "react";
import { ReactComponent as FilterIcon } from "../../images/common/filter.svg";
import { Grid, makeStyles, Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FilterButton from "../common/molecules/Filters/FilterButton";

const useStyles = makeStyles((theme) => ({
  filterCont: {
    position: "absolute",
    top: "46%",
    right: "7%",
    width: "fit-content",
  },
  filterItem: {
    margin: "0px 10px",
  },
  filterIcon: {
    width: "15px",
  },
  filterSelect: {
    zIndex: 99,
  },
}));

const TrendWithFilter = (props) => {
  const {
    resource,
    children,
    filterValue,
    defaultValue,
    popoverTitle,
    selectLabel,
    filterOptions,
    handleApplyFilter,
    clearFilter,
  } = props;
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="flex-end" className={classes.filterCont}>
        <Grid item className={classes.filterItem}>
          <Tooltip
            title={getResourceValueByKey(resource, "FILTERS", "Filters")}
          >
            <FilterIcon className={classes.filterIcon} />
          </Tooltip>
        </Grid>
        <Grid item className={classes.filterSelect}>
          <FilterButton
            filterType="select"
            popoverTitle={popoverTitle}
            selectLabel={selectLabel}
            selectOptions={filterOptions}
            filterValue={filterValue}
            defaultValue={defaultValue}
            handleApplyFilter={handleApplyFilter}
            clearFilter={clearFilter}
          />
          {/* <SelectMolecule
            // label={getResourceValueByKey(resource, "FILTER_BY", "Filter by")}
            defaultValue={filterValue}
            minWidth={80}
            onChange={handleChangeFilter}
            options={filterOptions}
            labelColor={"lightgrey"}
            textColor={"#fff"}
          /> */}
        </Grid>
      </Grid>
      {children}
    </>
  );
};

export default TrendWithFilter;
