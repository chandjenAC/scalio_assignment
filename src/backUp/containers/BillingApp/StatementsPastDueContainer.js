import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import { getBillingProjectSummaryForPastDue } from "../../utils/getData";
import { useQuery } from "react-query";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ActivityFilters from "../../components/billingApp/ActivityFilters";
import ClientCarousel from "../../components/billingApp/ClientCarousel";
import { useNavigate } from "react-router-dom";
import SelectedMenuTitle from "../../components/billingApp/SelectedMenuTitle";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import StatementsContainer from "./StatementsContainer";
import { getBillingProjectSummaryBody } from "../../utils/getPayloads/billingAppPayloads";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  filtersCont: { padding: "12px 0px" },
  clientCarouselCont: { minHeight: 250, position: "relative" },
  statementTableBox: { margin: "30px" },
}));

const StatementsPastDueContainer = (props) => {
  const { resource } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const { setSelectedStatement } = useContext(BillingAppContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "BILLING", "Billing"),
        path: "/yogi-webb/billing",
      },
      {
        title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
        path: "/yogi-webb/billing/statements",
      },
      {
        title: getResourceValueByKey(resource, "PAST_DUE", "Past Due"),
        path: "/yogi-webb/billing/statements/pastDue",
      },
    ]);
  }, []);

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
    getBillingProjectSummaryForPastDue,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleApplyClientFilter = (customer) => {
    setActiveFilters({ ...activeFilters, client: customer });
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

  const retrieveStatementDetails = (rowData) => {
    setSelectedStatement(rowData);
    navigate(`/yogi-webb/billing/statements/pastDue/${rowData.id}`);
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

  const getHeader = () => {
    return (
      <SelectedMenuTitle
        resource={resource}
        menuTitle={getResourceValueByKey(
          resource,
          "BILLING_STATEMENTS",
          "Billing Statements"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.filtersCont}
        >
          <Grid item>
            <Typography variant="h6">
              {getResourceValueByKey(resource, "PAST_DUE", "Past Due")}
            </Typography>
          </Grid>
          <Grid item>
            <ActivityFilters
              resource={resource}
              activeFilters={activeFilters}
              loadPastDueCustomers={true}
              handleApplyClientFilter={handleApplyClientFilter}
              handleClearClientFilter={handleClearClientFilter}
              handleApplyTxnDateFilter={handleApplyTxnDateFilter}
              handleClearTxnDateFilter={handleClearTxnDateFilter}
            />
          </Grid>
        </Grid>
        <div className={classes.clientCarouselCont}>
          {isLoading ? (
            <div className={classes.centerDiv}>
              <Loader />
            </div>
          ) : (
            <ClientCarousel
              resource={resource}
              activeView={"Statements Past Due"}
              projectSummary={projectSummary}
              refetchProjectSummary={refetchProjectSummary}
            />
          )}
        </div>
        <Box className={classes.statementTableBox}>
          <StatementsContainer
            resource={resource}
            retrieveStatementDetails={retrieveStatementDetails}
            viewStatements={"Past Due"}
          />
        </Box>
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default StatementsPastDueContainer;
