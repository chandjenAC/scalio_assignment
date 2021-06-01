import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid, Divider, makeStyles } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ClientHeader from "../../components/billingApp/ClientHeader";
import StatementFilterCriterias from "../../components/billingApp/StatementFilterCriterias";
import StyledSelect from "../../components/common/molecules/StyledSelect";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import StatementsContainer from "./StatementsContainer";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
  },
  subtitleCont: { paddingLeft: 12 },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  paddingLr20: { padding: "0px 20px" },
}));

const StatementsByClientContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const { selectedClient, setSelectedStatement } = useContext(
    BillingAppContext
  );
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [reloadTable, setReloadTable] = useState(null);

  const clientName = selectedClient.customerName;
  const clientTopId = params.clientTopId;

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
        title: getResourceValueByKey(resource, "CLIENT", "Client"),
        path: `/yogi-webb/billing/activity/${clientTopId}`,
      },
    ]);
  }, []);

  const bulkActionOptions = [];

  const handleReloadTable = () => {
    if (reloadTable === null) {
      setReloadTable(true);
    } else {
      setReloadTable(!reloadTable);
    }
  };

  const handleChangeBulkAction = () => {};

  const retrieveStatementDetails = (rowData) => {
    setSelectedStatement(rowData);
    navigate(`/yogi-webb/billing/statements/${clientTopId}/${rowData.id}`);
  };

  const handleClickViewProfile = () => {
    navigate(
      `/yogi-webb/billing/statements/${clientTopId}/profile/${selectedClient.id}`
    );
  };

  const getHeader = () => {
    return (
      <Typography
        variant="h6"
        align="left"
        color="textSecondary"
        className={classes.title}
      >
        {getResourceValueByKey(
          resource,
          "BILLING_STATEMENTS",
          "Billing Statments"
        )}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <>
        <ClientHeader
          resource={resource}
          projectId={selectedClient.id}
          clientName={clientName}
          clientTopId={clientTopId}
          handleClickViewProfile={handleClickViewProfile}
        />
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.subtitleCont}
        >
          <Grid item>
            <Typography variant="h6">
              {getResourceValueByKey(resource, "STATEMENT", "Statement")}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <StatementFilterCriterias resource={resource} />
              </Grid>
              <Grid item>
                <StyledSelect
                  variant="outlined"
                  label={getResourceValueByKey(resource, "ACTIONS", "Actions")}
                  options={bulkActionOptions}
                  handleChange={handleChangeBulkAction}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" className={classes.divider} />
        <div className={classes.paddingLr20}>
          <StatementsContainer
            resource={resource}
            clientTopId={clientTopId}
            reloadTable={reloadTable}
            retrieveStatementDetails={retrieveStatementDetails}
            handleReloadTable={handleReloadTable}
          />
        </div>
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default StatementsByClientContainer;
