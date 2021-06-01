import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ActivityIcons from "./ActivityIcons";
import StatementsFilterCriterias from "./StatementsFilterCriterias";
import StyledSelect from "../common/molecules/StyledSelect";

const useStyles = makeStyles((theme) => ({
  filtersCont: {
    width: "100%",
  },
}));

const StatementsTabFilter = (props) => {
  const {
    resource,
    activeFilters,
    statusOptions,
    handleApplyTxnDateFilter,
    handleClearTxnDateFilter,
    handleApplyStatusFilter,
    handleClearStatusFilter,
  } = props;

  const classes = useStyles();

  const bulkActionOptions = [];

  return (
    <Grid
      container
      alignItems="center"
      className={classes.filtersCont}
      justify="flex-end"
    >
      <Grid item>
        <Typography variant="h6">
          {getResourceValueByKey(resource, "STATEMENTS", "Statements")}
        </Typography>
      </Grid>
      <Grid item>
        <ActivityIcons />
      </Grid>
      <Grid item>
        <StatementsFilterCriterias
          resource={resource}
          activeFilters={activeFilters}
          statusOptions={statusOptions}
          handleApplyTxnDateFilter={handleApplyTxnDateFilter}
          handleClearTxnDateFilter={handleClearTxnDateFilter}
          handleApplyStatusFilter={handleApplyStatusFilter}
          handleClearStatusFilter={handleClearStatusFilter}
        />
      </Grid>

      <Grid item>
        <StyledSelect
          variant="outlined"
          label={getResourceValueByKey(resource, "ACTIONS", "Actions")}
          options={bulkActionOptions}
        />
      </Grid>
    </Grid>
  );
};

export default StatementsTabFilter;
