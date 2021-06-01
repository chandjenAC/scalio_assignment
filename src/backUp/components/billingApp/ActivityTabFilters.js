import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ActivityIcons from "./ActivityIcons";
import ActivityFilterCriterias from "./ActivityFilterCriterias";
import BulkActionsContainer from "../../containers/BillingApp/BulkActionsContainer";
import TimeBasedActionsContainer from "../../containers/BillingApp/TimeBasedActionsContainer";

const useStyles = makeStyles((theme) => ({
  filtersCont: {
    width: "100%",
  },
}));

const ActivityTabFilters = (props) => {
  const {
    resource,
    activeFilters,
    selectedClient,
    statusOptions,
    selectedRows,
    setSelectedRows,
    handleReloadTable,
    refetchBillingSummary,
    handleApplyTxnDateFilter,
    handleClearTxnDateFilter,
    handleApplyStatusFilter,
    handleClearStatusFilter,
  } = props;

  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      className={classes.filtersCont}
      justify="flex-end"
    >
      <Grid item>
        <Typography variant="h6">
          {getResourceValueByKey(resource, "ACTIVITY", "Activity")}
        </Typography>
      </Grid>
      <Grid item>
        <ActivityIcons />
      </Grid>
      <Grid item>
        <ActivityFilterCriterias
          resource={resource}
          activeFilters={activeFilters}
          hideClientFilter={true}
          statusOptions={statusOptions}
          handleApplyTxnDateFilter={handleApplyTxnDateFilter}
          handleClearTxnDateFilter={handleClearTxnDateFilter}
          handleApplyStatusFilter={handleApplyStatusFilter}
          handleClearStatusFilter={handleClearStatusFilter}
        />
      </Grid>
      <Grid item>
        <BulkActionsContainer
          resource={resource}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          handleReloadTable={handleReloadTable}
          refetchBillingSummary={refetchBillingSummary}
        />
      </Grid>
      <Grid item>
        <TimeBasedActionsContainer
          resource={resource}
          refetchBillingSummary={refetchBillingSummary}
          handleReloadTable={handleReloadTable}
          clientInfo={{
            clientName: selectedClient.customerName,
            clientTopId: selectedClient.customerTopId,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ActivityTabFilters;
