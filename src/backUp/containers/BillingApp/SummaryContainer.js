import React, { useContext, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { useNavigate } from "react-router-dom";
import ActivityFilters from "../../components/billingApp/ActivityFilters";
import ClientCarousel from "../../components/billingApp/ClientCarousel";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import { getBillingProjectSummary } from "../../utils/getData";
import { useQuery } from "react-query";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getBillingProjectSummaryBody } from "../../utils/getPayloads/billingAppPayloads";

const useStyles = makeStyles((theme) => ({
  minHeightCont: { minHeight: 300, position: "relative" },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const SummaryContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const navigate = useNavigate();
  const { setSelectedClient } = useContext(BillingAppContext);

  const [activeFilters, setActiveFilters] = useState({
    client: { label: "", value: "" },
    txnEvent: "",
    txnType: "",
    txnDate: "",
  });

  const {
    isLoading,
    error,
    data: projectSummary,
    refetch: refetchProjectSummary,
  } = useQuery(
    [
      "billingService_billingProjectSummary",
      getBillingProjectSummaryBody(activeFilters),
    ],
    getBillingProjectSummary,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleApplyClientFilter = (client) => {
    setActiveFilters({ ...activeFilters, client: client });
  };

  const handleClearClientFilter = () => {
    setActiveFilters({ ...activeFilters, client: { label: "", value: "" } });
  };

  const handleApplyTxnDateFilter = (txnDate) => {
    setActiveFilters({ ...activeFilters, txnDate: txnDate });
  };

  const handleClearTxnDateFilter = () => {
    setActiveFilters({ ...activeFilters, txnDate: "" });
  };

  const onSelectCard = (item) => {
    setSelectedClient(item);
    navigate(`project/${item.id}`);
  };

  if (error) {
    return (
      <div className={classes.centerDiv}>
        <Typography color="error" variant="body1">
          {getResourceValueByKey(
            resource,
            "SOMETHING_WENT_WRONG!",
            "Something went wrong!"
          )}
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.minHeightCont}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {getResourceValueByKey(resource, "CORPORATES", "Corporates")}
          </Typography>
        </Grid>
        <Grid item>
          <ActivityFilters
            resource={resource}
            activeFilters={activeFilters}
            handleApplyClientFilter={handleApplyClientFilter}
            handleClearClientFilter={handleClearClientFilter}
            handleApplyTxnDateFilter={handleApplyTxnDateFilter}
            handleClearTxnDateFilter={handleClearTxnDateFilter}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      ) : (
        <ClientCarousel
          billingHome={true}
          resource={resource}
          onSelectCard={onSelectCard}
          projectSummary={projectSummary}
          refetchProjectSummary={refetchProjectSummary}
          activeView={"Billing Home"}
        />
      )}
    </div>
  );
};

export default SummaryContainer;
